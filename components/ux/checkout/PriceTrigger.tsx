"use client";
// components/ux/checkout/PriceTrigger.tsx
// Client island so server-rendered SEO pages (InlinePricingBlock,
// PillarTemplate…) can have each price card open the global checkout
// panel without becoming client components themselves.

import React from "react";
import { openCheckout } from "./bus";
import { plans } from "../../shared/plans";
import type { PlanKey } from "../../shared/types";
import { tapHaptic } from "../haptic";
import { track } from "../../../lib/analytics/track";

export function PriceTrigger({
  planKey,
  source,
  className,
  ariaLabel,
  children,
}: {
  planKey: PlanKey;
  source: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  const plan = plans.find((p) => p.key === planKey);
  if (!plan) return null;
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      onClick={() => {
        tapHaptic();
        track("plan_card_click", {
          plan_key: plan.key,
          months: plan.months,
          price: plan.price,
          placement: source,
        });
        openCheckout({ plan, source });
      }}
    >
      {children}
    </button>
  );
}
