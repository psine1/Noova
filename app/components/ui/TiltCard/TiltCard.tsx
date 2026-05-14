"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import styles from "./TiltCard.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function TiltCard({ children, className }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const maxRotation = 8;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    const glare = glareRef.current;

    if (!card || !glare) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = gsap.utils.clamp(-1, 1, (event.clientX - centerX) / (rect.width / 2));
    const percentY = gsap.utils.clamp(-1, 1, (event.clientY - centerY) / (rect.height / 2));
    const glareX = ((percentX + 1) / 2) * 100;
    const glareY = ((percentY + 1) / 2) * 100;

    gsap.to(card, {
      rotateX: -percentY * maxRotation,
      rotateY: percentX * maxRotation,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(glare, {
      opacity: 1,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,.18), transparent 44%)`,
      duration: 0.35,
      ease: "power3.out",
    });
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    const glare = glareRef.current;

    if (!card || !glare) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out",
    });

    gsap.to(glare, {
      opacity: 0,
      duration: 0.35,
      ease: "power3.out",
    });
  }

  return (
    <div className={styles.shell}>
      <div
        ref={cardRef}
        className={`${styles.card} ${className || ""}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={glareRef} className={styles.glare} aria-hidden="true" />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
