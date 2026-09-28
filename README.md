# EasyPark Prototype

Mobile-first HTML/CSS/JavaScript prototype for validating EasyPark flows before choosing the production implementation stack.

## Scope

This prototype simulates:

- role-specific entry points for drivers, providers, and EasyPark operators;
- destination-first search with date/time, duration, vehicle, and ranking filters;
- a mock map, result cards, details, ratings, coverage, instructions, and payment labels;
- private-space reservation with hold, fee, payment approval/rejection, expiration, and active session states;
- provider onboarding with location, driver comments, space type, availability, status, fixed/custom tariff, payment method, photo placeholder, and earning estimate;
- provider spaces entering the mock selection/ranking algorithm;
- operator review of pending spaces, active reservations, payment exceptions, incidents, and manual settlement queues;
- a guided demo and contextual AI copilot explanation with no transactional authority;
- visible reference labels such as `DRV-SEARCH-01`, `PROV-TARIFF-01`, and `OPS-REVIEW-01` so Buzz users and agents can request precise changes.

It intentionally has no backend, no production credentials, no real payment integration, and no persistent server data. Provider spaces are stored only in the current browser with `localStorage`.

## Run locally

Open `index.html` in a browser.

## Reference labels

Visible labels are intentionally part of the prototype. Use them in Buzz feedback, for example: `Change DRV-RESULT-01 to show distance before price`. They are stable prototype references, not final customer-facing copy.
