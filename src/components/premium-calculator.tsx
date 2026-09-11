"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CONSULTATION_INTEREST_EVENT } from "@/lib/consultation";
import { baht, calculatePremium, RATE_SOURCE } from "@/lib/insurance";

export function PremiumCalculator() {
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState("35");
  const [sum, setSum] = useState("1000000");
  let result: ReturnType<typeof calculatePremium> | undefined;
  let error = "";
  try { result = calculatePremium(sex, Number(age), Number(sum)); }
  catch (e) { error = e instanceof Error ? e.message : "กรุณาตรวจสอบข้อมูล"; }

  function consult() {
    window.dispatchEvent(new CustomEvent(CONSULTATION_INTEREST_EVENT, { detail: "AIA 20PAY LIFE (NON PAR)" }));
    document.querySelector("#consultation")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="calculator" id="calculator">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">ลองวางแผนเบี้ยของคุณ</h3>
        <span className="text-xs text-muted">ชำระรายปี</span>
      </div>
      <p className="mt-2 text-sm text-muted">เลือกข้อมูลเพื่อดูเบี้ยประกันชีวิตหลักเบื้องต้น</p>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <label className="field">เพศตามตารางเบี้ย
          <select value={sex} onChange={e => setSex(e.target.value)}><option value="male">ชาย</option><option value="female">หญิง</option></select>
        </label>
        <label className="field">อายุ (ปี)
          <select value={age} onChange={e => setAge(e.target.value)} aria-describedby="age-note">
            <option value="0">15 วัน - ก่อน 1 ปี</option>
            {Array.from({ length: 70 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} ปี</option>)}
          </select>
        </label>
      </div>
      <p className="mt-2 text-xs text-muted" id="age-note">อายุรับประกันจริงเป็นไปตามวิธีนับอายุของบริษัท</p>
      <label className="field mt-5">ทุนประกันที่ต้องการ (บาท)
        <input type="number" inputMode="numeric" min="100000" max="100000000" step="1" value={sum} onChange={e => setSum(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? "premium-error" : "sum-note"} />
      </label>
      <p className="mt-2 text-xs text-muted" id="sum-note">ทุนประกันขั้นต่ำ 100,000 บาท</p>
      <div className="mt-3 flex flex-wrap gap-2" aria-label="เลือกทุนประกันอย่างรวดเร็ว">
        {[100000, 300000, 500000, 1000000].map(value => <button type="button" key={value} className="amount-choice" aria-pressed={sum === String(value)} onClick={() => setSum(String(value))}>{baht(value)}</button>)}
      </div>
      <div className="premium-result" aria-live="polite" aria-atomic="true">
        {result ? <>
          <p className="text-sm font-medium">เบี้ยโดยประมาณ</p>
          <p className="my-2"><strong className="premium-number">{baht(result.annual)}</strong><span className="ml-2 text-sm">บาท / ปี</span></p>
          <p className="text-xs">ประกันชีวิตหลัก ไม่รวมสัญญาเพิ่มเติมและเบี้ยเพิ่มพิเศษ</p>
        </> : <p id="premium-error" className="text-sm">{error}</p>}
      </div>
      {result && <details className="calculation-details">
        <summary>ดูวิธีคำนวณและส่วนลด</summary>
        <p className="mt-3">({baht(result.rate)} − {result.discount}) × {baht(Number(sum))} ÷ 1,000 = {baht(result.annual)} บาท/ปี</p>
        <p className="mt-2">ทุน 250,000 - 599,999 บาท ลด 1 บาทต่อทุน 1,000 บาท และทุนตั้งแต่ 600,000 บาท ลด 2 บาทต่อทุน 1,000 บาท</p>
      </details>}
      <p className="mt-4 text-xs leading-relaxed text-muted">อ้างอิง{RATE_SOURCE} เป็นข้อมูลในอดีต โปรดยืนยันอัตราปัจจุบันก่อนตัดสินใจ เบี้ยจริงขึ้นอยู่กับการพิจารณารับประกันภัยและเงื่อนไขบริษัท</p>
      <Button type="button" size="lg" className="mt-5 w-full" onClick={consult}>ขอคำปรึกษาแผนนี้</Button>
    </div>
  );
}
