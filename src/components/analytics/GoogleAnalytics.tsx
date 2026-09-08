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

    function handleBookingClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href*="booking.masuyo.ch"]'
      );
      if (!anchor) return;

      if (typeof window.gtag === "function") {
        const label =
          anchor.innerText?.trim() ||
          anchor.getAttribute("aria-label") ||
          "Termin online buchen";

        window.gtag("event", "cta_booking_click", {
          event_category: "conversion",
          event_label: label,
          page_location: window.location.href,
          link_url: anchor.href,
        });
      }
    }

    window.addEventListener(GA_OPTOUT_EVENT, handleOptOutChange);
    document.addEventListener("click", handleBookingClick, { capture: true });

    return () => {
      window.removeEventListener(GA_OPTOUT_EVENT, handleOptOutChange);
      document.removeEventListener("click", handleBookingClick, { capture: true });
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
          `,
        }}
      />
    </>
  );
}
