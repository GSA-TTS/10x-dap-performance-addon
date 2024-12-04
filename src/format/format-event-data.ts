import type {
  CLSAttribution,
  FCPAttribution,
  INPAttribution,
  LCPAttribution,
  TTFBAttribution,
} from 'web-vitals';
import {
  type DAPINPAttribution,
  formatLongAnimationFrameData,
} from './format-long-animation-frame-data.js';

export type WebVitalsName = 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB';
export type WebVitalsAttribution =
  | CLSAttribution
  | FCPAttribution
  | INPAttribution
  | LCPAttribution
  | TTFBAttribution;

export const NOT_SET_MESSAGE = '(not set)';

const formatCLS = (attribution: CLSAttribution) => ({
  debug_time: attribution.largestShiftTime,
  debug_load_state: attribution.loadState,
  debug_target: attribution.largestShiftTarget || NOT_SET_MESSAGE,
});

const formatFCP = (attribution: FCPAttribution) => ({
  debug_time_to_first_byte: attribution.timeToFirstByte,
  debug_first_byte_to_fcp: attribution.firstByteToFCP,
  debug_load_state: attribution.loadState,
  debug_target: attribution.loadState || NOT_SET_MESSAGE,
});

const formatINP = (attribution: DAPINPAttribution) => ({
  debug_event: attribution.interactionType,
  debug_time: Math.round(attribution.interactionTime),
  debug_load_state: attribution.loadState,
  debug_target: attribution.interactionTarget || NOT_SET_MESSAGE,
  debug_interaction_delay: Math.round(attribution.inputDelay),
  debug_processing_duration: Math.round(attribution.processingDuration),
  debug_presentation_delay: Math.round(attribution.presentationDelay),
  ...formatLongAnimationFrameData(attribution),
});

const formatLCP = (attribution: LCPAttribution) => ({
  debug_url: attribution.url,
  debug_time_to_first_byte: attribution.timeToFirstByte,
  debug_resource_load_delay: attribution.resourceLoadDelay,
  debug_resource_load_duration: attribution.resourceLoadDuration,
  debug_element_render_delay: attribution.elementRenderDelay,
  debug_target: attribution.element || NOT_SET_MESSAGE,
});

const formatTTFB = (attribution: TTFBAttribution) => ({
  debug_waiting_duration: attribution.waitingDuration,
  debug_dns_duration: attribution.dnsDuration,
  debug_connection_duration: attribution.connectionDuration,
  debug_cache_duration: attribution.cacheDuration,
  debug_request_duration: attribution.requestDuration,
});

export const formatEventData = (
  name: WebVitalsName,
  attribution: WebVitalsAttribution,
) => {
  if (!attribution) {
    return { debug_target: NOT_SET_MESSAGE };
  }

  switch (name) {
    case 'CLS':
      return formatCLS(attribution as CLSAttribution);
    case 'FCP':
      return formatFCP(attribution as FCPAttribution);
    case 'INP':
      return formatINP(attribution as DAPINPAttribution);
    case 'LCP':
      return formatLCP(attribution as LCPAttribution);
    case 'TTFB':
      return formatTTFB(attribution as TTFBAttribution);
    default:
      return { debug_target: NOT_SET_MESSAGE };
  }
};
