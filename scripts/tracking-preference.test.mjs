import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isAnalyticsTrackingEnabled, CONSENT_STORAGE_KEY } from '../src/lib/consent.ts';
const gaId='G-TEST';
const store=(values={})=>({getItem:key=>values[key]??null});

test('default-on preference does not require or fabricate an acceptance record',()=>{
 assert.equal(isAnalyticsTrackingEnabled(gaId,store()),true);
});
test('persistent opt-out and runtime disable each take precedence',()=>{
 assert.equal(isAnalyticsTrackingEnabled(gaId,store({[`ga-disable-${gaId}`]:'true'})),false);
 assert.equal(isAnalyticsTrackingEnabled(gaId,store(),true),false);
});
test('older rejected choices remain disabled',()=>{
 assert.equal(isAnalyticsTrackingEnabled(gaId,store({[CONSENT_STORAGE_KEY]:'rejected'})),false);
 assert.equal(isAnalyticsTrackingEnabled(gaId,store({[CONSENT_STORAGE_KEY]:'accepted'})),true);
 assert.equal(isAnalyticsTrackingEnabled(gaId,store({[CONSENT_STORAGE_KEY]:'accepted',[`ga-disable-${gaId}`]:'true'})),false);
});
test('storage failure and missing measurement ID fail closed',()=>{
 assert.equal(isAnalyticsTrackingEnabled(gaId,{getItem(){throw new Error('blocked')}}),false);
 assert.equal(isAnalyticsTrackingEnabled('',store()),false);
});
