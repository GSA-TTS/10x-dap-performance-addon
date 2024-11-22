import { expect } from '@open-wc/testing';
import { onCLS, onFCP, onINP, onLCP } from '../src/index.js';

describe('DAP Performance Addon', () => {
  it('defines methods to track Core Web Vitals', () => {
    expect(typeof onCLS).to.be('function');
    expect(typeof onFCP).to.be('function');
    expect(typeof onINP).to.be('function');
    expect(typeof onLCP).to.be('function');
  });
});
