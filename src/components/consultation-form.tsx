"use client";

import axios from "axios";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle, WarningCircle, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  CONSULTATION_INTEREST_EVENT,
  INTERESTS,
  validateConsultation,
  type FieldErrors,
} from "@/lib/consultation";

type ApiResponse = { message?: string; errors?: FieldErrors };

export function ConsultationForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [interest, setInterest] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");
  const [noticeOpen, setNoticeOpen] = useState(false);
  const busy = useRef(false);
  const feedback = useRef<HTMLDivElement>(null);
  const noticeClose = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prefillInterest = (event: Event) => {
      const nextInterest = (event as CustomEvent<unknown>).detail;
      if (typeof nextInterest !== "string" || !INTERESTS.some((item) => item === nextInterest)) return;
      setInterest(nextInterest);
      setErrors((current) => ({ ...current, interest: undefined }));
    };

    window.addEventListener(CONSULTATION_INTEREST_EVENT, prefillInterest);
    return () => window.removeEventListener(CONSULTATION_INTEREST_EVENT, prefillInterest);
  }, []);

  useEffect(() => {
    if (!noticeOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNoticeOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    const focusTimer = window.setTimeout(() => noticeClose.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      window.clearTimeout(focusTimer);
    };
  }, [noticeOpen]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    const input = { ...Object.fromEntries(fields), consent: fields.get("consent") === "on" };
    const validation = validateConsultation(input);
    setErrors(validation.errors);
    if (!validation.data) {
      const first = Object.keys(validation.errors)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    busy.current = true;
    setStatus("pending");
    setNotice("");
    setNoticeOpen(false);
    try {
      const { data } = await axios.post<ApiResponse>("/api/consultation", input, { timeout: 15_000 });
      setStatus("success");
      setNoticeOpen(true);
      setNotice(data.message ?? "ได้รับคำขอของคุณแล้วครับ");
      setErrors({});
      setInterest("");
      form.reset();
    } catch (error) {
      const response = axios.isAxiosError<ApiResponse>(error) ? error.response?.data : undefined;
      setStatus("error");
      setNotice(
        response?.message ??
          "ยังยืนยันการส่งข้อมูลไม่ได้ กรุณาตรวจสอบการเชื่อมต่อ หรือติดต่อ 063-5167015",
      );
      setNoticeOpen(true);
      if (response?.errors) setErrors(response.errors);
    } finally {
      busy.current = false;
      setTimeout(() => feedback.current?.focus(), 0);
    }
  }

  return (
    <form onSubmit={submit} className="consultation-form" noValidate aria-busy={status === "pending"}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="field">
          ชื่อของคุณ <span className="required" aria-hidden="true">*</span><span className="sr-only">จำเป็น</span>
          <input
            name="name"
            required
            autoComplete="name"
            maxLength={100}
            placeholder="ชื่อที่ให้เรียกได้สะดวก"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
        </label>
        <label className="field">
          เบอร์โทรศัพท์ <span className="required" aria-hidden="true">*</span><span className="sr-only">จำเป็น</span>
          <input
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            maxLength={20}
            placeholder="เช่น 081-234-5678"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}
        </label>
      </div>
      <label className="field mt-5">
        เป้าหมายที่สนใจ <span className="required" aria-hidden="true">*</span><span className="sr-only">จำเป็น</span>
        <select
          name="interest"
          required
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
          aria-invalid={Boolean(errors.interest)}
          aria-describedby={errors.interest ? "interest-error" : undefined}
        >
          <option value="" disabled>เลือกเรื่องที่อยากให้ช่วยดูแล</option>
          {INTERESTS.map((item) => <option key={item}>{item}</option>)}
        </select>
        {errors.interest && <span className="field-error" id="interest-error">{errors.interest}</span>}
      </label>
      <label className="field mt-5">
        ข้อความเพิ่มเติม <span className="font-normal text-muted">(ไม่บังคับ)</span>
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="เล่าเป้าหมาย หรือนัดช่วงเวลาที่สะดวกให้ติดต่อกลับ"
          aria-invalid={Boolean(errors.message)}
          aria-describedby="message-note message-error"
        />
        <span id="message-note" className="text-xs font-normal text-muted">
          กรุณาไม่ระบุเลขบัตรประชาชนหรือข้อมูลสุขภาพในแบบฟอร์มนี้
        </span>
        <span className="field-error" id="message-error">{errors.message}</span>
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="mt-4 flex items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          name="consent"
          required
          className="consent-checkbox"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby="consent-error"
        />
        <span>
          ยินยอมให้บูรพา ประทุมชัย ใช้ข้อมูลนี้เพื่อติดต่อกลับเกี่ยวกับคำปรึกษาที่ร้องขอ ตาม
          <a className="text-link" href="/privacy">ประกาศความเป็นส่วนตัว</a>
        </span>
      </label>
      <p className="field-error mt-2" id="consent-error">{errors.consent}</p>
      <Button type="submit" size="lg" className="mt-5 w-full" disabled={status === "pending"}>
        {status === "pending" ? "กำลังส่งคำขอ…" : "ส่งคำขอปรึกษา"}
      </Button>
      <div
        ref={feedback}
        tabIndex={-1}
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
        className={notice ? `form-feedback ${status}` : ""}
      >
        {notice}
      </div>
      {noticeOpen && notice && (
        <div
          className="consultation-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setNoticeOpen(false);
          }}
        >
          <div
            className="consultation-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-dialog-title"
            aria-describedby="consultation-dialog-message"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={noticeClose}
              type="button"
              className="consultation-modal-close"
              aria-label="ปิดหน้าต่างแจ้งเตือน"
              onClick={() => setNoticeOpen(false)}
            >
              <X size={20} weight="bold" aria-hidden="true" />
            </button>
            <div className={`consultation-modal-icon ${status}`} aria-hidden="true">
              {status === "success" ? <CheckCircle size={32} weight="fill" /> : <WarningCircle size={32} weight="fill" />}
            </div>
            <h2 id="consultation-dialog-title">
              {notice.includes("10 นาที")
                ? "ส่งคำขอซ้ำเร็วเกินไป"
                : status === "success"
                  ? "ส่งคำขอสำเร็จ"
                  : "ส่งคำขอไม่สำเร็จ"}
            </h2>
            <p id="consultation-dialog-message">{notice}</p>
            <button type="button" className="consultation-modal-action" onClick={() => setNoticeOpen(false)}>
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
