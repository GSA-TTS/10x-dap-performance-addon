import type {
  CLSMetricWithAttribution,
  FCPMetricWithAttribution,
  INPMetricWithAttribution,
  LCPMetricWithAttribution,
  TTFBMetricWithAttribution,
} from 'web-vitals';

import {
  formatEventData,
  type WebVitalsName,
} from '../format/format-event-data.js';

export type WebVitalsWithAttribution =
  | CLSMetricWithAttribution
  | FCPMetricWithAttribution
  | INPMetricWithAttribution
  | LCPMetricWithAttribution
  | TTFBMetricWithAttribution;

export type Gas4Function = (name: string, params: unknown) => void;

// Assuming gas4 is globally available or imported from elsewhere
declare const gas4: Gas4Function;

export const sendToAnalytics = ({
  name,
  delta,
  value,
  id,
  navigationType,
  attribution,
}: WebVitalsWithAttribution) => {
  if (typeof gas4 === 'function') {
    gas4(name, {
      // Built-in params:
      value: delta, // Use `delta` so the value can be summed.
      // Custom params:
      metric_id: id, // Needed to aggregate events.
      metric_value: value, // Value for querying in BQ
      metric_delta: delta, // Delta for querying in BQ
      metric_navigation_type: navigationType,
      // Send the returned values from formatEventData() as custom parameters
      ...formatEventData(name as WebVitalsName, attribution),
    });
  }
};
