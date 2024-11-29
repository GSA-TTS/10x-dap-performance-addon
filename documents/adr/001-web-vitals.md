# 001-web-vitals

## Status

Approved

## Context

There is good adoption of synthetic performance testing tools, particularly Google Lighthouse and [Page Speed Insights](https://pagespeed.web.dev). There are not as many widely deployed tools to anonymously collect field measurements of  page speed performance from real users in a way that adequately captures their experience when using federal web properties.    

## Decision

Google Analytics through the Digital Analytics Program within the federal government already has good adoption within the federal government. The `web-vitals.js` library from Google was selected as a way to instrument a website or application with performance collection. This library was chosen for its stability, as well as its completeness, as it is the basis of many commercial offerings (e.g. DataDog, Sentry) and its wide deployment through the Chrome Devtools Performance Panel. 

## Consequences

This proposes an optional add-on for teams to be able to add and collect metrics on what a real user experiences as it relates to the universal performance indicators known as Core Web Vitals.
