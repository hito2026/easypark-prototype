# Plain-Language Use Case Flows

## Goal

Make the simplified Product Owner sheet easier to understand by expressing main and alternative flows in plain functional language, with each documentation reference attached parenthetically to the component it identifies.

## User feedback

- The first live simplified-sheet synchronization completed successfully.
- Reference labels without context inside flow descriptions create unnecessary confusion.
- Flow text should name recognizable prototype components and concepts instead: onboarding, account, search, map, result cards, checkout, receipt, pass, session, Copilot, provider form, operations panel, Express, incident recovery, Help, SRS, and Buzz.
- The user clarified that each component must retain its reference tags immediately afterward in parentheses.

## Scope

- Change only the generated values for `Flujo principal` and `Flujo alternativo`.
- Describe each flow as semicolon-separated functional elements, with one or more reference tags at the end of every element in parentheses.
- Keep the use-case stable IDs and the `Requerimientos` IDs because that column is the explicit traceability surface.
- Keep technical SRS refs in the SRS itself and contextualize them in the stakeholder-facing projection.
- Preserve the existing safe Apps Script installation, preview, backup, locking, upsert, legacy-sheet hiding, unrelated-row preservation, and idempotency behavior.

## Tasks

### T001 — Define plain-language flows

- [x] Write one main flow and one alternative flow for each of the 12 managed use cases.
- [x] Name visible components or functional concepts instead of exposing documentation refs or storage keys without context.
- [x] Place the relevant tags immediately after every described flow element, inside parentheses.
- [x] Preserve the behavior and limitations documented by the reviewed SRS.

Acceptance checks:

- Every managed case has nonempty main and alternative flow text.
- Every semicolon-separated flow element ends with a parenthesized reference group.
- Neither flow column contains an uncontextualized tag or storage key.
- Flow descriptions remain distinguishable and concrete enough to guide prototype review.

### T002 — Generate and protect the projection

- [x] Replace the reference-based fallback with an explicit per-case flow projection.
- [x] Validate complete flow coverage for every generated use case.
- [x] Extend Python and the local harness to require contextual parenthesized tags and reject bare tags or storage keys.
- [x] Regenerate the downloadable Apps Script.

Acceptance checks:

- The generated dataset still contains exactly 12 unique cases and 11 columns.
- Existing synchronization safety and idempotency tests continue to pass.
- A subsequent live sync updates only managed case rows and leaves user-owned rows unchanged.

### T003 — Update stakeholder guidance

- [x] Explain that flow columns use functional language with contextual parenthesized tags while requirement IDs remain for traceability.
- [x] Keep installation and recovery steps unchanged.

### T004 — Verify delivery candidate

- [x] Run Python compile and deterministic generation checks.
- [x] Run Apps Script syntax and mock behavior checks.
- [x] Run documentation/link, secret, and diff-hygiene checks.
- [x] Attempt independent verification and native review, recording unavailable runtime support honestly.
- [ ] Commit, push, PR, merge, and live execution require their corresponding explicit authorizations.

## Testing configuration

- Python validates full flow coverage, one contextual parenthesized tag group per flow element, absence of bare tags, and absence of storage keys in stakeholder-facing flow cells.
- Node parses the generated Apps Script and runs the local Google service mock.
- The user performs the live Google preview and sync under their own authorization.

## Progress

- 2026-10-03: User confirmed the first simplified-sheet sync worked correctly and requested plain-language flow descriptions instead of bare documentation labels.
- 2026-10-03: User clarified that every described flow element must retain its reference tags immediately afterward in parentheses.
- 2026-10-03: Implemented and locally verified the contextual flow projection.
- 2026-10-03: User authorized commit, push, and PR publication. Merge and the second live synchronization remain separate decisions/human execution.

## Evidence

- Test-first RED observed: the existing onboarding fallback failed the new requirement because it did not contain multiple contextualized elements.
- `python3 -m py_compile scripts/generate-google-sheet-sync.py`: passed.
- Independently generated output compared byte-for-byte with `cmp`: passed.
- Generated script SHA-256: `ccd5713f530e48c20b5b720fa8aec8c04cda77c638a459fd7a96db9a1a9c4d55`.
- Python validation confirms exact coverage for all 12 case IDs, at least two elements in each main/alternative flow, one parenthesized tag group at the end of every element, no bare tags, no storage keys, and every referenced tag present in the reviewed SRS.
- `node --check < templates/izi-park-google-sheet-sync.gs`: passed.
- `node scripts/test-google-sheet-sync.mjs`: passed the contextual-flow assertions plus all existing target, backup, creation, preservation, visibility, idempotency, cancellation, flush, and lock checks.
- Help HTML parsing, local-link existence, inline JavaScript syntax, secret scan, and `git diff --check`: passed.
- The generated Apps Script changes exactly 12 dataset lines; synchronization control logic is unchanged.
- Independent verifier launch was attempted, but the subagent runtime rejects a sibling worktree outside the current session's Git clone. This is unavailable, not a pass.
- Native review inspection was attempted and blocked with `native-status-package-binary-missing`; no lineage or mutation was created.
- Live Google mutation remains a human-run check under the user's authenticated session.
