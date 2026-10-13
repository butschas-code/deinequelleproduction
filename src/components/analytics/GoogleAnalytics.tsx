"use client";

import { useEffect } from "react";
import Script from "next/script";
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

export const GA_OPTOUT_EVENT = "deinequelle:ga-optout";

const GOOGLE_ADS_TAG_ID = "AW-18422643465";
const WHATSAPP_CONVERSION_DESTINATION =
  "AW-18422643465/FS3jCJyEgI0dEIn2zNBE";

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (!gaId) return;

    function handleOptOutChange(e: Event) {
      const customEvent = e as CustomEvent<{ optedOut: boolean }>;
      const isOptedOut = customEvent.detail?.optedOut;
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: isOptedOut ? "denied" : "granted",
          ad_storage: isOptedOut ? "denied" : "granted",
          ad_user_data: isOptedOut ? "denied" : "granted",
          ad_personalization: isOptedOut ? "denied" : "granted",
        });
      }
    }

    function handleConversionClick(e: MouseEvent) {
      const anchor = (e.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href*="booking.masuyo.ch"], a[href^="https://wa.me/"]'
      );
      if (!anchor || typeof window.gtag !== "function") return;

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

    window.addEventListener(GA_OPTOUT_EVENT, handleOptOutChange);
    document.addEventListener("click", handleConversionClick, { capture: true });

    return () => {
      window.removeEventListener(GA_OPTOUT_EVENT, handleOptOutChange);
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
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            try {
              var isOptedOut = localStorage.getItem('ga-disable-${gaId}') === 'true';
              if (isOptedOut) {
                window['ga-disable-${gaId}'] = true;
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied'
                });
              } else {
                gtag('consent', 'default', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted'
                });
              }
            } catch (e) {
              gtag('consent', 'default', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
              });
            }

            gtag('js', new Date());
            gtag('config', '${gaId}');
            gtag('config', '${GOOGLE_ADS_TAG_ID}');
          `,
        }}
      />
    </>
  );
}
