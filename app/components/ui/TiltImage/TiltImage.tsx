"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import styles from "./TiltImage.module.css";

type Props = {
  src: string;
  alt?: string;
  bg?: string;
  className?: string;
};

export default function TiltImage({ src, alt = "", bg, className }: Props) {
  const imageRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const maxRotation = 8;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const image = imageRef.current;
    const glare = glareRef.current;

    if (!image || !glare) return;

    const rect = image.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = gsap.utils.clamp(-1, 1, (event.clientX - centerX) / (rect.width / 2));
    const percentY = gsap.utils.clamp(-1, 1, (event.clientY - centerY) / (rect.height / 2));
    const glareX = ((percentX + 1) / 2) * 100;
    const glareY = ((percentY + 1) / 2) * 100;

    gsap.to(image, {
      rotateX: -percentY * maxRotation,
      rotateY: percentX * maxRotation,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(glare, {
      opacity: 1,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,.34), transparent 42%)`,
      duration: 0.35,
      ease: "power3.out",
    });
  }

  function handleMouseLeave() {
    const image = imageRef.current;
    const glare = glareRef.current;

    if (!image || !glare) return;

    gsap.to(image, {
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
        ref={imageRef}
        className={`${styles.imageWrap} ${className || ""}`}
        style={{ background: bg || "#0a0a0a" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img src={src} alt={alt} />
        <div ref={glareRef} className={styles.glare} aria-hidden="true" />
      </div>
    </div>
  );
}
