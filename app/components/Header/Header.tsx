"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import Button from "../ui/Button/Button";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div id="transition-overlay">
        <div className="panel panel-black" />
        <div className="panel panel-green" />
      </div>

      <header className={`${styles.wrapper} ${open ? styles.hidden : ""}`}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">
              <img src="/images/logo_noova.svg" alt="Noova Logo" />
            </Link>
          </div>

          <div className={styles.desktop}>
            <nav className={styles.links}>
              <Link href="/#servicios">Servicios</Link>
              <Link href="/#portfolio">Portfolio</Link>
              <Link href="/#nosotros">Nosotros</Link>
            </nav>

            <Link href="/contacto">
              <Button>Iniciar proyecto</Button>
            </Link>
          </div>

          <button
            className={styles.mobileToggle}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <span aria-hidden="true">&#9776;</span>
          </button>
        </div>
      </header>

      {open && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileHeader}>
            <img src="/images/logo_noova_light.svg" alt="" />
            <button
              className={styles.closeButton}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menu"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <nav className={styles.mobileLinks}>
            <Link href="/#servicios" onClick={() => setOpen(false)}>
              Servicios
            </Link>
            <Link href="/#portfolio" onClick={() => setOpen(false)}>
              Portfolio
            </Link>
            <Link href="/#nosotros" onClick={() => setOpen(false)}>
              Nosotros
            </Link>
          </nav>

          <Link
            className={styles.mobileCta}
            href="/contacto"
            onClick={() => setOpen(false)}
          >
            Iniciar proyecto
          </Link>
        </div>
      )}
    </>
  );
}
