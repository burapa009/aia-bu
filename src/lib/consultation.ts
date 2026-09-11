export const INTERESTS = [
  "ดูแลครอบครัว",
  "ค่ารักษาพยาบาล",
  "ออมเงิน",
  "เกษียณ",
  "วางแผนค่าเรียนบุตร",
  "AIA 20PAY LIFE (NON PAR)",
  "ขอคำแนะนำเบื้องต้น",
] as const;

export const CONSULTATION_INTEREST_EVENT = "consultation-interest";

export type Consultation = {
  name: string;
  phone: string;
  interest: string;
  message: string;
};

export function formatConsultationNotification(data: Consultation) {
  return [
    "มีลูกค้าขอคำปรึกษาใหม่",
    `ชื่อ: ${data.name}`,
    `โทร: ${data.phone}`,
    `สนใจ: ${data.interest}`,
    data.message && `รายละเอียด: ${data.message}`,
  ].filter(Boolean).join("\n");
}

export type FieldErrors = Partial<Record<keyof Consultation | "consent", string>>;

export function validateConsultation(input: unknown): {
  data: Consultation | null;
  errors: FieldErrors;
} {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { data: null, errors: { name: "กรุณากรอกข้อมูลในแบบฟอร์ม" } };
  }

  const value = input as Record<string, unknown>;
  const read = (key: string) => (typeof value[key] === "string" ? value[key].trim() : "");
  const data = {
    name: read("name"),
    phone: read("phone").replace(/[\s()-]/g, "").replace(/^\+66/, "0"),
    interest: read("interest"),
    message: read("message"),
  };
  const errors: FieldErrors = {};

  if (data.name.length < 2 || data.name.length > 100) {
    errors.name = "กรุณาระบุชื่อ 2 - 100 ตัวอักษร";
  }
  if (!/^0[1-9]\d{7,8}$/.test(data.phone)) {
    errors.phone = "กรุณาระบุเบอร์โทรไทย 9 - 10 หลัก หรือขึ้นต้นด้วย +66";
  }
  if (!INTERESTS.some((interest) => interest === data.interest)) {
    errors.interest = "กรุณาเลือกเป้าหมายที่สนใจ";
  }
  if (typeof value.message !== "string" || data.message.length > 2000) {
    errors.message = "ข้อความเพิ่มเติมต้องไม่เกิน 2,000 ตัวอักษร";
  }
  if (value.consent !== true) {
    errors.consent = "กรุณายินยอมให้ติดต่อกลับเกี่ยวกับคำปรึกษานี้";
  }

  return { data: Object.keys(errors).length ? null : data, errors };
}
