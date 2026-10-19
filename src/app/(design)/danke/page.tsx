import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DesignChromePortal } from "@/components/deinequelle/DesignChromePortal";
import { DesignFooter, DesignNav } from "@/components/deinequelle/DesignPage";
import { WhatsAppIcon } from "@/components/contact/WhatsAppIcon";
import { DankeConversionTracker } from "@/components/analytics/DankeConversionTracker";
import { site } from "@/data/site";
import styles from "./danke.module.css";

export const metadata: Metadata = {
  title: "Vielen Dank für deine Nachricht · DeineQuelle",
  description:
    "Danke für deine Kontaktaufnahme. Deine Nachricht ist angekommen. Ich melde mich zeitnah bei dir.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DankePage() {
  return (
    <>
      <DesignChromePortal>
        <DesignNav />
      </DesignChromePortal>

      <main className={`deinequelle-design-page ${styles.dankePage}`}>
        <DankeConversionTracker />

        <section className={styles.section}>
          <div className={styles.wrap}>
            {/* Header Hero */}
            <div className={styles.headerCard}>
              <div className={styles.badge}>
                <span className={styles.badgeCheck} aria-hidden="true">✓</span>
                Anfrage erfolgreich übermittelt
              </div>
              <h1 className={styles.title}>
                Vielen Dank für dein Vertrauen.
              </h1>
              <p className={styles.subtitle}>
                Deine Nachricht ist sicher bei mir angekommen. Ein erster Schritt für die eigene Gesundheit und Klarheit braucht manchmal etwas Mut – schön, dass du diesen Weg gehst.
              </p>
            </div>

            {/* Direct WhatsApp Callout Banner */}
            <div className={styles.whatsappBanner}>
              <div className={styles.whatsappLeft}>
                <span className={styles.whatsappKicker}>
                  <WhatsAppIcon style={{ width: 18, height: 18, color: "#25d366" }} />
                  Sofortige Kontaktaufnahme
                </span>
                <h2 className={styles.whatsappTitle}>
                  Möchtest du direkt &amp; ohne Wartezeit schreiben?
                </h2>
                <p className={styles.whatsappText}>
                  Hast du eine dringende Frage oder möchtest du deinen Termin direkt per Chat abstimmen? Schreib mir gerne direkt auf WhatsApp – ich antworte dir so schnell wie möglich.
                </p>
              </div>
              <div className={styles.whatsappRight}>
                <a
                  href={site.whatsappUrl}
                  className="btn-whatsapp btn-whatsapp-banner"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="btn-whatsapp-icon" />
                  <span className="btn-whatsapp-copy">
                    <span className="btn-whatsapp-title">Direkt per WhatsApp</span>
                    <span className="btn-whatsapp-sub">{site.phoneIntl}</span>
                  </span>
                  <span className="btn-pi" aria-hidden="true">↗</span>
                </a>
                <a href={`tel:${site.phoneTel}`} className={styles.whatsappPhoneLink}>
                  Oder telefonisch anrufen: {site.phone}
                </a>
              </div>
            </div>

            {/* Next Steps: What happens next */}
            <div>
              <h2 className={styles.sectionTitle}>Wie es jetzt weitergeht</h2>
              <div className={styles.stepsGrid}>
                <div className={styles.stepCard}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNum}>Schritt 1</span>
                    <span className={styles.stepDuration}>Vertraulich</span>
                  </div>
                  <h3 className={styles.stepCardTitle}>Persönliche Durchsicht</h3>
                  <p className={styles.stepCardText}>
                    Ich lese jede Anfrage persönlich und nehme mir Zeit, dein Anliegen und deine Situation sorgfältig zu erfassen.
                  </p>
                </div>

                <div className={styles.stepCard}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNum}>Schritt 2</span>
                    <span className={styles.stepDuration}>1–2 Werktage</span>
                  </div>
                  <h3 className={styles.stepCardTitle}>Zeitnahe Rückmeldung</h3>
                  <p className={styles.stepCardText}>
                    Gemäss deinem Wunsch melde ich mich per Telefon zur gewünschten Tageszeit oder sende dir einen persönlichen Terminauswahllink per E-Mail.
                  </p>
                </div>

                <div className={styles.stepCard}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNum}>Schritt 3</span>
                    <span className={styles.stepDuration}>Ca. 15–20 Min.</span>
                  </div>
                  <h3 className={styles.stepCardTitle}>Dein Infogespräch</h3>
                  <p className={styles.stepCardText}>
                    In Ruhe lernen wir uns kennen, sprechen über deine Themen und finden gemeinsam heraus, wie ich dich am besten unterstützen kann.
                  </p>
                </div>
              </div>
            </div>

            {/* Info Grid: Reassurance & Practice Details */}
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.practitionerRow}>
                  <Image
                    className={styles.portrait}
                    src="/images/Claudia/claudia-dimmler-Kinesiologie-Adligenswil.webp"
                    alt="Claudia Dimmler"
                    width={64}
                    height={64}
                    loading="eager"
                    unoptimized
                  />
                  <div className={styles.practitionerMeta}>
                    <strong className={styles.practitionerName}>{site.practitioner}</strong>
                    <span className={styles.practitionerTitle}>Komplementärtherapeutin mit eidg. Diplom</span>
                  </div>
                </div>
                <p className={styles.stepCardText}>
                  „Ich freue mich darauf, dich kennenzulernen und dich ein Stück auf deinem Weg zu mehr Energie, innerer Ruhe und Gesundheit zu begleiten.“
                </p>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.stepCardTitle}>Gut zu wissen vorab</h3>
                <ul className={styles.infoList}>
                  <li>
                    <span className={styles.infoBullet}>•</span>
                    <span><strong>Keine Vorbereitung nötig:</strong> Komm einfach so, wie du dich wohlfühlst. Du brauchst keine Vorkenntnisse oder Unterlagen.</span>
                  </li>
                  <li>
                    <span className={styles.infoBullet}>•</span>
                    <span><strong>Praxisstandort:</strong> {site.address.street}, {site.address.postalCode} {site.address.locality}. Kostenfreie Parkplätze direkt vor dem Haus vorhanden.</span>
                  </li>
                  <li>
                    <span className={styles.infoBullet}>•</span>
                    <span><strong>Öffentlicher Verkehr:</strong> Postauto Nr. 73 bis Haltestelle Sagi (2 Min. Gehzeit).</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Actions Row */}
            <div className={styles.actionsRow}>
              <Link href="/" className={styles.btnGhost}>
                Zurück zur Startseite
              </Link>
              <Link href="/leistungen/kinesiologie" className={styles.btnPrimary}>
                Mehr über Kinesiologie erfahren <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <DesignFooter />
      </main>
    </>
  );
}
