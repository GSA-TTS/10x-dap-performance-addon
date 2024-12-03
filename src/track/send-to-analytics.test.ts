import {
  sendToAnalytics,
  type WebVitalsWithAttribution,
} from './send-to-analytics.js';
import { formatEventData } from '../format/format-event-data.js';
import { describe, expect, it, vi, afterEach } from 'vitest';
import type { TTFBMetricWithAttribution } from 'web-vitals';

declare global {
  function gas4(): void;
}
globalThis.gas4 = (): void => {
  /*no-op*/
};

const createDefaultPayload = (): WebVitalsWithAttribution => {
  return {
    name: 'TTFB',
    value: 2062,
    rating: 'poor',
    delta: 2062,
    entries: [
      {
        name: 'http://localhost:8000/demo/',
        entryType: 'navigation',
        startTime: 0,
        duration: 4181,
        initiatorType: 'navigation',
        nextHopProtocol: 'http/1.1',
        workerStart: 0,
        redirectStart: 0,
        redirectEnd: 0,
        fetchStart: -21,
        domainLookupStart: -21,
        domainLookupEnd: -21,
        connectStart: -21,
        connectEnd: 2015,
        secureConnectionStart: 0,
        requestStart: 2016,
        responseStart: 2062,
        responseEnd: 2062,
        transferSize: 4277,
        encodedBodySize: 3977,
        decodedBodySize: 3977,
        responseStatus: 200,
        contentType: 'text/html',
        serverTiming: [],
        unloadEventStart: 0,
        unloadEventEnd: 0,
        domInteractive: 2126,
        domContentLoadedEventStart: 2199,
        domContentLoadedEventEnd: 2200,
        domComplete: 4180,
        loadEventStart: 4180,
        loadEventEnd: 4181,
        type: 'navigate',
        redirectCount: 0,
      },
    ],
    id: 'v4-1732826806920-8943990242578',
    navigationType: 'navigate',
    attribution: {
      waitingDuration: 0,
      cacheDuration: 0,
      dnsDuration: 0,
      connectionDuration: 2015,
      requestDuration: 47,
      navigationEntry: {
        name: 'http://localhost:8000/demo/',
        entryType: 'navigation',
        startTime: 0,
        duration: 4181,
        initiatorType: 'navigation',
        nextHopProtocol: 'http/1.1',
        workerStart: 0,
        redirectStart: 0,
        redirectEnd: 0,
        fetchStart: -21,
        domainLookupStart: -21,
        domainLookupEnd: -21,
        connectStart: -21,
        connectEnd: 2015,
        secureConnectionStart: 0,
        requestStart: 2016,
        responseStart: 2062,
        responseEnd: 2062,
        transferSize: 4277,
        encodedBodySize: 3977,
        decodedBodySize: 3977,
        responseStatus: 200,
        contentType: 'text/html',
        serverTiming: [],
        unloadEventStart: 0,
        unloadEventEnd: 0,
        domInteractive: 2126,
        domContentLoadedEventStart: 2199,
        domContentLoadedEventEnd: 2200,
        domComplete: 4180,
        loadEventStart: 4180,
        loadEventEnd: 4181,
        type: 'navigate',
        redirectCount: 0,
      },
    },
  } satisfies TTFBMetricWithAttribution;
};

describe('sendToAnalytics', () => {
  it('should correctly send event to analytics if gas4 function is defined', () => {
    const gas4Spy = (globalThis.gas4 = vi.fn());
    const payload = createDefaultPayload();
    sendToAnalytics(payload);
    expect(gas4Spy).toHaveBeenCalledWith(payload.name, {
      value: payload.delta,
      metric_id: payload.id,
      metric_value: payload.value,
      metric_delta: payload.delta,
      metric_navigation_type: payload.navigationType,
      ...formatEventData(payload.name, payload.attribution),
    });
  });

  it('should not send event to analytics if gas4 function is not defined', () => {
    delete globalThis.gas4;
    const payload = createDefaultPayload();
    sendToAnalytics(payload);
    expect(globalThis.gas4).toBeUndefined();
  });

  afterEach(() => {
    delete globalThis.gas4;
  });
});
