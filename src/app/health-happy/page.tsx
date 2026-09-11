import type { Metadata } from "next";
import Link from "next/link";
import { HealthHappyCalculator } from "@/components/health-happy-calculator";
import { buttonVariants } from "@/components/ui/button";
import { HEALTH_HAPPY_BROCHURE_URL } from "@/lib/insurance";
import { agent, getSiteUrl, socialImage } from "@/lib/site";
import { cn } from "@/lib/utils";

const pageTitle = "AIA Health Happy ประกันสุขภาพเหมาจ่าย";
const pageDescription = "สรุปจุดเด่น AIA Health Happy แผนสุขภาพเหมาจ่าย วงเงินรวมสูงสุด 25 ล้านบาท พร้อมเงื่อนไขสำคัญและโบรชัวร์ฉบับเต็ม";

const highlights = [
  { value: "25 ล้านบาท", label: "วงเงินรวมสูงสุดต่อรอบปีกรมธรรม์ สำหรับแผน 25 ล้านบาท" },
  { value: "เหมาจ่าย", label: "ค่ารักษาตามผลประโยชน์และวงเงินของแผนที่เลือก" },
  { value: "สูงสุด 2 เท่า", label: "ผลประโยชน์กรณีโรคร้ายแรง และต่อเนื่องรวม 4 ปีกรมธรรม์" },
  { value: "สูงสุด 365 วัน", label: "ความคุ้มครองค่าห้องต่อการเข้าพักรักษาตัวครั้งใดครั้งหนึ่ง" },
] as const;

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: siteUrl ? { canonical: "/health-happy" } : undefined,
    openGraph: {
      title: `${pageTitle} | ${agent.name}`,
      description: pageDescription,
      type: "website",
      locale: "th_TH",
      url: siteUrl ? `${siteUrl}/health-happy` : undefined,
      images: siteUrl ? [{ url: socialImage, width: 1254, height: 1254, alt: `${agent.name} ${agent.role}` }] : undefined,
    },
    twitter: siteUrl ? { card: "summary", title: `${pageTitle} | ${agent.name}`, description: pageDescription, images: [socialImage] } : undefined,
  };
}

export default function HealthHappyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-[1408px] items-center justify-between px-5 py-5 sm:px-8">
        <Link className="brand" href="/" aria-label="กลับหน้าแรก">
          <span className="brand-mark">BU</span>
          <span><strong>{agent.name}</strong><small>{agent.role}</small></span>
        </Link>
        <Link className="text-sm font-semibold underline-offset-4 hover:underline" href="/#goals">กลับไปเลือกเป้าหมาย</Link>
      </header>

      <main>
        <section className="mx-auto grid max-w-[1408px] gap-10 overflow-hidden rounded-[28px] bg-[#65172a] px-6 py-16 text-white shadow-[0_28px_70px_rgba(17,16,15,.16)] sm:px-12 lg:grid-cols-[1fr_.62fr] lg:px-20 lg:py-24">
          <div>
            <p className="mb-5 text-xs font-extrabold tracking-[.14em] text-[#f0d189] uppercase">แผนสุขภาพเหมาจ่าย</p>
            <h1 className="max-w-3xl text-5xl leading-[1.02] font-extrabold tracking-[-.055em] sm:text-7xl">AIA Health Happy</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#f0dfe3] sm:text-xl">สัญญาเพิ่มเติมสุขภาพที่เลือกวงเงินให้เหมาะกับความเสี่ยงและงบประมาณ พร้อมสิทธิกรณีโรคร้ายแรงตามเงื่อนไขของแผน</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full bg-[#e0bd72] px-6 text-[#2a1217] hover:bg-[#f0d189]")} href="/#consultation">ขอคำปรึกษาแผนนี้</Link>
              <a className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full border-white/60 bg-transparent px-6 text-white hover:bg-white hover:text-[#65172a]")} href="#brochure">ดูจุดเด่นก่อนเปิดโบรชัวร์</a>
            </div>
          </div>
          <div className="self-end border-l border-[#e0bd72]/50 pl-7">
            <strong className="block text-5xl text-[#f0d189]">11–75 ปี</strong>
            <span className="mt-3 block max-w-sm leading-7 text-[#f0dfe3]">อายุรับประกันภัย ต่ออายุได้ถึง 98 ปี และคุ้มครองถึงอายุ 99 ปี</span>
          </div>
        </section>

        <HealthHappyCalculator />

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="mb-4 text-xs font-extrabold tracking-[.14em] text-primary uppercase">สรุปจากโบรชัวร์ฉบับ 03/2026</p>
          <h2 className="max-w-3xl text-4xl leading-tight font-bold tracking-[-.045em] sm:text-6xl">จุดเด่นที่ควรรู้<br />ก่อนอ่านรายละเอียด</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <article className="min-h-56 border border-border bg-card p-7 shadow-[6px_6px_0_var(--muted)] sm:p-9" key={item.value}>
                <span className="text-xs font-extrabold tracking-[.12em] text-primary">0{index + 1}</span>
                <h3 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">{item.value}</h3>
                <p className="mt-4 max-w-md leading-7 text-muted-foreground">{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#171514] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[.7fr_1fr] lg:py-24">
            <div>
              <p className="mb-4 text-xs font-extrabold tracking-[.14em] text-[#f0d189] uppercase">อ่านเงื่อนไขให้ครบ</p>
              <h2 className="text-4xl font-bold tracking-[-.045em] sm:text-5xl">ก่อนตัดสินใจ</h2>
            </div>
            <ul className="space-y-5 text-base leading-7 text-[#c9c3bd] sm:text-lg">
              <li className="border-b border-white/15 pb-5">มีระยะเวลาที่ไม่คุ้มครอง 30 วัน และบางโรค 120 วัน ตามรายละเอียดในสัญญาเพิ่มเติม</li>
              <li className="border-b border-white/15 pb-5">วงเงินและผลประโยชน์แตกต่างตามแผน รวมถึงข้อจำกัด ข้อยกเว้น และการพิจารณารับประกันภัย</li>
              <li>ข้อมูลหน้านี้เป็นเพียงสรุปเบื้องต้น ไม่ใช่ข้อเสนอขายหรือการรับประกันผลประโยชน์</li>
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28" id="brochure">
          <p className="mb-4 text-xs font-extrabold tracking-[.14em] text-primary uppercase">เอกสารอ้างอิง</p>
          <h2 className="text-4xl font-bold tracking-[-.045em] sm:text-6xl">ตรวจผลประโยชน์และข้อยกเว้นฉบับเต็ม</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">อ่านตารางผลประโยชน์ เบี้ยประกัน ระยะเวลาที่ไม่คุ้มครอง และเงื่อนไขการรับประกันภัยในเอกสารของ AIA ก่อนตัดสินใจ</p>
          <a className={cn(buttonVariants({ size: "lg" }), "mt-9 h-12 rounded-full px-7")} href={HEALTH_HAPPY_BROCHURE_URL} target="_blank" rel="noreferrer">เปิดโบรชัวร์ AIA Health Happy (PDF)</a>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-8 text-center text-sm text-muted-foreground">{agent.name} · {agent.role} · ใบอนุญาต {agent.license}</footer>
    </div>
  );
}
