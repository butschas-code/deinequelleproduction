"use client";

import { useEffect } from "react";
import Script from "next/script";
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
  GA_OPTOUT_EVENT,
  isAnalyticsTrackingEnabled,
} from "@/lib/consent";
import {
  GOOGLE_ADS_ARRIVAL_STORAGE_KEY,
  recordGoogleAdsArrival,
} from "@/lib/google-ads-arrival";
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: string]: unknown;
  }
}

interface GoogleAnalyticsProps {
  gaId?: string;
}

export { GA_OPTOUT_EVENT } from "@/lib/consent";

const GOOGLE_ADS_TAG_ID = "AW-18422643465";
const WHATSAPP_CONVERSION_DESTINATION =
  "AW-18422643465/FS3jCJyEgI0dEIn2zNBE";

function recordPaidArrival(gaId: string) {
  try {
    if (typeof window.gtag !== "function") return;
    const trackingEnabled = isAnalyticsTrackingEnabled(
      gaId,
      localStorage,
      window[`ga-disable-${gaId}`] === true,
    );
    recordGoogleAdsArrival({
      href: window.location.href,
      gaId,
      trackingEnabled,
      analyticsOptedOut:
        localStorage.getItem(`ga-disable-${gaId}`) === "true" ||
        window[`ga-disable-${gaId}`] === true,
      storage: localStorage,
      emitEvent: (name, parameters) => window.gtag?.("event", name, parameters),
    });
  } catch {
    // Optional instrumentation must not disrupt the website when storage fails.
  }
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (!gaId) return;
    const measurementId = gaId;

    function handleTrackingChange() {
      let enabled = false;
      try {
        enabled = isAnalyticsTrackingEnabled(measurementId, localStorage);
      } catch {
        // Unable to read a persisted preference: keep tracking disabled.
      }
      window[`ga-disable-${measurementId}`] = !enabled;
      if (typeof window.gtag === "function") {
        const preference = enabled ? "granted" : "denied";
        window.gtag("consent", "update", {
          analytics_storage: preference,
          ad_storage: preference,
          ad_user_data: preference,
          ad_personalization: preference,
        });
      }
      if (enabled) recordPaidArrival(measurementId);
      else {
        try {
          localStorage.removeItem(GOOGLE_ADS_ARRIVAL_STORAGE_KEY);
        } catch {
          // The persistent opt-out still takes precedence if storage is blocked.
        }
      }
    }

    function handleStorageChange(event: StorageEvent) {
      if (
        event.key === null ||
        event.key === `ga-disable-${measurementId}` ||
        event.key === CONSENT_STORAGE_KEY
      ) handleTrackingChange();
    }

    function handleConversionClick(e: MouseEvent) {
      try {
        if (!isAnalyticsTrackingEnabled(
          measurementId,
          localStorage,
          window[`ga-disable-${measurementId}`] === true,
        )) return;
      } catch {
        return;
      }

      const target = e.target as Element | null;
      if (!target || typeof window.gtag !== "function") return;

      const popupTrigger = target.closest<HTMLElement>(
        '[data-info-conversation], a[href="#infogespraech"]'
      );
      if (popupTrigger) {
        const label =
          popupTrigger.innerText?.trim() ||
          popupTrigger.getAttribute("aria-label") ||
          "Kostenfreies Infogespräch";

        window.gtag("event", "cta_contact_popup_click", {
          send_to: gaId,
          event_category: "conversion",
          event_label: label,
          page_location: window.location.href,
        });
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>(
        'a[href*="booking.masuyo.ch"], a[href^="https://wa.me/"]'
      );
      if (!anchor) return;

      const isBooking = anchor.href.includes("booking.masuyo.ch");
      const label =
        anchor.innerText?.trim() ||
        anchor.getAttribute("aria-label") ||
        (isBooking ? "Termin online buchen" : "WhatsApp");

      window.gtag("event", isBooking ? "cta_booking_click" : "cta_whatsapp_click", {
        send_to: gaId,
        event_category: "conversion",
        event_label: label,
        page_location: window.location.href,
        link_url: anchor.href,
      });

      if (!isBooking) {
        window.gtag("event", "conversion", {
          send_to: WHATSAPP_CONVERSION_DESTINATION,
        });
      }
    }

    recordPaidArrival(gaId);
    window.addEventListener(CONSENT_CHANGE_EVENT, handleTrackingChange);
    window.addEventListener(GA_OPTOUT_EVENT, handleTrackingChange);
    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("click", handleConversionClick, { capture: true });

    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleTrackingChange);
      window.removeEventListener(GA_OPTOUT_EVENT, handleTrackingChange);
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("click", handleConversionClick, { capture: true });
    };
  }, [gaId]);

  if (!gaId) return null;

  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-tag-init"
        strategy="afterInteractive"
        onReady={() => recordPaidArrival(gaId)}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            var isOptedOut = true;
            try {
              isOptedOut =
                window['ga-disable-${gaId}'] === true ||
                localStorage.getItem('ga-disable-${gaId}') === 'true' ||
                localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'rejected';
            } catch (e) {}
            window['ga-disable-${gaId}'] = isOptedOut;
            var trackingPreference = isOptedOut ? 'denied' : 'granted';
            gtag('consent', 'default', {
              'analytics_storage': trackingPreference,
              'ad_storage': trackingPreference,
              'ad_user_data': trackingPreference,
              'ad_personalization': trackingPreference
            });

            gtag('js', new Date());
            gtag('config', '${gaId}');
            gtag('config', '${GOOGLE_ADS_TAG_ID}');
          `,
        }}
      />
    </>
  );
}
