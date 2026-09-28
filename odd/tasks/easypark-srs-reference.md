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
- Commit and publication require explicit user approval.

## Tasks

### T001 — Parameterize deterministic PDF generation

- [x] Add safe optional source/output/title/subject arguments while preserving the existing no-argument blank-template behavior.
- [x] Constrain paths to the repository and reject invalid/missing Markdown inputs.
- [x] Keep invariant PDF generation and existing checklist/table rendering.

Status: implemented and verified; work-unit commit pending.

### T002 — Write filled EasyPark SRS foundation

- [ ] Add document control, status/legend, purpose, scope, audiences, glossary, references, product perspective, roles, environment, constraints, assumptions, and included/excluded scope.
- [ ] Record current prototype evidence separately from future production intent.
- [ ] Leave unsupported owners, dates, approvals, legal standards, SLAs, and country scope as explicit TODOs.

### T003 — Specify behavior, data, quality, and traceability

- [ ] Catalog all current use cases and boundaries: onboarding, account, private driver, urban, activity, Copilot, host, operations, Express, incidents, Help/creator/Buzz.
- [ ] Add stable functional requirement and business-rule IDs with objective acceptance criteria.
- [ ] Add conceptual entities/localStorage facts plus proposed production data controls.
- [ ] Add current and proposed NFRs for security, privacy, accessibility, portability, availability, observability, performance, and maintainability.
- [ ] Add acceptance strategy, traceability matrix, risks, decisions, assumptions, and open questions.

### T004 — Publish the reference alongside the blank template

- [ ] Generate `templates/easypark-srs-reference.pdf` from `templates/easypark-srs-reference.md`.
- [ ] Add separate Help downloads/refs for filled Markdown and PDF without changing blank-template URLs.
- [ ] Update README with both artifact families and regeneration commands.

### T005 — Verify and publish

- [ ] Verify blank-template output remains deterministic and unchanged when the generator runs with no arguments.
- [ ] Verify filled Markdown contains no accidental unresolved template braces; deliberate TODOs remain explicit.
- [ ] Verify generated PDF metadata, page count, text extraction, hashes, links, refs, and public safety language.
- [ ] Obtain independent read-only verification.
- [ ] Request approval before commits/push and verify GitHub Pages only if approved.

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

Exploration and repository mapping complete. User selected “filled example plus preserved blank template” and `feature-branch-chain`. T001 is implemented and verified; T002 is next.

## Next step

Commit T001 as the first work unit, then implement the filled SRS foundation in T002.
