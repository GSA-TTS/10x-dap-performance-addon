import type {
  CLSAttribution,
  FCPAttribution,
  INPAttribution,
  LCPAttribution,
} from 'web-vitals';

export type WebVitalsName = 'CLS' | 'FCP' | 'INP' | 'LCP';
export type WebVitalsAttribution =
  | CLSAttribution
  | FCPAttribution
  | INPAttribution
  | LCPAttribution;

export const formatEventData = (
  name: WebVitalsName,
  attribution: WebVitalsAttribution,
) => {
  // In some cases there won't be any entries (e.g. if CLS is 0,
  // or for LCP after a bfcache restore), so we have to check first.
  if (attribution) {
    if (name === 'CLS') {
      return {
        debug_time: (attribution as CLSAttribution).largestShiftTime,
        debug_load_state: (attribution as CLSAttribution).loadState,
        debug_target:
          (attribution as CLSAttribution).largestShiftTarget || '(not set)',
      };
    }
    if (name === 'FCP') {
      return {
        debug_url: (attribution as FCPAttribution).url,
        debug_time_to_first_byte: (attribution as FCPAttribution)
          .timeToFirstByte,
      };
    }
    if (name === 'INP') {
      return {
        debug_event: (attribution as INPAttribution).interactionType,
        debug_time: Math.round((attribution as INPAttribution).interactionTime),
        debug_load_state: (attribution as INPAttribution).loadState,
        debug_target:
          (attribution as INPAttribution).interactionTarget || '(not set)',
        debug_interaction_delay: Math.round(
          (attribution as INPAttribution).inputDelay,
        ),
        debug_processing_duration: Math.round(
          (attribution as INPAttribution).processingDuration,
        ),
        debug_presentation_delay: Math.round(
          (attribution as INPAttribution).presentationDelay,
        ),
      };
    }
    if (name === 'LCP') {
      return {
        debug_url: (attribution as LCPAttribution).url,
        debug_time_to_first_byte: (attribution as LCPAttribution)
          .timeToFirstByte,
        debug_resource_load_delay: (attribution as LCPAttribution)
          .resourceLoadDelay,
        debug_resource_load_duration: (attribution as LCPAttribution)
          .resourceLoadDuration,
        debug_element_render_delay: (attribution as LCPAttribution)
          .elementRenderDelay,
        debug_target: (attribution as LCPAttribution).element || '(not set)',
      };
    }
  }
  // Return default/empty params in case there is no attribution.
  return {
    debug_target: '(not set)',
  };
};
