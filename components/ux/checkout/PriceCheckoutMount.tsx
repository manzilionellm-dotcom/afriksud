"use client";
// components/ux/checkout/PriceCheckoutMount.tsx
// Listens on the checkout bus and renders the global panel. Mount once
// per page — both LongformShell and the homepage place this so any
// price tap anywhere on the site can pop the panel.

import React, { useEffect, useState } from "react";
import { subscribeCheckout, type CheckoutOpenDetail } from "./bus";
import { PriceCheckoutPanel } from "./PriceCheckoutPanel";
import { plans } from "../../shared/plans";
import type { Plan, PlanKey } from "../../shared/types";

export function PriceCheckoutMount() {
  const [open, setOpen] = useState(false);
  const [planKey, setPlanKey] = useState<PlanKey>(
    plans.find((p) => p.highlight)?.key ?? "p3"
  );
  const [source, setSource] = useState<string | undefined>(undefined);

  useEffect(() => {
    return subscribeCheckout((detail: CheckoutOpenDetail) => {
      const p: Plan = detail.plan;
      setPlanKey(p.key);
      setSource(detail.source);
      setOpen(true);
    });
  }, []);

  return (
    <PriceCheckoutPanel
      open={open}
      initialPlanKey={planKey}
      source={source}
      onClose={() => setOpen(false)}
    />
  );
}
