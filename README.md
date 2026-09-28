# EasyPark Prototype

Mobile-first HTML/CSS/JavaScript prototype for validating EasyPark flows before choosing the production implementation stack.

## Scope

This prototype simulates:

- destination-first search;
- private-space reservation flow;
- provider onboarding for private parking spaces;
- provider availability days and hours;
- provider comments/instructions for drivers;
- fixed or custom provider tariffs;
- provider payment method selection;
- inclusion of provider spaces in the mock selection/ranking algorithm;
- traditional parking guidance;
- street parking guidance;
- simulated hold, payment, reservation, and active session states;
- AI copilot explanation with no transactional authority.

It intentionally has no backend, no production credentials, no real payment integration, and no persistent server data. Provider spaces are stored only in the current browser with `localStorage`.

## Run locally

Open `index.html` in a browser.
