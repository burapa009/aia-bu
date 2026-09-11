"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Heartbeat, HouseLine, PiggyBank, SunHorizon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { CONSULTATION_INTEREST_EVENT } from "@/lib/consultation";

const goals = [
  { title: "ดูแลครอบครัว", body: "เตรียมความคุ้มครองและความต่อเนื่องทางการเงินให้คนข้างหลัง", icon: HouseLine },
  { title: "ค่ารักษาพยาบาล", body: "ทบทวนสิทธิที่มี และวางแผนรับมือค่าใช้จ่ายเมื่อต้องรักษาตัว", icon: Heartbeat, href: "/health-happy" },
  { title: "ออมเงิน", body: "วางแผนตามเป้าหมาย ระยะเวลา และกำลังชำระเบี้ยที่เหมาะกับชีวิตจริง", icon: PiggyBank },
  { title: "เกษียณ", body: "เตรียมเงินสำหรับชีวิตหลังหยุดทำงาน โดยเห็นภาระระยะยาวก่อนตัดสินใจ", icon: SunHorizon },
  { title: "วางแผนค่าเรียนบุตร", body: "เตรียมเงินการศึกษาและความต่อเนื่อง หากผู้ปกครองเกิดเหตุไม่คาดฝัน", icon: GraduationCap },
] as const;

function chooseInterest(interest: string) {
  window.dispatchEvent(new CustomEvent(CONSULTATION_INTEREST_EVENT, { detail: interest }));
  document.querySelector("#consultation")?.scrollIntoView({ behavior: "smooth" });
}

export function LifeGoals() {
  const [active, setActive] = useState(0);

  return (
    <div className="goal-accordion" data-reveal>
      {goals.map((goal, index) => {
        const Icon = goal.icon;
        const expanded = active === index;
        return (
          <article className="goal-panel" data-active={expanded} key={goal.title}>
            <button
              type="button"
              className="goal-trigger"
              aria-expanded={expanded}
              aria-controls={`goal-${index}`}
              onClick={() => setActive(index)}
            >
              <Icon size={28} weight="duotone" aria-hidden="true" />
              <span>{goal.title}</span>
              <span className="goal-index" aria-hidden="true">0{index + 1}</span>
            </button>
            <div id={`goal-${index}`} className="goal-content" hidden={!expanded}>
              <p>{goal.body}</p>
              <div className="goal-actions">
                {"href" in goal && (
                  <Link className="health-plan-link" href={goal.href}>
                    <span className="health-plan-link__icon" aria-hidden="true">
                      <Heartbeat size={22} weight="duotone" />
                    </span>
                    <span className="health-plan-link__copy">
                      <small>แผนแนะนำสำหรับเป้าหมายนี้</small>
                      <strong>AIA Health Happy</strong>
                    </span>
                    <span className="health-plan-link__arrow" aria-hidden="true">
                      <ArrowUpRight size={20} weight="bold" />
                    </span>
                  </Link>
                )}
                <Button type="button" size="lg" variant={"href" in goal ? "outline" : "default"} className="rounded-full" onClick={() => chooseInterest(goal.title)}>เลือกเป้าหมายนี้</Button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
