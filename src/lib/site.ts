export const agent = {
  name: "บูรพา ประทุมชัย",
  role: "ตัวแทนประกันชีวิต AIA",
  license: "6201025405",
  phone: "063-5167015",
  telephone: "+66635167015",
  line: "burapas",
  lineUrl: "https://line.me/ti/p/~burapas",
  image: "/images/burapa-transparent.png",
};
export const socialImage = "/images/burapa-aia.jpg";
export const title = `${agent.name} | ${agent.role}`;
export const description = "ปรึกษาบูรพา ประทุมชัย ตัวแทนประกันชีวิต AIA วางแผนความคุ้มครองชีวิต ค่ารักษาพยาบาล การออม และเกษียณ พร้อมประเมินเบี้ย AIA 20PAY LIFE เบื้องต้น";
export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return undefined;
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without credentials, path, query, or fragment.");
  }
  return url.origin;
}
export function isIndexable() {
  const origin = getSiteUrl();
  return Boolean(origin && origin.startsWith("https://") && process.env.SITE_INDEXABLE === "true");
}
