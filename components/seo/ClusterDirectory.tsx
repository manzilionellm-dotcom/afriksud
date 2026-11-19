import { CLUSTERS, CLUSTER_GROUPS, clusterPath } from "../../lib/seo/clusters";
import { auPath, type AuLanguage } from "../../lib/seo/australia";

export function ClusterDirectory({ locale }: { locale: string }) {
  const lang: AuLanguage = locale === "af" ? "af" : locale === "zu" ? "zu" : "en";
  return <section className="section longformSection" aria-label="Streaming guides">
    <h2>{lang === "af" ? "Suid-Afrikaanse TV: kyk- en opstellingsgidse" : lang === "zu" ? "Ithelevishini yaseNingizimu Afrika: imihlahlandlela" : "South African TV: viewing and setup guides"}</h2>
    <p><a href={auPath(lang)}>{lang === "af" ? "SuperSport in Australië — kanale, pryse en opstelling" : lang === "zu" ? "SuperSport e-Australia — amashaneli, amanani nokusetha" : "SuperSport in Australia — channels, pricing and setup"}</a></p>
    {Object.entries(CLUSTER_GROUPS).map(([group, label]) => <div key={group}>
      <h3>{label[lang]}</h3><ul className="longformList">{CLUSTERS.filter(c => c.family === group).map(c => <li key={c.slug}><a href={clusterPath(c, lang)}>{c.title[lang]}</a></li>)}</ul>
    </div>)}
  </section>;
}
