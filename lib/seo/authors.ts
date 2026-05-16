// lib/seo/authors.ts
// Named contributors / editorial team. Until the owner connects real
// author profiles (LinkedIn, X, About-page bio), each author here is a
// placeholder skeleton — the schema slot exists, the page renders an
// `AuthorBio` component, and the Article JSON-LD emits a `Person`
// author so Google's E-E-A-T signal isn't generic `Organization`.
//
// Replace the `TO_FILL_BY_OWNER` fields when the real bios are ready;
// the structure is intentionally Person-shaped so Google's Knowledge
// Graph can link the author to other works once they exist.

export type Author = {
  /** URL-safe slug, used in `/author/[slug]/` routes (future). */
  slug: string;
  /** Display name. */
  name: string;
  /** Role / title shown under the byline. */
  role: string;
  /** 1-2 sentence bio for the AuthorBio block + JSON-LD description. */
  bio: string;
  /** Optional canonical profile URLs — fed to schema `sameAs`. */
  profiles?: string[];
  /** Optional 200x200+ image URL — fed to schema `image`. */
  image?: string;
};

export const AUTHORS: Record<string, Author> = {
  "mzansi-editorial": {
    slug: "mzansi-editorial",
    name: "Mzansi Stream Editorial",
    role: "Editorial team",
    bio: "The Mzansi Stream editorial team curates IPTV, sport and SA streaming guides. Posts attributed to the team reflect collective input from the support, technical and content desks until individual contributor bios are published.",
    // `sameAs` deliberately left empty until real profiles exist —
    // empty `sameAs` is fine for JSON-LD (the schema simply omits it).
  },
  // ─── TO_FILL_BY_OWNER ────────────────────────────────────────────
  // Add real named contributors here as bios are written. Suggested
  // first additions:
  //   - The founder (LinkedIn URL, photo, 2-sentence bio).
  //   - The technical lead (responsible for CDN / streaming).
  //   - A guest contributor for sport coverage (PSL / SuperSport).
  // ─────────────────────────────────────────────────────────────────
};

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS[slug];
}

export const DEFAULT_AUTHOR_SLUG = "mzansi-editorial";
