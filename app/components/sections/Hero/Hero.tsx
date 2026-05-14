import styles from "./Hero.module.css";

import HeroOrbitBackground from "./HeroOrbitBackground";
import HeroIntro from "./HeroIntro";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HeroOrbitBackground />
      <HeroIntro />
    </section>
  );
}
