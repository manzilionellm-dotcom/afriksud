"use client";
// components/client/DstvSavingsCalculator.tsx
// Interactive savings calculator vs DStv plans. Prices in ZAR.
// Mzansi Stream 12-month equivalent at R1,199 = ~R99.92/month.

import { useState } from "react";

const DSTV_PLANS = [
  { key: "premium", label: "DStv Premium", monthly: 899 },
  { key: "compact-plus", label: "DStv Compact Plus", monthly: 549 },
  { key: "compact", label: "DStv Compact", monthly: 449 },
  { key: "family", label: "DStv Family", monthly: 329 },
  { key: "access", label: "DStv Access", monthly: 125 },
] as const;

const MZANSI_12M = 1199;
const MZANSI_MONTHLY_EQUIV = MZANSI_12M / 12;

export function DstvSavingsCalculator() {
  const [plan, setPlan] = useState<(typeof DSTV_PLANS)[number]["key"]>(
    "premium"
  );

  const selected = DSTV_PLANS.find((p) => p.key === plan)!;
  const yearlyDstv = selected.monthly * 12;
  const yearlyMzansi = MZANSI_12M;
  const savings = yearlyDstv - yearlyMzansi;
  const positive = savings > 0;

  return (
    <div className="savingsCalc">
      <label className="savingsCalcLabel" htmlFor="dstvPlan">
        Your current DStv plan
      </label>
      <select
        id="dstvPlan"
        value={plan}
        onChange={(e) => setPlan(e.target.value as typeof plan)}
        className="savingsCalcSelect"
      >
        {DSTV_PLANS.map((p) => (
          <option key={p.key} value={p.key}>
            {p.label} — R{p.monthly}/mo
          </option>
        ))}
      </select>

      <div className="savingsCalcResult">
        <div className="savingsCalcRow">
          <span>{selected.label} per year</span>
          <strong>R{yearlyDstv.toLocaleString("en-ZA")}</strong>
        </div>
        <div className="savingsCalcRow">
          <span>Mzansi Stream 12 months</span>
          <strong>R{yearlyMzansi.toLocaleString("en-ZA")}</strong>
        </div>
        <div className="savingsCalcRow savingsCalcTotal">
          <span>{positive ? "You save" : "Difference"}</span>
          <strong className={positive ? "savingsCalcWin" : ""}>
            R{Math.abs(savings).toLocaleString("en-ZA")} / year
          </strong>
        </div>
        <p className="savingsCalcHint">
          That&apos;s roughly R
          {Math.round(Math.abs(savings) / 12).toLocaleString("en-ZA")}/month
          back in your pocket (Mzansi Stream 12-month plan equivalent: R
          {MZANSI_MONTHLY_EQUIV.toFixed(0)}/mo).
        </p>
      </div>
    </div>
  );
}
