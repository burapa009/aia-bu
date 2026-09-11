"use client";

import { useState } from "react";
import { Check, ArrowUpRight, Copy, Phone } from "lucide-react";
import { HEALTH_HAPPY_PLANS, healthHappyPremium } from "@/lib/health-happy";
import { agent } from "@/lib/site";
import styles from "./health-happy-calculator.module.css";

const money = new Intl.NumberFormat("th-TH");

export function HealthHappyCalculator() {
  const [sex, setSex] = useState<"male" | "female">("female");
  const [age, setAge] = useState(64);
  const [plan, setPlan] = useState(2);
  const [status, setStatus] = useState("");
  const selected = HEALTH_HAPPY_PLANS[plan];
  const premium = healthHappyPremium(sex, age, plan);
  async function copySummary() {
    try {
      await navigator.clipboard.writeText(`AIA Health Happy | ${sex === "male" ? "ชาย" : "หญิง"} อายุ ${age} ปี | วงเงิน ${money.format(selected.coverage)} บาท | เบี้ยอ้างอิง ${money.format(premium)} บาท/ปี ไม่รวมเบี้ยประกันชีวิตหลัก โปรดยืนยันเบี้ยจริงก่อนสมัคร`);
      setStatus("คัดลอกข้อมูลล่าสุดแล้ว");
    } catch { setStatus("คัดลอกไม่สำเร็จ กรุณาลองอีกครั้ง"); }
  }
  return (
    <section className={styles.section} id="calculator" aria-labelledby="health-calculator-title">
      <div className={styles.heading}>
        <div><p className={styles.eyebrow}>AIA HEALTH HAPPY / วางแผนความคุ้มครอง</p><h2 id="health-calculator-title">ความคุ้มครองที่เลือกได้<br /><span>ในงบที่เป็นคุณ</span></h2></div>
        <p className={styles.intro}>เริ่มจากข้อมูลของคุณ แล้วเลือกวงเงินที่เหมาะสม<br />เปรียบเทียบเบี้ยทั้ง 4 แผนได้ทันที</p>
      </div>
      <div className={styles.workspace}>
        <div className={styles.profile}>
          <div className={styles.step}><span>01</span><strong>ข้อมูลของคุณ</strong></div>
          <fieldset><legend>เพศตามตารางเบี้ย</legend><div className={styles.sex}>{([["male","ชาย"],["female","หญิง"]] as const).map(([value,label]) => <button key={value} type="button" aria-pressed={sex === value} onClick={() => { setSex(value); setStatus(""); }}>{sex === value && <Check size={16} aria-hidden="true" />}{label}</button>)}</div></fieldset>
          <div className={styles.age}><label htmlFor="health-age">อายุผู้เอาประกันภัย</label><div><input id="health-age" type="range" min="11" max="75" value={age} onChange={e => { setAge(Number(e.target.value)); setStatus(""); }} /><select aria-label="เลือกอายุเป็นปี" value={age} onChange={e => { setAge(Number(e.target.value)); setStatus(""); }}>{Array.from({length:65},(_,i) => <option key={i+11} value={i+11}>{i+11} ปี</option>)}</select></div><small>รับประกันภัยอายุ 11–75 ปี</small></div>
        </div>
        <div className={styles.plansArea}>
          <div className={styles.step}><span>02</span><strong>เลือกวงเงินคุ้มครองต่อปี</strong></div>
          <div className={styles.plans} role="group" aria-label="เลือกแผนความคุ้มครอง">
            {HEALTH_HAPPY_PLANS.map((item,index) => <button type="button" className={styles.plan} key={item.coverage} aria-pressed={plan === index} onClick={() => { setPlan(index); setStatus(""); }}>
              <span className={styles.planTop}>แผน 0{index+1}<span className={styles.check}>{plan === index && <Check size={15} aria-hidden="true" />}</span></span>
              <span className={styles.coverage}>{item.coverage/1_000_000}<small>ล้านบาท</small></span>
              <span className={styles.planNote}>{item.note}</span>
              <span className={styles.planPrice}>{money.format(healthHappyPremium(sex,age,index))}<small> บาท/ปี</small></span>
            </button>)}
          </div>
        </div>
        <div className={styles.summary}>
          <div><p className={styles.quoteLabel}>แผน {selected.coverage/1_000_000} ล้านบาทที่คุณเลือก</p><div aria-live="polite" aria-atomic="true"><span className="sr-only">เบี้ยประกันสุขภาพรายปีอ้างอิง </span><p className={styles.price}>{money.format(premium)}<small>บาท/ปี</small></p><p className={styles.average}>เฉลี่ย {money.format(Math.round(premium/12))} บาท/เดือน</p></div><small className={styles.note}>ค่าเฉลี่ยสำหรับวางแผนงบ ไม่ใช่เบี้ยงวดรายเดือน</small></div>
          <dl className={styles.benefits}>
            <div><dt>ค่าห้องและอาหาร</dt><dd>{money.format(selected.room)} <small>บาท/วัน</small></dd></div>
            <div><dt>ค่าแพทย์ตรวจรักษา</dt><dd>{money.format(selected.doctor)} <small>บาท/วัน</small></dd></div>
            <div><dt>วงเงินกรณีโรคร้ายแรงตามเงื่อนไข</dt><dd>{selected.coverage*2/1_000_000} <small>ล้านบาท</small></dd></div>
          </dl>
          <div className={styles.actions}><a className={styles.primary} href={agent.lineUrl} target="_blank" rel="noreferrer">ปรึกษาแผนนี้ผ่าน LINE<ArrowUpRight size={20} aria-hidden="true" /></a><div className={styles.secondary}><button type="button" onClick={copySummary}><Copy size={16} aria-hidden="true" />คัดลอกสรุป</button><a href={`tel:${agent.telephone}`}><Phone size={16} aria-hidden="true" />โทรปรึกษา</a></div><p role="status">{status}</p></div>
        </div>
        <details className={styles.details}><summary>รายละเอียดและเงื่อนไขการคำนวณ</summary><p>อ้างอิงตารางเบี้ยมาตรฐาน 03/2025 ไม่รวมเบี้ยประกันชีวิตหลัก โปรดยืนยันเบี้ยจริงก่อนสมัคร ผลประโยชน์และการรับประกันภัยเป็นไปตามเงื่อนไขบริษัท</p><p>AIA Care Card ใช้บริการโรงพยาบาลคู่สัญญาตามสิทธิและเงื่อนไขกรมธรรม์ เบี้ยสุขภาพหักลดหย่อนภาษีได้ตามหลักเกณฑ์กรมสรรพากร</p></details>
      </div>
    </section>
  );
}
