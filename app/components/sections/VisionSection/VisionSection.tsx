import styles from "./VisionSection.module.css";

import Button from "../../ui/Button/Button";

export default function VisionSection() {
  return (
    <>
        <section className="text-center mb-16 bg-[var(--color-bg-section)] py-16">
          <h2
            className="font-semibold"
            style={{
              fontSize: "var(--text-main-heading)",
              color: "var(--color-text-dark)",
            }}
          >
            ¿Tenés una idea en mente?
          </h2>

          <p
            className="mt-4 max-w-2xl mx-auto pb-6"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--color-text-dark-secondary)",
            }}
          >
            Hablemos sobre cómo podemos concretarlo.
          </p>
          <Button >Iniciar consulta</Button>

        </section> 


        <section className={styles.hero}>
        <div className={styles.frame}>
            <div className={styles.content}>
                <h2 className={styles.title}>
                “Aportamos claridad y criterio profesional a cada etapa del producto, asegurando que cada idea se transforme en una interfaz funcional y sólida.”
                </h2>
            </div>
        </div>
        </section>
    </>
  );
}