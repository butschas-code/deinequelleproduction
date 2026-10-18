import { test } from "node:test";
import assert from "node:assert/strict";
import {
  recordGoogleAdsArrival,
  GOOGLE_ADS_ARRIVAL_STORAGE_KEY,
} from "../src/lib/google-ads-arrival.ts";

function setup() {
  const values = new Map();
  const events = [];
  const options = {
    href: "https://www.deinequelle.com/?gclid=first-click",
    gaId: "G-TEST",
    trackingEnabled: true,
    analyticsOptedOut: false,
    now: 2_000_000_000_000,
    storage: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
      removeItem: (key) => values.delete(key),
    },
    emitEvent: (...args) => events.push(args),
  };
  return { values, events, options };
}

test("reload and saved click URL count once; a different click counts again", () => {
  const { options, events } = setup();
  assert.equal(recordGoogleAdsArrival(options), true);
  assert.equal(recordGoogleAdsArrival(options), false);
  assert.equal(recordGoogleAdsArrival({ ...options, href: "https://www.deinequelle.com/kontakt?gclid=first-click" }), false);
  assert.equal(recordGoogleAdsArrival({ ...options, href: "https://www.deinequelle.com/?gclid=second-click" }), true);
  assert.deepEqual(events, [
    ["google_ads_arrival", { send_to: "G-TEST" }],
    ["google_ads_arrival", { send_to: "G-TEST" }],
  ]);
});

test("unpaid and braid-only visits do not count", () => {
  const { options, events, values } = setup();
  for (const suffix of ["", "?utm_source=google", "?wbraid=one", "?gbraid=two", "?gclid="]) {
    assert.equal(recordGoogleAdsArrival({ ...options, href: "https://www.deinequelle.com/" + suffix }), false);
  }
  assert.equal(events.length, 0);
  assert.equal(values.size, 0);
});

test("disabled and opted-out visitors are neither stored nor counted", () => {
  const { options, events } = setup();
  const noAccess = {
    getItem() { assert.fail("storage read while disabled"); },
    setItem() { assert.fail("storage write while disabled"); },
    removeItem() { assert.fail("storage removal while disabled"); },
  };
  assert.equal(recordGoogleAdsArrival({ ...options, storage: noAccess, trackingEnabled: false }), false);
  assert.equal(recordGoogleAdsArrival({ ...options, storage: noAccess, analyticsOptedOut: true }), false);
  assert.equal(events.length, 0);
});

test("enabling tracking later counts the current arrival just once", () => {
  const { options, events } = setup();
  assert.equal(recordGoogleAdsArrival({ ...options, trackingEnabled: false }), false);
  assert.equal(recordGoogleAdsArrival(options), true);
  assert.equal(recordGoogleAdsArrival(options), false);
  assert.equal(events.length, 1);
});

test("storage failure prevents an event rather than creating refresh duplicates", () => {
  const { options, events } = setup();
  for (const method of ["getItem", "setItem"]) {
    assert.equal(recordGoogleAdsArrival({ ...options, storage: { ...options.storage, [method]() { throw new Error("blocked"); } } }), false);
  }
  assert.equal(events.length, 0);
});

test("invalid and expired ledger data is repaired; recent IDs remain deduplicated", () => {
  const { options, values } = setup();
  values.set(GOOGLE_ADS_ARRIVAL_STORAGE_KEY, "not-json");
  assert.equal(recordGoogleAdsArrival(options), true);
  values.set(GOOGLE_ADS_ARRIVAL_STORAGE_KEY, JSON.stringify([
    { id: "expired", at: options.now - 31 * 86400000 },
    { id: "first-click", at: options.now },
    null,
    { id: "future", at: options.now + 1 },
  ]));
  assert.equal(recordGoogleAdsArrival(options), false);
  assert.equal(recordGoogleAdsArrival({ ...options, href: "https://www.deinequelle.com/?gclid=new-click" }), true);
  assert.deepEqual(JSON.parse(values.get(GOOGLE_ADS_ARRIVAL_STORAGE_KEY)).map(x => x.id), ["first-click", "new-click"]);
});

test("failed event queue restores the ledger so a retry can succeed", () => {
  const { options, values, events } = setup();
  assert.equal(recordGoogleAdsArrival({ ...options, emitEvent() { throw new Error("queue unavailable"); } }), false);
  assert.equal(values.size, 0);
  assert.equal(recordGoogleAdsArrival(options), true);
  assert.equal(events.length, 1);
});
