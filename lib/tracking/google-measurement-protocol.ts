// ─── Google Analytics (GA4) Measurement Protocol — Server-Side ────────────────
// Sends events to Google Analytics via the Measurement Protocol API.
// Used by the /api/google-event route handler.

import type { TrackingEventPayload } from './types';

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
const API_SECRET = process.env.GA_MEASUREMENT_PROTOCOL_API_SECRET || '';
const MP_API_URL = `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;

interface GA4MPResponse {
  success: boolean;
  messages?: string[];
}

/**
 * Send an event to GA4 Measurement Protocol.
 * 
 * @param payload - The standardized tracking event payload
 * @returns Object indicating success or failure
 */
export async function sendGAEvent(
  payload: TrackingEventPayload
): Promise<GA4MPResponse> {
  if (!MEASUREMENT_ID || !API_SECRET) {
    console.warn('[Tracking:GA4] Measurement Protocol not configured — MEASUREMENT_ID or API_SECRET missing');
    return { success: false, messages: ['Not configured'] };
  }

  // client_id is required. We prioritize the one from the browser (_ga cookie).
  // If not available, we fall back to eventId or generate a consistent one.
  const clientId = payload.userData.gaClientId || payload.eventId;

  let gaEventName: string;
  switch (payload.eventName) {
    case 'PageView': gaEventName = 'page_view'; break;
    case 'Lead': gaEventName = 'generate_lead'; break;
    case 'Purchase': gaEventName = 'purchase'; break;
    default: gaEventName = (payload.eventName as string).toLowerCase();
  }

  const eventData: Record<string, unknown> = {
    name: gaEventName,
    params: {
      event_id: payload.eventId,
      page_location: payload.eventSourceUrl,
      engagement_time_msec: '100', // Dummy value for session continuity
    },
  };

  // Add conversion data if present
  if (payload.customData) {
    const params = eventData.params as Record<string, unknown>;
    if (payload.customData.value !== undefined) params.value = payload.customData.value;
    if (payload.customData.currency) params.currency = payload.customData.currency;
    if (payload.customData.contentName) params.item_name = payload.customData.contentName;
    
    // For purchase events, GA4 MP expects items array
    if (payload.eventName === 'Purchase') {
      params.transaction_id = payload.eventId;
      params.items = [
        {
          item_id: payload.customData.contentIds?.[0] || 'default_product',
          item_name: payload.customData.contentName || 'Product',
          price: payload.customData.value,
          quantity: 1,
        }
      ];
    }
  }

  const body = JSON.stringify({
    client_id: clientId,
    events: [eventData],
  });

  console.log(`[Tracking:GA4] MP → ${payload.eventName} (event_id: ${payload.eventId})`);

  try {
    const response = await fetch(MP_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    // Measurement Protocol returns 204 No Content on success (and most validation failures)
    // To actually see validation errors, one would use /debug/mp/collect
    if (!response.ok) {
      console.error('[Tracking:GA4] MP error:', response.statusText);
      return { success: false, messages: [response.statusText] };
    }

    console.log(`[Tracking:GA4] MP ✓ event sent successfully`);
    return { success: true };
  } catch (error) {
    console.error('[Tracking:GA4] MP request failed:', error);
    return { success: false, messages: [(error as Error).message] };
  }
}
