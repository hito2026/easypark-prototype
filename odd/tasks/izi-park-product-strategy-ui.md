# IZI PARK Product Strategy UI

## Objective

Adapt the public prototype to the authorized visual language, screen sequence, and functional intent documented in `IZI PARK - Product Strategy - V2.pdf`, while preserving safe simulation boundaries and all existing product flows.

## Source authority

- Source file: `/Users/asartorio/Downloads/IZI PARK - Product Strategy - V2.pdf`
- SHA-256: `d6da2f3ef6dcfbce83ab8b1cb80ee239656af9d0ec57353dc5899b289ca5aacc`
- Pages: 17; UI reference screens: pages 6–17.
- User confirmed the team owns or is authorized to reproduce the document's design, text, and visual style.
- Visible product brand decision: change the experience from EasyPark to `IZI PARK`.

## Problem

The current prototype covers most of the product behaviors but presents them as a generic guided wizard. The strategy document defines a more realistic, map-first, AI-first mobile experience with a persistent Copilot, unified alternatives, navigation, differentiated arrival states, a timed reservation hold, safe payment, confirmation, and active-session context.

## Scope

- Rework the mobile shell and driver journey to closely match pages 6–17 of the strategy PDF.
- Adopt the visible `IZI PARK` brand without breaking the repository, public URLs, stable refs, downloads, or existing localStorage compatibility.
- Preserve a simulated map and local deterministic Copilot; do not add remote maps, GPS, location, navigation, tracking, LLM, or dynamic availability.
- Preserve clear capability differences between street guidance, traditional parking, and reservable houses while maintaining one visual interaction model.
- Add or refine simulated navigation, parking arrival, house arrival, reservation hold/countdown, mock Mercado Pago-style selection, confirmation, active map context, countdown, extension, and finalization.
- Preserve provider, operator, urban, Express, account, onboarding, incident, Activity, Help, SRS, and Buzz flows.
- Update Help, README, and SRS only where needed to reflect the brand transition and newly represented states.
- Keep all user/localStorage-derived rendering escaped and visual assets local/allowlisted.

## Non-goals

- Real maps, GPS, geocoding, navigation, arrival detection, tracking, availability, prices, traffic, events, municipal data, or street restrictions.
- Real payments, Mercado Pago credentials or branding assets, card entry, settlement, refunds, fiscal receipts, or marketplace infrastructure.
- Remote AI/LLM inference, training, user profiling, or audio storage.
- Copying unrelated external assets; the authorized PDF is a design reference, not a runtime dependency.
- Renaming the GitHub repository or breaking existing public artifact URLs in this iteration.
- Selecting the production technology stack.

## Constraints

- Static HTML/CSS/JavaScript and browser `localStorage` only.
- Spanish user-facing copy.
- Mobile-first and usable at wider breakpoints.
- Stable visible red refs remain available and togglable.
- Every simulated/live distinction remains explicit.
- No real personal, payment, plate, location, camera, credential, or secret data.
- Git remains canonical; Buzz is coordination only.
- Work-unit commits on `feat/izi-park-product-strategy-ui`; push/publication require final approval.

## Review workload forecast

- Expected authored change: approximately 550–850 diff lines across runtime UI, documentation, and SRS evidence.
- Delivery strategy: reviewable work-unit commit chain on the feature branch.
- Keep each behavioral slice independently understandable; do not compress code to fit the review budget.

## Tasks

### T001 — Map strategy screens to prototype contracts

- [x] Inventory pages 6–17, copy, states, actions, and visual tokens.
- [x] Map every strategy state to stable refs, existing behavior, gaps, and safe simulation caveats.
- [x] Define the brand transition boundary and preserved legacy technical identifiers.

Status: complete in work-unit commit `41059a3`. The driver backbone already covers destination, mixed supply, selection guards, mock payment, receipt/pass/session, Copilot, incidents, and idempotence. Missing states are the unified IZI shell, simulated navigation/arrival, explicit hold countdown, safe payment presentation, full-screen confirmation, and active-session map context. Legacy repository and artifact URLs remain unchanged.

### T002 — Build the IZI map-first discovery journey

- [x] Rework the mobile shell, map home, persistent destination/Copilot composer, suggestion chips, and alternatives rail.
- [x] Represent destination entry, Copilot recommendation, mixed alternatives, explicit selection, and simulated navigation.
- [x] Preserve keyboard operation, visible focus, progressive disclosure, safe escaping, and non-reservable checkout guards.

Status: implemented and verified locally in `index.html`; visible brand is IZI PARK, all prior entry points remain reachable, new refs are single-valued, and guidance navigation returns visibly to results without entering payment. Work-unit commit pending.

### T003 — Build arrival, reservation, and safe payment states

- [ ] Add differentiated simulated arrival for parking and house.
- [ ] Add house reservation CTA, stable hold state, deterministic countdown, expiration guard, and idempotent confirmation.
- [ ] Add safe mock payment presentation inspired by the strategy without real credentials or branded provider integration.
- [ ] Add confirmation state and persistence without changing transactional truth.

### T004 — Build active-session context and preserve other flows

- [ ] Add active-session map card, time remaining, end time, extension, and finalization states.
- [ ] Keep Copilot available before, during, and after simulated parking.
- [ ] Regression-check provider, operator, urban, Express, account, onboarding, incident, Activity, Help, and ref visibility.

### T005 — Reconcile brand, documentation, and verification

- [ ] Update visible Help/README/SRS language for IZI PARK while retaining legacy repo/file URLs where required.
- [ ] Document the PDF provenance, simulation boundaries, functional coverage, remaining gaps, and manual checks.
- [ ] Run syntax, structural, ref, localStorage, secret, link, PDF/document, and independent read-only verification.
- [ ] Run native review preflight if available.
- [ ] Request final approval before push/publication and verify Pages only if approved.

## Acceptance criteria

- Pages 6–17 have an explicit prototype counterpart or documented reason for exclusion.
- The driver journey visually reads as the same product family as the authorized PDF: map-first, bright-green accents, rounded sheets/cards, persistent Copilot input, compact actions, and session context.
- The visible brand is IZI PARK; legacy repository/public paths continue working.
- Street and traditional parking remain guidance-only in this version; houses remain the only reservable/payable option.
- Navigation, arrival, availability, payment, settlement, countdown, and tracking are visibly simulated and deterministic.
- No real payment, location, plate, camera, voice, identity, or secret data is requested or stored.
- Existing stable refs and non-driver flows remain reachable.
- Reduced motion, focus visibility, keyboard selection, and escaped rendering remain intact.
- Documentation and SRS match observable behavior.

## Progress

T001 is complete in `41059a3`. T002 is implemented and verified locally; T003 is next after the T002 work-unit commit.

## Next step

Commit T002, then implement differentiated arrival, reservation hold, countdown, safe payment, and confirmation in T003.
