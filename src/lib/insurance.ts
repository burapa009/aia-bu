export const BROCHURE_URL = "/documents/aia-20pay-life-2023.pdf";
export const HEALTH_HAPPY_BROCHURE_URL = "/documents/aia-health-happy-th-2026.pdf";
export const RATE_SOURCE = "โบรชัวร์ AIA ฉบับปี 2566 (SU0215429 - 01/01/2023) หน้า 5";

// Annual standard rates in satang per THB 1,000 sum assured.
// Index 0 is the brochure's 15-day entry; 1-70 are insurance ages.
// No interpolation. Source: public/documents/aia-20pay-life-2023.pdf, p. 5.
export const RATES = [
  [1276,1147],[1281,1147],[1298,1151],[1315,1158],[1333,1168],
  [1353,1180],[1373,1194],[1395,1210],[1418,1227],[1442,1245],
  [1468,1266],[1496,1287],[1523,1309],[1552,1332],[1580,1356],
  [1609,1376],[1638,1397],[1667,1419],[1697,1441],[1727,1465],
  [1758,1490],[1790,1515],[1823,1543],[1857,1571],[1893,1600],
  [1931,1631],[1970,1664],[2012,1698],[2056,1734],[2102,1772],
  [2150,1811],[2201,1853],[2255,1896],[2311,1942],[2369,1990],
  [2430,2040],[2494,2093],[2561,2148],[2631,2206],[2704,2267],
  [2780,2330],[2860,2396],[2944,2466],[3032,2539],[3124,2615],
  [3220,2695],[3322,2779],[3428,2868],[3540,2961],[3657,3059],
  [3781,3162],[3913,3272],[4051,3388],[4199,3511],[4356,3641],
  [4525,3781],[4705,3929],[4899,4089],[5108,4260],[5333,4444],
  [5577,4643],[5842,4859],[6129,5093],[6419,5349],[6696,5627],
  [6989,5932],[7199,6190],[7380,6361],[7513,6471],[7640,6613],
  [7811,6707],
] as const;

export function calculatePremium(sex: string, age: number, sum: number) {
  if (sex !== "male" && sex !== "female") throw new Error("กรุณาเลือกเพศตามตารางเบี้ย");
  if (!Number.isInteger(age) || age < 0 || age > 70) throw new Error("กรุณาเลือกอายุจากตาราง 15 วัน - 70 ปี");
  // ponytail: online estimates capped at THB 100m; larger sums need an agent quotation.
  if (!Number.isSafeInteger(sum) || sum < 100_000 || sum > 100_000_000) {
    throw new Error("กรุณาระบุทุนประกัน 100,000 - 100,000,000 บาท สำหรับทุนสูงกว่านี้โปรดติดต่อตัวแทน");
  }
  const rate = RATES[age][sex === "male" ? 0 : 1] / 100;
  const discount = sum >= 600_000 ? 2 : sum >= 250_000 ? 1 : 0;
  const annual = Math.round((RATES[age][sex === "male" ? 0 : 1] - discount * 100) * sum / 1000) / 100;
  return { rate, discount, annual };
}

export const baht = (value: number) => new Intl.NumberFormat("th-TH", { maximumFractionDigits: 2 }).format(value);
