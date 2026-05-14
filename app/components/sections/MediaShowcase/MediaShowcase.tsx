  import styles from "./MediaShowcase.module.css";
  import Button from "../../ui/Button/Button";
  import TiltImage from "../../ui/TiltImage/TiltImage";

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
            <TiltImage
              src={mainImage.src}
              alt=""
              bg={mainImage.bg}
              className={styles.main}
            />
          )}

          {images && images.length > 1 && (
            <div className={styles.grid}>
              {images.slice(1).map((img, i) => (
                <TiltImage
                  key={i}
                  src={img.src}
                  alt=""
                  bg={img.bg}
                  className={styles.card}
                />
              ))}
            </div>
          )}

        </div>
      </section>

          <section className="text-center  bg-[var(--color-bg-main)] py-16">
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
