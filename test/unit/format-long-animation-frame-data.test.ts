import { it, describe, expect } from 'vitest';
import { formatLongAnimationFrameData } from '../../src/format-long-animation-frame-data.js';

describe('formatLongAnimationFrameData', () => {
  it('should format INP data correctly', () => {
    const attribution = {
      "interactionTarget": "#thrash-layout",
      "interactionTargetElement": {},
      "interactionType": "pointer",
      "interactionTime": 5168847,
      "nextPaintTime": 5168951,
      "processedEventEntries": [
        {
          "name": "pointerup",
          "entryType": "event",
          "startTime": 5168847,
          "duration": 104,
          "interactionId": 3343,
          "processingStart": 5168847.799999952,
          "processingEnd": 5168847.799999952,
          "cancelable": true
        },
        {
          "name": "mouseup",
          "entryType": "event",
          "startTime": 5168847,
          "duration": 104,
          "interactionId": 0,
          "processingStart": 5168847.799999952,
          "processingEnd": 5168847.799999952,
          "cancelable": true
        },
        {
          "name": "click",
          "entryType": "event",
          "startTime": 5168847,
          "duration": 104,
          "interactionId": 3343,
          "processingStart": 5168847.799999952,
          "processingEnd": 5168933.600000024,
          "cancelable": true
        },
        {
          "name": "pointerup",
          "entryType": "event",
          "startTime": 5168847,
          "duration": 104,
          "interactionId": 3343,
          "processingStart": 5168847.799999952,
          "processingEnd": 5168847.799999952,
          "cancelable": true
        },
        {
          "name": "mouseup",
          "entryType": "event",
          "startTime": 5168847,
          "duration": 104,
          "interactionId": 0,
          "processingStart": 5168847.799999952,
          "processingEnd": 5168847.799999952,
          "cancelable": true
        },
        {
          "name": "click",
          "entryType": "event",
          "startTime": 5168847,
          "duration": 104,
          "interactionId": 3343,
          "processingStart": 5168847.799999952,
          "processingEnd": 5168933.600000024,
          "cancelable": true
        }
      ],
      "longAnimationFrameEntries": [
        {
          "name": "long-animation-frame",
          "entryType": "long-animation-frame",
          "startTime": 5168847.600000024,
          "duration": 90,
          "renderStart": 5168936.1999999285,
          "styleAndLayoutStart": 5168936.1999999285,
          "firstUIEventTimestamp": 5168847,
          "blockingDuration": 38,
          "scripts": [
            {
              "name": "script",
              "entryType": "script",
              "startTime": 5168847.899999976,
              "duration": 85,
              "invoker": "BUTTON#thrash-layout.onclick",
              "invokerType": "event-listener",
              "windowAttribution": "self",
              "executionStart": 5168847.899999976,
              "forcedStyleAndLayoutDuration": 80,
              "pauseDuration": 0,
              "sourceURL": "http://localhost:8000/demo/",
              "sourceFunctionName": "",
              "sourceCharPosition": 72
            }
          ]
        }
      ],
      "inputDelay": 0.7999999523162842,
      "processingDuration": 85.80000007152557,
      "presentationDelay": 17.399999976158142,
      "loadState": "complete"
    };

    // @ts-ignore
    const result = formatLongAnimationFrameData(attribution);

    expect(result).toEqual({
      "debug_loaf_entry_end_time": 5168937,
      "debug_loaf_entry_pre_layout_duration": 0,
      "debug_loaf_entry_render_duration": 1,
      "debug_loaf_entry_start_time": 5168847,
      "debug_loaf_entry_style_and_layout_duration": 1,
      "debug_loaf_entry_total_forced_style_and_layout_duration": 80,
      "debug_loaf_entry_work_duration": 88,
      "debug_loaf_meta_length": 1,
      "debug_loaf_script_compile_duration": 0,
      "debug_loaf_script_exec_duration": 85,
      "debug_loaf_script_forced_style_and_layout_duration": 80,
      "debug_loaf_script_invoker": "BUTTON#thrash-layout.onclick",
      "debug_loaf_script_source_char_position": 72,
      "debug_loaf_script_source_function_name": "",
      "debug_loaf_script_source_url": "http://localhost:8000/demo/",
      "debug_loaf_script_total_duration": 85,
      "debug_loaf_script_type": "event-listener",
    });
  });

  it('should return default/empty params if no attribution data is provided', () => {
    // @ts-ignore
    const result = formatLongAnimationFrameData('unknown', null);

    expect(result).toEqual({
      debug_target: '(not set)',
    });
  });
});

/**
 * Samples of event data from the web-vitals.js package are below:
 */
// {
//   "name": "INP",
//   "value": 104,
//   "rating": "good",
//   "delta": 104,
//   "entries": [
//     {
//       "name": "pointerup",
//       "entryType": "event",
//       "startTime": 5168847,
//       "duration": 104,
//       "interactionId": 3343,
//       "processingStart": 5168847.799999952,
//       "processingEnd": 5168847.799999952,
//       "cancelable": true
//     },
//     {
//       "name": "click",
//       "entryType": "event",
//       "startTime": 5168847,
//       "duration": 104,
//       "interactionId": 3343,
//       "processingStart": 5168847.799999952,
//       "processingEnd": 5168933.600000024,
//       "cancelable": true
//     },
//     {
//       "name": "pointerup",
//       "entryType": "event",
//       "startTime": 5168847,
//       "duration": 104,
//       "interactionId": 3343,
//       "processingStart": 5168847.799999952,
//       "processingEnd": 5168847.799999952,
//       "cancelable": true
//     },
//     {
//       "name": "click",
//       "entryType": "event",
//       "startTime": 5168847,
//       "duration": 104,
//       "interactionId": 3343,
//       "processingStart": 5168847.799999952,
//       "processingEnd": 5168933.600000024,
//       "cancelable": true
//     }
//   ],
//   "id": "v4-1732734514604-7082926874486",
//   "navigationType": "reload",
//   "attribution": {
//     "interactionTarget": "#thrash-layout",
//     "interactionTargetElement": {},
//     "interactionType": "pointer",
//     "interactionTime": 5168847,
//     "nextPaintTime": 5168951,
//     "processedEventEntries": [
//       {
//         "name": "pointerup",
//         "entryType": "event",
//         "startTime": 5168847,
//         "duration": 104,
//         "interactionId": 3343,
//         "processingStart": 5168847.799999952,
//         "processingEnd": 5168847.799999952,
//         "cancelable": true
//       },
//       {
//         "name": "mouseup",
//         "entryType": "event",
//         "startTime": 5168847,
//         "duration": 104,
//         "interactionId": 0,
//         "processingStart": 5168847.799999952,
//         "processingEnd": 5168847.799999952,
//         "cancelable": true
//       },
//       {
//         "name": "click",
//         "entryType": "event",
//         "startTime": 5168847,
//         "duration": 104,
//         "interactionId": 3343,
//         "processingStart": 5168847.799999952,
//         "processingEnd": 5168933.600000024,
//         "cancelable": true
//       },
//       {
//         "name": "pointerup",
//         "entryType": "event",
//         "startTime": 5168847,
//         "duration": 104,
//         "interactionId": 3343,
//         "processingStart": 5168847.799999952,
//         "processingEnd": 5168847.799999952,
//         "cancelable": true
//       },
//       {
//         "name": "mouseup",
//         "entryType": "event",
//         "startTime": 5168847,
//         "duration": 104,
//         "interactionId": 0,
//         "processingStart": 5168847.799999952,
//         "processingEnd": 5168847.799999952,
//         "cancelable": true
//       },
//       {
//         "name": "click",
//         "entryType": "event",
//         "startTime": 5168847,
//         "duration": 104,
//         "interactionId": 3343,
//         "processingStart": 5168847.799999952,
//         "processingEnd": 5168933.600000024,
//         "cancelable": true
//       }
//     ],
//     "longAnimationFrameEntries": [
//       {
//         "name": "long-animation-frame",
//         "entryType": "long-animation-frame",
//         "startTime": 5168847.600000024,
//         "duration": 90,
//         "renderStart": 5168936.1999999285,
//         "styleAndLayoutStart": 5168936.1999999285,
//         "firstUIEventTimestamp": 5168847,
//         "blockingDuration": 38,
//         "scripts": [
//           {
//             "name": "script",
//             "entryType": "script",
//             "startTime": 5168847.899999976,
//             "duration": 85,
//             "invoker": "BUTTON#thrash-layout.onclick",
//             "invokerType": "event-listener",
//             "windowAttribution": "self",
//             "executionStart": 5168847.899999976,
//             "forcedStyleAndLayoutDuration": 80,
//             "pauseDuration": 0,
//             "sourceURL": "http://localhost:8000/demo/",
//             "sourceFunctionName": "",
//             "sourceCharPosition": 72
//           }
//         ]
//       }
//     ],
//     "inputDelay": 0.7999999523162842,
//     "processingDuration": 85.80000007152557,
//     "presentationDelay": 17.399999976158142,
//     "loadState": "complete"
//   }
// }
