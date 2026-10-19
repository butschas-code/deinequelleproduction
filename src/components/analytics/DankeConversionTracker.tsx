"use client";

import { useEffect } from "react";
import { site } from "@/data/site";
import { isAnalyticsTrackingEnabled } from "@/lib/consent";

export function DankeConversionTracker() {
  useEffect(() => {
    try {
      if (typeof window.gtag !== "function") return;
      const gaId = site.googleAnalyticsId;
      if (
        !isAnalyticsTrackingEnabled(
          gaId,
          localStorage,
          window[`ga-disable-${gaId}`] === true
        )
      ) {
        return;
      }

      // Standard GA4 lead conversion event
      window.gtag("event", "generate_lead", {
        send_to: gaId,
        event_category: "conversion",
        event_label: "Kontaktformular Absendung",
        page_location: window.location.href,
      });

      // Custom event for granular reporting and GA4 key events
      window.gtag("event", "lead_form_submitted", {
        send_to: gaId,
        page_location: window.location.href,
      });

      // Custom event matching the single Primary Google Ads action: info_gesprach_form_submit
      window.gtag("event", "info_gesprach_form_submit", {
        send_to: gaId,
        page_location: window.location.href,
      });
    } catch {
      // Optional tracking must never interrupt user experience
    }
  }, []);

  return null;
}
