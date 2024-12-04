import { onCLS, onINP, onFCP, onLCP, onTTFB } from './web-vitals.js';
import { sendToAnalytics } from './track/send-to-analytics.js';

const initWebVitalsEvents = () => {
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
};

if (typeof window !== 'undefined') {
  if ('gas4' in window) {
    initWebVitalsEvents();
  } else {
    (window as Window).addEventListener(
      'dap-universal-federated-analytics-load',
      () => {
        initWebVitalsEvents();
      },
    );
  }
}

performance.mark('dap-performance-addon-loaded');
