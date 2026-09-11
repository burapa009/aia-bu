"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SiteMotion() {
  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-hero-item]", { y: 28, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 30,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });
      gsap.to("[data-scroll-image]", {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-scroll-image]", start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
      gsap.from("[data-scrub-word]", {
        opacity: 0.15,
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-scrub-copy]", start: "top 78%", end: "bottom 52%", scrub: true },
      });
    });
    motion.add("(min-width: 761px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const portrait = document.querySelector<HTMLElement>(".hero-portrait");
      const image = portrait?.querySelector<HTMLElement>("[data-scroll-image]");
      const effects = portrait?.querySelector<HTMLElement>(".portrait-effects");
      if (!portrait || !image || !effects) return;

      const moveX = gsap.quickTo(image, "x", { duration: 0.45, ease: "power3.out" });
      const moveY = gsap.quickTo(image, "y", { duration: 0.45, ease: "power3.out" });
      const moveEffectsX = gsap.quickTo(effects, "x", { duration: 0.7, ease: "power3.out" });
      const moveEffectsY = gsap.quickTo(effects, "y", { duration: 0.7, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        const bounds = portrait.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        moveX(x * 12);
        moveY(y * 12);
        moveEffectsX(x * -8);
        moveEffectsY(y * -8);
      };
      const reset = () => { moveX(0); moveY(0); moveEffectsX(0); moveEffectsY(0); };

      portrait.addEventListener("pointermove", move);
      portrait.addEventListener("pointerleave", reset);
      return () => {
        portrait.removeEventListener("pointermove", move);
        portrait.removeEventListener("pointerleave", reset);
      };
    });
    return () => motion.revert();
  });

  return null;
}
