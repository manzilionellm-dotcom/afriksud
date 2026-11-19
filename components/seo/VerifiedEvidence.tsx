import evidence from "../../lib/seo/evidence.json";
import { JsonLd } from "../../lib/seo/jsonld";
import { SITE_URL } from "../../lib/url";
type Review = {id: string; name: string; city: string; country: "ZA" | "GB" | "AU" | "US"; text: string; date: string; source: string; consent: boolean};
type Broadcast = {id: string; name: string; startDate: string; endDate: string; competitors: string[]; broadcaster: string; url: string; source: string; confirmed: boolean};
export function VerifiedEvidence() {
  const reviews = (evidence.reviews as Review[]).filter(r => r.consent && r.source && r.name && r.city);
  const broadcasts = (evidence.broadcasts as Broadcast[]).filter(b => b.confirmed && b.source && Date.parse(b.endDate) > Date.now());
  if (!reviews.length && !broadcasts.length) return null;
  return <section className="section" aria-label="Verified reviews and broadcast information">
    {reviews.length ? <><h2>Customer reviews</h2>{reviews.map(r => <article key={r.id}>
      <h3>{r.name} — {r.city}, {r.country}</h3><p>{r.text}</p><a href={r.source}>Original review</a>
      <JsonLd data={{"@context":"https://schema.org", "@type":"Review", "@id":`${SITE_URL}/en-za#review-${r.id}`,
        author:{"@type":"Person",name:r.name,homeLocation:{"@type":"Place",name:r.city,address:{"@type":"PostalAddress",addressLocality:r.city,addressCountry:r.country}}},
        reviewBody:r.text,datePublished:r.date,url:r.source,itemReviewed:{"@id":`${SITE_URL}/#organization`}}} />
    </article>)}</> : null}
    {broadcasts.length ? <><h2>Confirmed broadcast schedule</h2>{broadcasts.map(b => <article key={b.id}>
      <h3>{b.name}</h3><p>{b.competitors.join(" vs ")}. Live on {b.broadcaster}, <time dateTime={b.startDate}>{b.startDate}</time> to <time dateTime={b.endDate}>{b.endDate}</time>.</p>
      <a href={b.url}>Broadcaster viewing details</a> · <a href={b.source}>Official fixture source</a>
      <JsonLd data={{"@context":"https://schema.org","@type":"BroadcastEvent",name:b.name,startDate:b.startDate,endDate:b.endDate,isLiveBroadcast:true,
        publishedOn:{"@type":"BroadcastService",name:b.broadcaster,url:b.url},url:b.url,
        broadcastOfEvent:{"@type":"SportsEvent",name:b.name,startDate:b.startDate,endDate:b.endDate,url:b.source,competitor:b.competitors.map(name=>({"@type":"SportsTeam",name}))}}} />
    </article>)}</> : null}
  </section>;
}
