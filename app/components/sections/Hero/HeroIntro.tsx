"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import Button from "../../ui/Button/Button";
import styles from "./Hero.module.css";

gsap.registerPlugin(SplitText);

export default function HeroIntro() {
  const frameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) return;

    const context = gsap.context(() => {
      const titleSplit = titleRef.current
        ? new SplitText(titleRef.current, { type: "words" })
        : null;
      const split = textRef.current
        ? new SplitText(textRef.current, { type: "lines" })
        : null;

      gsap.set(frameRef.current, {
        autoAlpha: 0,
        scale: 2, rotation: 0.05,
        "--frame-blur-opacity": 0,
      });
      gsap.set(titleSplit?.words ?? [], { autoAlpha: 0, y: 18 });
      gsap.set(split?.lines ?? [], { autoAlpha: 0, y: 16 });
      gsap.set(buttonRef.current, { autoAlpha: 0, y: 14 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline.to(frameRef.current, {
        autoAlpha: 1,
        scale: 1,
        "--frame-blur-opacity": 1,
        duration: 0.8,
      });

      timeline
        .fromTo(titleRef.current, {
          autoAlpha: 0,
        }, {
          autoAlpha: 1,
          duration: 0.01,
        }, "<0.2")
        .to(titleSplit?.words ?? [], {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.055,
        }, "<")
        .to(split?.lines ?? [], {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
        }, "-=0.35")
        .to(buttonRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
        }, "-=0.25");

      return () => {
        titleSplit?.revert();
        split?.revert();
      };
    }, frameRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={frameRef} className={styles.frame}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.titleGhost} aria-hidden="true">
            Tu producto digital, al nivel que tu audiencia espera.
          </span>
          <span ref={titleRef} className={styles.titleAnimated}>
            Tu producto digital, al nivel que tu audiencia espera.
          </span>
        </h1>

        <p ref={textRef}>
          Transformamos tus ideas en interfaces vivas con Product Design y ejecución técnica.
        </p>

        <div ref={buttonRef}>
          <Button href="/contacto">Iniciar proyecto</Button>
        </div>
      </div>
    </div>
  );
}
