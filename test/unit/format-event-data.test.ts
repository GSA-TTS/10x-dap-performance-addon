import { it, describe, expect } from 'vitest';
import { formatEventData } from '../../src/format-event-data.js';
import type {
  CLSAttribution,
  FCPAttribution,
  INPAttribution,
  LCPAttribution,
} from 'web-vitals';

describe('formatEventData', () => {
  it('should format CLS data correctly', () => {
    const attribution = {
      largestShiftTime: 1000,
      loadState: 'complete',
      largestShiftTarget: 'body>div#main',
    } satisfies CLSAttribution;

    const result = formatEventData('CLS', attribution);

    expect(result).toEqual({
      debug_time: attribution.largestShiftTime,
      debug_load_state: attribution.loadState,
      debug_target: attribution.largestShiftTarget,
    });
  });

  it('should format FCP data correctly', () => {
    const attribution = {
      timeToFirstByte: 7.199999999254942,
      firstByteToFCP: 456.9000000022352,
      loadState: 'dom-interactive',
    } satisfies FCPAttribution;

    const result = formatEventData('FCP', attribution);

    expect(result).toEqual({
      debug_time_to_first_byte: attribution.timeToFirstByte,
      debug_first_byte_to_fcp: attribution.firstByteToFCP,
      debug_load_state: attribution.loadState,
      debug_target: attribution.loadState,
    });
  });

  it('should format LCP data correctly', () => {
    const attribution = {
      url: 'https://localhost/',
      timeToFirstByte: 100,
      resourceLoadDelay: 50,
      resourceLoadDuration: 120,
      elementRenderDelay: 10,
      element: 'body>div#main',
    } satisfies LCPAttribution;

    const result = formatEventData('LCP', attribution);

    expect(result).toEqual({
      debug_url: attribution.url,
      debug_time_to_first_byte: attribution.timeToFirstByte,
      debug_resource_load_delay: attribution.resourceLoadDelay,
      debug_resource_load_duration: attribution.resourceLoadDuration,
      debug_element_render_delay: attribution.elementRenderDelay,
      debug_target: attribution.element,
    });
  });

  it('should format INP data correctly', () => {
    const attribution = {
      interactionTarget: 'html>body',
      interactionTargetElement: undefined,
      interactionType: 'keyboard',
      interactionTime: 235.5,
      nextPaintTime: 435.5,
      processedEventEntries: [],
      longAnimationFrameEntries: [],
      inputDelay: 0.5,
      processingDuration: 93,
      presentationDelay: 106.5,
      loadState: 'dom-interactive',
    } satisfies INPAttribution;

    const result = formatEventData('INP', attribution);

    expect(result).toEqual({
      debug_event: attribution.interactionType,
      debug_time: Math.round(attribution.interactionTime),
      debug_load_state: attribution.loadState,
      debug_target: attribution.interactionTarget,
      debug_interaction_delay: Math.round(attribution.inputDelay),
      debug_processing_duration: Math.round(attribution.processingDuration),
      debug_presentation_delay: Math.round(attribution.presentationDelay),
    });
  });

  it('should format TTFB data correctly', () => {
    const attribution = {
      waitingDuration: 0,
      cacheDuration: 0,
      dnsDuration: 0,
      connectionDuration: 2015,
      requestDuration: 47,
    };

    // @ts-ignore
    const result = formatEventData('TTFB', attribution);

    expect(result).toEqual({
      debug_cache_duration: attribution.cacheDuration,
      debug_connection_duration: attribution.connectionDuration,
      debug_dns_duration: attribution.dnsDuration,
      debug_request_duration: attribution.requestDuration,
      debug_waiting_duration: attribution.waitingDuration,
    });
  });

  it('should return default/empty params if no attribution data is provided', () => {
    // @ts-expect-error - unknown is not valid
    const result = formatEventData('unknown', null);

    expect(result).toEqual({
      debug_target: '(not set)',
    });
  });
});

/**
 * Samples of event data from the web-vitals.js package are below:
 */
// {
//   "name": "FCP",
//   "value": 464.1000000014901,
//   "rating": "good",
//   "delta": 464.1000000014901,
//   "entries": [
//     {
//       "name": "first-contentful-paint",
//       "entryType": "paint",
//       "startTime": 464.1000000014901,
//       "duration": 0
//     }
//   ],
//   "id": "v4-1732250059704-7238690615382",
//   "navigationType": "reload",
//   "attribution": {
//     "timeToFirstByte": 7.199999999254942,
//     "firstByteToFCP": 456.9000000022352,
//     "loadState": "dom-interactive",
//     "navigationEntry": {
//       "name": "http://localhost:8000/demo/",
//       "entryType": "navigation",
//       "startTime": 0,
//       "duration": 1734.800000000745,
//       "initiatorType": "navigation",
//       "deliveryType": "",
//       "nextHopProtocol": "http/1.1",
//       "renderBlockingStatus": "non-blocking",
//       "workerStart": 0,
//       "redirectStart": 0,
//       "redirectEnd": 0,
//       "fetchStart": 0.6000000014901161,
//       "domainLookupStart": 0.6000000014901161,
//       "domainLookupEnd": 0.6000000014901161,
//       "connectStart": 0.6000000014901161,
//       "secureConnectionStart": 0,
//       "connectEnd": 0.6000000014901161,
//       "requestStart": 5.5,
//       "responseStart": 7.199999999254942,
//       "firstInterimResponseStart": 0,
//       "responseEnd": 200,
//       "transferSize": 3126,
//       "encodedBodySize": 2826,
//       "decodedBodySize": 2826,
//       "responseStatus": 200,
//       "serverTiming": [],
//       "unloadEventStart": 204.19999999925494,
//       "unloadEventEnd": 204.19999999925494,
//       "domInteractive": 238.5,
//       "domContentLoadedEventStart": 641,
//       "domContentLoadedEventEnd": 641,
//       "domComplete": 1734.6000000014901,
//       "loadEventStart": 1734.800000000745,
//       "loadEventEnd": 1734.800000000745,
//       "type": "reload",
//       "redirectCount": 0,
//       "activationStart": 0,
//       "criticalCHRestart": 0,
//       "notRestoredReasons": null
//     },
//     "fcpEntry": {
//       "name": "first-contentful-paint",
//       "entryType": "paint",
//       "startTime": 464.1000000014901,
//       "duration": 0
//     }
//   }
// }

// {
//   "name": "CLS",
//   "value": 0.18760427522244383,
//   "rating": "needs-improvement",
//   "delta": 0.18760427522244383,
//   "entries": [
//     {
//       "name": "",
//       "entryType": "layout-shift",
//       "startTime": 41231.199999999255,
//       "duration": 0,
//       "value": 0.18760427522244383,
//       "hadRecentInput": false,
//       "lastInputTime": 22225.5,
//       "sources": [
//         {
//           "previousRect": {
//             "x": 10,
//             "y": 20,
//             "width": 1206,
//             "height": 827,
//             "top": 20,
//             "right": 1216,
//             "bottom": 847,
//             "left": 10
//           },
//           "currentRect": {
//             "x": 200,
//             "y": 20,
//             "width": 1500,
//             "height": 827,
//             "top": 20,
//             "right": 1700,
//             "bottom": 847,
//             "left": 200
//           }
//         }
//       ]
//     }
//   ],
//   "id": "v4-1732248835185-2440428636027",
//   "navigationType": "reload",
//   "attribution": {
//     "largestShiftTarget": "html>body>main",
//     "largestShiftTime": 41231.199999999255,
//     "largestShiftValue": 0.18760427522244383,
//     "largestShiftSource": {
//       "previousRect": {
//         "x": 10,
//         "y": 20,
//         "width": 1206,
//         "height": 827,
//         "top": 20,
//         "right": 1216,
//         "bottom": 847,
//         "left": 10
//       },
//       "currentRect": {
//         "x": 200,
//         "y": 20,
//         "width": 1500,
//         "height": 827,
//         "top": 20,
//         "right": 1700,
//         "bottom": 847,
//         "left": 200
//       }
//     },
//     "largestShiftEntry": {
//       "name": "",
//       "entryType": "layout-shift",
//       "startTime": 41231.199999999255,
//       "duration": 0,
//       "value": 0.18760427522244383,
//       "hadRecentInput": false,
//       "lastInputTime": 22225.5,
//       "sources": [
//         {
//           "previousRect": {
//             "x": 10,
//             "y": 20,
//             "width": 1206,
//             "height": 827,
//             "top": 20,
//             "right": 1216,
//             "bottom": 847,
//             "left": 10
//           },
//           "currentRect": {
//             "x": 200,
//             "y": 20,
//             "width": 1500,
//             "height": 827,
//             "top": 20,
//             "right": 1700,
//             "bottom": 847,
//             "left": 200
//           }
//         }
//       ]
//     },
//     "loadState": "complete"
//   }
// }

// {
//   "name": "INP",
//   "value": 200,
//   "rating": "good",
//   "delta": 200,
//   "entries": [
//     {
//       "name": "keydown",
//       "entryType": "event",
//       "startTime": 235.5,
//       "duration": 200,
//       "interactionId": 5895,
//       "processingStart": 236,
//       "processingEnd": 236.19999999925494,
//       "cancelable": true
//     },
//     {
//       "name": "keydown",
//       "entryType": "first-input",
//       "startTime": 235.5,
//       "duration": 200,
//       "interactionId": 5895,
//       "processingStart": 236,
//       "processingEnd": 236.19999999925494,
//       "cancelable": true
//     }
//   ],
//   "id": "v4-1732248835183-2066001653100",
//   "navigationType": "reload",
//   "attribution": {
//     "interactionTarget": "html>body",
//     "interactionTargetElement": {},
//     "interactionType": "keyboard",
//     "interactionTime": 235.5,
//     "nextPaintTime": 435.5,
//     "processedEventEntries": [
//       {
//         "name": "keydown",
//         "entryType": "event",
//         "startTime": 235.5,
//         "duration": 200,
//         "interactionId": 5895,
//         "processingStart": 236,
//         "processingEnd": 236.19999999925494,
//         "cancelable": true
//       },
//       {
//         "name": "keydown",
//         "entryType": "first-input",
//         "startTime": 235.5,
//         "duration": 200,
//         "interactionId": 5895,
//         "processingStart": 236,
//         "processingEnd": 236.19999999925494,
//         "cancelable": true
//       },
//       {
//         "name": "keydown",
//         "entryType": "event",
//         "startTime": 267.69999999925494,
//         "duration": 168,
//         "interactionId": 5902,
//         "processingStart": 268.19999999925494,
//         "processingEnd": 268.30000000074506,
//         "cancelable": true
//       },
//       {
//         "name": "keydown",
//         "entryType": "event",
//         "startTime": 299.30000000074506,
//         "duration": 136,
//         "interactionId": 5909,
//         "processingStart": 300.30000000074506,
//         "processingEnd": 300.30000000074506,
//         "cancelable": true
//       },
//       {
//         "name": "keydown",
//         "entryType": "event",
//         "startTime": 328.30000000074506,
//         "duration": 104,
//         "interactionId": 5916,
//         "processingStart": 328.8999999985099,
//         "processingEnd": 329,
//         "cancelable": true
//       }
//     ],
//     "longAnimationFrameEntries": [
//       {
//         "name": "long-animation-frame",
//         "entryType": "long-animation-frame",
//         "startTime": 200.19999999925494,
//         "duration": 211,
//         "renderStart": 410.30000000074506,
//         "styleAndLayoutStart": 410.3999999985099,
//         "firstUIEventTimestamp": 47.5,
//         "blockingDuration": 0,
//         "scripts": []
//       }
//     ],
//     "inputDelay": 0.5,
//     "processingDuration": 93,
//     "presentationDelay": 106.5,
//     "loadState": "dom-interactive"
//   }
// }

// {
//   "name": "LCP",
//   "value": 2153,
//   "rating": "good",
//   "delta": 2153,
//   "entries": [
//     {
//       "name": "",
//       "entryType": "largest-contentful-paint",
//       "startTime": 2153,
//       "duration": 0,
//       "renderTime": 2153,
//       "loadTime": 0,
//       "size": 18772,
//       "id": "",
//       "url": ""
//     }
//   ],
//   "id": "v4-1732246616056-1151471966610",
//   "navigationType": "reload",
//   "attribution": {
//     "element": "html>body>main>h1",
//     "timeToFirstByte": 2046,
//     "resourceLoadDelay": 0,
//     "resourceLoadDuration": 0,
//     "elementRenderDelay": 107,
//     "navigationEntry": {
//       "name": "http://localhost:8000/demo/",
//       "entryType": "navigation",
//       "startTime": 0,
//       "duration": 2592,
//       "initiatorType": "navigation",
//       "nextHopProtocol": "http/1.1",
//       "workerStart": 0,
//       "redirectStart": 0,
//       "redirectEnd": 0,
//       "fetchStart": 6,
//       "domainLookupStart": 14,
//       "domainLookupEnd": 14,
//       "connectStart": 14,
//       "connectEnd": 2038,
//       "secureConnectionStart": 0,
//       "requestStart": 2042,
//       "responseStart": 2046,
//       "responseEnd": 2046,
//       "transferSize": 3159,
//       "encodedBodySize": 2859,
//       "decodedBodySize": 2859,
//       "responseStatus": 200,
//       "contentType": "text/html",
//       "serverTiming": [],
//       "unloadEventStart": 2053,
//       "unloadEventEnd": 2054,
//       "domInteractive": 2093,
//       "domContentLoadedEventStart": 2157,
//       "domContentLoadedEventEnd": 2158,
//       "domComplete": 2592,
//       "loadEventStart": 2592,
//       "loadEventEnd": 2592,
//       "type": "reload",
//       "redirectCount": 0
//     },
//     "lcpEntry": {
//       "name": "",
//       "entryType": "largest-contentful-paint",
//       "startTime": 2153,
//       "duration": 0,
//       "renderTime": 2153,
//       "loadTime": 0,
//       "size": 18772,
//       "id": "",
//       "url": ""
//     }
//   }
// }

// {
//   "name": "TTFB",
//   "value": 2062,
//   "rating": "poor",
//   "delta": 2062,
//   "entries": [
//     {
//       "name": "http://localhost:8000/demo/",
//       "entryType": "navigation",
//       "startTime": 0,
//       "duration": 4181,
//       "initiatorType": "navigation",
//       "nextHopProtocol": "http/1.1",
//       "workerStart": 0,
//       "redirectStart": 0,
//       "redirectEnd": 0,
//       "fetchStart": -21,
//       "domainLookupStart": -21,
//       "domainLookupEnd": -21,
//       "connectStart": -21,
//       "connectEnd": 2015,
//       "secureConnectionStart": 0,
//       "requestStart": 2016,
//       "responseStart": 2062,
//       "responseEnd": 2062,
//       "transferSize": 4277,
//       "encodedBodySize": 3977,
//       "decodedBodySize": 3977,
//       "responseStatus": 200,
//       "contentType": "text/html",
//       "serverTiming": [],
//       "unloadEventStart": 0,
//       "unloadEventEnd": 0,
//       "domInteractive": 2126,
//       "domContentLoadedEventStart": 2199,
//       "domContentLoadedEventEnd": 2200,
//       "domComplete": 4180,
//       "loadEventStart": 4180,
//       "loadEventEnd": 4181,
//       "type": "navigate",
//       "redirectCount": 0
//     }
//   ],
//   "id": "v4-1732826806920-8943990242578",
//   "navigationType": "navigate",
//   "attribution": {
//     "waitingDuration": 0,
//     "cacheDuration": 0,
//     "dnsDuration": 0,
//     "connectionDuration": 2015,
//     "requestDuration": 47,
//     "navigationEntry": {
//       "name": "http://localhost:8000/demo/",
//       "entryType": "navigation",
//       "startTime": 0,
//       "duration": 4181,
//       "initiatorType": "navigation",
//       "nextHopProtocol": "http/1.1",
//       "workerStart": 0,
//       "redirectStart": 0,
//       "redirectEnd": 0,
//       "fetchStart": -21,
//       "domainLookupStart": -21,
//       "domainLookupEnd": -21,
//       "connectStart": -21,
//       "connectEnd": 2015,
//       "secureConnectionStart": 0,
//       "requestStart": 2016,
//       "responseStart": 2062,
//       "responseEnd": 2062,
//       "transferSize": 4277,
//       "encodedBodySize": 3977,
//       "decodedBodySize": 3977,
//       "responseStatus": 200,
//       "contentType": "text/html",
//       "serverTiming": [],
//       "unloadEventStart": 0,
//       "unloadEventEnd": 0,
//       "domInteractive": 2126,
//       "domContentLoadedEventStart": 2199,
//       "domContentLoadedEventEnd": 2200,
//       "domComplete": 4180,
//       "loadEventStart": 4180,
//       "loadEventEnd": 4181,
//       "type": "navigate",
//       "redirectCount": 0
//     }
//   }
// }
