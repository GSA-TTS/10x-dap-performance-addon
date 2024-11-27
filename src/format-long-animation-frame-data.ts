import type { INPAttribution } from 'web-vitals';

// export const formatLongAnimationFrameData = (attribution: INPAttribution) => {
//
// };

// export const formatLongAnimationFrameData = (attribution: INPAttribution) => {
//   // The last LoAF entry is usually the most relevant.
//   const loaf = attribution.longAnimationFrameEntries.at(-1);
//   const script = loaf?.scripts.sort((a, b) => b.duration - a.duration)[0];
//   let obj = {}
//
//   if(script) {
//     // long event handler
//     const { invokerType } = script; // always event-listener for long event handlers
//     const { invoker } = script; // element that had the event listener
//     const { sourceURL } = script;
//     const { sourceCharPosition } = script;
//     const { sourceFunctionName } = script;
//
//     // long input delay: during page load - was this from script evaluation
//     const { invokerType } = script; //
//     const { sourceLocation } = script;
//
//     // long input delay: after page load - was this from script evaluation
//     const { invokerType } = script; // user-callback (recurring timer like setInterval), event-listener, module-script, classic-script. Could also be expensive fetch call
//     const { sourceURL } = script; // https://example.com/app.js
//     const { sourceCharPosition } = script; // 83
//     const { sourceFunctionName } = script; // update
//
//     // presentation delay
//     const { invokerType } = script; // user-callback (recurring timer like setInterval), event-listener, module-script, classic-script. Could also be expensive fetch call
//     const { sourceURL } = script; // https://example.com/app.js
//     const { sourceCharPosition } = script; // 83
//     const { sourceFunctionName } = script; // update
//   }
// }


export const formatLongAnimationFrameData = (attribution: INPAttribution) => {
  const loafEntries = attribution.longAnimationFrameEntries;
  if(typeof loafEntries === 'undefined' || loafEntries.length === 0) {
    return {};
  }

  let loafAttribution = {
    debug_loaf_script_total_duration: 0
  };

  // The last LoAF entry is usually the most relevant.
  const loaf = attribution.longAnimationFrameEntries.at(-1);
  if(typeof loaf !== 'undefined') {
    const loafEndTime = loaf.startTime + loaf.duration;
    loaf?.scripts.forEach(script => {
      if (script.duration <= loafAttribution.debug_loaf_script_total_duration) {
        return;
      }
      loafAttribution = {
        // Stats for the LoAF entry itself.
        debug_loaf_entry_start_time: loaf.startTime,
        debug_loaf_entry_end_time: loafEndTime,
        debug_loaf_entry_work_duration: loaf.renderStart ? loaf.renderStart - loaf.startTime : loaf.duration,
        debug_loaf_entry_render_duration: loaf.renderStart ? loafEndTime - loaf.renderStart : 0,
        debug_loaf_entry_total_forced_style_and_layout_duration: loaf.scripts.reduce((sum, script) => sum + script.forcedStyleAndLayoutDuration, 0),
        debug_loaf_entry_pre_layout_duration: loaf.styleAndLayoutStart ? loaf.styleAndLayoutStart - loaf.renderStart : 0,
        debug_loaf_entry_style_and_layout_duration: loaf.styleAndLayoutStart ? loafEndTime - loaf.styleAndLayoutStart : 0,

        // Stats for the longest script in the LoAF entry.
        debug_loaf_script_total_duration: script.duration,
        debug_loaf_script_compile_duration: script.executionStart - script.startTime,
        debug_loaf_script_exec_duration: script.startTime + script.duration - script.executionStart,
        debug_loaf_script_forced_style_and_layout_duration: script.forcedStyleAndLayoutDuration,
        debug_loaf_script_type: script.invokerType,
        debug_loaf_script_invoker: script.invoker,
        debug_loaf_script_source_url: script.sourceURL,
        debug_loaf_script_source_function_name: script.sourceFunctionName,
        debug_loaf_script_source_char_position: script.sourceCharPosition,

        // LoAF metadata.
        debug_loaf_meta_length: loafEntries.length,
      }
    });
  }

  if (!loafAttribution.debug_loaf_script_total_duration) {
    return {};
  }

  // The LoAF script with the single longest total duration.
  return Object.fromEntries(Object.entries(loafAttribution).map(([k, v]) => 
    // Convert all floats to ints.
     [k, typeof v === 'number' ? Math.floor(v) : v]
  ));
}
