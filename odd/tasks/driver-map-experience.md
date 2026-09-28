# Driver Map Experience

## Objective

Apply a modern ride-hailing-inspired interaction model to the EasyPark driver experience without copying Uber branding, wording, icons, layout, or trade dress.

## Problem

The prototype is functionally rich, but the driver flow still reads like a sequence of generic forms and long cards. The main decision, map context, price, distance, reservation state, and next action do not yet have a strong visual hierarchy.

## Why

A destination-first experience with a persistent map context, compact bottom-sheet decisions, one dominant action, progressive disclosure, and explicit status progression should make the prototype easier to understand and more realistic for product testing.

## Scope

- Driver-oriented home entry, private-space results, detail, confirmation, receipt/pass, and active session.
- Responsive map-plus-bottom-sheet composition inside the existing static prototype.
- Compact cards and progressive disclosure for secondary metadata.
- Explicit reservation/session status timeline.
- Spanish Help and README documentation plus stable red refs.
- Existing provider, operator, urban, guidance-only, Express, account, onboarding, Copilot, payment, and incident behavior remains intact.

## Non-goals

- Copying Uber branding, proprietary assets, text, icons, or exact screen composition.
- Real maps, GPS, routing, availability, dynamic pricing, tracking, or live status.
- Backend, external SDK, remote API, new personal-data collection, or production payments.
- Redesigning provider and operator flows as ride-hailing experiences.

## Constraints

- Static HTML/CSS/JavaScript and localStorage only.
- Use existing local OpenMoji assets and CSS; no runtime remote resources.
- Preserve all current transaction boundaries and escaped user/localStorage-derived rendering.
- Keep visible reference labels and reduced-motion behavior.
- UI and user-facing documentation remain Spanish.

## TDD and delivery

- TDD mode: off; source is the repository's static-prototype structure with no automated browser test runner.
- Verification runner: `git diff --check`, embedded `node --check`, local link/ref/runtime-resource scans, and focused structural invariants.
- Browser, keyboard, screen-reader, computed-contrast, and actual reduced-motion behavior remain manual checks unless tooling becomes available.
- Route: delegated writer because three non-trivial files are expected to change.
- Forecast: approximately 180 authored diff lines, excluding unchanged/local media; delivery strategy `ask-on-risk` with no chain expected below the 400-line review threshold.
- Commit and publication require explicit user approval.

## Tasks

### T001 — Create destination-first visual hierarchy

- [x] Make parking search the primary home action while keeping other roles/features discoverable.
- [x] Introduce a neutral, original visual system inspired by map-led mobility usability rather than Uber trade dress.
- [x] Preserve Help, refs, and all existing home entry points.

Status: implemented by delegated writer; static verification passed; independent verification pending.

### T002 — Build map and bottom-sheet decision flow

- [x] Present results as a large simulated map plus accessible bottom-sheet-style panel.
- [x] Make price, distance, reservability, and primary action immediately scannable.
- [x] Move secondary services, rules, block/peak metadata, and caveats behind progressive disclosure.
- [x] Preserve empty states, filters, guidance-only boundaries, and safe local selection.

Status: implemented by delegated writer; static verification passed; independent verification pending.

### T003 — Clarify detail, confirmation, and active status

- [x] Apply one clear primary action per driver screen.
- [x] Reframe confirmation as a compact trip-style summary without implying real tracking.
- [x] Add a deterministic reservation/session timeline from selection through completion.
- [x] Keep payment, pass, incident, and session actions fictitious and transactionally unchanged.

Status: implemented by delegated writer; static verification passed; independent verification pending.

### T004 — Document and verify

- [x] Add stable refs for the destination entry, map sheet, progressive details, and status timeline.
- [x] Update Help and README with the new driver interaction model and its simulation limits.
- [ ] Run static, syntax, link/ref, security, reduced-motion, responsive-structure, and transaction-boundary checks. Static checks passed; manual browser/accessibility checks remain pending and were explicitly accepted as publication risk by the user.
- [x] Obtain independent read-only verification.
- [ ] Commit/push and verify Pages. Publication was explicitly authorized by the user.

## Acceptance criteria

- The driver experience clearly starts with destination intent and keeps map context visible during option selection.
- Results expose price, distance, availability type, and one main action without requiring users to read dense metadata.
- Secondary metadata is available through native progressive disclosure and remains keyboard reachable.
- Status progression is visible but explicitly simulated; no GPS or real-time claim appears.
- Guidance-only, urban, Express, and private checkout flows remain distinct.
- Provider/operator flows remain functionally intact.
- No remote runtime resource, competitor asset, or unescaped new rendering path is introduced.

## Progress

T001-T003 and T004 documentation are implemented. Writer static checks passed. No commit or push has been made.

## Verification evidence

- Changed files: `index.html`, `help.html`, and `README.md`; task tracking remains in this document.
- `git diff --check`: passed.
- Embedded scripts in `index.html` and `help.html`: `node --check` passed.
- Local link/runtime resource scan: passed; no runtime remote resources.
- Required refs exist in prototype and Help.
- Focused structural checks passed for explicit selection controls, progressive disclosure, no-checkout guidance options, home direct-search routing, reduced motion, and new escaping paths.
- Independent verification: `PARTIAL` only because manual checks are unavailable; no blocking static/source defect was found.
- Base/candidate flow comparison: all 59 existing flow IDs remain; none were removed.
- Independent checks confirmed accessible pin roles, explicit selection-only controls, results footer suppression, guidance/private checkout guard, deterministic four-stage timeline, no live-map/tracking claim, and no new XSS path.
- Manual browser, mobile layout, keyboard, screen-reader, computed-contrast, and actual reduced-motion checks remain pending.

## Next step

Create the work-unit commit, attempt the native review path, publish the authorized change, and verify Pages.
