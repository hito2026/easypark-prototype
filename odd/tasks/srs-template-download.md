# Downloadable SRS Template

## Objective

Add a creator-facing subsection to the public help portal with an original Software Requirements Specification (SRS) template structured around the classic IEEE 830-1998 concerns, downloadable as editable Markdown and PDF.

## Standards and rights boundary

- Official reference: https://standards.ieee.org/ieee/830/1222/
- IEEE 830-1998 is a superseded recommended practice; the official IEEE page says it was superseded by ISO/IEC/IEEE 29148:2011.
- Present the template as project guidance inspired by the classic SRS organization, not as an official IEEE template or a claim of conformance/certification.
- Do not reproduce paywalled/copyrighted standard text, sample outlines, figures, tables, or proprietary wording.
- Cite the official standard page and disclose the superseded status.

## Constraints

- Spanish documentation and template content.
- Editable Markdown plus a stable downloadable PDF checked into the static site.
- No external PDF library, runtime request, telemetry, or generated user data.
- Downloads must work from GitHub Pages with ordinary links and `download` attributes.
- Template must be useful for EasyPark but reusable for other software projects.

## Tasks

### T001 — Author the editable SRS template

- [x] Create an original Spanish Markdown template with document control, approvals, glossary, introduction, overall description, interfaces, functional and non-functional requirements, data, rules, assumptions, acceptance, traceability, risks, appendices, and change history.
- [x] Provide requirement IDs, priority, rationale, source, dependencies, fit/acceptance criteria, and traceability fields.
- [x] Include concise guidance and fill-in placeholders without copying standard wording.

### T002 — Produce a downloadable PDF

- [x] Generate a legible PDF version from the same authored template.
- [x] Preserve headings, page breaks, tables/checklists, reference disclosure, and version metadata.
- [x] Confirm the PDF opens, has the expected page count/text, and contains no secrets or local paths.

### T003 — Integrate the help portal

- [x] Add a nested “Plantilla SRS” item under “Para creadores”.
- [x] Explain purpose, when to use it, completion workflow, review/approval expectations, standard status, and legal/reference boundary.
- [x] Add clear Markdown and PDF download buttons with file type/size labels.
- [x] Add a preview of the template structure and an EasyPark-specific example requirement.

### T004 — Update repository documentation

- [x] Document template paths and regeneration source in README.
- [x] Keep Git as the canonical source and ensure the PDF is derived from the Markdown source.

### T005 — Verify and publish

- [x] Run Markdown/PDF/link/script/accessibility/security and existing-help regression checks.
- [x] Obtain independent read-only verification.
- [ ] Request publication approval, commit, publish, and verify both downloads on GitHub Pages.

Evidence: official IEEE reference was fetched and confirms IEEE 830-1998 is superseded by ISO/IEC/IEEE 29148:2011. `git diff --check`, help and prototype embedded `node --check`, Markdown coverage assertions, unique ID/link/download/ref assertions, sensitive-input/secret scans, and existing-help regression checks passed. The ReportLab generator produced the same SHA-256 across two runs: `f95973027adf3e3ebf21be883d6e09de03b10ff45ea232a5c77095658983e630`. PDF inspection confirmed A4, 17 pages, readable Spanish text, clear checklist markers, no encryption/JavaScript/local paths, and visual page checks showed no obvious clipping. Independent read-only verification returned PASS with no defects. Native RDD review was unavailable because no models are configured for the required review lenses. Residual risk: no full copyright similarity audit; teams must validate the current applicable standard, edition, and license before compliance use.
