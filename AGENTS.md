<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — Deine Quelle Production

Welcome to the **Deine Quelle** codebase (`deinequelleproduction`). This file provides AI agents (Antigravity, Claude, Codex, etc.) with essential technical context, tracking configuration, and connection instructions for Google Ads and related tools.

---

## 1. Project & Brand Overview

* **Client:** Claudia Dimmler
* **Business / Brand:** *Deine Quelle* (Praxis für Kinesiologie & ganzheitliche Begleitung / Yoga)
* **Location:** Lucerne & Adligenswil, Switzerland (Praxis: Meggerstrasse 4a, 6043 Adligenswil; and Lucerne)
* **Live Website URLs:**
  * **Kinderwunsch:** `https://www.deinequelle.com/leistungen/kinderwunsch`
  * **Kinesiologie:** `https://www.deinequelle.com/leistungen/kinesiologie`
  * **Yoga:** `https://www.deinequelle.com/leistungen/yoga`
  * **Contact & Practice:** `https://www.deinequelle.com/kontakt`
  * **Online Booking Flow:** `https://booking.masuyo.ch/dimmler`
* **Copywriting Rules:** Swiss German standard (strictly **no sharp s `ß`**; use `ss`).

---

## 2. Google Ads Account Architecture & MCP Connection

Antigravity and MCP-enabled agents have direct programmatic access to this project's Google Ads account via the **`google-ads` MCP server**.

### 2.1 Account Credentials & IDs
* **Customer ID:** **`5530142999`** (*Deine Quelle - Kinesiologie / Deine Quelle - Yoga*)
* **Manager Account (MCC):** `3733873633` (*Peter Google Ads Manager*)
* **Account Currency:** `CHF` | **Time Zone:** `Europe/Zurich`
* **Auto-Tagging:** `ENABLED` (appends `gclid` for GA4 attribution)

### 2.2 Live Campaigns Summary

| Campaign Name | Campaign ID | Status | Budget | Strategy | Main Target Area |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Kinderwunschbegleitung Luzern - Search** | `24221848785` | `PAUSED` | CHF 9.85 / day | `MAXIMIZE_CLICKS` | Lucerne City & Canton, Luzern-Land |
| **Kinesiologie Adligenswil - Search** | `24309652772` | `ENABLED` | CHF 6.00 / day | `MAXIMIZE_CONVERSIONS` | Adligenswil, Lucerne, Küssnacht, Luzern-Land |
| **DeineQuelle Yoga - Adligenswil - Search** | `24354435005` | `PAUSED` | CHF 3.00 / day (prov.) | `MAXIMIZE_CLICKS` | 3.5 km radius around Adligenswil |

### 2.3 How to Connect & Execute via MCP
1. **Always specify Customer ID:** Pass `"customer_id": "5530142999"` on every tool call (otherwise tools default to the global test account `832-045-7870`).
2. **Two-Phase Execution Pattern:** Mutating tools return a `plan_id`. Apply mutations via:
   ```json
   {
     "plan_id": "<plan_id>",
     "dry_run": false,
     "bypass_require_dry_run": true
   }
   ```
3. **Fertility & Health Policy Exemption:** If modifying fertility keywords or ads triggers `HEALTH_IN_PERSONALIZED_ADS` or `BIRTH_CONTROL`, pass `"exempt_policy_violations": true` to apply with exemption.
4. **Common Commands:**
   * **Performance:** `get_campaign_performance` with `{"customer_id": "5530142999"}`
   * **Search Terms:** `get_search_terms` with `{"customer_id": "5530142999", "campaign_id": "24309652772"}`
   * **Query GAQL:** `run_gaql` with `{"customer_id": "5530142999", "query": "..."}`

---

## 3. Website Analytics & Conversion Tracking

* **Primary Conversion Goal:** `DEINE QUELLE | WhatsApp-Klick (Website)` (ID: `7811891740`)
  * Tracks WhatsApp enquiry clicks from Kinesiologie and Yoga pages.
* **Secondary Conversion Goal:** `deine quelle website (web) cta_booking_click` (ID: `7753246493`)
  * Tracks outbound appointment clicks to `booking.masuyo.ch/dimmler`.
* **Privacy & Opt-Out:**
  * Tracking is default-on without an intrusive banner (Swiss FADP compliant).
  * A persistent opt-out toggle is provided on `/datenschutz` (*Webanalyse und Anzeigenmessung*) which sets the local opt-out ledger and suppresses all Google measurement pings.

---

## 4. Single Source of Truth & Vault Reference

> [!NOTE]
> **Canonical Project Dossier:**  
> Detailed marketing strategy, full keyword lists, exact ad copy variations, client meeting transcripts, and historical performance audit PDFs are maintained in the local Obsidian vault:  
> [`02-projects/Active Projects/Claudia Dimmler/agent.md`](file:///Users/peter/BRAIN-LOCAL/02-projects/Active%20Projects/Claudia%20Dimmler/agent.md)
> 
> To prevent duplication drift and protect private client notes from being committed to the public/remote git repository, do not copy sensitive raw transcripts or internal strategic plans into this codebase. Keep code and technical metadata here, and consult the vault for strategic depth.
