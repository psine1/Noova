"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import Link from "next/link";
import styles from "./Contact.module.css";

gsap.registerPlugin(SplitText);

// ─── Icons ────────────────────────────────────────────────────────────────────

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

function SpinnerIcon() {
  return (
    <svg
      className={styles.spinner}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
      <path d="M12 3a9 9 0 0 1 9 9" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  name: string;
  email: string;
  company: string;
  collaboration: string;
  challenge: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type TouchedFields = Partial<Record<keyof FormData, boolean>>;
type FormStatus = "idle" | "loading" | "success";

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_DATA: FormData = {
  name: "",
  email: "",
  company: "",
  collaboration: "",
  challenge: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_CHALLENGE = 1000;
const MIN_CHALLENGE = 20;
// Cap UI cooldown so it never feels punishing regardless of server value
const MAX_COOLDOWN_SECS = 120;
// Default cooldown for generic/network errors
const DEFAULT_COOLDOWN_SECS = 30;

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  const name = data.name.trim();
  if (!name) {
    errors.name = "Tu nombre y apellido son obligatorios.";
  } else if (name.length < 3) {
    errors.name = "Ingresá al menos 3 caracteres.";
  }

  const email = data.email.trim();
  if (!email) {
    errors.email = "El e-mail es obligatorio.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "El e-mail no parece ser válido. Revisalo.";
  }

  const company = data.company.trim();
  if (!company) {
    errors.company = "Ingresá el nombre de tu empresa u organización.";
  }

  if (!data.collaboration) {
    errors.collaboration = "Seleccioná el tipo de colaboración que buscás.";
  }

  const challenge = data.challenge.trim();
  if (!challenge) {
    errors.challenge = "Contanos brevemente tu desafío.";
  } else if (challenge.length < MIN_CHALLENGE) {
    errors.challenge = `Agregá un poco más de detalle (mínimo ${MIN_CHALLENGE} caracteres).`;
  }

  return errors;
}

// ─── Error message mapper ─────────────────────────────────────────────────────

function getSubmitErrorMsg(err: unknown): string {
  if (err instanceof Error) {
    if (err.message === "rate") {
      return "Enviaste demasiados mensajes. Esperá un momento antes de intentar de nuevo.";
    }
    if (err.message === "server") {
      return "Nuestros servidores están teniendo problemas. Intentá más tarde o escribinos a hola@noova.com.ar";
    }
  }
  const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
  const isNetworkErr =
    err instanceof TypeError &&
    (err.message.toLowerCase().includes("fetch") ||
      err.message.toLowerCase().includes("network"));

  if (isOffline || isNetworkErr) {
    return "Sin conexión a internet. Revisá tu red e intentá de nuevo.";
  }
  return "No se pudo enviar tu mensaje. Intentá de nuevo.";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Contact() {
  // GSAP refs
  const copyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const iconMapRef = useRef<HTMLAnchorElement>(null);
  const iconMailRef = useRef<HTMLAnchorElement>(null);

  // Form state
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [touched, setTouched] = useState<TouchedFields>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Anti-spam: honeypot (invisible to humans, bots fill it automatically)
  const [honeypot, setHoneypot] = useState("");

  // Retry throttle: seconds remaining before the retry button is re-enabled
  const [retryCooldown, setRetryCooldown] = useState(0);
  const cooldownInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const errors = validate(formData);
  const hasErrors = Object.keys(errors).length > 0;
  const isSubmitDisabled = hasErrors || status === "loading";
  const isRetryDisabled = retryCooldown > 0 || status === "loading";

  // ─── Cooldown timer ─────────────────────────────────────────────────────────

  function startCooldown(seconds: number) {
    const capped = Math.min(seconds, MAX_COOLDOWN_SECS);
    if (cooldownInterval.current) clearInterval(cooldownInterval.current);

    setRetryCooldown(capped);
    cooldownInterval.current = setInterval(() => {
      setRetryCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownInterval.current!);
          cooldownInterval.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  // Cleanup interval on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (cooldownInterval.current) clearInterval(cooldownInterval.current);
    };
  }, []);

  // ─── Send logic (reused by submit handler AND retry button) ───────────────

  async function sendForm() {
    setStatus("loading");
    setSubmitError(null);

    // Client-side honeypot guard: silently "succeed" to fool bots
    // Server also validates _h, this is just a first line of defense
    if (honeypot) {
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      return;
    }

    try {
      // 🔌 Replace "/api/contact" with your actual endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _h: honeypot, // Server also checks honeypot
        }),
      });

      // Rate limit hit — read Retry-After from server header
      if (res.status === 429) {
        const retryAfterSecs = parseInt(
          res.headers.get("Retry-After") ?? String(MAX_COOLDOWN_SECS)
        );
        startCooldown(retryAfterSecs); // capped at MAX_COOLDOWN_SECS
        throw new Error("rate");
      }

      if (!res.ok) {
        throw new Error(res.status >= 500 ? "server" : "client");
      }

      setStatus("success");
    } catch (err) {
      setStatus("idle");

      // Start standard cooldown for non-rate-limit errors
      // (rate limit already set its own cooldown from the header)
      if (!(err instanceof Error && err.message === "rate")) {
        startCooldown(DEFAULT_COOLDOWN_SECS);
      }

      setSubmitError(getSubmitErrorMsg(err));
    }
  }

  // ─── Handlers ─────────────────────────────────────────────────────────────

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError(null);
  }

  function handleBlur(
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Mark all fields touched to reveal all errors at once
    setTouched({
      name: true,
      email: true,
      company: true,
      collaboration: true,
      challenge: true,
    });

    if (hasErrors) {
      gsap.fromTo(
        formRef.current,
        { x: -10 },
        { x: 0, duration: 0.45, ease: "elastic.out(1, 0.2)" }
      );
      return;
    }

    await sendForm();
  }

  // ─── GSAP animation ───────────────────────────────────────────────────────

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const context = gsap.context(() => {
      const titleSplit = titleRef.current
        ? new SplitText(titleRef.current, { type: "words" })
        : null;
      const paragraphSplit = paragraphRef.current
        ? new SplitText(paragraphRef.current, { type: "lines" })
        : null;

      gsap.set(titleSplit?.words ?? [], { autoAlpha: 0, y: 18 });
      gsap.set(paragraphSplit?.lines ?? [], { autoAlpha: 0, y: 16 });
      gsap.set(formRef.current, { scale: 1.3, autoAlpha: 0 });
      gsap.set(iconMapRef.current, { x: 200, autoAlpha: 0 });
      gsap.set(iconMailRef.current, { x: 200, autoAlpha: 0 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .to(
          titleSplit?.words ?? [],
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.055 },
          "<"
        )
        .to(formRef.current, { scale: 1, autoAlpha: 1, duration: 1, x: 0 }, "<")
        .to(
          paragraphSplit?.lines ?? [],
          { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08 },
          "<+0.5"
        )
        .to(iconMapRef.current, { x: 0, autoAlpha: 1, duration: 1 }, "<+0.5")
        .to(iconMailRef.current, { x: 0, autoAlpha: 1, duration: 1 }, "<+0.2");

      return () => {
        titleSplit?.revert();
        paragraphSplit?.revert();
      };
    }, copyRef);

    return () => context.revert();
  }, []);

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function fieldClass(name: keyof FormData): string {
    if (!touched[name]) return styles.field;
    return `${styles.field} ${errors[name] ? styles.fieldError : styles.fieldValid}`;
  }

  function resetForm() {
    setStatus("idle");
    setFormData(INITIAL_DATA);
    setTouched({});
    setSubmitError(null);
    setHoneypot("");
    setRetryCooldown(0);
    if (cooldownInterval.current) {
      clearInterval(cooldownInterval.current);
      cooldownInterval.current = null;
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <section id="contacto" className={styles.section}>
      <Link className={styles.close} href="/" aria-label="Volver al inicio">
        ×
      </Link>

      <div className={styles.container}>
        {/* ── Left copy ── */}
        <div ref={copyRef} className={styles.copy}>
          <Image
            className={styles.logo}
            src="/images/logo_noova_light.svg"
            alt="Noova"
            width={106}
            height={30}
          />
          <h2 ref={titleRef}>Hablemos de tu proximo producto.</h2>
          <p ref={paragraphRef}>
            Estamos listos para aportar el criterio y la ejecucion que tu
            proyecto necesita para destacar.
          </p>

          <div className={styles.contactInfo}>
            <a
              ref={iconMapRef}
              className={styles.infoItem}
              href="https://www.google.com/maps/search/?api=1&query=Mendoza%2C+Argentina"
              target="_blank"
              rel="noreferrer"
              aria-label="Ver Mendoza, Argentina en Google Maps"
            >
              <span className={styles.iconBox}>
                <LocationIcon />
              </span>
              <span>Mendoza, Argentina.</span>
            </a>

            <a
              ref={iconMailRef}
              className={styles.infoItem}
              href="mailto:hola@noova.com.ar"
            >
              <span className={styles.iconBox}>
                <MailIcon />
              </span>
              <span>hola@noova.com.ar</span>
            </a>
          </div>
        </div>

        {/* ── Success card ── */}
        {status === "success" ? (
          <div
            className={styles.successCard}
            data-testid="success-card"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className={styles.successIcon}>
              <CheckCircleIcon />
            </span>
            <h3>¡Mensaje enviado con éxito!</h3>
            <p>
              Gracias por escribirnos,{" "}
              <strong>{formData.name.split(" ")[0]}</strong>. Te respondemos en
              menos de 48 horas hábiles.
            </p>
            <button
              className={styles.successBtn}
              type="button"
              onClick={resetForm}
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form
            ref={formRef}
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Formulario de contacto"
            data-testid="contact-form"
          >
            <h3>Contanos tu desafio</h3>

            {/*
             * ── Honeypot field ──────────────────────────────────────────────
             * Invisible to real users (CSS moves it off-screen).
             * Bots fill it automatically → server silently rejects.
             * Using tabIndex={-1} and autoComplete="off" to avoid browser autofill.
             */}
            <label className={styles.honeypot} aria-hidden="true">
              <span>Website</span>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                data-testid="honeypot"
              />
            </label>

            {/* ── Nombre ── */}
            <label className={fieldClass("name")}>
              <span>
                Nombre y apellido{" "}
                <em className={styles.required} aria-hidden="true">*</em>
              </span>
              <input
                type="text"
                name="name"
                placeholder="Ingrese Nombre y Apellido"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="name"
                aria-required="true"
                aria-invalid={touched.name ? !!errors.name : undefined}
                aria-describedby={touched.name && errors.name ? "err-name" : undefined}
                data-testid="field-name"
              />
              {touched.name && errors.name && (
                <span className={styles.errorMsg} id="err-name" role="alert" aria-live="polite" data-testid="error-name">
                  {errors.name}
                </span>
              )}
            </label>

            {/* ── E-mail ── */}
            <label className={fieldClass("email")}>
              <span>
                E-mail{" "}
                <em className={styles.required} aria-hidden="true">*</em>
              </span>
              <input
                type="email"
                name="email"
                placeholder="Ingrese su e-mail"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                aria-required="true"
                aria-invalid={touched.email ? !!errors.email : undefined}
                aria-describedby={touched.email && errors.email ? "err-email" : undefined}
                data-testid="field-email"
              />
              {touched.email && errors.email && (
                <span className={styles.errorMsg} id="err-email" role="alert" aria-live="polite" data-testid="error-email">
                  {errors.email}
                </span>
              )}
            </label>

            {/* ── Empresa ── */}
            <label className={fieldClass("company")}>
              <span>
                Empresa{" "}
                <em className={styles.required} aria-hidden="true">*</em>
              </span>
              <input
                type="text"
                name="company"
                placeholder="Nombre de tu organizacion"
                value={formData.company}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="organization"
                aria-required="true"
                aria-invalid={touched.company ? !!errors.company : undefined}
                aria-describedby={touched.company && errors.company ? "err-company" : undefined}
                data-testid="field-company"
              />
              {touched.company && errors.company && (
                <span className={styles.errorMsg} id="err-company" role="alert" aria-live="polite" data-testid="error-company">
                  {errors.company}
                </span>
              )}
            </label>

            {/* ── Colaboración ── */}
            <label className={fieldClass("collaboration")}>
              <span>
                ¿Cómo te gustaría que colaboremos?{" "}
                <em className={styles.required} aria-hidden="true">*</em>
              </span>
              <select
                name="collaboration"
                value={formData.collaboration}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={touched.collaboration ? !!errors.collaboration : undefined}
                aria-describedby={touched.collaboration && errors.collaboration ? "err-collaboration" : undefined}
                data-testid="field-collaboration"
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="producto">Producto digital</option>
                <option value="marketing">Marketing y anuncios</option>
                <option value="branding">Branding y estrategia</option>
                <option value="otro">Otro desafío</option>
              </select>
              {touched.collaboration && errors.collaboration && (
                <span className={styles.errorMsg} id="err-collaboration" role="alert" aria-live="polite" data-testid="error-collaboration">
                  {errors.collaboration}
                </span>
              )}
            </label>

            {/* ── Desafío ── */}
            <label className={fieldClass("challenge")}>
              <span>
                Desafío{" "}
                <em className={styles.required} aria-hidden="true">*</em>
              </span>
              <textarea
                name="challenge"
                placeholder="¿Qué buscás lograr con este proyecto?"
                value={formData.challenge}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={MAX_CHALLENGE}
                aria-required="true"
                aria-invalid={touched.challenge ? !!errors.challenge : undefined}
                aria-describedby={
                  ["char-count", touched.challenge && errors.challenge ? "err-challenge" : ""]
                    .filter(Boolean)
                    .join(" ") || undefined
                }
                data-testid="field-challenge"
              />
              <span
                className={`${styles.charCount} ${
                  formData.challenge.length >= MAX_CHALLENGE * 0.9 ? styles.charCountWarn : ""
                }`}
                id="char-count"
                aria-live="polite"
                aria-atomic="true"
                data-testid="char-count"
              >
                {formData.challenge.length} / {MAX_CHALLENGE}
              </span>
              {touched.challenge && errors.challenge && (
                <span className={styles.errorMsg} id="err-challenge" role="alert" aria-live="polite" data-testid="error-challenge">
                  {errors.challenge}
                </span>
              )}
            </label>

            {/* ── Submit-level error banner ── */}
            {submitError && (
              <div
                className={styles.submitErrorBanner}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                data-testid="submit-error-banner"
              >
                <span className={styles.submitErrorIcon}>
                  <AlertIcon />
                </span>
                <p className={styles.submitErrorText}>{submitError}</p>
                <button
                  type="button"
                  className={`${styles.retryBtn} ${isRetryDisabled ? styles.retryBtnDisabled : ""}`}
                  onClick={isRetryDisabled ? undefined : sendForm}
                  disabled={isRetryDisabled}
                  aria-disabled={isRetryDisabled}
                  aria-label={
                    retryCooldown > 0
                      ? `Reintentar disponible en ${retryCooldown} segundos`
                      : "Reintentar envío"
                  }
                  data-testid="retry-btn"
                >
                  {retryCooldown > 0 ? `Reintentar en ${retryCooldown}s` : "Reintentar"}
                </button>
              </div>
            )}

            {/* ── Helper text when form is incomplete ── */}
            {hasErrors && (
              <p className={styles.helperText} aria-live="polite">
                Completá todos los campos obligatorios para continuar.
              </p>
            )}
 
            {/* ── Submit button ── */}
            <button
              className={`${styles.submit} ${status === "loading" ? styles.submitBusy : ""}`}
              type="submit"
              disabled={isSubmitDisabled}
              aria-disabled={isSubmitDisabled}
              aria-busy={status === "loading"}
              data-testid="submit-btn"
            >
              {status === "loading" ? (
                <>
                  <SpinnerIcon />
                  Enviando...
                </>
              ) : (
                "Hablemos de tu desafío"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
