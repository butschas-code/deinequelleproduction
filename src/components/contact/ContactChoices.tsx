import { ContactAction } from "./ContactAction";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { site } from "@/data/site";
import styles from "./ContactChoices.module.css";

const headings = {
  Kinesiologie: "Fragen zur Kinesiologie oder Ersttermin?",
  Yoga: "Fragen zu Yoga oder deiner ersten Lektion?",
  Kinderwunsch: "Fragen zur Kinderwunschbegleitung?",
  Sportkinesiologie: "Fragen zur Sport-Kinesiologie?",
} as const;

export type ContactTopic = keyof typeof headings;

export function ContactChoices({ topic }: { topic: ContactTopic }) {
  const heading = headings[topic];

  return (
    <div className={styles.panel} role="group" aria-label={heading}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.description}>
        Ich beantworte deine Fragen gerne im Gespräch oder per WhatsApp.
      </p>
      <div className={styles.actions}>
        <ContactAction href={site.infoConversationHref} className={`${styles.button} ${styles.primary}`}>
          <span className={styles.label}>Kostenfreies Infogespräch anfragen</span>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </ContactAction>
        <span className={styles.or}>oder</span>
        <a href={site.whatsappUrl} className={`${styles.button} ${styles.whatsapp}`} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className={styles.icon} />
          <span className={styles.copy}>
            <span className={styles.label}>Per WhatsApp schreiben</span>
            <span className={styles.phone}>{site.phoneIntl}</span>
          </span>
        </a>
      </div>
    </div>
  );
}
