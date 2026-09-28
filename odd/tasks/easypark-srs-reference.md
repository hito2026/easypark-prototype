# EasyPark Filled SRS Reference

## Objective

Create a filled EasyPark Software Requirements Specification in Spanish, derived from the current prototype evidence, while preserving the existing blank reusable SRS template.

## Problem

The current downloadable template demonstrates structure but leaves most fields empty. Future participants need a realistic, traceable EasyPark example that shows how to distinguish implemented prototype facts, inferred product requirements, future production proposals, and unresolved decisions.

## Why

A filled working reference gives product, engineering, QA, security, operations, hosts, and stakeholders a shared starting point without falsely presenting unknown production decisions as approved requirements.

## Scope

- Preserve the existing blank Markdown/PDF template unchanged in purpose and download path.
- Add a separate canonical filled EasyPark SRS Markdown and deterministic PDF.
- Cover document control, purpose, scope, audiences, terminology, references, product context, roles, operating environment, constraints, assumptions, interfaces, use cases, functional requirements, business rules, conceptual data, non-functional requirements, acceptance, traceability, risks, decisions, and open questions.
- Trace requirements to current visible prototype refs and repository evidence.
- Mark statements as prototype-implemented, inferred requirement, future proposal, or unresolved TODO where appropriate.
- Update Help and README to distinguish blank template from completed reference.
- Parameterize the existing PDF generator without breaking its current default behavior.

## Non-goals

- Claiming IEEE conformance, certification, or official-template status.
- Inventing production architecture, legal obligations, SLAs, integrations, metrics, owners, approvals, or regulatory decisions not supported by evidence.
- Replacing human approval of requirements.
- Changing prototype runtime behavior.

## Constraints

- Spanish document and user-facing documentation.
- Markdown is the source of truth; generated PDF must be deterministic.
- Keep the official IEEE 830 page as historical context and state that IEEE 830-1998 is superseded according to the cited page.
- Do not copy proprietary standards text.
- Preserve public safety boundaries: fictitious data only, no real credentials, cards, identity, plates, locations, cameras, or secrets.
- Keep URLs, stable refs, commit evidence, and unresolved TODOs explicit.

## TDD and delivery

- TDD mode: off; source is the static-documentation repository with a deterministic ReportLab generator and no unit-test runner.
- Verification runner: `git diff --check`, Python compilation, deterministic PDF regeneration/hash comparison, Markdown placeholder/status scans, PDF metadata/page/text checks, Help embedded JS syntax, links/refs, and public artifact checks after publication.
- Route: delegated writer because five non-trivial/generated files are expected to change.
- Forecast: approximately 650–900 authored Markdown/Python/HTML lines, excluding the generated PDF.
- Delivery strategy: `ask-on-risk`; the user selected `feature-branch-chain`: several reviewable commits remain on `feat/easypark-srs-reference` and publish together only after final approval.
- Verified work-unit commits on the feature branch are authorized by the selected chain; push, merge, and publication require explicit final user approval.

## Tasks

### T001 — Parameterize deterministic PDF generation

- [x] Add safe optional source/output/title/subject arguments while preserving the existing no-argument blank-template behavior.
- [x] Constrain paths to the repository and reject invalid/missing Markdown inputs.
- [x] Keep invariant PDF generation and existing checklist/table rendering.

Status: complete in work-unit commit `5be3c40`; default blank PDF remains byte-identical at SHA-256 `f95973027adf3e3ebf21be883d6e09de03b10ff45ea232a5c77095658983e630`.

### T002 — Write filled EasyPark SRS foundation

- [x] Add document control, status/legend, purpose, scope, audiences, glossary, references, product perspective, roles, environment, constraints, assumptions, and included/excluded scope.
- [x] Record current prototype evidence separately from future production intent.
- [x] Leave unsupported owners, approvals, legal standards, SLAs, and country scope as explicit TODOs.

Status: complete in work-unit commit `d8f82df`; verified public repository/prototype/help URLs are filled, while unsupported decisions remain explicit TODOs.

### T003 — Specify behavior, data, quality, and traceability

- [x] Catalog all current use cases and boundaries: onboarding, account, private driver, urban, activity, Copilot, host, operations, Express, incidents, Help/creator/Buzz.
- [x] Add stable functional requirement and business-rule IDs with objective acceptance criteria.
- [x] Add conceptual entities/localStorage facts plus proposed production data controls.
- [x] Add current and proposed NFRs for security, privacy, accessibility, portability, availability, observability, performance, and maintainability.
- [x] Add acceptance strategy, traceability matrix, risks, decisions, assumptions, and open questions.

Status: complete across work-unit commits `eb704f6` for sections 4–7 and `6aca6dd` for sections 8–12.

### T004 — Publish the reference alongside the blank template

- [x] Generate `templates/easypark-srs-reference.pdf` from `templates/easypark-srs-reference.md`.
- [x] Add separate Help downloads/refs for filled Markdown and PDF without changing blank-template URLs.
- [x] Update README with both artifact families and regeneration commands.

Status: complete in work-unit commit `7192b8b`; filled PDF SHA-256 is `595aa42ed2d1c9e1a10393d6e75a1ffadcbbb6c580868b1c8bdbc9a4a86e25f0`, 101,634 bytes, 35 pages. Public availability remains pending final approval, push, and Pages deployment.

### T005 — Verify and publish

- [x] Verify blank-template output remains deterministic and unchanged when the generator runs with no arguments.
- [x] Verify filled Markdown contains no accidental unresolved template braces; deliberate TODOs remain explicit.
- [x] Verify generated PDF metadata, page count, text extraction, hashes, links, refs, and public safety language.
- [x] Obtain independent read-only verification.
- [x] Request final approval before push/publication and verify GitHub Pages only if approved.

Verification evidence:

- Independent read-only result: PASS after commit `13f3398` marked PDFs binary and made `git diff --check main...HEAD` pass.
- Blank PDF SHA-256: `f95973027adf3e3ebf21be883d6e09de03b10ff45ea232a5c77095658983e630`.
- Filled PDF SHA-256: `595aa42ed2d1c9e1a10393d6e75a1ffadcbbb6c580868b1c8bdbc9a4a86e25f0`; 101,634 bytes; 35 pages.
- Filled Markdown: sections 0–12, zero template braces, 140 scanned unique SRS-style IDs, and all 46 FR, 10 DR, and 17 NFR rows include acceptance/evidence.
- Help/README paths, refs, byte labels, local links, embedded JavaScript, generator validation, metadata, and text extraction passed.
- Native RDD review preflight stopped with `lens_context_budget_exceeded`; no lineage or review authority was created. Independent verification remains the available review evidence.
- Publication approval: granted explicitly by the user.
- Published main commit: `122069294cccdeab9fc94a6670302d2681a8f1ff`.
- GitHub Pages workflow `36469316735`, job `109087256701`, and deployment `6718151817`: success.
- Public Help and all four SRS artifacts returned HTTP 200 with expected MIME, bytes, and SHA-256 hashes.
- Deferred checks: browser/mobile, keyboard, screen reader, computed contrast, real voice behavior, bottom-sheet scrolling, and actual reduced-motion behavior.

Status: complete and published.

## Acceptance criteria

- Blank template Markdown/PDF remain available at their existing paths.
- Filled SRS has a separate stable MD/PDF path and is linked from Help.
- Every material prototype claim traces to visible refs or repository evidence.
- Every future production requirement is labeled proposed and does not masquerade as implemented.
- Unknown product/legal/technical decisions are explicit TODO/open items, not invented answers.
- Requirements are atomic enough to test and include acceptance evidence or a defined future verification method.
- Generator no-argument behavior remains backward compatible and deterministic.
- Public documentation clearly distinguishes template, filled reference, prototype truth, and production intent.

## Progress

All T001–T005 work is complete. The filled SRS reference, preserved blank template, Help downloads, README guidance, generator changes, and verification evidence are published on `main`. Native RDD review could not start because the accumulated candidate exceeded its context budget; no authority was created. Independent verification and public Pages verification passed.

## Next step

No implementation work remains. Future collaborators can use the published filled reference and preserve the documented TODO/status discipline.
