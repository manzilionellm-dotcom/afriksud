import { waMeLink } from "../shared/utils";

export function DiasporaSoftSellCta({
  variant,
  slug,
  place = "the UK",
  waHrefOverride,
}: {
  variant: "mid" | "end";
  slug: string;
  place?: string;
  waHrefOverride?: string;
}) {
  const ref = `Diaspora-${slug}-${variant === "mid" ? "Mid" : "End"}`;
  const message = `I'd like a free 24-hour Mzansi Stream trial. I'm in ${place} and my device is [model].`;
  return (
    <aside className="longformSection" aria-label="Mzansi Stream trial">
      {variant === "end" && <h2>Try Mzansi Stream in {place}</h2>}
      <p>Tell us your city and device model. Use the free 24-hour trial on your own connection before choosing a plan. No card is required.</p>
      <a href={waHrefOverride ?? waMeLink(message, ref)} className="btnPrimary"
        target="_blank" rel="noreferrer" data-track-ref={ref} data-track-placement={ref}>
        Request the Mzansi Stream trial on WhatsApp
      </a>
    </aside>
  );
}
