// Server-rendered floating WhatsApp button. Mounted once from
// app/[locale]/layout.tsx so every locale page ships a real <a> in the
// first HTML response. The number is fixed — do not read it from env.
// Copy lives in components/shared/wa-neutral.ts (shared with LiveStatus).

import type { Locale } from "../../lib/locales";
import { WA_ARIA_LABEL, fabLang, waNeutralHref } from "../shared/wa-neutral";

export function WhatsAppFabLink({ locale }: { locale: Locale }) {
  const lang = fabLang(locale);
  const href = waNeutralHref(locale);

  return (
    <a
      className="waFab"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={WA_ARIA_LABEL[lang]}
      data-track-ref="WhatsApp-Fab"
      data-track-placement="Floating-Action-Button"
    >
      <svg
        viewBox="0 0 32 32"
        width="28"
        height="28"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M16 .395a15.605 15.605 0 0 0-13.4 23.6L.395 31.605l7.793-2.06A15.605 15.605 0 1 0 16 .395Zm0 28.6a13 13 0 0 1-6.625-1.8l-.475-.275-4.625 1.225 1.25-4.525-.3-.475A13 13 0 1 1 16 28.995Zm7.075-9.55c-.4-.2-2.35-1.15-2.7-1.275-.35-.125-.625-.2-.9.2s-1.025 1.275-1.25 1.525c-.225.25-.475.275-.875.1a10.575 10.575 0 0 1-3.1-1.925 11.6 11.6 0 0 1-2.15-2.65c-.225-.4 0-.6.175-.825.175-.225.4-.425.6-.65.2-.225.275-.4.4-.65.125-.25.05-.475-.025-.65-.075-.175-.875-2.1-1.2-2.85-.325-.75-.65-.625-.875-.625a1.6 1.6 0 0 0-1.225.575 3.625 3.625 0 0 0-1.125 2.7 6.275 6.275 0 0 0 1.325 3.4c.175.225 2.4 3.65 5.825 5.125a19.575 19.575 0 0 0 1.95.725 4.575 4.575 0 0 0 2.05.125 3.35 3.35 0 0 0 2.2-1.525 2.7 2.7 0 0 0 .2-1.525c-.1-.175-.4-.275-.825-.475Z" />
      </svg>
    </a>
  );
}
