import { clustersPublished } from "./publication";
import type { Metadata } from "next";
import catalogueData from "./catalogue.json";
import tasks from "./tasks.json";
import { SITE_URL } from "../../url";
import { AU_LANGUAGES, type AuLanguage } from "../australia";

type Localized = Record<AuLanguage, string>;
export type Task = keyof typeof tasks;
export type Satellite = { slug: string; title: Localized; task: Task; detail: Localized };
export type Cluster = {
  slug: string; family: string; region: string; name: Localized; title: Localized;
  lead: Localized; detail: Localized; sources: {name: string; url: string}[];
  stat?: {value: string; year: string; definition: string}; satellites: Satellite[];
};
export const CLUSTERS = catalogueData as Cluster[];
export const CLUSTER_DATE = "2026-10-25";
export const CLUSTER_GROUPS = {
  countries: { en: "Countries", af: "Lande", zu: "Amazwe" },
  channels: { en: "Channels", af: "Kanale", zu: "Amashaneli" },
  sports: { en: "Sport", af: "Sport", zu: "Ezemidlalo" },
  devices: { en: "Devices", af: "Toestelle", zu: "Amadivayisi" },
  problems: { en: "Troubleshooting", af: "Probleemoplossing", zu: "Ukuxazulula izinkinga" },
} as const;
export function clusterPath(cluster: Cluster, lang: AuLanguage, satellite?: string) {
  const page = satellite ?? (cluster.family === "countries" ? "supersport" : "");
  return `/${cluster.slug}${lang === "en" ? "" : `/${lang}`}${page ? `/${page}` : ""}`;
}
export function clusterAlternates(cluster: Cluster, satellite?: string) {
  return Object.fromEntries([
    ...AU_LANGUAGES.map(lang => [`${lang}-${cluster.region}`, `${SITE_URL}${clusterPath(cluster, lang, satellite)}`]),
    ["x-default", `${SITE_URL}${clusterPath(cluster, "en", satellite)}`],
  ]);
}
export function clusterParams(cluster: Cluster) {
  return AU_LANGUAGES.flatMap(lang => [undefined, ...cluster.satellites.map(s => s.slug)].map(satellite => ({
    parts: clusterPath(cluster, lang, satellite).split("/").filter(Boolean).slice(1),
  })));
}
export function resolveClusterRoute(cluster: Cluster, parts: string[] = []) {
  const path = [...parts];
  const lang: AuLanguage = path[0] === "af" || path[0] === "zu" ? path.shift() as AuLanguage : "en";
  if (path.length === 0 && cluster.family !== "countries") return {lang, satellite: undefined};
  if (path.length === 1 && path[0] === "supersport" && cluster.family === "countries") return {lang, satellite: undefined};
  if (path.length !== 1) return null;
  const satellite = cluster.satellites.find(s => s.slug === path[0]);
  return satellite ? {lang, satellite} : null;
}
export const CHECKLIST: Localized = {
  en: "Before your next session, keep a short checklist: programme and date, viewing country, active package, device model, app version and the last working connection. This gives support enough context to investigate without exposing account credentials, and makes a later comparison repeatable.",
  af: "Hou voor die volgende sessie ’n kort kontrolelys: program en datum, kykland, aktiewe pakket, toestelmodel, toepassingweergawe en die laaste werkende verbinding. Dit gee ondersteuning genoeg konteks sonder rekeningbesonderhede en maak ’n latere vergelyking herhaalbaar. Bewaar jou notas saam met die oorspronklike aanbod sodat jy kan sien wat werklik verander het. Noteer ook die tyd van elke toets en die foutboodskap op die skerm.",
  zu: "Ngaphambi kokubuka futhi, gcina uhlu olufushane: uhlelo nosuku, izwe, iphakheji esebenzayo, imodeli, inguqulo yohlelo noxhumano lokugcina olusebenzile. Lokhu kunika abasekeli ulwazi ngaphandle kokudalula imininingwane yokungena. Kwenza ukuqhathanisa okulandelayo kube okulungile. Gcina amanothi nomnikelo wokuqala ukuze ubone ukuthi yini eshintshile. Uma udinga usizo futhi, qala ngalolu hlu kunokuchaza konke kabusha. Ungafaki iphasiwedi kuleli phepha uma uzolithumela komunye umuntu. Hlola ukuthi usuku nesikhathi kulungile, bese ubhala ukuthi inkinga iqale nini nokuthi iziphi izinyathelo osuvele uzizamile ngaphambi kokuthinta abasekeli.",
};
export function clusterBody(cluster: Cluster, lang: AuLanguage, satellite?: Satellite) {
  const task: Task = satellite?.task ?? (cluster.family === "devices" ? "setup" : cluster.family === "problems" ? "diagnosis" : "availability");
  return [satellite?.detail[lang] ?? cluster.detail[lang], ...tasks[task][lang], CHECKLIST[lang]];
}
export function clusterMetadata(cluster: Cluster, lang: AuLanguage, satellite?: Satellite): Metadata {
  const title = satellite?.title[lang] ?? cluster.title[lang];
  const description = satellite?.detail[lang] ?? cluster.lead[lang];
  const url = `${SITE_URL}${clusterPath(cluster, lang, satellite?.slug)}`;
  return { title: {absolute: title}, description,
    alternates: {canonical: url, languages: clusterAlternates(cluster, satellite?.slug)},
    robots: {index: clustersPublished, follow: true}, authors: [{name: "Mzansi Stream Editorial"}],
    openGraph: {type: "article", title, description, url, locale: `${lang}_${cluster.region}`, images: [`${SITE_URL}/og-image.jpg`]},
  };
}
