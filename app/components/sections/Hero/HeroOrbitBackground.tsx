"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function HeroOrbitBackground() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!desktopQuery.matches || reducedMotionQuery.matches) return;

    let context: { revert: () => void } | undefined;
    let isCancelled = false;
    let updateOrbits: (() => void) | undefined;
    let removeOrbits: (() => void) | undefined;

    async function animateOrbits() {
      const { gsap } = await import("gsap");

      if (isCancelled || !scopeRef.current) return;

      context = gsap.context(() => {
        const orbits = gsap.utils.toArray<SVGGElement>("[data-orbit]");

        gsap.set(orbits, {
          transformOrigin: "50% 50%",
          force3D: true,
        });

        const orbitConfigs = orbits.map((orbit, index) => {
          const type = orbit.dataset.orbit ?? "1";
          const edge = orbit.dataset.edge;
          const direction = edge === "right" ? -1 : 1;
          const isEdge = edge === "left" || edge === "right";

          const radiusX = isEdge ? 120 : type === "2" ? 48 : type === "3" ? 38 : 42;
          const radiusY = isEdge ? 34 : type === "3" ? 44 : 30;
          const scale = type === "3" ? 1.05 : 1;
          const speed = (Math.PI * 2) / (isEdge ? 9 + (index % 3) : 6.5 + (index % 4) * 0.5);
          const phase = index * 0.72;

          return {
            direction,
            orbit,
            phase,
            radiusX,
            radiusY,
            scale,
            speed,
          };
        });

        updateOrbits = () => {
          const time = gsap.ticker.time;

          orbitConfigs.forEach(({ direction, orbit, phase, radiusX, radiusY, scale, speed }) => {
            const progress = time * speed + phase;
            const pulse = scale === 1 ? 1 : 1 + (Math.sin(progress * 1.4) + 1) * 0.025;

            gsap.set(orbit, {
              x: Math.cos(progress) * radiusX * direction,
              y: Math.sin(progress) * radiusY,
              scale: pulse,
            });
          });
        };

        updateOrbits();
        gsap.ticker.add(updateOrbits);
        removeOrbits = () => gsap.ticker.remove(updateOrbits);
      }, scopeRef);
    }

    animateOrbits();

    return () => {
      isCancelled = true;
      removeOrbits?.();
      context?.revert();
    };
  }, []);

  return (
    <div ref={scopeRef} className={styles.orbitBackground} aria-hidden="true">
      <svg
        viewBox="0 0 750 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.orbitSvg}
      >
        <defs>
          <radialGradient id="hero-orbit-dark" cx="50%" cy="45%" r="62%">
            <stop offset="0" stopColor="#000000" />
            <stop offset="0.4" stopColor="#0E0E0E" />
            <stop offset="0.75" stopColor="#383838" />
            <stop offset="0.98" stopColor="#3A3A3A" />
          </radialGradient>

          <radialGradient id="hero-orbit-green" cx="50%" cy="45%" r="62%">
            <stop offset="0" stopColor="#4AFF96" />
            <stop offset="0.37" stopColor="#3EF088" />
            <stop offset="0.7" stopColor="#1AC65E" />
            <stop offset="1" stopColor="#12DB64" />
          </radialGradient>
        </defs>

        <g opacity="0.95">
          <g data-orbit="1"><circle cx="470.5" cy="410.2" r="136.5" fill="url(#hero-orbit-dark)" opacity="0.9" /></g>
          <g data-orbit="2" data-edge="right"><circle cx="711.5" cy="502" r="136.5" fill="url(#hero-orbit-dark)" opacity="0.9" /></g>
          <g data-orbit="3"><circle cx="637.1" cy="399.3" r="65.4" fill="url(#hero-orbit-green)" /></g>
          <g data-orbit="2" data-edge="right"><circle cx="750" cy="257.2" r="93.1" fill="url(#hero-orbit-dark)" opacity="0.9" /></g>
          <g data-orbit="1"><circle cx="347.9" cy="480.6" r="58.4" fill="url(#hero-orbit-dark)" opacity="0.9" /></g>
          <g data-orbit="3"><circle cx="212.4" cy="363.2" r="41.7" fill="url(#hero-orbit-dark)" opacity="0.9" /></g>
          <g data-orbit="1" data-edge="right"><circle cx="779.7" cy="87.9" r="136.5" fill="url(#hero-orbit-dark)" opacity="0.9" /></g>
          <g data-orbit="2" data-edge="left"><circle cx="98.9" cy="526.4" r="175.5" fill="url(#hero-orbit-dark)" opacity="0.9" /></g>
          <g data-orbit="3" data-edge="left"><circle cx="48" cy="379.7" r="79" fill="url(#hero-orbit-green)" /></g>
          <g data-orbit="2"><circle cx="647.9" cy="61.1" r="24.4" fill="url(#hero-orbit-green)" /></g>
          <g data-orbit="1"><circle cx="638" cy="112.6" r="41.7" fill="url(#hero-orbit-dark)" opacity="0.9" /></g>
          <g data-orbit="3"><circle cx="98.9" cy="34.2" r="129.9" fill="url(#hero-orbit-dark)" /></g>
          <g data-orbit="1" data-edge="left"><circle cx="-19.7" cy="162.6" r="118.5" fill="url(#hero-orbit-dark)" /></g>
          <g data-orbit="2"><circle cx="214.3" cy="-10.2" r="54.3" fill="url(#hero-orbit-dark)" /></g>
          <g data-orbit="3"><circle cx="279.5" cy="242.9" r="35.9" fill="url(#hero-orbit-green)" /></g>
          <g data-orbit="2"><circle cx="347.9" cy="149.1" r="99.3" fill="url(#hero-orbit-dark)" /></g>
          <g data-orbit="1"><circle cx="69.9" cy="87.9" r="38.2" fill="url(#hero-orbit-green)" /></g>
          <g data-orbit="3"><circle cx="195" cy="263.1" r="20.2" fill="url(#hero-orbit-dark)" opacity="0.9" /></g>
          <g data-orbit="1"><circle cx="580.7" cy="273.6" r="20.2" fill="url(#hero-orbit-green)" /></g>
          <g data-orbit="2"><circle cx="656.9" cy="238.7" r="31.7" fill="url(#hero-orbit-dark)" opacity="0.9" /></g>
        </g>
      </svg>
    </div>
  );
}
