# Digital Analytics Program Performance (DAP) Add-on

This is a proof-of-concept for an add-on for DAP's implementation of GA4. It provides data formatting for the events 
from the Google's [`web-vitals`](https://github.com/GoogleChrome/web-vitals) package that would use Google Analytics as 
a collector of performance (page speed and user experience) metrics.

## Linting and formatting

To scan the project for linting and formatting errors, run:

```bash
npm run lint
```

To automatically fix linting and formatting errors, run:

```bash
npm run format
```

## Testing with Vitest

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
