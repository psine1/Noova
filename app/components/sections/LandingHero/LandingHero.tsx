"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import styles from "./LandingHero.module.css";
import Button from "../../ui/Button/Button";

gsap.registerPlugin(SplitText);

interface Props {
  label?: string;
  title: string;
  description?: string;
  ctaText?: string;
  backgroundImage?: string;
  backgroundColor?: string;
}

export default function LandingHero({
  label,
  title,
  description,
  ctaText,
  backgroundImage,
  backgroundColor,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) return;

    const context = gsap.context(() => {
      const titleSplit = titleRef.current
        ? new SplitText(titleRef.current, { type: "words" })
        : null;
      const descriptionSplit = descriptionRef.current
        ? new SplitText(descriptionRef.current, { type: "lines" })
        : null;

      gsap.set(frameRef.current, {
        autoAlpha: 0,
        scale: 1.08,
        y: 18,
        "--frame-glow-opacity": 0,
      });
      gsap.set(labelRef.current, { autoAlpha: 0, y: 12 });
      gsap.set(titleSplit?.words ?? [], { autoAlpha: 0, y: 18 });
      gsap.set(descriptionSplit?.lines ?? [], { autoAlpha: 0, y: 16 });
      gsap.set(buttonRef.current, { autoAlpha: 0, y: 14 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .to(frameRef.current, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          "--frame-glow-opacity": 1,
          duration: 0.8,
        })
        .to(labelRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
        }, "<0.18")
        .to(titleSplit?.words ?? [], {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.055,
        }, "<0.1")
        .to(descriptionSplit?.lines ?? [], {
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
        descriptionSplit?.revert();
      };
    }, frameRef);

    return () => context.revert();
  }, []);

  return (
    <section
      className={styles.hero}
      style={{
        backgroundColor: backgroundColor || "#050505",
      }}
    >
      {/* 🔥 background layer */}
      {backgroundImage && (
        <div
          className={styles.bgImage}
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      )}

      <div className={styles.overlay} />

      <div ref={frameRef} className={styles.frame}>
        <div className={styles.content}>
          {label && <span ref={labelRef} className={styles.label}>{label}</span>}

          <h1 ref={titleRef}>{title}</h1>

          {description && <p ref={descriptionRef}>{description}</p>}

          {ctaText && (
            <div ref={buttonRef}>
              <Button>{ctaText}</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
