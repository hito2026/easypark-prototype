# Help Documentation Portal

## Objective

Replace the compact in-prototype help wizard with a dedicated Spanish documentation page that lets testers, stakeholders, and creators understand the project, test every supported use case, and request or add functionality through stable reference labels.

## Experience direction

- Use a documentation-information architecture inspired by modern cloud documentation: persistent header, lateral navigation, nested topics, readable content area, breadcrumbs, and mobile drawer.
- Do not copy Google Cloud branding, assets, wording, colors, or trade dress.
- Keep the public prototype mobile-first and accessible by keyboard and screen reader.

## Constraints

- Static HTML/CSS/JavaScript only; no backend or remote search.
- All documentation and navigation are in Spanish.
- Help links back to the prototype and the prototype links directly to the dedicated help page.
- No real personal, payment, fiscal, plate, location, camera, operator, or enforcement data.
- Reference labels documented from the actual prototype must remain stable and actionable.

## Tasks

### T001 — Build documentation shell

- [x] Create `help.html` with a header, breadcrumbs, responsive lateral menu, nested sections, active-section state, and mobile navigation.
- [x] Add local text filtering/search with an empty state and no external requests.
- [x] Include skip link, semantic landmarks, focus states, and reduced-motion support.

### T002 — Explain project and testing

- [x] Explain purpose, audiences, roles, offer types, deterministic Copilot, simulation boundaries, and public-reference inspiration.
- [x] Provide a safe test protocol: preparation, fictitious data, test order, expected evidence, reset/clear data, and feedback template.
- [x] Separate expected prototype behavior from production assumptions.

### T003 — Document every supported use case

- [x] Cover onboarding and account configuration.
- [x] Cover private driver search/reservation/payment/receipt/session.
- [x] Cover urban zone/vehicle/duration/session/activity.
- [x] Cover Copilot, provider onboarding, operator workflows, and Express access.
- [x] Provide per-topic prerequisites, steps, expected result, labels, and edge cases.

### T004 — Guide creators through label-driven extensions

- [x] Explain label anatomy and feedback format.
- [x] Add a label catalog organized by flow prefix.
- [x] Add a creator workflow for proposing, implementing, verifying, and documenting features safely.
- [x] Update the prototype entry point and README.

### T005 — Verify and publish

- [x] Run HTML/link/navigation/script, responsive/accessibility, Spanish UI, sensitive-data, secret, and regression checks.
- [x] Obtain independent read-only verification.
- [x] Request publication approval, commit, publish, and verify GitHub Pages.

Evidence: user approved publication; `git diff --check`, embedded `node --check` for both pages, unique-ID/local-link/navigation assertions, 59-reference catalog validation, accessibility structure assertions, Spanish UI scan, external-dependency scan, sensitive-input/secret scan, and existing-flow regression assertions passed. Independent read-only verification returned PASS with no defects. Search was corrected so the hero, result status, and empty state remain visible while filtering documentation topics. Native RDD review was unavailable because no model is configured for `review-reliability`. Work-unit commit: `69555b05cfbd1dd5d934a353e022ba644a719d41` (`feat: add comprehensive help portal`). Residual risk: static verification only; browser rendering, keyboard traversal, screen-reader behavior, and computed contrast are not automated.
