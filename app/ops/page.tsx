import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closer scripts",
  robots: { index: false, follow: false },
};

const SCRIPTS = [
  ["J+0 essai", "Ville + appareil ? Essai 24 h, pas de carte. Je t'envoie le login Mzansi Stream."],
  ["J+1 relance", "Ça marche chez toi ? Si l'essai est bon, dis-moi le plan (3 / 6 / 12 mois)."],
  ["J+2 dernier jour", "Dernier jour d'essai. Tu veux que j'active quel plan ?"],
  ["Parrainage", "Parrainage : 1 mois offert sur le plan 12 mois pour toi ET pour l'ami, quand il paie. Numéro WhatsApp de l'ami (différent du tien) :"],
];

export default function OpsPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 24, fontFamily: "sans-serif" }}>
      <h1>Scripts — un numéro 447307410512</h1>
      <p>Page noindex. Copier-coller. Pas d’envoi auto.</p>
      {SCRIPTS.map(([label, text]) => (
        <section key={label} style={{ marginTop: 24, border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
          <h2 style={{ color: "#128C7E", fontSize: 14 }}>{label}</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>
        </section>
      ))}
    </main>
  );
}
