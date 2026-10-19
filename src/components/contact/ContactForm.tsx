"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";
import styles from "./ContactForm.module.css";

export function ContactForm({ autoFocus = false }: { autoFocus?: boolean }) {
  const id = useId();
  const [preference, setPreference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setIsSubmitting(true);
    const formData = new FormData(form);
    const payload: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    try {
      const response = await fetch("https://submit-form.com/FliKKBoxX", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        window.location.href = "/danke";
        return;
      }
    } catch {
      // Fall through to native submission if fetch fails
    }

    form.submit();
  };

  return (
    <form className={styles.form} action="https://submit-form.com/FliKKBoxX" method="POST" onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value="Neue Kontaktanfrage / Infogespräch über deinequelle.com" />
      <input type="hidden" name="_redirect" value={`${site.url}/danke`} />
      <input type="hidden" name="_append" value="false" />
      <address className={styles.signature}>
        <Image
          className={styles.portrait}
          src="/images/Claudia/claudia-dimmler-Kinesiologie-Adligenswil.webp"
          alt="Claudia Dimmler"
          width={96}
          height={96}
          loading="eager"
          unoptimized
        />
        <div className={styles.signatureDetails}>
          <div className={`${styles.signatureLine} ${styles.identity}`}>
            <strong className={styles.signatureName}>{site.practitioner}</strong>
            <span className={styles.brand}>Deine Quelle</span>
          </div>
          <div className={styles.contactLinks}>
            <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className={`${styles.signatureLine} ${styles.addressLine}`}>
            <span>{site.address.street}</span>
            <span>{site.address.postalCode} {site.address.locality}</span>
          </div>
        </div>
      </address>
      <div className={styles.row}>
        <label className={styles.field}>
          Name
          <input name="name" type="text" autoComplete="name" required autoFocus={autoFocus} />
        </label>
        <label className={styles.field}>
          E-Mail-Adresse
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label className={styles.field}>
        Telefonnummer{preference === "Kalenderlink per E-Mail" ? " (optional)" : ""}
        <input name="phone" type="tel" autoComplete="tel" required={preference === "Rückruf"} />
      </label>
      <fieldset className={styles.choices}>
        <legend>Wie möchtest du Kontakt aufnehmen?</legend>
        <label className={styles.choice}>
          <input type="radio" name="contact_preference" value="Rückruf" required checked={preference === "Rückruf"} onChange={(event) => setPreference(event.target.value)} aria-controls={`${id}-callback`} />
          <span>Bitte ruf mich an</span>
        </label>
        {preference === "Rückruf" ? (
          <label className={styles.field} id={`${id}-callback`}>
            Wann erreichst du mich am besten?
            <select name="callback_time" defaultValue="" required>
              <option value="" disabled>Bitte auswählen</option>
              <option value="Vormittag">Vormittag</option>
              <option value="Nachmittag">Nachmittag</option>
              <option value="Abend">Abend</option>
            </select>
          </label>
        ) : null}
        <label className={styles.choice}>
          <input type="radio" name="contact_preference" value="Kalenderlink per E-Mail" required checked={preference === "Kalenderlink per E-Mail"} onChange={(event) => setPreference(event.target.value)} />
          <span>Kalenderlink per E-Mail erhalten</span>
        </label>
      </fieldset>
      {preference === "Kalenderlink per E-Mail" ? (
        <p className={styles.hint}>Ich sende dir einen Link per E-Mail, damit du deinen Termin selbst wählen kannst.</p>
      ) : null}
      <label className={styles.field}>
        Thema
        <select name="topic" defaultValue="Kostenfreies Infogespräch">
          <option>Kostenfreies Infogespräch</option>
          <option>Kinesiologie</option>
          <option>Kinderwunsch</option>
          <option>Yoga</option>
          <option>Allgemeine Anfrage</option>
        </select>
      </label>
      <label className={styles.field}>
        Nachricht (optional)
        <textarea name="message" rows={3} />
      </label>
      <button type="submit" className={styles.submit} disabled={isSubmitting}>
        {isSubmitting ? "Wird gesendet..." : "Anfrage senden"} <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
