import { onCLS, onINP, onFCP, onLCP, onTTFB } from './web-vitals.js';
import { sendToAnalytics } from './send-to-analytics.js';

const initWebVitalsEvents = () => {
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onINP(console.log);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
};

if (typeof window !== 'undefined' && 'gas4' in window) {
  initWebVitalsEvents();
} else {
  window.addEventListener('dap-universal-federated-analytics-load', () => {
    initWebVitalsEvents();
  });
}

performance.mark('dap-performance-addon-loaded');
