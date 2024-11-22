import {
  formatEventData,
  type WebVitalsAttribution,
  type WebVitalsName,
} from './format-event-data.js';

declare const gas4: any;

export const sendToAnalytics = ({
  name,
  delta,
  value,
  id,
  attribution,
}: {
  name: string;
  delta: number;
  value: number;
  id: string;
  attribution: WebVitalsAttribution;
}) => {
  if (typeof gas4 === 'function') {
    gas4(name, {
      // Built-in params:
      value: delta, // Use `delta` so the value can be summed.
      // Custom params:
      metric_id: id, // Needed to aggregate events.
      metric_value: value, // Value for querying in BQ
      metric_delta: delta, // Delta for querying in BQ
      // Send the returned values from getDebugInfo() as custom parameters
      ...formatEventData(name as WebVitalsName, attribution),
    });
  }
};
