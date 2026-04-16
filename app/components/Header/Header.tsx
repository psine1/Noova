"use client";

import styles from "./Header.module.css";
import Button from "../ui/Button/Button";

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.nav}>

        {/* Logo */}
        <div className={styles.logo}>
            <img src="images/logo_noova.svg" alt="Noova Logo" />
        </div>


        <div className="flex justify-center items-center gap-8">
          {/* Links */}
          <nav className={styles.links}>
            <a href="#">Servicios</a>
            <a href="#">Portfolio</a>
            <a href="#">Nosotros</a>
          </nav>

          {/* CTA */}
          <Button>Iniciar proyecto</Button>
        </div>

      </div>
    </header>
  );
}