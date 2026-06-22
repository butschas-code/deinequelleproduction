import type { Metadata } from "next";
import { DesignChromePortal } from "@/components/deinequelle/DesignChromePortal";
import { DesignFooter, DesignNav, Hero } from "@/components/deinequelle/DesignPage";
import type { DesignPageData } from "@/data/deinequelleDesignPages";
import { site } from "@/data/site";
export const metadata: Metadata = {
  title: "Kontakt · Lass uns ins Gespräch kommen",
  description:
    "Kontakt zu DeineQuelle in Adligenswil: Termin buchen, E-Mail senden, anrufen, WhatsApp schreiben oder Kontaktformular nutzen.",
};

const contactHero: DesignPageData = {
  slug: "/kontakt",
  eyebrow: "Kontakt",
  title: "Lass uns ins Gespräch",
  titleEmphasis: "kommen.",
  intro:
    "Für Kinesiologie, Kinderwunschbegleitung und Yoga erreichst du mich per Formular, E-Mail, Telefon oder WhatsApp/SMS.",
  heroImage: "/images/hero/home-hero-new.jpg",
  heroAlt: "Landschaftsstimmung wie auf der Startseite",
  heroObjectPosition: "center center",
  heroObjectPositionMobile: "68% 20%",
  heroReadableText: true,
  heroActions: {
    primary: {
      label: "Formular öffnen",
      href: "#kontaktformular",
    },
    secondary: {
      label: "Kontaktwege ansehen",
      href: "#kontaktformular",
    },
  },
  finalCta: {
    title: "Kontakt",
    emphasis: "aufnehmen",
    body: "",
    primaryLabel: "Formular öffnen",
    primaryHref: "#kontaktformular",
  },
  sections: [],
};

const contactOptions = [
  {
    title: "Kinesiologie & Kinderwunsch",
    body: "Du kannst direkt online buchen, mir eine E-Mail senden, das Formular nutzen oder telefonisch beziehungsweise per WhatsApp/SMS Kontakt aufnehmen.",
    actions: [
      { label: "Online buchen", href: site.bookingUrl, external: true },
      { label: "E-Mail senden", href: `mailto:${site.email}` },
      { label: "Anrufen", href: `tel:${site.phoneTel}` },
    ],
  },
  {
    title: "Yoga",
    body: "Für Yogakurse, freie Plätze, Online-Teilnahme, Privatlektionen oder Firmenworkshops melde dich bitte per E-Mail, Formular, Telefon oder WhatsApp/SMS.",
    actions: [
      { label: "E-Mail senden", href: `mailto:${site.email}` },
      { label: "Anrufen", href: `tel:${site.phoneTel}` },
    ],
  },
] as const;

export default function KontaktPage() {
  return (
    <>
      <DesignChromePortal>
        <DesignNav />
      </DesignChromePortal>
      <main className="deinequelle-design-page">
        <Hero page={contactHero} />

        <section id="kontaktformular" className="dq-contact-section">
          <div className="wrap">
            <div className="dq-contact-grid">
              <div className="dq-contact-aside reveal">
                <p className="dq-kicker">So erreichst du mich</p>
                <h2>Wähle den Weg, der für dich am einfachsten ist.</h2>
                <div className="dq-contact-cards">
                  {contactOptions.map((option, index) => (
                    <article key={option.title} className={`dq-contact-card reveal d${Math.min(index + 1, 3)}`}>
                      <h3>{option.title}</h3>
                      <p>{option.body}</p>
                      <div className="dq-contact-actions">
                        {option.actions.map((action) => (
                          <a
                            key={action.label}
                            href={action.href}
                            target={"external" in action && action.external ? "_blank" : undefined}
                            rel={"external" in action && action.external ? "noopener noreferrer" : undefined}
                          >
                            {action.label}
                          </a>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
                <address className="dq-contact-address">
                  <strong>DeineQuelle · Claudia Dimmler</strong>
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.locality}
                  <br />
                  <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
                  <br />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </address>
              </div>

              <form className="dq-form reveal d1" action="https://submit-form.com/FliKKBoxX" method="POST">
                <input type="hidden" name="_subject" value="Neue Anfrage über deinequelle.com" />
                <input type="hidden" name="_redirect" value={`${site.url}/kontakt`} />
                <div className="dq-form-row">
                  <label>
                    Name
                    <input name="name" type="text" autoComplete="name" required />
                  </label>
                  <label>
                    E-Mail
                    <input name="email" type="email" autoComplete="email" required />
                  </label>
                </div>
                <div className="dq-form-row">
                  <label>
                    Telefon
                    <input name="phone" type="tel" autoComplete="tel" />
                  </label>
                  <label>
                    Thema
                    <select name="topic" defaultValue="Kinesiologie">
                      <option>Kinesiologie</option>
                      <option>Kinderwunsch</option>
                      <option>Yoga</option>
                      <option>Allgemeine Anfrage</option>
                    </select>
                  </label>
                </div>
                <label>
                  Nachricht
                  <textarea name="message" rows={8} required />
                </label>
                <button type="submit" className="btn-dark dq-submit">
                  Anfrage senden
                  <span className="btn-pi" aria-hidden>
                    ↗
                  </span>
                </button>
              </form>
            </div>
          </div>
        </section>

        <DesignFooter />
      </main>
    </>
  );
}
