"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import Link from "next/link";
import styles from "./Contact.module.css";

gsap.registerPlugin(SplitText);

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" />
      <path d="M12 12.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export default function Contact() {
  const copyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const iconMapRef = useRef<HTMLAnchorElement>(null);
  const iconMailRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) return;

    const context = gsap.context(() => {
      const titleSplit = titleRef.current
        ? new SplitText(titleRef.current, { type: "words" })
        : null;
      const paragraphSplit = paragraphRef.current
        ? new SplitText(paragraphRef.current, { type: "lines" })
        : null;


      gsap.set(titleSplit?.words ?? [], { autoAlpha: 0, y: 18 });
      gsap.set(paragraphSplit?.lines ?? [], { autoAlpha: 0, y: 16 });
      gsap.set(formRef.current, { scale: 1.3, autoAlpha: 0 });
      gsap.set(iconMapRef.current, { x: 200, autoAlpha: 0 });
      gsap.set(iconMailRef.current, { x: 200, autoAlpha: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });



      timeline
        .to(titleSplit?.words ?? [], {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.055,
        }, "<")
        .to(formRef.current, {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          x: 0,
        }, "<")        
        .to(paragraphSplit?.lines ?? [], {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
        }, "<+0.5")
        .to(iconMapRef.current, {
          x: 0,
          autoAlpha: 1,
          duration: 1,
        }, "<+0.5")   
        .to(iconMailRef.current, {
          x: 0,
          autoAlpha: 1,
          duration: 1,
        }, "<+0.2")                     
        ;

      return () => {
        titleSplit?.revert();
        paragraphSplit?.revert();
      };
    }, copyRef);

    return () => context.revert();
  }, []);

  return (
    <section id="contacto" className={styles.section}>
      <Link className={styles.close} href="/" aria-label="Volver al inicio">
        ×
      </Link>

      <div className={styles.container}>
        <div ref={copyRef} className={styles.copy}>
          <Image
            className={styles.logo} 
            src="/images/logo_noova_light.svg"
            alt="Noova"
            width={106}
            height={30}
          />

          <h2 ref={titleRef}>Hablemos de tu proximo producto.</h2>
          <p ref={paragraphRef}>
            Estamos listos para aportar el criterio y la ejecucion que tu
            proyecto necesita para destacar.
          </p>

          <div className={styles.contactInfo}>
            <a
              ref={iconMapRef}
              className={styles.infoItem}
              href="https://www.google.com/maps/search/?api=1&query=Mendoza%2C%20Argentina"
              target="_blank"
              rel="noreferrer"
              aria-label="Ver Mendoza, Argentina en Google Maps"
            >
              <span className={styles.iconBox}>
                <LocationIcon />
              </span>
              <span>Mendoza, Argentina.</span>
            </a>

            <a ref={iconMailRef} className={styles.infoItem} href="mailto:hola@noova.com.ar">
              <span className={styles.iconBox}>
                <MailIcon />
              </span>
              <span>hola@noova.com.ar</span>
            </a>
          </div>
        </div>

        <form ref={formRef} className={styles.form}>
          <h3>Contanos tu desafio</h3>

          <label className={styles.field}>
            <span>Nombre y apellido</span>
            <input type="text" name="name" placeholder="Ingrese Nombre y Apellido" />
          </label>

          <label className={styles.field}>
            <span>E-mail</span>
            <input type="email" name="email" placeholder="Ingrese su e-mail" />
          </label>

          <label className={styles.field}>
            <span>Empresa</span>
            <input
              type="text"
              name="company"
              placeholder="Nombre de tu organizacion"
            />
          </label>

          <label className={styles.field}>
            <span>Como te gustaria que colaboremos?</span>
            <select name="collaboration" defaultValue="">
              <option value="" disabled>
                Selecciona una opcion
              </option>
              <option value="producto">Producto digital</option>
              <option value="marketing">Marketing y anuncios</option>
              <option value="branding">Branding y estrategia</option>
              <option value="otro">Otro desafio</option>
            </select>
          </label>

          <label className={styles.field}>
            <span>Desafio</span>
            <textarea
              name="challenge"
              placeholder="Que buscas lograr con este proyecto?"
            />
          </label>

          <button className={styles.submit} type="submit">
            Hablemos de tu desafio
          </button>
        </form>
      </div>
    </section>
  );
}
