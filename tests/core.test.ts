import assert from "node:assert/strict";
import test from "node:test";
import { formatConsultationNotification, INTERESTS, validateConsultation } from "../src/lib/consultation.ts";
import { calculatePremium } from "../src/lib/insurance.ts";
import { healthHappyPremium } from "../src/lib/health-happy.ts";

test("validates and normalizes a consultation request", () => {
  const result = validateConsultation({
    name: "  บูรพา ประทุมชัย  ",
    phone: "+66 63-516-7015",
    interest: INTERESTS[0],
    message: "  ขอรายละเอียดเพิ่มเติม  ",
    consent: true,
  });

  assert.deepEqual(result.errors, {});
  assert.deepEqual(result.data, {
    name: "บูรพา ประทุมชัย",
    phone: "0635167015",
    interest: INTERESTS[0],
    message: "ขอรายละเอียดเพิ่มเติม",
  });
});

test("rejects malformed consultation data", () => {
  const result = validateConsultation({
    name: "ก",
    phone: "123",
    interest: "ไม่อยู่ในรายการ",
    message: "",
    consent: false,
  });

  assert.equal(result.data, null);
  assert.deepEqual(Object.keys(result.errors).sort(), ["consent", "interest", "name", "phone"]);
});

test("formats a LINE consultation notification", () => {
  assert.equal(formatConsultationNotification({
    name: "Test Customer",
    phone: "0812345678",
    interest: "Health",
    message: "",
  }), "มีลูกค้าขอคำปรึกษาใหม่\nชื่อ: Test Customer\nโทร: 0812345678\nสนใจ: Health");
});

test("calculates the documented age 35 examples exactly", () => {
  assert.deepEqual(calculatePremium("male", 35, 1_000_000), { rate: 24.3, discount: 2, annual: 22_300 });
  assert.deepEqual(calculatePremium("female", 35, 1_000_000), { rate: 20.4, discount: 2, annual: 18_400 });
});

test("applies discounts at the documented sum-assured thresholds", () => {
  assert.equal(calculatePremium("male", 35, 249_999).discount, 0);
  assert.equal(calculatePremium("male", 35, 250_000).discount, 1);
  assert.equal(calculatePremium("male", 35, 599_999).discount, 1);
  assert.equal(calculatePremium("male", 35, 600_000).discount, 2);
});

test("looks up Health Happy premiums by age range, sex, and plan", () => {
  assert.equal(healthHappyPremium("female", 64, 2), 73_500);
  assert.equal(healthHappyPremium("male", 35, 1), 18_900);
  assert.throws(() => healthHappyPremium("female", 10, 0), /11-75/);
});
