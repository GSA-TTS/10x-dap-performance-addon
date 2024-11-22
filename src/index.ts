import { onCLS, onINP, onLCP } from './web-vitals.js';
import { sendToAnalytics } from './send-to-analytics.js';

if(typeof window !== 'undefined' && 'gas4' in window) {
  console.log('already defined');
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
} else {
  window.addEventListener('dap-universal-federated-analytics-load', () => {
    console.log('listener fired');
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
  });
}
