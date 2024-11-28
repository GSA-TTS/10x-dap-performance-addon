import { it, describe, expect } from 'vitest';
import { formatLongAnimationFrameData } from '../../src/format-long-animation-frame-data.js';

describe('formatLongAnimationFrameData', () => {
  it('should format INP data correctly', () => {
    const attribution = {
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
      "debug_loaf_pause_duration": 0,
      "debug_loaf_script_compile_duration": 0,
      "debug_loaf_script_exec_duration": 85,
      "debug_loaf_script_forced_style_and_layout_duration": 80,
      "debug_loaf_script_invoker": "BUTTON#thrash-layout.onclick",
      "debug_loaf_script_source_char_position": 72,
      "debug_loaf_script_source_function_name": "",
      "debug_loaf_script_source_url": "http://localhost:8000/demo/",
      "debug_loaf_script_total_duration": 85,
      "debug_loaf_script_type": "event-listener",
      "debug_loaf_window_attribution": "self",
    });
  });

  it('should handle multiple scripts by giving info about the single longest total duration.', () => {
    const attribution = {
      "longAnimationFrameEntries": [
        {
          "name": "long-animation-frame",
          "entryType": "long-animation-frame",
          "startTime": 49367.80000001192,
          "duration": 335,
          "renderStart": 49702.19999998808,
          "styleAndLayoutStart": 49702.69999998808,
          "firstUIEventTimestamp": 49387.80000001192,
          "blockingDuration": 235,
          "scripts": [
            {
              "name": "script",
              "entryType": "script",
              "startTime": 49367.89999997616,
              "duration": 222,
              "invoker": "TimerHandler:setTimeout",
              "invokerType": "user-callback",
              "windowAttribution": "self",
              "executionStart": 49367.89999997616,
              "forcedStyleAndLayoutDuration": 0,
              "pauseDuration": 0,
              "sourceURL": "http://localhost:8000/demo/",
              "sourceFunctionName": "periodicBlock",
              "sourceCharPosition": 2007
            },
            {
              "name": "script",
              "entryType": "script",
              "startTime": 49590.89999997616,
              "duration": 14,
              "invoker": "DOMWindow.onkeydown",
              "invokerType": "event-listener",
              "windowAttribution": "self",
              "executionStart": 49590.89999997616,
              "forcedStyleAndLayoutDuration": 0,
              "pauseDuration": 0,
              "sourceURL": "http://localhost:8000/demo/",
              "sourceFunctionName": "",
              "sourceCharPosition": 4656
            }
          ]
        }
      ],
    }

    // @ts-ignore
    const result = formatLongAnimationFrameData(attribution);

    expect(result).toEqual({
      "debug_loaf_entry_end_time": 49702,
      "debug_loaf_entry_pre_layout_duration": 0,
      "debug_loaf_entry_render_duration": 0,
      "debug_loaf_entry_start_time": 49367,
      "debug_loaf_entry_style_and_layout_duration": 0,
      "debug_loaf_entry_total_forced_style_and_layout_duration": 0,
      "debug_loaf_entry_work_duration": 334,
      "debug_loaf_meta_length": 1,
      "debug_loaf_pause_duration": 0,
      "debug_loaf_script_compile_duration": 0,
      "debug_loaf_script_exec_duration": 222,
      "debug_loaf_script_forced_style_and_layout_duration": 0,
      "debug_loaf_script_invoker": "TimerHandler:setTimeout",
      "debug_loaf_script_source_char_position": 2007,
      "debug_loaf_script_source_function_name": "periodicBlock",
      "debug_loaf_script_source_url": "http://localhost:8000/demo/",
      "debug_loaf_script_total_duration": 222,
      "debug_loaf_script_type": "user-callback",
      "debug_loaf_window_attribution": "self",
    });
  });

  it('should handle attribution data with zero scripts', () => {
    const attribution = {
      "interactionTarget": "#textarea",
      "interactionTargetElement": {},
      "interactionType": "keyboard",
      "interactionTime": 49387.80000001192,
      "nextPaintTime": 49715.80000001192,
      "longAnimationFrameEntries": [
        {
          "name": "long-animation-frame",
          "entryType": "long-animation-frame",
          "startTime": 49367.80000001192,
          "duration": 335,
          "renderStart": 49702.19999998808,
          "styleAndLayoutStart": 49702.69999998808,
          "firstUIEventTimestamp": 49387.80000001192,
          "blockingDuration": 235,
          "scripts": []
        }
      ],
      "inputDelay": 203.0999999642372,
      "processingDuration": 111.30000001192093,
      "presentationDelay": 13.600000023841858,
      "loadState": "complete"
    }

    // @ts-ignore
    const result = formatLongAnimationFrameData(attribution);

    expect(result).toEqual({});
  });

  it('should return default params if no attribution data is provided', () => {
    // @ts-ignore
    const result = formatLongAnimationFrameData('unknown', null);

    expect(result).toEqual({});
  });
});

/**
 * Samples of event data from the web-vitals.js package are below:
 */
/**
 * Single script entry
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

/**
 * Empty scripts array
 */
// {
//   "name": "INP",
//   "value": 64,
//   "rating": "good",
//   "delta": 64,
//   "entries": [
//     {
//       "name": "pointerup",
//       "entryType": "event",
//       "startTime": 25448.80000001192,
//       "duration": 64,
//       "interactionId": 1134,
//       "processingStart": 25451.100000023842,
//       "processingEnd": 25451.100000023842,
//       "cancelable": true
//     },
//     {
//       "name": "click",
//       "entryType": "event",
//       "startTime": 25448.80000001192,
//       "duration": 64,
//       "interactionId": 1134,
//       "processingStart": 25451.100000023842,
//       "processingEnd": 25483.400000035763,
//       "cancelable": true
//     }
//   ],
//   "id": "v4-1732752055743-7541189658822",
//   "navigationType": "reload",
//   "attribution": {
//     "interactionTarget": "#headerMenuIcon>svg.header__menu-icon-svg",
//     "interactionTargetElement": {},
//     "interactionType": "pointer",
//     "interactionTime": 25448.80000001192,
//     "nextPaintTime": 25512.80000001192,
//     "processedEventEntries": [
//       {
//         "name": "pointerup",
//         "entryType": "event",
//         "startTime": 25448.80000001192,
//         "duration": 64,
//         "interactionId": 1134,
//         "processingStart": 25451.100000023842,
//         "processingEnd": 25451.100000023842,
//         "cancelable": true
//       },
//       {
//         "name": "mouseup",
//         "entryType": "event",
//         "startTime": 25448.80000001192,
//         "duration": 64,
//         "interactionId": 0,
//         "processingStart": 25451.100000023842,
//         "processingEnd": 25451.100000023842,
//         "cancelable": true
//       },
//       {
//         "name": "click",
//         "entryType": "event",
//         "startTime": 25448.80000001192,
//         "duration": 64,
//         "interactionId": 1134,
//         "processingStart": 25451.100000023842,
//         "processingEnd": 25483.400000035763,
//         "cancelable": true
//       }
//     ],
//     "longAnimationFrameEntries": [],
//     "inputDelay": 2.300000011920929,
//     "processingDuration": 32.30000001192093,
//     "presentationDelay": 29.399999976158142,
//     "loadState": "complete"
//   }
// }

/**
 * Multiple scripts
 */
// {
//   "interactionTarget": "#textarea",
//   "interactionTargetElement": {},
//   "interactionType": "keyboard",
//   "interactionTime": 49387.80000001192,
//   "nextPaintTime": 49715.80000001192,
//   "processedEventEntries": [
//     {
//       "name": "keydown",
//       "entryType": "event",
//       "startTime": 49387.80000001192,
//       "duration": 328,
//       "interactionId": 5994,
//       "processingStart": 49590.89999997616,
//       "processingEnd": 49605.89999997616,
//       "cancelable": true
//     },
//     {
//       "name": "keypress",
//       "entryType": "event",
//       "startTime": 49388.10000002384,
//       "duration": 328,
//       "interactionId": 5994,
//       "processingStart": 49606,
//       "processingEnd": 49606.5,
//       "cancelable": true
//     },
//     {
//       "name": "beforeinput",
//       "entryType": "event",
//       "startTime": 49606,
//       "duration": 104,
//       "interactionId": 0,
//       "processingStart": 49606,
//       "processingEnd": 49606,
//       "cancelable": true
//     },
//     {
//       "name": "keydown",
//       "entryType": "event",
//       "startTime": 49492.69999998808,
//       "duration": 224,
//       "interactionId": 6001,
//       "processingStart": 49606.5,
//       "processingEnd": 49621.60000002384,
//       "cancelable": true
//     },
//     {
//       "name": "input",
//       "entryType": "event",
//       "startTime": 49606.19999998808,
//       "duration": 104,
//       "interactionId": 0,
//       "processingStart": 49606.5,
//       "processingEnd": 49606.5,
//       "cancelable": false
//     },
//     {
//       "name": "keypress",
//       "entryType": "event",
//       "startTime": 49493.69999998808,
//       "duration": 216,
//       "interactionId": 6001,
//       "processingStart": 49621.60000002384,
//       "processingEnd": 49622.10000002384,
//       "cancelable": true
//     },
//     {
//       "name": "beforeinput",
//       "entryType": "event",
//       "startTime": 49621.60000002384,
//       "duration": 88,
//       "interactionId": 0,
//       "processingStart": 49621.60000002384,
//       "processingEnd": 49621.60000002384,
//       "cancelable": true
//     },
//     {
//       "name": "input",
//       "entryType": "event",
//       "startTime": 49622,
//       "duration": 88,
//       "interactionId": 0,
//       "processingStart": 49622.10000002384,
//       "processingEnd": 49622.10000002384,
//       "cancelable": false
//     },
//     {
//       "name": "keyup",
//       "entryType": "event",
//       "startTime": 49550.60000002384,
//       "duration": 160,
//       "interactionId": 5994,
//       "processingStart": 49622.19999998808,
//       "processingEnd": 49662.19999998808,
//       "cancelable": true
//     },
//     {
//       "name": "keyup",
//       "entryType": "event",
//       "startTime": 49587.60000002384,
//       "duration": 128,
//       "interactionId": 6001,
//       "processingStart": 49662.19999998808,
//       "processingEnd": 49702.19999998808,
//       "cancelable": true
//     }
//   ],
//   "longAnimationFrameEntries": [
//     {
//       "name": "long-animation-frame",
//       "entryType": "long-animation-frame",
//       "startTime": 49367.80000001192,
//       "duration": 335,
//       "renderStart": 49702.19999998808,
//       "styleAndLayoutStart": 49702.69999998808,
//       "firstUIEventTimestamp": 49387.80000001192,
//       "blockingDuration": 235,
//       "scripts": [
//         {
//           "name": "script",
//           "entryType": "script",
//           "startTime": 49367.89999997616,
//           "duration": 222,
//           "invoker": "TimerHandler:setTimeout",
//           "invokerType": "user-callback",
//           "windowAttribution": "self",
//           "executionStart": 49367.89999997616,
//           "forcedStyleAndLayoutDuration": 0,
//           "pauseDuration": 0,
//           "sourceURL": "http://localhost:8000/demo/",
//           "sourceFunctionName": "periodicBlock",
//           "sourceCharPosition": 2007
//         },
//         {
//           "name": "script",
//           "entryType": "script",
//           "startTime": 49590.89999997616,
//           "duration": 14,
//           "invoker": "DOMWindow.onkeydown",
//           "invokerType": "event-listener",
//           "windowAttribution": "self",
//           "executionStart": 49590.89999997616,
//           "forcedStyleAndLayoutDuration": 0,
//           "pauseDuration": 0,
//           "sourceURL": "http://localhost:8000/demo/",
//           "sourceFunctionName": "",
//           "sourceCharPosition": 4656
//         },
//         {
//           "name": "script",
//           "entryType": "script",
//           "startTime": 49606.5,
//           "duration": 14,
//           "invoker": "DOMWindow.onkeydown",
//           "invokerType": "event-listener",
//           "windowAttribution": "self",
//           "executionStart": 49606.5,
//           "forcedStyleAndLayoutDuration": 0,
//           "pauseDuration": 0,
//           "sourceURL": "http://localhost:8000/demo/",
//           "sourceFunctionName": "",
//           "sourceCharPosition": 4656
//         },
//         {
//           "name": "script",
//           "entryType": "script",
//           "startTime": 49622.19999998808,
//           "duration": 40,
//           "invoker": "DOMWindow.onkeyup",
//           "invokerType": "event-listener",
//           "windowAttribution": "self",
//           "executionStart": 49622.19999998808,
//           "forcedStyleAndLayoutDuration": 0,
//           "pauseDuration": 0,
//           "sourceURL": "http://localhost:8000/demo/",
//           "sourceFunctionName": "",
//           "sourceCharPosition": 4656
//         },
//         {
//           "name": "script",
//           "entryType": "script",
//           "startTime": 49662.19999998808,
//           "duration": 39,
//           "invoker": "DOMWindow.onkeyup",
//           "invokerType": "event-listener",
//           "windowAttribution": "self",
//           "executionStart": 49662.19999998808,
//           "forcedStyleAndLayoutDuration": 0,
//           "pauseDuration": 0,
//           "sourceURL": "http://localhost:8000/demo/",
//           "sourceFunctionName": "",
//           "sourceCharPosition": 4656
//         }
//       ]
//     }
//   ],
//   "inputDelay": 203.0999999642372,
//   "processingDuration": 111.30000001192093,
//   "presentationDelay": 13.600000023841858,
//   "loadState": "complete"
// }
