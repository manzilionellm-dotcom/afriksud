"use client";
// lib/analytics/AnalyticsProvider.tsx
// Mounted once at the document root. Three responsibilities:
//   1. Capture attribution (landing path + UTMs + referrer) on first load.
//   2. Listen for consent grant ('mz:consent' event from PopiaConsentBanner)
//      and lazy-load GA4 + PostHog scripts only if env vars are set.
//   3. Install a document-level click delegate on WhatsApp links:
//        - augments the message with an attribution suffix,
//        - fires whatsapp_click before navigation.
//      This means zero changes to the dozens of WhatsApp link callers.

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  captureAttribution,
  readConsent,
  registerSink,
  track,
  attributionSummary,
  CONSENT_STORAGE_KEY,
  type TrackProps,
  type Consent,
} from "./track";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    posthog?: {
      init: (key: string, opts: Record<string, unknown>) => void;
      capture: (event: string, props?: TrackProps) => void;
    };
    mzTrack?: (name: string, props?: TrackProps) => void;
  }
}

function attachWhatsAppDelegate() {
  if (typeof document === "undefined") return;
  const handler = (e: MouseEvent) => {
    const target = e.target as Element | null;
    if (!target) return;
    const anchor = target.closest(
      'a[href*="wa.me/"], a[href*="api.whatsapp.com/send"]'
    ) as HTMLAnchorElement | null;
    if (!anchor) return;

    const ref = anchor.getAttribute("data-track-ref") || "";
    const placement = anchor.getAttribute("data-track-placement") || "";

    // Augment the WhatsApp text with attribution so support sees the source.
    try {
      const url = new URL(anchor.href);
      const textParam = url.searchParams.get("text");
      if (textParam) {
        const summary = attributionSummary();
        if (summary && !textParam.includes("Source:")) {
          url.searchParams.set("text", `${textParam} | ${summary}`);
          anchor.href = url.toString();
        }
      }
    } catch {
      // Don't block the click on a URL parse failure.
    }

    track("whatsapp_click", {
      ref: ref || undefined,
      placement: placement || undefined,
      // The href the user is about to follow (decoded for readability).
      href: anchor.href.slice(0, 200),
    });
  };
  document.addEventListener("click", handler, { capture: true });
  return () => document.removeEventListener("click", handler, { capture: true });
}

function loadSinks() {
  // Build a sink that fans out to GA4 + PostHog only when each is configured.
  registerSink((name, props) => {
    if (typeof window === "undefined") return;
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag("event", name, props as Record<string, unknown>);
    }
    if (POSTHOG_KEY && window.posthog) {
      window.posthog.capture(name, props);
    }
    // Always mirror to dataLayer for GTM-driven setups (no-op without GTM).
    if (window.dataLayer) {
      window.dataLayer.push({ event: name, ...props });
    }
  });
}

export function AnalyticsProvider() {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    // 1. Snapshot attribution as soon as the client mounts.
    captureAttribution();

    // 2. Expose `window.mzTrack` for ad-hoc inline tracking.
    window.mzTrack = (name: string, props?: TrackProps) =>
      track(name, props || {});

    // 3. WhatsApp click delegate runs whether or not analytics are loaded —
    //    consent only gates the network send (registerSink fan-out).
    const detach = attachWhatsAppDelegate();

    // 4. Fire page_view immediately. The sink queues until consent grants.
    track("page_view", {
      title: document.title,
      referrer: document.referrer || undefined,
    });

    // 5. Wake on consent grant or read prior consent on remount.
    const onConsent = () => {
      const c = readConsent();
      setConsent(c);
      if (c === "accepted" || c === "custom") {
        loadSinks();
        track("consent_grant", { value: c });
      } else if (c === "rejected") {
        track("consent_reject", {});
      }
    };
    onConsent();
    window.addEventListener("mz:consent", onConsent);

    // Cross-tab sync: if the user grants consent in another tab, this one
    // should start firing too.
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) onConsent();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      detach?.();
      window.removeEventListener("mz:consent", onConsent);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const consented = consent === "accepted" || consent === "custom";

  // Scripts only render after consent — no third-party network calls
  // until the user has affirmatively allowed analytics. Initial server
  // render emits no scripts (state defaults to null), so there is no
  // hydration mismatch on first paint.
  return (
    <>
      {consented && GA_MEASUREMENT_ID ? (
        <>
          <Script
            id="ga4-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                anonymize_ip: true,
                send_page_view: true,
              });
            `}
          </Script>
        </>
      ) : null}
      {consented && POSTHOG_KEY ? (
        <Script id="posthog-init" strategy="afterInteractive">
          {`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('${POSTHOG_KEY}', {
              api_host: '${POSTHOG_HOST}',
              person_profiles: 'identified_only',
              capture_pageview: true,
              autocapture: false,
            });
          `}
        </Script>
      ) : null}
    </>
  );
}
