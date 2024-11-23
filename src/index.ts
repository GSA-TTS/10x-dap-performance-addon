import { onCLS, onINP, onFCP, onLCP } from './web-vitals.js';
import { sendToAnalytics } from './send-to-analytics.js';

const initWebVitalsEvents = () => {
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
};

if (typeof window !== 'undefined' && 'gas4' in window) {
  initWebVitalsEvents();
} else {
  window.addEventListener('dap-universal-federated-analytics-load', () => {
    initWebVitalsEvents();
  });
}

performance.mark('dap-performance-addon-loaded');
