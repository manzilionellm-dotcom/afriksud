// South African monthly catalogue rates, checked against DStv on 26 November 2026.
export const DSTV_PRICE_SOURCE = "https://www.dstv.com/en-za/news/149536/how-to-change-upgrade-dstv-package/";
export const DSTV_SA_PRICES = [
  { name: "Starter", stream: 99, satellite: 150 },
  { name: "Select", stream: 299, satellite: 339 },
  { name: "Sports", stream: 399, satellite: 479 },
  { name: "Movies & Series", stream: 500, satellite: 500 },
  { name: "Premium", stream: 799, satellite: 979 },
] as const;
