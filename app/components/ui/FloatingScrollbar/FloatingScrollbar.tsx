"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FloatingScrollbar.module.css";

const MIN_THUMB_HEIGHT = 48;

export default function FloatingScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragOffset = useRef(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canUseCustomScrollbar = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!canUseCustomScrollbar.matches) return;

    let hideTimer: number | null = null;

    function getMetrics() {
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = Math.max(documentHeight - viewportHeight, 1);
      const thumbHeight = Math.max(
        MIN_THUMB_HEIGHT,
        (viewportHeight / documentHeight) * viewportHeight
      );
      const maxThumbTop = Math.max(viewportHeight - thumbHeight, 0);
      const progress = window.scrollY / maxScroll;

      return {
        hasOverflow: documentHeight > viewportHeight + 1,
        maxScroll,
        maxThumbTop,
        thumbHeight,
        thumbTop: progress * maxThumbTop,
        viewportHeight,
      };
    }

    function showTemporarily() {
      setVisible(true);

      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }

      if (!dragging.current) {
        hideTimer = window.setTimeout(() => setVisible(false), 1100);
      }
    }

    function updateThumb() {
      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (!thumb) return;

      const metrics = getMetrics();
      track?.setAttribute("data-overflow", String(metrics.hasOverflow));

      thumb.style.height = `${metrics.thumbHeight}px`;
      thumb.style.transform = `translate3d(0, ${metrics.thumbTop}px, 0)`;
    }

    function handleScroll() {
      updateThumb();
      showTemporarily();
    }

    function handleResize() {
      updateThumb();
      showTemporarily();
    }

    function handlePointerMove(event: PointerEvent) {
      if (!dragging.current) return;

      const metrics = getMetrics();
      const nextThumbTop = Math.min(
        Math.max(event.clientY - dragOffset.current, 0),
        metrics.maxThumbTop
      );
      const nextScrollY = (nextThumbTop / Math.max(metrics.maxThumbTop, 1)) * metrics.maxScroll;

      window.scrollTo({ top: nextScrollY, behavior: "instant" });
      updateThumb();
    }

    function handlePointerUp() {
      if (!dragging.current) return;

      dragging.current = false;
      document.body.classList.remove("is-dragging-scrollbar");
      showTemporarily();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    updateThumb();

    return () => {
      document.body.classList.remove("is-dragging-scrollbar");
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);

      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
    };
  }, []);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const thumb = thumbRef.current;
    if (!thumb) return;

    dragging.current = true;
    dragOffset.current = event.clientY - thumb.getBoundingClientRect().top;
    document.body.classList.add("is-dragging-scrollbar");
    setVisible(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  return (
    <div ref={trackRef} className={styles.track} data-visible={visible} data-overflow="false" aria-hidden="true">
      <div ref={thumbRef} className={styles.thumb} onPointerDown={handlePointerDown} />
    </div>
  );
}
