import type { INPAttribution } from 'web-vitals';

interface PerformanceLoAfTiming extends PerformanceEntry {
  renderStart: DOMHighResTimeStamp;
  duration: DOMHighResTimeStamp;
  styleAndLayoutStart: DOMHighResTimeStamp;
  scripts: LoAfScriptEntry[];
}

interface LoAfScriptEntry {
  duration: DOMHighResTimeStamp;
  executionStart: DOMHighResTimeStamp;
  startTime: DOMHighResTimeStamp;
  forcedStyleAndLayoutDuration: DOMHighResTimeStamp;
  invokerType: string;
  invoker: string;
  sourceURL: string;
  sourceFunctionName: string;
  sourceCharPosition: number;
  pauseDuration: DOMHighResTimeStamp;
  windowAttribution: string;
}

export interface DAPINPAttribution extends INPAttribution {
  longAnimationFrameEntries: PerformanceLoAfTiming[];
}

/**
 * Properties of note - from https://io.google/2024/explore/ba446093-0036-410b-ba1e-f9016ec21899/
 *
 * // Long-running event handler would be like the below:
 * const { invokerType } = script; // always event-listener for long event handlers
 * const { invoker } = script; // element that had the event listener
 * const { sourceURL } = script; // https://example.com/app.js
 * const { sourceCharPosition } = script; // 83
 * const { sourceFunctionName } = script; // update
 *
 * // long input delay: during page load - was this from script evaluation?
 * const { invokerType } = script;
 * const { sourceLocation } = script;
 *
 * // long input delay: after page load
 * const { invokerType } = script; // user-callback (recurring timer like setInterval), event-listener, module-script, classic-script. Could also be expensive fetch call
 * const { sourceURL } = script; // https://example.com/app.js
 * const { sourceCharPosition } = script; // 83
 * const { sourceFunctionName } = script; // update
 *
 * // presentation delay
 * const { invokerType } = script; // user-callback (recurring timer like setInterval), event-listener, module-script, classic-script. Could also be expensive fetch call
 * const { sourceURL } = script; // https://example.com/app.js
 * const { sourceCharPosition } = script; // 83
 * const { sourceFunctionName } = script; // update
 */
export const formatLongAnimationFrameData = (
  attribution: DAPINPAttribution,
) => {
  const loafEntries = attribution.longAnimationFrameEntries;
  if (typeof loafEntries === 'undefined' || loafEntries.length === 0) {
    return {};
  }

  let totalDuration = 0;
  let loafAttribution = {};

  // The last LoAF entry is usually the most relevant.
  const loaf: PerformanceLoAfTiming | undefined =
    attribution.longAnimationFrameEntries.at(-1);
  if (typeof loaf !== 'undefined') {
    const loafEndTime = loaf.startTime + loaf.duration;
    loaf.scripts.forEach(script => {
      if (script.duration <= totalDuration) {
        return;
      }

      // track the max total duration over the loop
      totalDuration = script.duration;

      loafAttribution = {
        // Stats for the LoAF entry itself.
        debug_loaf_entry_start_time: loaf.startTime,
        debug_loaf_entry_end_time: loafEndTime,
        debug_loaf_entry_work_duration: loaf.renderStart
          ? loaf.renderStart - loaf.startTime
          : loaf.duration,
        debug_loaf_entry_render_duration: loaf.renderStart
          ? loafEndTime - loaf.renderStart
          : 0,
        debug_loaf_entry_total_forced_style_and_layout_duration:
          loaf.scripts.reduce(
            (sum, entry) => sum + entry.forcedStyleAndLayoutDuration,
            0,
          ),
        debug_loaf_entry_pre_layout_duration: loaf.styleAndLayoutStart
          ? loaf.styleAndLayoutStart - loaf.renderStart
          : 0,
        debug_loaf_entry_style_and_layout_duration: loaf.styleAndLayoutStart
          ? loafEndTime - loaf.styleAndLayoutStart
          : 0,

        // Stats for the longest script in the LoAF entry.
        debug_loaf_script_total_duration: totalDuration,
        debug_loaf_script_compile_duration:
          script.executionStart - script.startTime,
        debug_loaf_script_exec_duration:
          script.startTime + script.duration - script.executionStart,
        debug_loaf_script_forced_style_and_layout_duration:
          script.forcedStyleAndLayoutDuration,
        debug_loaf_script_type: script.invokerType,
        debug_loaf_script_invoker: script.invoker,
        debug_loaf_script_source_url: script.sourceURL,
        debug_loaf_script_source_function_name: script.sourceFunctionName,
        debug_loaf_script_source_char_position: script.sourceCharPosition,
        debug_loaf_pause_duration: script.pauseDuration,
        debug_loaf_window_attribution: script.windowAttribution,

        // LoAF metadata.
        debug_loaf_meta_length: loafEntries.length,
      };
    });
  }

  if (!totalDuration) {
    return {};
  }

  // The LoAF script with the single longest total duration.
  return Object.fromEntries(
    Object.entries(loafAttribution).map(([k, v]) =>
      // Convert all floats to ints.
      [k, typeof v === 'number' ? Math.floor(v) : v],
    ),
  );
};
