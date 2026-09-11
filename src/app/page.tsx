import Image from "next/image";
import { ConsultationForm } from "@/components/consultation-form";
import { LifeGoals } from "@/components/life-goals";
import { PremiumCalculator } from "@/components/premium-calculator";
import { SiteMotion } from "@/components/site-motion";
import { buttonVariants } from "@/components/ui/button";
import { BROCHURE_URL } from "@/lib/insurance";
import { agent, getSiteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const lineButton = cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-6");

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": siteUrl ? `${siteUrl}/#person` : undefined,
    name: agent.name,
    jobTitle: agent.role,
    description: "บริการปรึกษาและทบทวนแผนประกันชีวิตโดยไม่มีข้อผูกมัดในการซื้อ",
    telephone: agent.telephone,
    url: siteUrl,
    image: siteUrl ? `${siteUrl}${agent.image}` : undefined,
    sameAs: [agent.lineUrl],
  };

  return (
    <main className="w-full max-w-full overflow-x-hidden" id="main-content" tabIndex={-1}>
      <a className="skip-link" href="#goals">ข้ามไปเนื้อหาหลัก</a>
      <SiteMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <header className="site-header">
        <a href="#top" className="brand" aria-label="กลับไปด้านบน">
          <span className="brand-mark">BU</span>
          <span><strong>{agent.name}</strong><small>{agent.role}</small></span>
        </a>
        <nav aria-label="เมนูหลัก">
          <a href="#goals">เป้าหมายชีวิต</a><a href="#product">แผนเด่น</a><a href="#about">รู้จักผม</a>
        </nav>
        <a className={lineButton} href={agent.lineUrl} target="_blank" rel="noreferrer">คุยผ่าน LINE</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow" data-hero-item>วางแผนชีวิตอย่างเข้าใจ</p>
          <h1 data-hero-item>ความอุ่นใจ<br />เริ่มจากประกันชีวิต<br />ที่เข้าใจคุณ</h1>
          <p className="hero-lead" data-hero-item>ดูกรมธรรม์เดิมให้ชัด แล้วค่อยเติมความคุ้มครองเท่าที่จำเป็น พร้อมอธิบายข้อจำกัดและภาระเบี้ยระยะยาวตรงไปตรงมา</p>
          <div className="hero-actions" data-hero-item>
            <a className={cn(lineButton, "hero-primary")} href={agent.lineUrl} target="_blank" rel="noreferrer">เริ่มคุยผ่าน LINE</a>
            <a className={cn(buttonVariants({ variant: "outline", size: "lg" }), "hero-secondary h-12 rounded-full px-6")} href="#goals">เลือกเป้าหมายก่อน</a>
          </div>
          <div className="trust-row" data-hero-item><span>ปรึกษาฟรี</span><span>ไม่มีข้อผูกมัดในการซื้อ</span><span>ใบอนุญาต {agent.license}</span></div>
        </div>
        <figure className="hero-portrait" data-hero-item>
          <div className="portrait-effects" aria-hidden="true">
            <span className="portrait-orbit orbit-one" />
            <span className="portrait-orbit orbit-two" />
            <span className="portrait-orbit orbit-three" />
          </div>
          <div className="portrait-frame"><Image data-scroll-image src={agent.image} alt={`${agent.name} ${agent.role}`} fill priority sizes="(max-width: 768px) 100vw, 46vw" /></div>
          <figcaption><span>{agent.name}</span><span>{agent.role}</span></figcaption>
        </figure>
      </section>

      <div className="marquee" aria-hidden="true"><div>ทบทวนของเดิม&nbsp;&nbsp; อธิบายให้เข้าใจ&nbsp;&nbsp; วางแผนเท่าที่จำเป็น&nbsp;&nbsp; ไม่มีข้อผูกมัด&nbsp;&nbsp; ทบทวนของเดิม&nbsp;&nbsp; อธิบายให้เข้าใจ&nbsp;&nbsp; วางแผนเท่าที่จำเป็น&nbsp;&nbsp;</div></div>

      <section className="section section-goals" id="goals">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">เริ่มจากสิ่งที่สำคัญกับคุณ</p><h2>วางแผนวันนี้<br />เพื่อทุกช่วงชีวิต</h2>
          <p>เลือกเรื่องที่อยากเริ่มก่อน ระบบจะเตรียมหัวข้อไว้ในแบบฟอร์มให้ และคุณยังเปลี่ยนได้เสมอ</p>
        </div>
        <LifeGoals />
      </section>

      <section className="section consultation-method" aria-labelledby="method-title">
        <div className="section-heading compact" data-reveal><p className="eyebrow">วิธีให้คำปรึกษา</p><h2 id="method-title">เห็นภาพครบ<br />ก่อนตัดสินใจ</h2></div>
        <div className="bento" data-reveal>
          <article className="bento-main"><span className="bento-number">01</span><h3>ทบทวนของเดิมก่อน</h3><p>ดูกรมธรรม์และสิทธิที่คุณมีอยู่แล้ว เพื่อไม่ซื้อซ้ำและเห็นช่องว่างที่จำเป็นจริง</p></article>
          <article><span className="bento-number">02</span><h3>อธิบายภาษาง่าย</h3><p>ทั้งผลประโยชน์ ข้อยกเว้น ระยะเวลา และภาระเบี้ย</p></article>
          <article className="bento-dark"><span className="bento-number">03</span><h3>เทียบกับชีวิตจริง</h3><p>งบประมาณ คนที่ต้องดูแล และแผนระยะยาวของคุณ</p></article>
          <article><span className="bento-number">04</span><h3>ปรึกษาโดยไม่ผูกมัด</h3><p>รับข้อมูลกลับไปทบทวนได้ ไม่จำเป็นต้องซื้อทันที</p></article>
          <article className="bento-accent"><span className="bento-number">05</span><h3>ดูแลหลังการขาย</h3><p>ช่วยประสานงานกรมธรรม์ที่ทำผ่านบูรพา โดยการอนุมัติเป็นไปตามเงื่อนไขบริษัท</p></article>
        </div>
      </section>

      <section className="statement" data-scrub-copy><p>{"ประกันที่ดีไม่ใช่แผนที่ใหญ่ที่สุด แต่คือแผนที่ยังดูแลชีวิตคุณได้ ในวันที่ต้องจ่ายเบี้ยต่อเนื่อง".split(" ").map((word) => <span data-scrub-word key={word}>{word} </span>)}</p></section>

      <section className="section product-section" id="product">
        <div className="product-story" data-reveal>
          <p className="eyebrow">แผนเด่นสำหรับศึกษาข้อมูล</p><h2>AIA 20PAY LIFE<br /><span>(NON PAR)</span></h2>
          <p className="product-lead">ประกันชีวิตที่ชำระเบี้ย 20 ปี ให้ความคุ้มครองระยะยาว เหมาะสำหรับนำมาพิจารณาในบริบทการดูแลครอบครัวและส่งต่อความมั่นคง</p>
          <ul className="fact-list">
            <li><strong>20 ปี</strong><span>ระยะเวลาชำระเบี้ย</span></li><li><strong>ถึงอายุ 99</strong><span>ระยะเวลาคุ้มครองตามแบบประกัน</span></li><li><strong>ข้อมูลปี 2566</strong><span>ต้องยืนยันอัตราและเงื่อนไขปัจจุบันก่อนสมัคร</span></li>
          </ul>
          <a className="text-link" href={BROCHURE_URL} target="_blank" rel="noreferrer">อ่านโบรชัวร์ฉบับเต็ม (PDF)</a>
        </div>
        <PremiumCalculator />
      </section>

      <section className="section about" id="about">
        <div className="about-portrait" data-reveal><Image src={agent.image} alt={agent.name} fill sizes="(max-width: 768px) 100vw, 38vw" /></div>
        <div className="about-copy" data-reveal>
          <p className="eyebrow">ตัวแทนที่คุณติดต่อได้จริง</p><h2>รู้จักบูรพา</h2>
          <p>ผมช่วยทบทวนกรมธรรม์และสิทธิที่คุณมี อธิบายความคุ้มครอง ข้อจำกัด และภาระเบี้ย เพื่อวางแผนให้เหมาะกับชีวิตและงบประมาณของคุณ</p>
          <dl>
            <div><dt>ชื่อ</dt><dd>{agent.name}</dd></div><div><dt>ตำแหน่ง</dt><dd>{agent.role}</dd></div><div><dt>ใบอนุญาต</dt><dd>{agent.license}</dd></div><div><dt>โทรศัพท์</dt><dd><a href={`tel:${agent.telephone}`}>{agent.phone}</a></dd></div><div><dt>LINE ID</dt><dd><a href={agent.lineUrl} target="_blank" rel="noreferrer">{agent.line}</a></dd></div>
          </dl>
          <p className="fine-print">การช่วยประสานงานเคลมครอบคลุมเฉพาะลูกค้าที่ทำประกันผ่านบูรพา การอนุมัติเป็นไปตามบริษัทและเงื่อนไขกรมธรรม์ ไม่รับประกันผลการอนุมัติ</p>
        </div>
      </section>

      <section className="section contact" id="consultation">
        <div className="contact-intro" data-reveal>
          <p className="eyebrow">เริ่มต้นโดยไม่มีข้อผูกมัด</p><h2>เล่าเป้าหมาย<br />ให้ผมช่วยดู</h2><p>ฝากชื่อ เบอร์โทร และเรื่องที่สนใจ ผมจะติดต่อกลับเพื่อรับฟังข้อมูลก่อนให้คำแนะนำ</p>
          <div className="direct-contact"><a href={agent.lineUrl} target="_blank" rel="noreferrer"><span>LINE</span><strong>{agent.line}</strong></a><a href={`tel:${agent.telephone}`}><span>โทรศัพท์</span><strong>{agent.phone}</strong></a></div>
        </div>
        <div className="form-shell" data-reveal><ConsultationForm /></div>
      </section>

      <footer>
        <div><strong>{agent.name}</strong><span>{agent.role}</span><span>ใบอนุญาต {agent.license}</span></div>
        <div><a href={BROCHURE_URL} target="_blank" rel="noreferrer">แหล่งข้อมูลผลิตภัณฑ์</a><a href="/privacy">ความเป็นส่วนตัว</a></div>
        <p>ข้อมูลบนเว็บไซต์เป็นข้อมูลเบื้องต้น ไม่ใช่คำเสนอขายหรือการรับประกันผลประโยชน์ โปรดศึกษารายละเอียดและเงื่อนไขกรมธรรม์ก่อนตัดสินใจ</p>
      </footer>
    </main>
  );
}
