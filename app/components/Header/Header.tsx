"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import Button from "../ui/Button/Button";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={styles.wrapper}>
        <div className={styles.nav}>

          {/* Logo */}
          <div className={styles.logo}>
            <Link href="/">
              <img src="/images/logo_noova.svg" alt="Noova Logo" />
            </Link>
          </div>

          {/* Desktop */}
          <div className={styles.desktop}>
            <nav className={styles.links}>
              <Link href="/#servicios">Servicios</Link>
              <Link href="/#portfolio">Portfolio</Link>
              <Link href="/#nosotros">Nosotros</Link>
            </nav>

            <Link href="/#contacto">
              <Button>Iniciar proyecto</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className={styles.mobileToggle} onClick={() => setOpen(true)}>
            ☰
          </div>

        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className={styles.mobileMenu}>
          
          <div className={styles.mobileHeader}>
            <img src="/images/logo_noova_light.svg" alt="" />
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className={styles.mobileLinks}>
            <Link href="/#soluciones" onClick={() => setOpen(false)}>Soluciones</Link>
            <Link href="/#marketing" onClick={() => setOpen(false)}>Servicios de marketing</Link>
            <Link href="/#tecnologia" onClick={() => setOpen(false)}>Servicios tecnológicos</Link>
            <Link href="/#portfolio" onClick={() => setOpen(false)}>Nuestro trabajo</Link>
            <Link href="/#nosotros" onClick={() => setOpen(false)}>Sobre nosotros</Link>
            <Link href="/#contacto" onClick={() => setOpen(false)}>Contacto</Link>
          </div>

        </div>
      )}
    </>
  );
}