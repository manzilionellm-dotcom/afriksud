import Link from "next/link";
import type { Locale } from "../../lib/locales";
import { isOceaniaMarket, OCEANIA_MARKETS } from "../../lib/oceania-offer";
import { breadcrumbSchema } from "../../lib/seo/breadcrumb";
import { guidePath, type DstvGuide } from "../../lib/seo/dstv-guides";
import { JsonLd } from "../../lib/seo/jsonld";
import { SITE_URL } from "../../lib/url";
import { LongformShell } from "../client/LongformShell";
import { waMeLink } from "../shared/utils";

export function DstvGuideArticle({ guide, locale }: { guide: DstvGuide; locale: Locale }) {
  const fr = locale === "fr";
  const oceania = isOceaniaMarket(locale) ? OCEANIA_MARKETS[locale] : null;
  const ref = `Guide-${guide.slug}`;
  const message = fr
    ? "Je souhaite essayer Mzansi Stream pendant 24 h. Mon pays : __. Mon appareil : __."
    : oceania
      ? `I would like the free 24-hour weekday trial. Country: ${oceania.country}. My device: __. Programme: __. Please confirm availability.`
      : "I'd like to try Mzansi Stream for 24 hours. My country: __. My device: __.";
  const href = waMeLink(message, ref);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    mainEntityOfPage: SITE_URL + guidePath(guide),
    datePublished: guide.published,
    dateModified: guide.published,
    inLanguage: guide.language,
    author: { "@type": "Organization", name: "Mzansi Stream", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Mzansi Stream", url: SITE_URL },
    citation: guide.sources.map((source) => source.url),
  };
  return (
    <LongformShell locale={locale} waOverride={{ href, message }}>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema(locale, [
        { name: "Guides", path: "/blog" },
        { name: guide.h1, path: `/blog/${guide.slug}` },
      ])} />
      <article className="section" lang={guide.language}>
        <header className="longformHeader">
          <p className="longformEyebrow"><Link href={`/${locale}/blog`}>Guides</Link>{" · Mzansi Stream · "}<time dateTime={guide.published}>{new Intl.DateTimeFormat(fr ? "fr-FR" : "en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(guide.published))}</time></p>
          <h1>{guide.h1}</h1>
          <p className="longformLead">{guide.intro}</p>
        </header>
        {guide.sections.map((section) => (
          <section className="longformSection" key={section.h2}>
            <h2>{section.h2}</h2>
            <h3>{section.h3}</h3>
            {section.table && (
              <div className="compareWrap">
                <table className="compareTable" aria-label={section.h3}>
                  <thead><tr>{section.table.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead>
                  <tbody>{section.table.rows.map(([name, ...cells]) => <tr key={name}><th scope="row">{name}</th>{cells.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
            )}
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <section className="longformSection">
          <h2>{fr ? "Sources et services officiels" : "Sources and official services"}</h2>
          <ul className="longformList">{guide.sources.map((source) => <li key={source.url}><a href={source.url}>{source.label}</a></li>)}</ul>
        </section>
        <section className="longformSection">
          <h2>{fr ? "Essayer Mzansi Stream sur votre appareil" : "Try Mzansi Stream on your own device"}</h2>
          {oceania ? <p>Request a free 24-hour trial Monday to Friday. Send your device and the programme you want to check. No card is required. <Link href={`/${locale}#plans`}>See prepaid passes and prices in US dollars for {oceania.country}</Link>.</p> : <p>{fr ? "L’essai dure 24 heures, sans carte bancaire. Indiquez votre pays et votre appareil pour vérifier le catalogue disponible avant de payer. Au tarif sud-africain, un mois coûte USD 15 et douze mois coûtent USD 65 payés en une fois." : "The 24-hour trial is free and requires no card. Tell us your country and device so you can check the available catalogue before paying. Our South African prices are USD 15 for one month or USD 65 upfront for twelve."}</p>}
          <a className="btnPrimary" href={href} data-track-ref={ref} data-track-placement="Guide-Trial" target="_blank" rel="noreferrer">{fr ? "Demander mon essai de 24 h sur WhatsApp" : "Request my 24-hour trial on WhatsApp"}</a>
        </section>
        <nav className="longformSection" aria-label={fr ? "Guides associés" : "Related guides"}>
          <h2>{fr ? "Guides associés" : "Related guides"}</h2>
          <ul className="longformList">{guide.related.map((link) => <li key={link.path}><Link href={link.path}>{link.label}</Link></li>)}</ul>
        </nav>
      </article>
    </LongformShell>
  );
}
