import { NextRequest, NextResponse } from 'next/server';
import { sendTikTokEvent } from '@/lib/tracking/tiktok-events-api';
import { getUnixTimestamp } from '@/lib/tracking/helpers';
import type { TrackingEventPayload, TrackingApiResponse } from '@/lib/tracking/types';

export async function POST(request: NextRequest): Promise<NextResponse<TrackingApiResponse>> {
    let eventName = 'unknown';
    let eventId = 'unknown';

    try {
        const body = await request.json();
        eventName = body.eventName || 'unknown';
        eventId = body.eventId || 'unknown';
        const { eventSourceUrl, userData = {}, customData } = body;

        if (eventName === 'unknown' || eventId === 'unknown') {
            return NextResponse.json(
                {
                    success: false,
                    platform: 'tiktok',
                    eventName,
                    eventId,
                    error: 'Missing required fields: eventName, eventId',
                },
                { status: 400 }
            );
        }

        const clientIp =
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const clientUserAgent = request.headers.get('user-agent') || 'unknown';

        const payload: TrackingEventPayload = {
            eventName: eventName as any,
            eventId,
            eventSourceUrl: eventSourceUrl || request.headers.get('referer') || '',
            eventTime: getUnixTimestamp(),
            userData: {
                ...userData,
                clientIpAddress: clientIp,
                clientUserAgent: clientUserAgent,
            },
            customData,
        };

        console.log(`[API:tiktok-event] Processing ${eventName} (event_id: ${eventId})`);

        const result = await sendTikTokEvent(payload);

        return NextResponse.json({
            success: true,
            platform: 'tiktok',
            eventName,
            eventId,
            debug: process.env.NODE_ENV === 'development' ? result : undefined,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`[API:tiktok-event] Error processing ${eventName}:`, errorMessage);

        return NextResponse.json(
            {
                success: false,
                platform: 'tiktok',
                eventName,
                eventId,
                error: errorMessage,
            },
            { status: 500 }
        );
    }
}
