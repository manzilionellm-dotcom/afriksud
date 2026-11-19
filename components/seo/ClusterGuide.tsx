import Link from "next/link";
import { JsonLd } from "../../lib/seo/jsonld";
import { SITE_URL } from "../../lib/url";
import { AU_EDITOR_ID, AU_ORG_ID, AU_LANGUAGES, AU_VERIFIED_PROFILES, type AuLanguage } from "../../lib/seo/australia";
import { CLUSTER_DATE, clusterPath, clusterBody, type Cluster, type Satellite } from "../../lib/seo/clusters";
import { waMeLink } from "../shared/utils";

const text = {
  en: {home:"Home",guides:"SA worldwide guides",devices:"Existing device guides",by:"By Mzansi Stream Editorial",updated:"Updated",steps:"Checks for this question",related:"Related questions",sources:"Sources and scope",note:"Published by Mzansi Stream. This is the provider’s editorial guide, not an independent test report. Programme availability, prices and device support must be checked with the relevant provider. Historical population figures are not customer counts.",contact:"Ask about your device and viewing country",price:"Mzansi Stream’s published site prices are R199 for one month, R449 for three months, R699 for six months and R1,199 for twelve months. These are rand totals; confirm the current offer, currency conversion and availability in your country. No measured provider-latency ranking is claimed.",proof:"Population reference: ",toc:"Questions covered by this guide"},
  af: {home:"Tuis",guides:"SA-wêreldwydgidse",devices:"Bestaande toestelgidse",by:"Deur Mzansi Stream se redaksie",updated:"Bygewerk",steps:"Kontroles vir hierdie vraag",related:"Verwante vrae",sources:"Bronne en omvang",note:"Uitgegee deur Mzansi Stream. Dit is die verskaffer se redaksionele gids, nie ’n onafhanklike toetsverslag nie. Bevestig programme, pryse en toestelondersteuning by die betrokke diens. Historiese bevolkingsyfers is nie klantetellings nie.",contact:"Vra oor jou toestel en kykland",price:"Mzansi Stream se gepubliseerde pryse is R199 vir een maand, R449 vir drie maande, R699 vir ses maande en R1 199 vir twaalf maande. Dit is randtotale; bevestig die huidige aanbod, omskakeling en beskikbaarheid in jou land. Geen gemete vertragingsranglys word beweer nie.",proof:"Bevolkingsbron: ",toc:"Vrae in hierdie gids"},
  zu: {home:"Ikhaya",guides:"Imihlahlandlela yamazwe",devices:"Imihlahlandlela yamadivayisi",by:"Yithimba labahleli le-Mzansi Stream",updated:"Kubuyekezwe",steps:"Ukuhlola kwalo mbuzo",related:"Imibuzo ehlobene",sources:"Imithombo nemingcele",note:"Ishicilelwe yi-Mzansi Stream. Lo mhlahlandlela ungowomhlinzeki, awuwona umbiko wokuhlola ozimele. Qinisekisa izinhlelo, amanani nokusekelwa kwedivayisi nenkonzo efanele. Izinombolo zabantu zomlando azizona izinombolo zamakhasimende.",contact:"Buza ngedivayisi nezwe obukela kulo",price:"Amanani ashicilelwe e-Mzansi Stream ngu-R199 ngenyanga eyodwa, R449 ngezintathu, R699 ngeziyisithupha no-R1,199 ngeziyishumi nambili. Lawa ngamarandi; qinisekisa umnikelo, ukushintshaniswa kwemali nokutholakala ezweni lakho. Asisho ukuthi silinganise ukubambezeleka kwabahlinzeki.",proof:"Umthombo wenani labantu: ",toc:"Imibuzo ekulo mhlahlandlela"},
} as const;
export function ClusterGuide({cluster,lang,satellite}:{cluster:Cluster;lang:AuLanguage;satellite?:Satellite}) {
  const t=text[lang]; const title=satellite?.title[lang]??cluster.title[lang];
  const url=`${SITE_URL}${clusterPath(cluster,lang,satellite?.slug)}`;
  const body=clusterBody(cluster,lang,satellite);
  const home=`/${lang==='en'?'en-za':lang}`;
  const graph={"@context":"https://schema.org","@graph":[
    {"@type":"Organization","@id":AU_ORG_ID,name:"Mzansi Stream",url:SITE_URL,logo:`${SITE_URL}/icon-512.png`,...(AU_VERIFIED_PROFILES.length?{sameAs:AU_VERIFIED_PROFILES}:{})},
    {"@type":"Organization","@id":AU_EDITOR_ID,name:"Mzansi Stream Editorial",parentOrganization:{"@id":AU_ORG_ID}},
    {"@type":"Article","@id":`${url}#article`,headline:title,inLanguage:`${lang}-${cluster.region}`,datePublished:CLUSTER_DATE,dateModified:CLUSTER_DATE,mainEntityOfPage:url,author:{"@id":AU_EDITOR_ID},publisher:{"@id":AU_ORG_ID},image:`${SITE_URL}/og-image.jpg`},
    {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:t.home,item:`${SITE_URL}${home}`},{"@type":"ListItem",position:2,name:cluster.title[lang],item:`${SITE_URL}${clusterPath(cluster,lang)}`},...(satellite?[{"@type":"ListItem",position:3,name:title,item:url}]:[])]},
  ]};
  return <div className="au-guide" lang={`${lang}-${cluster.region}`}><JsonLd data={graph}/>
    <a className="au-skip" href="#cluster-main">{title}</a>
    <header className="au-header"><a href={home} className="au-brand">MZANSI STREAM</a><nav aria-label="Language">{AU_LANGUAGES.map(l=><a key={l} href={clusterPath(cluster,l,satellite?.slug)} hrefLang={`${l}-${cluster.region}`} lang={`${l}-${cluster.region}`} aria-current={l===lang?'page':undefined}>{l==='en'?'English':l==='af'?'Afrikaans':'isiZulu'}</a>)}</nav></header>
    <main id="cluster-main"><article>
      <header className="au-hero"><p className="au-eyebrow">MZANSI STREAM · {cluster.name[lang]}</p><h1>{title}</h1>
        <p className="au-lead">{satellite?body[0]:cluster.lead[lang]}</p>
        {satellite&&<p className="au-pillar-link"><a href={clusterPath(cluster,lang)}>{cluster.title[lang]} →</a></p>}
        {!satellite&&cluster.stat&&<p className="au-byline">{t.proof}<a href={cluster.sources[0].url}>{cluster.stat.definition} ({cluster.stat.year})</a></p>}
        <p className="au-byline"><a href="#editorial">{t.by}</a> · {t.updated} <time dateTime={CLUSTER_DATE}>{CLUSTER_DATE}</time></p>
      </header>
      <div className="au-body">
        <section data-cluster-body><h2>{t.steps}</h2>{(satellite?body.slice(1):body).map((p,i)=><p key={i}>{p}</p>)}</section>
        {!satellite&&<section><h2>{lang==='en'?'Pricing and availability':lang==='af'?'Pryse en beskikbaarheid':'Amanani nokutholakala'}</h2><p>{t.price}</p></section>}
        <section><h2>{satellite?t.related:t.toc}</h2><ul className="au-links">{cluster.satellites.filter(s=>s.slug!==satellite?.slug).map(s=><li key={s.slug}><a href={clusterPath(cluster,lang,s.slug)}>{s.title[lang]}</a></li>)}</ul></section>
        <aside className="au-contact"><a href={waMeLink(`${t.contact}: ${cluster.name[lang]}.`,`Cluster-${cluster.slug}-${lang}`)}>{t.contact} →</a></aside>
      </div>
    </article>
    <footer id="editorial" className="au-editorial"><h2>{t.sources}</h2><p>{t.note}</p><ul>{cluster.sources.map(s=><li key={s.url}><a href={s.url}>{s.name}</a></li>)}</ul>
      <nav><ul><li><a href={home}>{t.home}</a></li><li><Link href={`${home}/sa-abroad`} prefetch={false}>{t.guides}</Link></li><li><Link href={`${home}/devices`} prefetch={false}>{t.devices}</Link></li></ul></nav>
    </footer></main>
  </div>;
}
