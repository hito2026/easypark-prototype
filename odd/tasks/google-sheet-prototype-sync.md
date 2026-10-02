# Google Sheet Prototype Sync

## Goal

Provide a reviewable Google Apps Script that populates the existing Product Owner Google Sheet with the use cases already implemented and documented by the IZI PARK prototype, without requiring credentials to leave the user's Google session.

## Authorization and scope

The user selected a Google Apps Script workflow because this Pi runtime has no authenticated Google Sheets API or browser session. The script will be copied into the target spreadsheet through Extensions → Apps Script and executed by an authorized human account.

Target workbook:

- Spreadsheet ID: `15ioouFFFV9f3EumAZQHTu8mIBm5XjpzX1zrvR-2QDio`
- Expected sheets: `Casos de uso`, `Flujos`, `Requerimientos`, `Matriz`

## Source authority

- `templates/easypark-srs-reference.md` is the canonical structured source for implemented use cases, functional requirements, business rules, non-functional requirements, and visible evidence refs.
- `help.html` provides concise human-facing flow sequences and limits.
- `index.html` remains the executable static prototype.
- The Google Sheet is collaborative working state; Git and the reviewed SRS remain source of truth.

## Safety decisions

- Never request, embed, or persist Google credentials, OAuth tokens, API keys, or private data.
- Bind execution to the exact target spreadsheet ID.
- Require a preview before sync.
- Acquire a document lock before writes.
- Create a timestamped full-spreadsheet backup before the first mutation of each sync execution.
- Upsert only rows whose stable IDs belong to the prototype dataset; never clear sheets or overwrite unrelated user-authored rows.
- Preserve workbook headers, formulas, validations, formatting, and user-owned columns outside managed values.
- Mark imported content as prototype evidence, not approved production truth.
- Reject missing sheets, duplicate IDs, missing headers, invalid references, or an unexpected spreadsheet target before writes.

## Tasks

### T001 — Curate the prototype workbook dataset

- [x] Map every implemented use case from the SRS catalog into the Product Owner schema.
- [x] Add principal flow summaries using existing stable visible refs.
- [x] Add implemented functional and current non-functional requirements needed for traceability.
- [x] Add normalized requirement/use-case/flow relationships without inventing unsupported behavior.

Acceptance checks:

- Stable IDs match existing SRS identifiers.
- Every imported use case has at least one flow and one matrix relationship.
- Every matrix reference resolves to an imported use case and requirement.
- No proposed production requirement is represented as already implemented.

### T002 — Implement safe Apps Script synchronization

- [x] Add preview and sync menu actions.
- [x] Validate exact spreadsheet identity and four-sheet schema.
- [x] Create a timestamped full workbook backup before mutation.
- [x] Upsert managed rows by stable ID while preserving unrelated rows.
- [x] Make repeated execution idempotent.

Acceptance checks:

- Preview performs no writes.
- Sync refuses an unexpected workbook or malformed schema.
- Sync updates existing managed IDs and appends missing managed IDs.
- A second sync reports no material changes.
- Lock release and user-visible error reporting are guaranteed.

### T003 — Document installation and operation

- [ ] Add Help guidance for installing the script through Extensions → Apps Script.
- [ ] Explain preview, permissions, backup creation, synchronization, and recovery.
- [ ] State that the user—not Pi—authorizes Google access and runs the mutation.
- [ ] Preserve the XLSX fallback and Git/SRS authority boundary.

Acceptance checks:

- No credentials are requested or documented.
- The script is downloadable from the Help portal.
- Recovery instructions point to the generated backup rather than destructive rollback.

### T004 — Verify before publication

- [x] Run syntax, dataset integrity, idempotency, wrong-target, duplicate-ID, missing-header, and backup-before-write tests with a local mock harness.
- [ ] Run HTML/link/ref and repository hygiene checks.
- [ ] Obtain independent read-only verification if the runtime supports the target repository.
- [ ] Publish only after explicit user approval for commit, push, PR, merge, and Pages deployment.

## Testing configuration

- Apps Script syntax: V8-compatible JavaScript checked with Node where syntax overlaps.
- Deterministic behavior: local Node mock of the Spreadsheet/Sheet/Range/Lock/UI services.
- No live Google mutation can be verified by this runtime; the human-run preview and first sync remain required manual checks.
- Native subagent execution is unavailable for this sibling Git clone in the current Pi session, so any inline fallback must stay bounded and all limitations must be reported.

## Progress

- 2026-10-02: User selected Google Apps Script so writes execute under their own authorized Google session without sharing credentials.
- 2026-10-02: Anonymous read access to the target sheet was confirmed, but edit permission was not inferred.
- 2026-10-02: Official Apps Script documentation confirmed `Spreadsheet.copy(name)`, document-scoped locks, and range writes as supported primitives for backup and safe synchronization.
- 2026-10-02: Generated a 12-case, 24-flow, 82-requirement/rule, 118-relationship dataset from the reviewed SRS. Proposed production requirements are excluded.
- 2026-10-02: The feature contains 1,285 new artifact lines plus 22 net documentation lines, primarily the generator, generated Apps Script dataset, test harness, and ODD evidence. The user selected two chained review slices: generator/sync first, then Help/README guidance.

## Evidence

- `python3 -m py_compile scripts/generate-google-sheet-sync.py`: passed.
- Two consecutive generations produced identical SHA-256 `4f5d4feda7952b0c02b3ed53ca51971a9cbaa4797642b6513a3fbc94125baea7`.
- `node --check < templates/izi-park-google-sheet-sync.gs`: passed.
- `node scripts/test-google-sheet-sync.mjs`: passed preview/no-write, wrong target, missing sheet, wrong header, duplicate existing ID, backup-before-write, preservation of unrelated rows, complete upsert, idempotent second sync, managed-row correction, cancellation, lock, flush, and release assertions.
- Generator validation confirms every use case has flows and traceability, every imported requirement is linked, and all matrix references resolve.
- Core secret scan and `git diff --check`: passed.
- Help/README integration and HTML/link/ref checks belong to the second review slice.
- Native subagent verification remains unavailable because the current Pi session is bound to a different Git clone; this limitation is explicit rather than inferred as a pass.
- Live Google mutation remains a human-run check because this runtime has no authenticated Google session.
