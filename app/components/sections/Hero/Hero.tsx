import styles from "./Hero.module.css";

import Button from "../../ui/Button/Button";
import HeroOrbitBackground from "./HeroOrbitBackground";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HeroOrbitBackground />

      <div className={styles.frame}> 

        <div className={styles.content}>
          <h1 className={styles.title}>
            Tu producto digital, al nivel 
            que tu audiencia espera.
          </h1>

          <p >
            Transformamos tus ideas en interfaces vivas 
            con Product Design y ejecución técnica.
          </p>

          <Button>Iniciar proyecto</Button>

        </div>

      </div>

    </section>
  );
}
