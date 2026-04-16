  import styles from "./MediaShowcase.module.css";
  import Button from "../../ui/Button/Button";

  interface ImageItem {
    src: string;
    bg?: string;
  }

  interface Props {
    images?: ImageItem[]; // 🔥 ESTE ES EL FIX
    label: string;
    description?: string;
    title?: string;
  }

  export default function MediaShowcase({ images, label, title, description }: Props) {
  const mainImage = images?.[0];
    return (
      <>
      <section className={styles.section}>
        <div className={styles.container}>

          <div className={styles.left}>
            <p className={styles.label}>{label}</p>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
          </div>

          {mainImage && (
            <div
              className={styles.main}
              style={{ background: mainImage.bg || "#0a0a0a" }}
            >
              <img src={mainImage.src} alt="" />
            </div>
          )}

          {images && images.length > 1 && (
            <div className={styles.grid}>
              {images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className={styles.card}
                  style={{ background: img.bg || "#0a0a0a" }}
                >
                  <img src={img.src} alt="" />
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

          <section className="text-center mb-16 bg-[var(--color-bg-main)] py-16">
            <h2
              className="font-semibold"
              style={{
                fontSize: "var(--text-main-heading)",
                color: "var(--color-white)",
              }}
            >
              ¿Tenés una idea en mente?
            </h2>

            <p
              className="mt-4 max-w-2xl mx-auto pb-6"
              style={{
                fontSize: "var(--text-body)",
                color: "var(--color-white)",
              }}
            >
              Hablemos sobre cómo podemos concretarlo.
            </p>
            <Button >Iniciar consulta</Button>

          </section> 

          </>

    );
  }