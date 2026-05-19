// lib/analytics/track.ts
// Lightweight, POPIA-compliant tracking abstraction.
//
// Architecture:
//   1. AnalyticsProvider mounts at the document root and reads
//      localStorage["mz_consent"] (set by PopiaConsentBanner).
//   2. Until consent is "accepted" or "custom", events queue in memory
//      and never reach the network.
//   3. On consent grant, GA4 + PostHog scripts load (only if env vars are
//      configured — no-op in dev / unconfigured envs).
//   4. Public surface: `track(name, props?)` — call from any client
//      component. Server components import nothing — they ship
//      `data-track-*` attributes that the document-level delegated
//      listener picks up at runtime.
//
// Lead-source attribution is captured at session start (landing page +
// document.referrer + UTM params from the URL) and persisted to
// sessionStorage so every downstream event can stamp it.

export const CONSENT_STORAGE_KEY = "mz_consent";
export const ATTRIBUTION_STORAGE_KEY = "mz_attribution_v1";

export type Consent = "accepted" | "rejected" | "custom" | null;

export type Attribution = {
  /** First URL the visitor landed on this session. */
  landingPath: string;
  /** document.referrer at first load (cleared cross-session). */
  referrer: string;
  /** UTM params at landing — kept even if subsequent URLs strip them. */
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  /** Locale resolved at landing (en-za / af / etc.). */
  locale?: string;
  /** ISO timestamp of first session activity. */
  sessionStartedAt: string;
};

export type TrackEvent =
  | "page_view"
  | "cta_click"
  | "whatsapp_click"
  | "pricing_view"
  | "plan_card_click"
  | "trial_request"
  | "compare_view"
  | "faq_open"
  | "internal_link_click"
  | "consent_grant"
  | "consent_reject";

export type TrackProps = Record<string, string | number | boolean | undefined>;

/** Read consent without throwing on SSR. */
export function readConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    return (localStorage.getItem(CONSENT_STORAGE_KEY) as Consent) ?? null;
  } catch {
    return null;
  }
}

/** Persist attribution once per session — no overwrites mid-journey. */
export function captureAttribution(locale?: string): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const existing = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (existing) return JSON.parse(existing) as Attribution;
    const url = new URL(window.location.href);
    const a: Attribution = {
      landingPath: url.pathname + url.search,
      referrer: document.referrer || "",
      utm_source: url.searchParams.get("utm_source") || undefined,
      utm_medium: url.searchParams.get("utm_medium") || undefined,
      utm_campaign: url.searchParams.get("utm_campaign") || undefined,
      utm_term: url.searchParams.get("utm_term") || undefined,
      utm_content: url.searchParams.get("utm_content") || undefined,
      locale,
      sessionStartedAt: new Date().toISOString(),
    };
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(a));
    return a;
  } catch {
    return null;
  }
}

export function readAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/**
 * Build a short, human-readable attribution suffix for WhatsApp messages.
 * Format:
 *   "Source: organic | utm: google/cpc/launch | landing: /en-za/cheap-iptv-south-africa/"
 *
 * Support reps can paste this into their CRM to attribute the conversion.
 */
export function attributionSummary(): string {
  const a = readAttribution();
  if (!a) return "";
  const utm = [a.utm_source, a.utm_medium, a.utm_campaign]
    .filter(Boolean)
    .join("/");
  const refDomain = a.referrer ? new URL(a.referrer, "https://x").hostname : "";
  const source = a.utm_source
    ? a.utm_source
    : refDomain
    ? refDomain
    : "direct";
  const parts = [`Source: ${source}`];
  if (utm) parts.push(`utm: ${utm}`);
  if (a.landingPath) parts.push(`landing: ${a.landingPath}`);
  return parts.join(" | ");
}

// ─── Event sink ────────────────────────────────────────────────────────

type Sink = (name: TrackEvent | string, props: TrackProps) => void;

const queue: { name: string; props: TrackProps }[] = [];
let liveSink: Sink | null = null;

export function registerSink(sink: Sink) {
  liveSink = sink;
  while (queue.length) {
    const e = queue.shift();
    if (e) sink(e.name, e.props);
  }
}

export function track(name: TrackEvent | string, props: TrackProps = {}) {
  if (typeof window === "undefined") return;
  const a = readAttribution();
  const enriched: TrackProps = {
    ...props,
    ...(a?.utm_source ? { utm_source: a.utm_source } : {}),
    ...(a?.utm_medium ? { utm_medium: a.utm_medium } : {}),
    ...(a?.utm_campaign ? { utm_campaign: a.utm_campaign } : {}),
    ...(a?.landingPath ? { landing_path: a.landingPath } : {}),
    path: window.location.pathname,
  };
  if (liveSink) {
    liveSink(name, enriched);
  } else {
    queue.push({ name, props: enriched });
  }
}
