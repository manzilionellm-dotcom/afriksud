import Link from "next/link";
import { SITE_URL } from "../../lib/url";
import { JsonLd } from "../../lib/seo/jsonld";
import { waMeLink } from "../shared/utils";
import {
  AU_EDITOR_ID, AU_HREFLANG, AU_LANGUAGES, AU_ORG_ID, AU_SLUGS, AU_SOURCES,
  AU_UPDATED, AU_VERIFIED_PROFILES, auContent, auFaq, auPath,
  type AuLanguage, type AuSlug,
} from "../../lib/seo/australia";

const labels = {
  en: {
    home: "Home", guide: "SuperSport in Australia: channels, pricing and setup", cities: "Choose your city guide",
    related: "Related setup guides", author: "By Mzansi Stream Editorial", updated: "Updated 25 October 2026",
    faq: "Frequently asked questions", comparison: "Three services: published information and measurement status",
    notice: "No hands-on provider tests or local latency measurements have been performed. This is not a ranking. DStv Stream is not available in Australia under its published territory policy; Stan Sport is an Australian sports service, not a SuperSport channel package. Mzansi Stream’s Australian channel availability and rights require confirmation.",
    columns: ["Provider", "Published price / availability", "Perth delay", "Sydney delay", "Melbourne delay"],
    mzansi: "R199 / 1 month; Australian line-up and rights unverified",
    dstv: "Consult current package; unavailable in Australia", stan: "A$20 / month sport add-on + base Stan plan; check fixture",
    unmeasured: "Not measured", unavailable: "N/A — territory restriction",
    method: "How a real latency comparison should be measured",
    methodology: "Use a viewer or test device physically located in each city, an authorised account, the same available event and a synchronised reference clock. Record live video delay in seconds, start-up time and interruptions separately across at least three sessions. Log the date, ISP, device, app version and quality. A server ping in milliseconds measures network response, not live video delay. There is no fastest-provider verdict until comparable playback results exist.",
    sources: "Sources and editorial responsibility", sourceNote: "Publisher: Mzansi Stream. This is the provider’s own editorial guide, not an independent laboratory review. Published information checked on 25 October 2026; prices and rights can change. No customer testimony or performance figures have been invented.",
    contact: "Ask about Australian availability", contactText: "Hi! I am in Australia. Please confirm the current price, authorised channel availability and support for my device.",
    note: "Prices are in the stated currency. Confirm availability and the full payable amount before subscribing.",
  },
  af: {
    home: "Tuis", guide: "SuperSport in Australië: kanale, pryse en opstelling", cities: "Kies jou stadsgids",
    related: "Verwante opstellingsgidse", author: "Deur Mzansi Stream se redaksie", updated: "Bygewerk op 25 Oktober 2026",
    faq: "Gereelde vrae", comparison: "Drie dienste: gepubliseerde inligting en meetstatus",
    notice: "Geen praktiese verskaffertoetse of plaaslike vertragingsmetings is gedoen nie. Dit is nie ’n ranglys nie. DStv Stream is volgens sy gepubliseerde gebiedsbeleid nie in Australië beskikbaar nie. Stan Sport is ’n Australiese sportdiens, nie ’n SuperSport-kanaalpakket nie. Mzansi Stream se Australiese kanaalbeskikbaarheid en regte moet bevestig word.",
    columns: ["Verskaffer", "Prys / beskikbaarheid", "Perth-vertraging", "Sydney-vertraging", "Melbourne-vertraging"],
    mzansi: "R199 / 1 maand; Australiese kanale en regte onbevestig",
    dstv: "Raadpleeg huidige pakket; nie in Australië beskikbaar nie", stan: "A$20 / maand sportbyvoeging + basiese Stan-plan; bevestig wedstryd",
    unmeasured: "Nie gemeet nie", unavailable: "N.v.t. — gebiedsbeperking",
    method: "Hoe ’n werklike vertragingstoets gedoen moet word",
    methodology: "Gebruik ’n kyker of toetstoestel wat fisies in elke stad is, ’n gemagtigde rekening, dieselfde beskikbare gebeurtenis en ’n gesinchroniseerde verwysingshorlosie. Meet videovertraging in sekondes, begintyd en onderbrekings apart oor minstens drie sessies. Noteer datum, internetverskaffer, toestel, toepassingweergawe en beeldgehalte. Bediener-ping in millisekondes meet netwerkreaksie, nie videovertraging nie. Geen vinnigste verskaffer word aangewys sonder vergelykbare afspeelresultate nie.",
    sources: "Bronne en redaksionele verantwoordelikheid", sourceNote: "Uitgewer: Mzansi Stream. Dit is die verskaffer se eie redaksionele gids, nie ’n onafhanklike laboratoriumtoets nie. Gepubliseerde inligting is op 25 Oktober 2026 nagegaan; pryse en regte kan verander. Geen klantgetuienisse of prestasiesyfers is uitgedink nie.",
    contact: "Vra oor Australiese beskikbaarheid", contactText: "Hallo! Ek is in Australië. Bevestig asseblief die huidige prys, gemagtigde kanaalbeskikbaarheid en ondersteuning vir my toestel.",
    note: "Pryse is in die aangeduide geldeenheid. Bevestig beskikbaarheid en die volle bedrag voor intekening.",
  },
  zu: {
    home: "Ikhaya", guide: "SuperSport e-Australia: amashaneli, amanani nokusetha", cities: "Khetha umhlahlandlela wedolobha lakho",
    related: "Eminye imihlahlandlela yokusetha", author: "Yithimba labahleli le-Mzansi Stream", updated: "Kubuyekezwe ngo-25 Okthoba 2026",
    faq: "Imibuzo evame ukubuzwa", comparison: "Izinkonzo ezintathu: imininingwane nesimo sokulinganisa",
    notice: "Asenzanga ukuhlola abahlinzeki ngezandla noma ukukala ukubambezeleka kulezi zindawo. Lolu akulona uhlu lokuhlela abahamba phambili. Ngokwemibandela yayo, i-DStv Stream ayitholakali e-Australia. I-Stan Sport iyinkonzo yezemidlalo yase-Australia, hhayi iphakheji yesiteshi se-SuperSport. Ukutholakala kwamashaneli namalungelo e-Mzansi Stream e-Australia kudinga ukuqinisekiswa.",
    columns: ["Umhlinzeki", "Inani / ukutholakala", "Ukubambezeleka ePerth", "Ukubambezeleka eSydney", "Ukubambezeleka eMelbourne"],
    mzansi: "R199 / inyanga eyodwa; amashaneli namalungelo e-Australia akuqinisekisiwe",
    dstv: "Buza iphakheji yamanje; ayitholakali e-Australia", stan: "A$20 ngenyanga + iphakheji eyisisekelo ye-Stan; hlola umdlalo",
    unmeasured: "Akukalinganiswa", unavailable: "Akusebenzi — umkhawulo wendawo",
    method: "Indlela yokukala ukubambezeleka kwangempela",
    methodology: "Sebenzisa umuntu noma idivayisi esedolobheni ngalinye, i-akhawunti egunyaziwe, umcimbi ofanayo kanye newashi elivumelanisiwe. Bhala ukubambezeleka kwevidiyo ngemizuzwana, isikhathi sokuqala nokunqamuka ngokwehlukana, ngezikhathi okungenani ezintathu. Bhala usuku, umhlinzeki we-inthanethi, idivayisi, inguqulo yohlelo nekhwalithi. I-ping yeseva ikala impendulo yenethiwekhi, hhayi ukubambezeleka kwevidiyo. Asikhethi oshesha kakhulu ngaphandle kwemiphumela yokudlala eqhathanisekayo.",
    sources: "Imithombo nomsebenzi wabahleli", sourceNote: "Umshicileli: Mzansi Stream. Lo mhlahlandlela ubhalwe umhlinzeki, awusikho ukuhlola kwelabhorethri ezimele. Imininingwane eshicilelwe ihlolwe ngo-25 Okthoba 2026; amanani namalungelo kungashintsha. Asiqambanga ubufakazi bamakhasimende noma izinombolo zokusebenza.",
    contact: "Buza ngokutholakala e-Australia", contactText: "Sawubona! Ngise-Australia. Ngicela niqinisekise amanani amanje, amashaneli agunyaziwe nokusekelwa kwedivayisi yami.",
    note: "Amanani asemalini ekhonjisiwe. Qinisekisa ukutholakala nenani eliphelele ngaphambi kokubhalisa.",
  },
} as const;

export function AustraliaGuide({ lang, slug }: { lang: AuLanguage; slug: AuSlug }) {
  const t = labels[lang];
  const page = auContent(lang, slug);
  const url = `${SITE_URL}${auPath(lang, slug)}`;
  const home = `/${lang === "en" ? "en-za" : lang}`;
  const organization = {
    "@type": "Organization", "@id": AU_ORG_ID, name: "Mzansi Stream", url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    ...(AU_VERIFIED_PROFILES.length ? { sameAs: AU_VERIFIED_PROFILES } : {}),
  };
  const graph = {
    "@context": "https://schema.org", "@graph": [organization,
      { "@type": "Organization", "@id": AU_EDITOR_ID, name: "Mzansi Stream Editorial", parentOrganization: { "@id": AU_ORG_ID } },
      { "@type": "Article", "@id": `${url}#article`, headline: page.title, description: page.lead,
        inLanguage: AU_HREFLANG[lang], datePublished: AU_UPDATED, dateModified: AU_UPDATED,
        mainEntityOfPage: url, author: { "@id": AU_EDITOR_ID }, publisher: { "@id": AU_ORG_ID },
        image: `${SITE_URL}/og-image.jpg`, about: { "@type": "Thing", name: "South African television in Australia" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: t.home, item: `${SITE_URL}${home}` },
        { "@type": "ListItem", position: 2, name: slug === "supersport" ? page.title : t.guide, item: `${SITE_URL}${auPath(lang)}` },
        ...(slug === "supersport" ? [] : [{ "@type": "ListItem", position: 3, name: page.title, item: url }]),
      ] },
    ],
  };
  return (
    <div className="au-guide" lang={AU_HREFLANG[lang]}>
      <JsonLd data={graph} />
      <a className="au-skip" href="#au-main">{t.guide}</a>
      <header className="au-header">
        <a href={home} className="au-brand">MZANSI STREAM</a>
        <nav aria-label="Language">
          {AU_LANGUAGES.map(l => <a key={l} href={auPath(l, slug)} hrefLang={AU_HREFLANG[l]} lang={AU_HREFLANG[l]} aria-current={l === lang ? "page" : undefined}>{l === "en" ? "English" : l === "af" ? "Afrikaans" : "isiZulu"}</a>)}
        </nav>
      </header>
      <main id="au-main">
        <article>
          <nav className="au-breadcrumb" aria-label="Breadcrumb"><a href={home}>{t.home}</a> / <a href={auPath(lang)}>{slug === "supersport" ? "Australia" : t.guide}</a>{slug !== "supersport" ? ` / ${slug[0].toUpperCase()}${slug.slice(1)}` : ""}</nav>
          <header className="au-hero">
            <p className="au-eyebrow">SOUTH AFRICA · AUSTRALIA</p>
            <h1>{page.title}</h1>
            <p className="au-lead">{page.lead}</p>
            {slug !== "supersport" && <p className="au-pillar-link"><a href={auPath(lang)}>{t.guide} →</a></p>}
            <p className="au-byline"><a href="#editorial">{t.author}</a> · <time dateTime={AU_UPDATED}>{t.updated}</time></p>
          </header>
          <div className="au-body">
            {page.sections.map(s => <section key={s.title}><h2>{s.title}</h2>{s.paragraphs.map(p => <p key={p}>{p}</p>)}</section>)}
            {slug === "supersport" && <>
              <section id="comparison"><h2>{t.comparison}</h2><p>{t.notice}</p>
                <div className="au-table-scroll" role="region" aria-label={t.comparison} tabIndex={0}>
                  <table><caption>{t.comparison}</caption><thead><tr>{t.columns.map(c => <th scope="col" key={c}>{c}</th>)}</tr></thead><tbody>
                    <tr><th scope="row"><a href={home}>Mzansi Stream</a></th><td>{t.mzansi}</td>{[0,1,2].map(i => <td key={i}>{t.unmeasured}</td>)}</tr>
                    <tr><th scope="row"><a href={AU_SOURCES[0].url}>DStv Stream</a></th><td>{t.dstv}</td>{[0,1,2].map(i => <td key={i}>{t.unavailable}</td>)}</tr>
                    <tr><th scope="row"><a href={AU_SOURCES[1].url}>Stan Sport</a></th><td>{t.stan}</td>{[0,1,2].map(i => <td key={i}>{t.unmeasured}</td>)}</tr>
                  </tbody></table>
                </div>
                <h3>{t.method}</h3><p>{t.methodology}</p>
              </section>
              <section id="faq"><h2>{t.faq}</h2>{auFaq(lang).map(f => <div className="au-faq" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>)}</section>
            </>}
            <section><h2>{slug === "supersport" ? t.cities : t.related}</h2><ul className="au-links">{AU_SLUGS.filter(s => s !== "supersport" && s !== slug).map(s => <li key={s}><a href={auPath(lang, s)}>{auContent(lang, s).title}</a></li>)}</ul></section>
            <aside className="au-contact"><a href={waMeLink(t.contactText, `Australia-${lang}-${slug}`)}>{t.contact} →</a><p>{t.note}</p></aside>
          </div>
        </article>
        <footer className="au-editorial" id="editorial"><h2>{t.sources}</h2><p>{t.sourceNote}</p>
          <ul>{AU_SOURCES.map(s => <li key={s.url}><a href={s.url}>{s.name}</a></li>)}</ul>
          {AU_VERIFIED_PROFILES.length > 0 && <ul>{AU_VERIFIED_PROFILES.map(profile => <li key={profile}><a href={profile} rel="me">{new URL(profile).hostname}</a></li>)}</ul>}
          <p><a href={home}>Mzansi Stream · {t.home}</a> · <Link href={`${home}/sa-abroad`} prefetch={false}>SA worldwide</Link> · <Link href={`${home}/devices`} prefetch={false}>Device guides</Link></p>
        </footer>
      </main>
    </div>
  );
}
