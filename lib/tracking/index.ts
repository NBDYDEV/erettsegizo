// ─── Tracking Module — Barrel Exports ────────────────────────────────────────
// Central entry point for all tracking functionality.
// Usage: import { generateEventId, trackMetaLead, ... } from '@/lib/tracking';

// Types
export type {
  TrackingEventName,
  TrackingUserData,
  TrackingCustomData,
  TrackingEventPayload,
  TrackingApiResponse,
} from './types';

export { TIKTOK_EVENT_MAP } from './types';

// Helpers
export {
  generateEventId,
  getUnixTimestamp,
  hashForTracking,
  getCookie,
  setCookie,
  captureFbclid,
  getFbp,
  captureTtclid,
  getTtp,
  trackingLog,
} from './helpers';

// Meta Pixel (browser-side)
export {
  initMetaPixel,
  trackMetaEvent,
  trackMetaPageView,
  trackMetaLead,
  trackMetaPurchase,
} from './meta-pixel';

// Meta Conversions API (server-side)
export { sendMetaEvent } from './meta-capi';

// TikTok Pixel (browser-side)
export {
  initTikTokPixel,
  trackTikTokEvent,
  trackTikTokPageView,
  trackTikTokLead,
  trackTikTokPurchase,
  identifyTikTokUser,
} from './tiktok-pixel';

// TikTok Events API (server-side)
export { sendTikTokEvent } from './tiktok-events-api';

// Google Analytics (GA4) - Browser-side
export {
  initGAPixel,
  trackGAEvent,
  trackGAPageView,
  trackGALead,
  trackGAPurchase,
} from './google-analytics';

// Google Analytics (GA4) - Server-side (Measurement Protocol)
export { sendGAEvent } from './google-measurement-protocol';

// SalesAutopilot Integration
export {
  storeTrackingEventId,
  getStoredTrackingEventId,
  storeLeadData,
  getStoredLeadData,
  collectTrackingCookies,
  buildTrackingUserData,
  buildLeadCustomData,
  buildPurchaseCustomData,
} from './salesautopilot';
