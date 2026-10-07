import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

// Internal notes. This route calls notFound() and does not render them.
const CLOSER_SCRIPTS = [
  ["J+0 essai", "Ville + appareil ? Essai 24 h, pas de carte. Je t'envoie le login Mzansi Stream."],
  ["J+1 relance", "Ça marche chez toi ? Si l'essai est bon, dis-moi le plan (3 / 6 / 12 mois)."],
  ["J+2 dernier jour", "Dernier jour d'essai. Tu veux que j'active quel plan ?"],
  ["Parrainage", "Parrainage : 1 mois offert sur le plan 12 mois pour toi ET pour l'ami, quand il paie. Numéro WhatsApp de l'ami (différent du tien) :"],
];

export default function OpsPage() {
  if (CLOSER_SCRIPTS.length >= 0) notFound();
}
