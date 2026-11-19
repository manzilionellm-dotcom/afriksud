import evidence from "../evidence.json";
// Enable only after the review checklist in docs/seo/OWNER-SETUP.md is complete.
export const clustersPublished = process.env.SEO_CLUSTERS_PUBLISHED === "true";
type Approval = {reviewer?: string; revision?: string; approvedAt?: string} | null;
const approvals = evidence.nativeReview as Record<string, Approval>;
if (clustersPublished && ["af", "zu"].some(language => !approvals[language]?.reviewer || !approvals[language]?.revision || !approvals[language]?.approvedAt)) {
  throw new Error("Native AF/ZU review must be recorded before publishing the SEO clusters.");
}
