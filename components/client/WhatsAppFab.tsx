"use client";
// Neutralised. The floating button is server-rendered by
// components/seo/WhatsAppFabLink.tsx from app/[locale]/layout.tsx so the
// <a href="https://wa.me/..."> is in the first HTML byte. This export
// returns null so a leftover mount cannot paint a second .waFab.

export function WhatsAppFab() {
  return null;
}
