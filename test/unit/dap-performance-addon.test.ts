import { it, describe, expect } from 'vitest';
import { onCLS, onFCP, onINP, onLCP } from '../../src/index.js';

describe('DAP Performance Addon', () => {
  it('defines methods to track Core Web Vitals', () => {
    expect(typeof onCLS).toBe('function');
    expect(typeof onFCP).toBe('function');
    expect(typeof onINP).toBe('function');
    expect(typeof onLCP).toBe('function');
  });
});
