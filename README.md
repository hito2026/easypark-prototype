# EasyPark Prototype

Mobile-first HTML/CSS/JavaScript prototype for validating EasyPark flows before choosing the production implementation stack.

## Scope

This prototype simulates:

- a guided home screen with use-case choices for drivers, providers, and EasyPark operators;
- step-by-step driver navigation: destination, time, results, detail, checkout, and active session;
- step-by-step provider onboarding: location, space type, availability, tariff, payment, and review;
- step-by-step operator workflows for dashboard, pending listings, incidents, and manual settlements;
- destination-first search with date/time, duration, vehicle, and ranking filters;
- a mock map, result cards, details, ratings, coverage, instructions, and payment labels;
- safe mock payment-method selection using preset test cards while persisting only fictitious brand/last-four metadata;
- explicit service confirmation with hold, fee, total, automatic mock charge, reservation issuance, and payment rejection/expiration states;
- automatic mock payment receipt followed by the active parking session;
- provider spaces entering the mock selection/ranking algorithm;
- a guided demo and contextual AI copilot explanation with no transactional authority;
- visible reference labels such as `DRV-RESULTS-01`, `PROV-TARIFF-01`, and `OPS-PENDING-01` so Buzz users and agents can request precise changes.

It intentionally has no backend, no production credentials, no real payment integration, and no persistent server data. Never enter real card information: payment cards are fixed test options and only fictitious brand/last-four display metadata is stored locally. Provider spaces are stored only in the current browser with `localStorage`.

## Reference labels

Visible red labels are intentionally part of the prototype. Use them in Buzz feedback, for example: `Change DRV-RESULTS-01 to show distance before price`. They are stable prototype references, not final customer-facing copy. The prototype includes a label visibility toggle.

## Run locally

Open `index.html` in a browser.
