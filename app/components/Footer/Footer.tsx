"use client";

import styles from "./Footer.module.css";
import Link from "next/link";

 import { WspIcon, IgIcon, InIcon } from "../icons/DesignIcon";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>


        <div className="flex justify-center items-center space-around gap-24">
            {/* LEFT */}
            <div className={styles.left}>
            <img src="/images/logo_noova_dark.svg" alt="Noova Logo" />
            </div>

            {/* CENTER */}
            <nav className={styles.nav}>
            <Link href="/">Home</Link>
            <Link href="/#servicios">Servicios</Link>
            <Link href="/#portfolio">Portfolio</Link>
            <Link href="/contacto">Contacto</Link>
            </nav>
        </div>

        {/* RIGHT */}
        <div className={styles.social}>
         
          <a href="https://api.whatsapp.com/send?phone=542612593497" target="_blank"><WspIcon /></a>
          {/* <a href="#"><IgIcon /></a> */}
          <a href="https://www.linkedin.com/company/noova-arg/" target="_blank"><InIcon /></a>
          
        </div>

      </div>
    </footer>
  );
}
