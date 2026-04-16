"use client";

import styles from "./LandingHero.module.css";
import Button from "../../ui/Button/Button";

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

      <div className={styles.frame}>
        <div className={styles.content}>
          {label && <span className={styles.label}>{label}</span>}

          <h1>{title}</h1>

          {description && <p>{description}</p>}

          {ctaText && <Button>{ctaText}</Button>}
        </div>
      </div>
    </section>
  );
}