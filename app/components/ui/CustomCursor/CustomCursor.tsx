"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

const interactiveSelector = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "summary",
  "label",
  "[role='button']",
  "[tabindex]:not([tabindex='-1'])",
  "[data-cursor-hover]",
].join(",");

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const canUseCursor = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!canUseCursor.matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    function render() {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      frame.current = window.requestAnimationFrame(render);
    }

    function handlePointerMove(event: PointerEvent) {
      mouse.current = { x: event.clientX, y: event.clientY };
      setVisible(true);

      const target = event.target instanceof Element ? event.target : null;
      const isInteractive = Boolean(target?.closest(interactiveSelector));
      const hasPointerCursor = target ? window.getComputedStyle(target).cursor === "pointer" : false;

      setActive(isInteractive || hasPointerCursor);
    }

    function handlePointerDown() {
      setPressed(true);
    }

    function handlePointerUp() {
      setPressed(false);
    }

    function handlePointerLeave() {
      setVisible(false);
    }

    function handlePointerEnter() {
      setVisible(true);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    document.documentElement.addEventListener("mouseenter", handlePointerEnter);
    frame.current = window.requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      document.documentElement.removeEventListener("mouseenter", handlePointerEnter);

      if (frame.current) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return (
    <div
      className={`${styles.cursor} ${active ? styles.active : ""} ${pressed ? styles.pressed : ""}`}
      data-visible={visible}
      aria-hidden="true"
    >
      <div ref={ringRef} className={styles.ring} />
      <div ref={dotRef} className={styles.dot} />
    </div>
  );
}
