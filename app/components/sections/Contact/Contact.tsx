import Image from "next/image";
import Link from "next/link";
import styles from "./Contact.module.css";

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
  return (
    <section id="contacto" className={styles.section}>
      <Link className={styles.close} href="/" aria-label="Volver al inicio">
        ×
      </Link>

      <div className={styles.container}>
        <div className={styles.copy}>
          <Image
            className={styles.logo}
            src="/images/logo_noova_light.svg"
            alt="Noova"
            width={106}
            height={30}
          />

          <h2>Hablemos de tu proximo producto.</h2>
          <p>
            Estamos listos para aportar el criterio y la ejecucion que tu
            proyecto necesita para destacar.
          </p>

          <div className={styles.contactInfo}>
            <a
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

            <a className={styles.infoItem} href="mailto:hola@noova.com.ar">
              <span className={styles.iconBox}>
                <MailIcon />
              </span>
              <span>hola@noova.com.ar</span>
            </a>
          </div>
        </div>

        <form className={styles.form}>
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
