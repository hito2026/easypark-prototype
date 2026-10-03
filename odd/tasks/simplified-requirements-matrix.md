# Simplified Requirements and Relationships

## Goal

Add two stakeholder-facing sheets beside the simplified use-case sheet: one requirement per row and one requirement-to-use-case relationship per row.

## User decisions

- Create new simplified sheets rather than reusing or replacing the hidden historical sheets.
- Keep these three sheets visible:
  - `Casos de uso simplificado`
  - `Requerimientos simplificado`
  - `Relaciones`
- Keep the historical `Casos de uso`, `Flujos`, `Requerimientos`, and `Matriz` sheets hidden as reference and rollback material.
- Use an operational schema rather than the minimal or full historical schema.
- Synchronize only requirements whose SRS status is implemented/current; exclude proposed requirements.

## Schemas

### Requerimientos simplificado

1. `ID`
2. `Tipo`
3. `Requerimiento`
4. `Criterio de aceptación`
5. `Prioridad`
6. `Estado`
7. `Responsable`
8. `Notas`

### Relaciones

1. `ID relación`
2. `ID requerimiento`
3. `Caso de uso (ID — Nombre)`
4. `Tipo de relación`
5. `Cobertura`
6. `Notas`

## Safety and authority

- The reviewed SRS remains the source of current requirements and case relationships.
- Preview performs no writes.
- A timestamped full-spreadsheet copy precedes every sheet creation, formatting, row update, or visibility change.
- The exact spreadsheet ID, headers, and managed IDs are validated.
- The three simplified sheets are shown before any historical sheet is hidden.
- No sheet is deleted and user-owned rows remain untouched.
- Requirements and relationships are upserted by stable IDs.
- A second synchronization without source changes must produce zero changes.

## Tasks

### T001 — Generate operational datasets

- [x] Project every implemented/current SRS requirement into the eight selected columns.
- [x] Generate stable one-row relationships between requirements and managed use cases.
- [x] Keep every relationship endpoint resolvable and exclude proposed requirements.

Acceptance checks:

- Requirement IDs are unique and each row has exactly 8 values.
- Relationship IDs are unique and each row has exactly 6 values.
- Every relationship points to a generated requirement and one of the 12 managed cases.
- Every generated requirement is related to at least one managed case.

### T002 — Extend safe workbook synchronization

- [x] Preview creation, upsert, and visibility changes for all three simplified sheets without mutation.
- [x] Create and format missing simplified sheets.
- [x] Upsert only managed rows while preserving unknown rows.
- [x] Show all simplified sheets and hide only the four historical sheets.
- [x] Preserve target validation, confirmation, lock, backup ordering, cancellation, and idempotency.

Acceptance checks:

- Wrong target, missing historical sheets, incompatible headers, and duplicate managed IDs fail closed.
- Backup precedes every workbook mutation.
- First sync creates or updates all three visible simplified sheets.
- Second sync reports zero row and visibility changes.
- Canonical managed values are restored without deleting user-owned rows.

### T003 — Update stakeholder documentation

- [x] Document the three-sheet simplified operating model and exact schemas.
- [x] Explain one-requirement-per-row and one-relationship-per-row usage.
- [x] Update installation, preview, synchronization, review, and recovery expectations.

### T004 — Verify delivery candidate

- [x] Use test-first coverage for the new datasets and multi-sheet sync behavior.
- [x] Run Python compile and deterministic generation checks.
- [x] Run Apps Script syntax, mock service, HTML/link, security, and diff-hygiene checks.
- [x] Attempt independent verification and native review, recording unavailable runtime support honestly.
- [x] Commit, push, and open the user-authorized cohesive PR.
- [ ] Merge, Pages, and live sync require separate authorization/human execution.

## Testing configuration

- Python validates schema widths, ID uniqueness, endpoint resolution, current-status filtering, and coverage.
- Node mocks Spreadsheet, Sheet, Range, UI, Lock, backup, creation, visibility, and multi-sheet idempotency.
- The user performs live preview and sync under their authenticated Google session.

## Progress

- 2026-10-03: User selected two new simplified sheets, operational schemas, and implemented/current requirements only.
- 2026-10-03: Implemented the 82-requirement and 118-relationship projections, generalized the safe sync to three visible sheets, and updated stakeholder guidance.
- 2026-10-03: User selected and authorized one cohesive PR; the generated artifact volume will be identified explicitly for reviewers.

## Evidence

- Work-unit commit: `8cb8cb2` (`feat(workbook): add requirements relationship sheets`).
- Pull request: https://github.com/hito2026/easypark-prototype/pull/9
- Test-first RED observed: the previous dataset exposed only `Casos de uso simplificado` instead of the required three sheets.
- Generator output: 12 use cases, 82 implemented/current requirements or rules, and 118 normalized relationships.
- Local harness covers the existing deployed-state migration: 12 unchanged cases plus creation of two sheets and 200 managed rows.
- `python3 -m py_compile scripts/generate-google-sheet-sync.py`: passed.
- Independently generated output compared byte-for-byte with `cmp`: passed.
- Generated Apps Script SHA-256: `80756ccf45a65c06ddea7d7b1ec554593a8292744f6fa8e62fb6b133b1acffbc`.
- Python validation confirms exact schemas, unique IDs, current-status filtering, resolved endpoints, no duplicate pairs, full requirement coverage, full case coverage, and agreement between case requirement lists and normalized relationships.
- `node --check < templates/izi-park-google-sheet-sync.gs`: passed.
- `node scripts/test-google-sheet-sync.mjs`: passed dataset, deployed-state migration, preview/no-write, target, legacy-sheet, header, duplicate-ID, backup-ordering, creation, formatting, three-sheet visibility, preservation, canonical restoration, idempotency, cancellation, flush, and lock checks.
- Help HTML parsing, local-link existence, inline JavaScript syntax, secret scan, and `git diff --check`: passed.
- Independent verifier launch was attempted, but the subagent runtime rejects a sibling worktree outside the current session's Git clone. This is unavailable, not a pass.
- Native review inspection was attempted and blocked with `native-status-package-binary-missing`; no lineage or mutation was created.
- Live Google mutation remains a human-run check under the user's authenticated session.
- Review workload is above the advisory 400-line budget because the generated Apps Script now embeds 200 additional managed rows; the generator and harness remain the primary review surfaces.
