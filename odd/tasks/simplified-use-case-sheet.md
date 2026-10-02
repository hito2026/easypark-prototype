# Simplified Use Case Sheet

## Goal

Simplify the Product Owner workbook into one visible use-case sheet with only the fields stakeholders need to understand, discuss, and approve prototype behavior.

## User decisions

- Keep one visible simplified sheet.
- Preserve the original four workbook sheets as hidden rollback/reference material rather than deleting them.
- Combine stable ID and use-case name in one first column, for example `UC-ONB-001 — Alta guiada de prueba`.
- Update the Google Apps Script so future synchronizations maintain the simplified model.

## Simplified schema

The visible sheet is named `Casos de uso simplificado` and contains exactly these columns:

1. `Nro y nombre de caso`
2. `Objetivo`
3. `Alcance`
4. `Precondición`
5. `Post condición`
6. `Flujo principal`
7. `Flujo alternativo`
8. `Criterio de aceptación`
9. `Requerimientos`
10. `Actores principales`
11. `Estado`

## Safety and authority

- The reviewed SRS remains the structured source of truth for prototype cases and requirements.
- The script remains bound to spreadsheet ID `15ioouFFFV9f3EumAZQHTu8mIBm5XjpzX1zrvR-2QDio`.
- Preview performs no writes.
- A timestamped full-spreadsheet copy is created before sheet creation, header changes, row changes, or visibility changes.
- Original sheets `Casos de uso`, `Flujos`, `Requerimientos`, and `Matriz` are hidden only after the simplified sheet exists and is visible.
- No sheet is deleted.
- Unknown user-authored rows in the simplified sheet are preserved.
- Managed prototype cases are upserted by the stable ID prefix before the em dash.
- No credentials, OAuth tokens, API keys, or real personal/payment/location data are requested or embedded.

## Tasks

### T001 — Define the simplified dataset

- [x] Project every implemented SRS use case into the eleven selected columns.
- [x] Preserve stable IDs, actors, preconditions, postconditions, primary/alternative flows, acceptance, and linked requirements.
- [x] Keep prototype status explicit and exclude proposed production behavior from the case list.

Acceptance checks:

- Exactly 12 prototype cases are present.
- Every row contains 11 values and a unique stable use-case ID.
- Every requirement reference resolves to an implemented/current requirement from the reviewed SRS.

### T002 — Update the Apps Script migration and sync

- [x] Preview creation, upsert, and visibility changes without mutation.
- [x] Create and format `Casos de uso simplificado` when absent.
- [x] Upsert managed cases while preserving unknown rows.
- [x] Hide the original four sheets only after the simplified sheet is visible.
- [x] Keep backup-before-write, exact-target validation, locking, confirmation, and idempotency.

Acceptance checks:

- Wrong target, malformed existing simplified headers, and duplicate managed IDs fail closed.
- The first sync creates a backup before any workbook mutation.
- Original sheets remain present but hidden.
- A second sync produces zero row or visibility changes.
- Re-running restores canonical managed values without deleting user-owned rows.

### T003 — Update stakeholder documentation

- [x] Replace the four-sheet operating model with the eleven-column simplified model.
- [x] Explain that legacy sheets remain hidden and recoverable.
- [x] Update installation, preview, sync, review, and rollback guidance.
- [x] Preserve the downloadable XLSX as a detailed reference artifact, not the active simple workflow.

### T004 — Verify and publish

- [x] Update local Google service mocks for sheet creation, formatting, visibility, and idempotency.
- [x] Run generator determinism, Apps Script syntax, behavioral, HTML/link/ref, secret, and diff checks.
- [x] Attempt independent verification and record the runtime limitation.
- [ ] Publish only with explicit commit, push, PR, merge, and Pages authorization.

## Testing configuration

- Python validates the SRS-derived simplified dataset.
- Node checks generated Apps Script syntax and executes a local mock of Spreadsheet, Sheet, Range, UI, Lock, backup, creation, and visibility services.
- The first live Google sync remains a human-run check under the user's Google authorization.
- Native subagents cannot target this sibling Git clone from the current Pi session; bounded inline fallback and this limitation must remain explicit.

## Progress

- 2026-10-02: User selected one visible simplified sheet, hidden legacy tabs, combined ID/name, and ongoing Apps Script maintenance.
- 2026-10-02: Implemented the 12-case projection, safe Apps Script migration/upsert, local service harness, and stakeholder documentation.
- 2026-10-02: Local implementation and verification are complete.
- 2026-10-02: The user authorized commit, push, and PR publication. Work-unit commit `adc19ed` was pushed and PR #7 was opened. Merge, Pages deployment, and the first live Google execution remain pending authorization/human execution.

## Evidence

- Work-unit commit: `adc19ed` (`feat(workbook): simplify use-case sheet`).
- Pull request: https://github.com/hito2026/easypark-prototype/pull/7
- `python3 -m py_compile scripts/generate-google-sheet-sync.py`: passed.
- Two independently rendered outputs compared byte-for-byte with `cmp`: passed.
- Generated script SHA-256: `a2201cd12950c0648a75bb6f71432fda8ae4b3627808e05a1d24fce21b9f3460`.
- `node --check < templates/izi-park-google-sheet-sync.gs`: passed.
- `node scripts/test-google-sheet-sync.mjs`: passed creation preview/no-write, exact target, missing legacy sheet, incompatible header, duplicate managed ID, backup ordering, creation/formatting, legacy hiding, complete upsert, idempotency, canonical restoration, unknown-row preservation, hidden-sheet recovery, cancellation, flush, and lock release checks.
- Generator validation confirms exactly 12 unique cases, 11 values per case, and requirement IDs resolved against current implemented SRS rows.
- Help HTML parsing, local-link existence, inline JavaScript syntax, secret scan, and `git diff --check`: passed.
- Independent verifier launch was attempted, but the subagent runtime rejects a sibling worktree outside the current session's Git clone. This is recorded as unavailable, not as a pass.
- Native review remains unavailable because the installed review package binary is missing.
- Live Google mutation remains a human-run check because this runtime has no authenticated Google session.
