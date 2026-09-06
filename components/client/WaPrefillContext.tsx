"use client";
// Optional WhatsApp href/message override for shared chrome that bleeds
// onto a longform URL (FAB, header menu, checkout intro). Null = default.

import { createContext, useContext, type ReactNode } from "react";

export type WaPrefillOverride = {
  href: string;
  message: string;
};

const WaPrefillContext = createContext<WaPrefillOverride | null>(null);

export function WaPrefillProvider({
  value,
  children,
}: {
  value: WaPrefillOverride | null;
  children: ReactNode;
}) {
  return (
    <WaPrefillContext.Provider value={value}>{children}</WaPrefillContext.Provider>
  );
}

export function useWaPrefillOverride(): WaPrefillOverride | null {
  return useContext(WaPrefillContext);
}
