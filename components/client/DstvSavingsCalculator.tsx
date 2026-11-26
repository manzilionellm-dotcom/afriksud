"use client";
// components/client/DstvSavingsCalculator.tsx
// Interactive savings calculator vs DStv plans. Prices in ZAR.
// Mzansi Stream 12-month equivalent at R1,199 = ~R99.92/month.

import { useState } from "react";
import { plans } from "../shared/plans";
import { DSTV_SA_PRICES } from "../../lib/seo/dstv-sa-prices";

const DSTV_PLANS = DSTV_SA_PRICES.flatMap((plan) => [
  { label: plan.name + " Stream", monthly: plan.stream },
  { label: plan.name + " satellite", monthly: plan.satellite },
]);
const annualPlan = plans.find((plan) => plan.months === 12)!;

export function DstvSavingsCalculator() {
  const [label, setLabel] = useState(DSTV_PLANS[0].label);
  const selected = DSTV_PLANS.find((plan) => plan.label === label)!;
  const yearlyDstv = selected.monthly * 12;
  const yearlyMzansi = annualPlan.price;
  const difference = yearlyDstv - yearlyMzansi;

  return (
    <div className="savingsCalc">
      <label className="savingsCalcLabel" htmlFor="dstvPlan">
        Choose a DStv plan and reception type
      </label>
      <select
        id="dstvPlan"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="savingsCalcSelect"
      >
        {DSTV_PLANS.map((p) => (
          <option key={p.label} value={p.label}>
            {p.label} — R{p.monthly}/mo
          </option>
        ))}
      </select>

      <div className="savingsCalcResult" aria-live="polite">
        <div className="savingsCalcRow">
          <span>{selected.label} per year</span>
          <strong>R{yearlyDstv.toLocaleString("en-ZA")}</strong>
        </div>
        <div className="savingsCalcRow">
          <span>Mzansi Stream 12 months</span>
          <strong>R{yearlyMzansi.toLocaleString("en-ZA")}</strong>
        </div>
        <div className="savingsCalcRow savingsCalcTotal">
          <span>{difference >= 0 ? "Mzansi costs less by" : "DStv costs less by"}</span>
          <strong className={difference > 0 ? "savingsCalcWin" : ""}>
            R{Math.abs(difference).toLocaleString("en-ZA")} / year
          </strong>
        </div>
        <p className="savingsCalcHint">
          Mzansi is paid upfront at an effective R{(yearlyMzansi / 12).toFixed(2)}/month.
          DStv totals assume twelve payments at the selected price.
          Equipment, data, promotional contracts and access fees are excluded.
        </p>
      </div>
    </div>
  );
}
