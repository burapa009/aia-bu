import type { Metadata } from "next";
import Link from "next/link";
import { agent, getSiteUrl, socialImage } from "@/lib/site";

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const pageTitle = "นโยบายความเป็นส่วนตัว";
  const pageDescription = `นโยบายความเป็นส่วนตัวสำหรับการขอคำปรึกษากับ ${agent.name}`;
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: siteUrl ? { canonical: "/privacy" } : undefined,
    openGraph: {
      title: `${pageTitle} | ${agent.name}`,
      description: pageDescription,
      type: "website",
      locale: "th_TH",
      url: siteUrl ? `${siteUrl}/privacy` : undefined,
      images: siteUrl ? [{ url: socialImage, width: 1254, height: 1254, alt: `${agent.name} ${agent.role}` }] : undefined,
    },
    twitter: siteUrl ? { card: "summary", title: `${pageTitle} | ${agent.name}`, description: pageDescription, images: [socialImage] } : undefined,
  };
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-5 py-12 sm:px-8 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <Link className="text-sm font-semibold text-primary underline-offset-4 hover:underline" href="/">
          กลับหน้าหลัก
        </Link>

        <p className="mt-12 text-sm font-semibold uppercase tracking-[0.16em] text-primary">ความเป็นส่วนตัว</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">นโยบายความเป็นส่วนตัว</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          นโยบายนี้อธิบายการใช้ข้อมูลเมื่อคุณส่งแบบฟอร์มขอคำปรึกษาบนเว็บไซต์ของ {agent.name} {agent.role}
        </p>

        <div className="mt-12 space-y-10 border-t border-border pt-10 leading-7">
          <section>
            <h2 className="text-2xl font-semibold">ข้อมูลที่เก็บและวัตถุประสงค์</h2>
            <p className="mt-3">
              เราเก็บชื่อ เบอร์โทร หัวข้อที่สนใจ และข้อความที่คุณเลือกส่ง เพื่อพิจารณาคำขอ ติดต่อกลับ และให้คำปรึกษาเรื่องประกันชีวิตเท่านั้น
              โปรดอย่าส่งข้อมูลสุขภาพ เอกสารกรมธรรม์ หรือข้อมูลสำคัญผ่านแบบฟอร์มนี้
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">ความยินยอมและการเปิดเผยข้อมูล</h2>
            <p className="mt-3">
              เราประมวลผลข้อมูลตามความยินยอมที่คุณให้ก่อนส่งแบบฟอร์ม และใช้ Supabase เป็นผู้ให้บริการระบบฐานข้อมูล
              เราไม่ขายข้อมูลหรือใช้เพื่อส่งโฆษณาที่ไม่เกี่ยวกับคำขอนี้ แต่อาจเปิดเผยเมื่อกฎหมายกำหนด
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">ระยะเวลาเก็บรักษาและความปลอดภัย</h2>
            <p className="mt-3">
              เราเก็บข้อมูลไม่เกิน 1 ปีนับจากวันที่ติดต่อครั้งล่าสุด แล้วลบหรือทำให้ไม่สามารถระบุตัวบุคคลได้
              ระบบจำกัดการเข้าถึงเฉพาะผู้ที่ต้องใช้ข้อมูลเพื่อดำเนินการตามคำขอ แต่ไม่มีวิธีส่งหรือจัดเก็บข้อมูลออนไลน์ที่ปลอดภัยได้อย่างสมบูรณ์
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">สิทธิของคุณและช่องทางติดต่อ</h2>
            <p className="mt-3">
              คุณขอเข้าถึง แก้ไข ถอนความยินยอม หรือลบข้อมูลได้ โดยโทร
              {" "}<a className="font-semibold text-primary underline-offset-4 hover:underline" href={`tel:${agent.telephone}`}>{agent.phone}</a>{" "}
              หรือติดต่อ LINE ID {" "}
              <a className="font-semibold text-primary underline-offset-4 hover:underline" href={agent.lineUrl} rel="noreferrer" target="_blank">{agent.line}</a>
              การถอนความยินยอมไม่กระทบการประมวลผลที่เกิดขึ้นก่อนถอน
            </p>
          </section>

          <p className="border-t border-border pt-8 text-sm text-muted-foreground">ปรับปรุงล่าสุด 10 กันยายน 2569</p>
        </div>
      </article>
    </main>
  );
}
