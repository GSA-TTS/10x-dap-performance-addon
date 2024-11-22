import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { DapPerformanceAddon } from '../src/DapPerformanceAddon.js';
import '../src/dap-performance-addon.js';

describe('DapPerformanceAddon', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture<DapPerformanceAddon>(html`<dap-performance-addon></dap-performance-addon>`);

    expect(el.header).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<DapPerformanceAddon>(html`<dap-performance-addon></dap-performance-addon>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture<DapPerformanceAddon>(html`<dap-performance-addon header="attribute header"></dap-performance-addon>`);

    expect(el.header).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<DapPerformanceAddon>(html`<dap-performance-addon></dap-performance-addon>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
