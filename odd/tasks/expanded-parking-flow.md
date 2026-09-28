# Expanded Parking Flow

## Objective

Adapt public parking-product patterns into EasyPark's Spanish prototype so testers can validate zone/vehicle confirmation, duration and regulatory limits, active-session control, operator communication, history/receipts, and simulated automatic entry/exit while preserving the private-space marketplace distinction.

## Reference boundaries

- Reference: https://www.easypark.com/es-es/como-funciona
- Adapt product patterns only; do not copy proprietary wording, images, icons, brand assets, or trade dress.
- Keep private-space reservation, traditional parking information, and street guidance explicitly distinct.

## Constraints

- Prototype-only; no municipal/operator/camera/payment integration.
- No real plate, location, financial, identity, camera, or enforcement data.
- Use fictitious zones, plates, operator messages, limits, alerts, history, and receipts.
- Preserve Spanish guided flows, Copilot, help, safe account/onboarding, stable red labels, and deterministic transaction boundaries.

## Tasks

### T001 — Confirm zone, vehicle, and duration

- [x] Add map/list/code-style zone selection with fictitious zone code.
- [x] Confirm mock vehicle/plate before starting or reserving.
- [x] Add intuitive duration control and visible regulatory maximum.
- [x] Prevent duration beyond the selected zone limit.

### T002 — Expand active-session control

- [x] Show active status, zone, vehicle, end time, operator-control confirmation, and reminder state.
- [x] Allow simulated extension within the regulatory limit.
- [x] Allow early termination and generate updated receipt/history state.
- [x] Explain that operator/enforcement communication is simulated.

### T003 — Add activity and automatic access

- [x] Add activity/history flow for sessions and receipts.
- [x] Add simulated automatic entry/exit with camera-consent mock, compatible parking context, and manual fallback.
- [x] Keep automatic access separate from ordinary private-space checkout.
- [x] Update help and README with the adapted patterns and safety boundaries.

### T004 — Verify and publish

- [x] Run whitespace, embedded-script syntax, structural-flow, Spanish UI, secret/sensitive-input, and transaction-boundary checks.
- [x] Obtain independent read-only verification.
- [ ] Request publication approval, commit, publish, and verify GitHub Pages.

Evidence: `git diff --check`, embedded `node --check`, 17-reference structural checks, sensitive-input scan, secret scan, and transaction-boundary assertions passed. Independent read-only verification returned PASS with no blocking defects. Focused parent corrections made operator/control and Express receipt IDs stable and prevented duplicate history entries or extensions after session end. Residual risk: static verification only; browser click-through is not automated.
