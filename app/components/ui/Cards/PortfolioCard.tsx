"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import styles from "./PortfolioCard.module.css";

type Props = {
  image: string;
  logo?: string;
  title: string;
  description: string;
  alt: string;
  variant?: "default" | "compact";
};

export default function PortfolioCard({
  image,
  logo,
  title,
  description,
  alt,
  variant = "default",
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const maxRotation = 12;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    const glare = glareRef.current;

    if (!card || !glare) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = gsap.utils.clamp(
      -1,
      1,
      (event.clientX - centerX) / (rect.width / 2)
    );
    const percentY = gsap.utils.clamp(
      -1,
      1,
      (event.clientY - centerY) / (rect.height / 2)
    );

    const rotateY = percentX * maxRotation;
    const rotateX = -percentY * maxRotation;
    const glareX = ((percentX + 1) / 2) * 100;
    const glareY = ((percentY + 1) / 2) * 100;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(glare, {
      opacity: 1,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,.4), transparent 40%)`,
      duration: 0.4,
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
    <div className={styles.cardShell}>
      <div
        ref={cardRef}
        className={`${styles.card} ${styles[variant]}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background image */}
        <img src={image} alt="" className={styles.image} />

        <div ref={glareRef} className={styles.glare} aria-hidden="true" />

        {/* Logo (condicional) */}
        {logo && <img src={logo} alt={alt} className={styles.logo} />}

        {/* Bottom box */}
        <div className={styles.info}>
          <div className={styles.line}></div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

      </div>
    </div>
  );
}
