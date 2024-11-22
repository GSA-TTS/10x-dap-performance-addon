import { onCLS, onINP, onLCP } from './web-vitals.js';
import { sendToAnalytics } from './send-to-analytics.js';

if (typeof window !== 'undefined' && 'gas4' in window) {
  performance.mark('dap-loaded');
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
} else {
  window.addEventListener('dap-universal-federated-analytics-load', () => {
    performance.mark('dap-loaded');
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
  });
}
