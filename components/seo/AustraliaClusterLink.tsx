import { auPath } from "../../lib/seo/australia";

export function AustraliaClusterLink({ locale }: { locale: string }) {
  const lang = locale === "af" ? "af" : locale === "zu" ? "zu" : "en";
  const text = lang === "af" ? "SuperSport in Australië — kanale, pryse en opstelling" : lang === "zu" ? "SuperSport e-Australia — amashaneli, amanani nokusetha" : "SuperSport in Australia — channels, pricing and setup";
  return <section className="section longformSection"><h2><a href={auPath(lang)}>{text}</a></h2></section>;
}
