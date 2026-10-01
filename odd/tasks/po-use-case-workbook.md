# Product Owner Use Case Workbook

## Goal

Create a reusable, Google Sheets-importable `.xlsx` workbook that Product Owners can complete to define use cases, step-level flows, requirements, and requirement-to-use-case traceability without needing to edit the formal SRS directly.

## Authorization and scope

The user selected a workbook with exactly four visible sheets:

1. `Casos de uso`
2. `Flujos`
3. `Requerimientos`
4. `Matriz`

The workbook is a reusable planning template. It does not replace the SRS or become transactional/product truth unless the team explicitly adopts it.

## Constraints

- Generate the workbook deterministically with Python standard library only; do not install dependencies.
- Keep Git as the canonical source and commit the generator beside the derived `.xlsx` artifact.
- The workbook must contain only fictitious examples; no real identity, payment, plate, location, private-key, credential, telephone, or secret data.
- Preserve existing prototype, Help, SRS, URLs, refs, downloads, and generator behavior.
- Mark `.xlsx` as binary in `.gitattributes`.
- Describe the artifact as Google Sheets-importable, but do not claim full fidelity until a manual Google Sheets import is actually observed.
- Push/publication requires explicit user approval.

## Deliverables

- `scripts/generate-po-workbook.py`
- `templates/izi-park-product-owner-workbook.xlsx`
- README usage and regeneration instructions
- Help download resource and completion guidance
- Deterministic and structural verification evidence

## Workbook contract

All sheets use rows 1–3 for title, instructions, and completion guidance; row 5 is the frozen/filterable header; row 6 contains clearly labelled fictitious examples; rows 7–205 are ready for PO input. Multiline business text is wrapped. Controlled classifications use dropdowns, while descriptive fields remain free text.

### `Casos de uso`

One row per use case. Columns:

`ID_Caso_Uso`, `Nombre`, `Objetivo`, `Actor_Principal`, `Actores_Secundarios`, `Disparador`, `Precondiciones`, `Postcondiciones_Exito`, `Postcondiciones_Error`, `Alcance_Incluye`, `Fuera_de_Alcance`, `Prioridad`, `Estado`, `Responsable`, `Version`, `Version_Objetivo`, `Reglas_Negocio_IDs`, `Requerimientos_IDs`, `Datos_Involucrados`, `Dependencias`, `Supuestos`, `Decisiones_Pendientes`, `Criterios_Aceptacion`, `Referencias_Visuales`, `Notas_PO`, `Vinculos_Matriz`, `Cobertura`.

Formulas count relationships by `ID_Caso_Uso` in `Matriz` and report `Cubierto` or `Sin vínculo`.

### `Flujos`

One row per principal, alternative, or exception step. Columns:

`ID_Paso`, `ID_Caso_Uso`, `Tipo_Flujo`, `Codigo_Flujo`, `Paso_Origen`, `Orden`, `Actor`, `Accion_Actor`, `Respuesta_Sistema`, `Condicion`, `Estado_Final`, `Requerimientos_IDs`, `Reglas_Negocio_IDs`, `Datos`, `Referencias_Visuales`, `Notas_PO`.

Alternative and exception steps must identify the originating principal step through `Paso_Origen`.

### `Requerimientos`

One row per requirement. Columns:

`ID_Requerimiento`, `Tipo`, `Titulo`, `Descripcion_Verificable`, `Justificacion`, `Prioridad`, `Estado`, `Criterio_Aceptacion`, `Fuente`, `Responsable`, `Version_Objetivo`, `Dependencias`, `Riesgos`, `Referencias_Visuales`, `Notas_PO`, `Vinculos_Matriz`, `Cobertura`.

Types are `RF`, `RN`, `RNF`, `RD`, or `INT`. Formulas count matrix relationships and flag requirements without coverage.

### `Matriz`

Normalized many-to-many traceability: one row per requirement/use-case relationship. Columns:

`ID_Relacion`, `ID_Requerimiento`, `ID_Caso_Uso`, `ID_Paso`, `Tipo_Relacion`, `Estado_Cobertura`, `Evidencia_Referencia`, `Observaciones`, `Responsable`, `Estado_Revision`.

Relationship types are `Principal`, `Alternativa`, `Excepcion`, or `Transversal`. This normalized model can be filtered directly or converted into a wide Google Sheets pivot without imposing a fixed number of use-case columns.

### Controlled vocabularies

- Priority: `Must`, `Should`, `Could`, `Won't`.
- Record status: `Borrador`, `Propuesto`, `En revisión`, `Aprobado`, `Rechazado`, `Obsoleto`.
- Flow type: `Principal`, `Alternativo`, `Excepción`.
- Coverage: `Completa`, `Parcial`, `Pendiente`, `No aplica`.
- Review status: `Pendiente`, `Revisado`, `Aprobado`, `Rechazado`.

## Tasks

### T001 — Define workbook schema and generation contract

- [x] Define exact columns, instructions, dropdown vocabularies, formulas, examples, and relational keys for all four sheets.
- [x] Define deterministic OOXML packaging, safety boundaries, and verification contract.

Status: complete in this task artifact; the contract uses a normalized many-to-many matrix, fixed four-sheet structure, controlled vocabularies, formula-based coverage flags, fictitious examples, deterministic ZIP/XML ordering, fixed metadata/timestamps, and no external relationships.

### T002 — Implement deterministic workbook generator

- [x] Implement repository-confined Python standard-library generation.
- [x] Generate exactly four sheets with frozen headers, filters, wrapped text, examples, validations, formulas, and readable widths.
- [x] Generate the `.xlsx` artifact deterministically and mark it binary.

Status: implemented and verified locally. The dependency-free generator writes and validates an atomic deterministic OOXML candidate, preserves a prior artifact on failure, emits the exact four visible sheets, distinguishes required/optional headers, includes aligned fictitious examples, formula-based coverage and controlled dropdowns, and produces `templates/izi-park-product-owner-workbook.xlsx` at 363,094 bytes with SHA-256 `2853735508c65e0a19d4973c881d9fc4fc7f498763dc57e17a49f0084711ec32`. Manual Google Sheets import remains pending. Work-unit commit pending.

### T003 — Document Product Owner workflow

- [ ] Add README purpose, sheet model, generation command, and Google Sheets import steps.
- [ ] Add Help download cards, field guidance, relationship legend, and stable refs.
- [ ] Preserve Help search/navigation and all existing resources.

### T004 — Verify workbook and documentation

- [ ] Verify generator syntax, path confinement, deterministic output, ZIP integrity, XML parsing, relationships, exact sheets, formulas, validations, examples, and absence of external relationships.
- [ ] Verify README/Help links, metadata, bytes/hash, inline JavaScript, duplicate IDs, secrets, and unchanged existing artifacts.
- [ ] Obtain independent read-only verification and run native review preflight if available.

### T005 — Publish only with approval

- [ ] Request explicit user approval before merge, push, or Pages publication.
- [ ] If approved, verify workflow, deployment, MIME, public download bytes, and hash.

## Acceptance criteria

- A Product Owner can enter one use case per row and define its objective, actors, trigger, preconditions, outcomes, scope, priority, status, requirements, acceptance criteria, decisions, and references.
- Detailed principal, alternative, and exception steps can be entered as separate rows linked to a use-case ID.
- Requirements can be classified and linked to cases/flows through a relational traceability matrix.
- Coverage formulas identify use cases and requirements without matrix links.
- Dropdowns constrain controlled vocabularies without blocking free-text business content.
- The workbook opens as a valid `.xlsx` package and is suitable for import into Google Sheets; actual Google Sheets behavior remains a manual check until observed.
- Two generations from the same source are byte-identical.
- No external relationships, macros, remote resources, runtime integrations, or sensitive sample data exist.

## Progress

T001 is complete in `18546a6`. T002 is implemented and verified locally; T003 is next after the T002 work-unit commit.

## Next step

Commit T002, then document the Product Owner workflow and workbook download in README and Help.
