// components/ux/checkout/bus.ts
// Module-scoped pub/sub so any client component on any page can trigger
// the global price → WhatsApp checkout panel without threading a context
// through every parent (LongformShell, custom pages, SEO islands…).

import type { Plan } from "../../shared/types";

export type CheckoutOpenDetail = {
  plan: Plan;
  /** Which surface triggered this — for analytics. */
  source?: string;
};

type Listener = (detail: CheckoutOpenDetail) => void;
const listeners = new Set<Listener>();

export function openCheckout(detail: CheckoutOpenDetail) {
  listeners.forEach((l) => l(detail));
}

export function subscribeCheckout(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
