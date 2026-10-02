#!/usr/bin/env python3
"""Generate a bound Google Apps Script that syncs prototype evidence into the PO workbook.

The reviewed SRS Markdown is the source of truth. The generated Apps Script must be
installed and run by an authorized human from the target Google Sheet; this script
never reads Google credentials or calls Google APIs.
"""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "templates/easypark-srs-reference.md"
DEFAULT_OUTPUT = ROOT / "templates/izi-park-google-sheet-sync.gs"
TARGET_SPREADSHEET_ID = "15ioouFFFV9f3EumAZQHTu8mIBm5XjpzX1zrvR-2QDio"

HEADERS = {
    "Casos de uso": [
        "ID_Caso_Uso", "Nombre", "Objetivo", "Actor_Principal", "Actores_Secundarios",
        "Disparador", "Precondiciones", "Postcondiciones_Exito", "Postcondiciones_Error",
        "Alcance_Incluye", "Fuera_de_Alcance", "Prioridad", "Estado", "Responsable",
        "Version", "Version_Objetivo", "Reglas_Negocio_IDs", "Requerimientos_IDs",
        "Datos_Involucrados", "Dependencias", "Supuestos", "Decisiones_Pendientes",
        "Criterios_Aceptacion", "Referencias_Visuales", "Notas_PO",
    ],
    "Flujos": [
        "ID_Paso", "ID_Caso_Uso", "Tipo_Flujo", "Codigo_Flujo", "Paso_Origen", "Orden",
        "Actor", "Accion_Actor", "Respuesta_Sistema", "Condicion", "Estado_Final",
        "Requerimientos_IDs", "Reglas_Negocio_IDs", "Datos", "Referencias_Visuales", "Notas_PO",
    ],
    "Requerimientos": [
        "ID_Requerimiento", "Tipo", "Titulo", "Descripcion_Verificable", "Justificacion",
        "Prioridad", "Estado", "Criterio_Aceptacion", "Fuente", "Responsable",
        "Version_Objetivo", "Dependencias", "Riesgos", "Referencias_Visuales", "Notas_PO",
    ],
    "Matriz": [
        "ID_Relacion", "ID_Requerimiento", "ID_Caso_Uso", "ID_Paso", "Tipo_Relacion",
        "Estado_Cobertura", "Evidencia_Referencia", "Observaciones", "Responsable", "Estado_Revision",
    ],
}

PRIORITY = {"Alta": "Must", "Media": "Should", "Baja": "Could"}

USE_CASE_REQUIREMENT_PREFIXES = {
    "UC-ONB-001": ("FR-ONB-",),
    "UC-ACC-001": ("FR-ACC-",),
    "UC-DRV-001": ("FR-HOME-", "FR-DRV-001", "FR-DRV-002", "FR-DRV-003", "FR-DRV-004", "FR-DRV-006", "FR-PAY-", "FR-PASS-", "FR-IZI-001", "FR-IZI-002", "FR-IZI-ARR-", "FR-IZI-HOLD-", "FR-IZI-CHECKOUT-", "FR-IZI-RECEIPT-", "FR-IZI-SESSION-"),
    "UC-DRV-002": ("FR-DRV-005",),
    "UC-URB-001": ("FR-URB-",),
    "UC-ACT-001": ("FR-ACT-", "FR-IZI-ACTIVITY-"),
    "UC-AI-001": ("FR-AI-", "FR-IZI-COPILOT-"),
    "UC-PROV-001": ("FR-PROV-",),
    "UC-OPS-001": ("FR-OPS-",),
    "UC-EXP-001": ("FR-EXP-",),
    "UC-INC-001": ("FR-INC-",),
    "UC-DOC-001": ("FR-DOC-",),
}

BUSINESS_RULE_CASES = {
    "BR-FLOW-001": ["UC-DRV-001", "UC-DRV-002", "UC-URB-001", "UC-AI-001", "UC-EXP-001", "UC-INC-001"],
    "BR-CHECKOUT-001": ["UC-DRV-001", "UC-DRV-002", "UC-AI-001"],
    "BR-DATA-001": [],  # Expanded to all cases after parsing.
    "BR-AI-001": ["UC-AI-001"],
    "BR-PRICE-001": ["UC-DRV-001", "UC-DRV-002", "UC-PROV-001"],
    "BR-URB-001": ["UC-URB-001"],
    "BR-IDEMP-001": ["UC-DRV-001", "UC-URB-001", "UC-EXP-001", "UC-INC-001"],
    "BR-INC-001": ["UC-INC-001"],
    "BR-MEDIA-001": ["UC-DOC-001"],
    "BR-BUZZ-001": ["UC-DOC-001"],
    "BR-SRS-001": ["UC-DOC-001"],
}

NFR_CASES = {
    "NFR-SEC-001": ["UC-ACC-001", "UC-DRV-001", "UC-EXP-001", "UC-DOC-001"],
    "NFR-PRIV-001": ["UC-ACC-001", "UC-PROV-001", "UC-EXP-001"],
    "NFR-ACC-001": ["UC-ONB-001", "UC-DOC-001"],
    "NFR-USE-001": ["UC-DRV-001", "UC-AI-001"],
    "NFR-PERF-001": ["UC-DOC-001"],
    "NFR-REL-001": ["UC-DRV-001", "UC-URB-001", "UC-EXP-001", "UC-INC-001"],
    "NFR-COMPAT-001": ["UC-AI-001"],
    "NFR-MAINT-001": ["UC-DOC-001"],
    "NFR-OBS-001": ["UC-OPS-001"],
    "NFR-LOC-001": ["UC-DOC-001"],
    "NFR-DOC-001": ["UC-DOC-001"],
    "NFR-DOC-002": ["UC-DOC-001"],
    "NFR-IZI-LOCAL-001": ["UC-DRV-001", "UC-DOC-001"],
    "NFR-IZI-PRIV-001": ["UC-ACC-001", "UC-DRV-001", "UC-AI-001"],
    "NFR-IZI-ACC-001": ["UC-DRV-001"],
    "NFR-IZI-REF-001": ["UC-DOC-001"],
}


@dataclass(frozen=True)
class UseCase:
    id: str
    name: str
    actor: str
    priority: str
    fields: dict[str, str]


def table_cells(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def inline_text(value: str) -> str:
    return re.sub(r"`([^`]*)`", r"\1", value).replace("[PROTOTIPO IMPLEMENTADO]", "").strip()


def parse_use_cases(text: str) -> list[UseCase]:
    catalog_match = re.search(r"### 4\.1 .*?\n\n(\| ID .*?)(?=\n\n### 4\.2)", text, re.S)
    if not catalog_match:
        raise ValueError("use-case catalog not found")
    catalog: list[tuple[str, str, str, str]] = []
    for line in catalog_match.group(1).splitlines()[2:]:
        if not line.startswith("|"):
            continue
        cells = table_cells(line)
        if len(cells) == 5 and cells[0].startswith("UC-"):
            catalog.append((cells[0], cells[1], cells[2], cells[3]))

    sections = re.findall(r"### 4\.(?:[2-9]|1[0-3]) ([^\n]+)\n\n(.*?)(?=\n\n### 4\.(?:[3-9]|1[0-3])|\n\n## 5\.)", text, re.S)
    if len(sections) != len(catalog):
        raise ValueError(f"use-case detail count mismatch: {len(sections)} != {len(catalog)}")

    cases: list[UseCase] = []
    for (case_id, name, actor, priority), (_, body) in zip(catalog, sections):
        fields: dict[str, str] = {}
        for line in body.splitlines():
            match = re.match(r"- ([^:]+): (.+)", line.strip())
            if match:
                fields[match.group(1)] = inline_text(match.group(2))
        required = {"Precondiciones", "Resultado observable", "Variantes o fallas", "Refs"}
        missing = required - fields.keys()
        if missing:
            raise ValueError(f"{case_id} missing fields: {sorted(missing)}")
        cases.append(UseCase(case_id, name, actor, priority, fields))
    return cases


def parse_requirement_rows(text: str) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    for line in text.splitlines():
        if not line.startswith("| FR-") and not line.startswith("| NFR-"):
            continue
        cells = table_cells(line)
        if len(cells) != 5:
            continue
        req_id, priority, status, requirement, acceptance = cells
        if status not in {"Implementado en prototipo", "Actual"}:
            continue
        req_type = "RNF" if req_id.startswith("NFR-") else "RF"
        refs = ", ".join(re.findall(r"`([^`]+)`", acceptance))
        title = inline_text(requirement).rstrip(".")
        rows.append({
            "id": req_id,
            "type": req_type,
            "title": title,
            "description": inline_text(requirement),
            "justification": "Mantener trazabilidad entre el prototipo observable y su especificación revisable.",
            "priority": PRIORITY.get(priority, "Should"),
            "status": "En revisión",
            "acceptance": inline_text(acceptance),
            "source": "SRS IZI PARK / EasyPark - prototipo implementado",
            "owner": "Producto",
            "target": "Prototipo actual",
            "dependencies": "index.html; help.html; SRS",
            "risks": "Confundir evidencia de prototipo con capacidad productiva.",
            "refs": refs,
            "notes": "Importado desde requisito implementado/actual; no implica aprobación productiva.",
        })

    rules_match = re.search(r"## 6\. Reglas de negocio\n\n(.*?)(?=\n\n## 7\.)", text, re.S)
    if not rules_match:
        raise ValueError("business-rule table not found")
    for line in rules_match.group(1).splitlines():
        if not line.startswith("| BR-"):
            continue
        cells = table_cells(line)
        if len(cells) != 4 or "PROTOTIPO IMPLEMENTADO" not in cells[1]:
            continue
        rule_id, _, rule, verification = cells
        rows.append({
            "id": rule_id,
            "type": "RN",
            "title": inline_text(rule).rstrip("."),
            "description": inline_text(rule),
            "justification": "Preservar una regla observada y documentada del prototipo.",
            "priority": "Must" if rule_id in {"BR-FLOW-001", "BR-CHECKOUT-001", "BR-DATA-001", "BR-AI-001", "BR-IDEMP-001"} else "Should",
            "status": "En revisión",
            "acceptance": inline_text(verification),
            "source": "SRS IZI PARK / EasyPark - regla implementada",
            "owner": "Producto",
            "target": "Prototipo actual",
            "dependencies": "index.html; help.html; SRS",
            "risks": "Aplicar la regla de demo como verdad productiva sin validación.",
            "refs": ", ".join(re.findall(r"`([^`]+)`", verification)),
            "notes": "Importado desde regla implementada; no implica aprobación productiva.",
        })
    return rows


def matches_any(value: str, patterns: Iterable[str]) -> bool:
    return any(value == pattern or value.startswith(pattern) for pattern in patterns)


def requirement_ids_for(case_id: str, requirements: list[dict[str, str]]) -> list[str]:
    patterns = USE_CASE_REQUIREMENT_PREFIXES[case_id]
    return [row["id"] for row in requirements if row["type"] == "RF" and matches_any(row["id"], patterns)]


def rule_ids_for(case_id: str, all_case_ids: list[str]) -> list[str]:
    result = []
    for rule_id, mapped_cases in BUSINESS_RULE_CASES.items():
        effective = all_case_ids if rule_id == "BR-DATA-001" else mapped_cases
        if case_id in effective:
            result.append(rule_id)
    return result


def build_dataset(text: str) -> dict[str, dict[str, object]]:
    cases = parse_use_cases(text)
    requirements = parse_requirement_rows(text)
    case_ids = [case.id for case in cases]
    flow_id_by_case = {case.id: f"FL-{case.id.removeprefix('UC-')}-PRI-001" for case in cases}

    case_rows: list[list[str]] = []
    flow_rows: list[list[str]] = []
    requirement_rows: list[list[str]] = []
    matrix_rows: list[list[str]] = []

    for case in cases:
        refs = case.fields["Refs"]
        req_ids = requirement_ids_for(case.id, requirements)
        rule_ids = rule_ids_for(case.id, case_ids)
        main_flow = flow_id_by_case[case.id]
        principal = case.fields.get("Flujo principal", f"Recorrer el caso {case.name} usando las refs documentadas.")
        result = case.fields["Resultado observable"]
        variants = case.fields["Variantes o fallas"]
        case_rows.append([
            case.id, case.name,
            f"Validar {case.name.lower()} dentro de los límites locales y ficticios del prototipo.",
            case.actor, "Sistema local", f"El actor inicia {case.name.lower()}.",
            case.fields["Precondiciones"], result, variants,
            "Comportamiento observable y local documentado por el prototipo.",
            "Integraciones, decisiones y efectos productivos reales.",
            PRIORITY.get(case.priority, "Should"), "En revisión", "Producto", "0.1", "Prototipo actual",
            ", ".join(rule_ids), ", ".join(req_ids), "Estado local ficticio; refs visibles",
            "index.html; help.html; SRS", "Ejecución local sin servicios reales.", "",
            f"Dado el caso {case.id}, cuando se recorren sus refs, entonces se observa: {result}",
            refs, "Importado desde SRS como [PROTOTIPO IMPLEMENTADO]; requiere revisión humana antes de aprobar.",
        ])
        flow_rows.append([
            main_flow, case.id, "Principal", "PRI-01", "", "1", case.actor,
            principal, result, case.fields["Precondiciones"], result,
            ", ".join(req_ids), ", ".join(rule_ids), "Estado local ficticio", refs,
            "Resumen del flujo principal documentado; no ejecuta integraciones reales.",
        ])
        exception_id = f"FL-{case.id.removeprefix('UC-')}-EXC-001"
        flow_rows.append([
            exception_id, case.id, "Excepción", "EXC-01", main_flow, "2", "Sistema local",
            "Detecta una variante, límite o falla documentada.", variants, variants,
            "El flujo informa el límite y evita efectos productivos reales.",
            ", ".join(req_ids), ", ".join(rule_ids), "Estado local ficticio", refs,
            "Excepción resumida desde el SRS; revisar antes de aprobar.",
        ])

    for row in requirements:
        requirement_rows.append([
            row["id"], row["type"], row["title"], row["description"], row["justification"],
            row["priority"], row["status"], row["acceptance"], row["source"], row["owner"],
            row["target"], row["dependencies"], row["risks"], row["refs"], row["notes"],
        ])

    relationships: list[tuple[str, str, str]] = []
    for case in cases:
        for req_id in requirement_ids_for(case.id, requirements):
            relationships.append((req_id, case.id, "Principal"))
    for rule_id, mapped in BUSINESS_RULE_CASES.items():
        effective = case_ids if rule_id == "BR-DATA-001" else mapped
        relationships.extend((rule_id, case_id, "Transversal") for case_id in effective)
    for nfr_id, mapped in NFR_CASES.items():
        if any(row["id"] == nfr_id for row in requirements):
            relationships.extend((nfr_id, case_id, "Transversal") for case_id in mapped)

    seen_relationships: set[tuple[str, str]] = set()
    for index, (req_id, case_id, relation_type) in enumerate(relationships, start=1):
        key = (req_id, case_id)
        if key in seen_relationships:
            continue
        seen_relationships.add(key)
        case = next(item for item in cases if item.id == case_id)
        evidence = case.fields["Refs"]
        matrix_rows.append([
            f"REL-PROT-{index:03d}", req_id, case_id, flow_id_by_case[case_id], relation_type,
            "Completa", evidence, "Relación derivada del SRS implementado; pendiente de revisión PO.",
            "Producto", "Pendiente",
        ])

    return {
        "Casos de uso": {"idColumn": "ID_Caso_Uso", "headers": HEADERS["Casos de uso"], "rows": case_rows},
        "Flujos": {"idColumn": "ID_Paso", "headers": HEADERS["Flujos"], "rows": flow_rows},
        "Requerimientos": {"idColumn": "ID_Requerimiento", "headers": HEADERS["Requerimientos"], "rows": requirement_rows},
        "Matriz": {"idColumn": "ID_Relacion", "headers": HEADERS["Matriz"], "rows": matrix_rows},
    }


def validate_dataset(dataset: dict[str, dict[str, object]]) -> None:
    expected_sheets = list(HEADERS)
    if list(dataset) != expected_sheets:
        raise ValueError("sheet order mismatch")
    ids_by_sheet: dict[str, set[str]] = {}
    for sheet_name, spec in dataset.items():
        headers = spec["headers"]
        rows = spec["rows"]
        if not isinstance(headers, list) or not isinstance(rows, list):
            raise ValueError(f"invalid dataset shape for {sheet_name}")
        if len(rows) > 199:
            raise ValueError(f"{sheet_name} exceeds available template rows")
        ids = [row[0] for row in rows]
        if not ids or len(ids) != len(set(ids)):
            raise ValueError(f"empty or duplicate IDs in {sheet_name}")
        if any(len(row) != len(headers) for row in rows):
            raise ValueError(f"row width mismatch in {sheet_name}")
        ids_by_sheet[sheet_name] = set(ids)

    case_ids = ids_by_sheet["Casos de uso"]
    flow_ids = ids_by_sheet["Flujos"]
    requirement_ids = ids_by_sheet["Requerimientos"]
    matrix_rows = dataset["Matriz"]["rows"]
    if not all(any(row[1] == case_id for row in dataset["Flujos"]["rows"]) for case_id in case_ids):
        raise ValueError("a use case has no flow")
    if not all(any(row[2] == case_id for row in matrix_rows) for case_id in case_ids):
        raise ValueError("a use case has no matrix relationship")
    if not all(any(row[1] == requirement_id for row in matrix_rows) for requirement_id in requirement_ids):
        raise ValueError("an imported requirement has no matrix relationship")
    for row in matrix_rows:
        if row[1] not in requirement_ids or row[2] not in case_ids or row[3] not in flow_ids:
            raise ValueError(f"unresolved matrix relationship: {row[0]}")


APPS_SCRIPT_TEMPLATE = r'''/**
 * IZI PARK prototype → Product Owner workbook sync.
 * Generated from templates/easypark-srs-reference.md.
 * Install this file in the target Google Sheet through Extensions → Apps Script.
 * The human Google account running it owns every permission grant and mutation.
 */

const IZI_SYNC_CONFIG = __CONFIG__;
const IZI_SYNC_DATA = __DATA__;

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("IZI PARK")
    .addItem("Preview prototype sync", "previewPrototypeWorkbookSync")
    .addItem("Sync prototype data", "syncPrototypeWorkbook")
    .addToUi();
}

function previewPrototypeWorkbookSync() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  validateTarget_(spreadsheet);
  const plan = buildSyncPlan_(spreadsheet);
  SpreadsheetApp.getUi().alert("IZI PARK preview", formatPlan_(plan, false), SpreadsheetApp.getUi().ButtonSet.OK);
  return plan;
}

function syncPrototypeWorkbook() {
  const ui = SpreadsheetApp.getUi();
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  validateTarget_(spreadsheet);
  let plan = buildSyncPlan_(spreadsheet);
  if (plan.totalChanges === 0) {
    ui.alert("IZI PARK sync", formatPlan_(plan, true), ui.ButtonSet.OK);
    return plan;
  }
  const answer = ui.alert(
    "Confirm IZI PARK sync",
    formatPlan_(plan, false) + "\n\nA full timestamped backup will be created before any workbook row changes.",
    ui.ButtonSet.YES_NO,
  );
  if (answer !== ui.Button.YES) {
    return {cancelled: true, totalChanges: plan.totalChanges};
  }

  const lock = LockService.getDocumentLock();
  if (!lock) throw new Error("This script must be bound to the target Google Sheet.");
  lock.waitLock(30000);
  try {
    validateTarget_(spreadsheet);
    plan = buildSyncPlan_(spreadsheet);
    if (plan.totalChanges === 0) {
      ui.alert("IZI PARK sync", formatPlan_(plan, true), ui.ButtonSet.OK);
      return plan;
    }
    const backupName = spreadsheet.getName() + " — backup before IZI sync — " + new Date().toISOString();
    const backup = spreadsheet.copy(backupName);
    applySyncPlan_(spreadsheet, plan);
    SpreadsheetApp.flush();
    ui.alert(
      "IZI PARK sync complete",
      formatPlan_(plan, true) + "\n\nBackup: " + backup.getUrl(),
      ui.ButtonSet.OK,
    );
    return Object.assign({backupUrl: backup.getUrl()}, plan);
  } finally {
    lock.releaseLock();
  }
}

function validateTarget_(spreadsheet) {
  if (spreadsheet.getId() !== IZI_SYNC_CONFIG.spreadsheetId) {
    throw new Error("Wrong spreadsheet. Expected the reviewed IZI PARK Product Owner workbook.");
  }
  Object.keys(IZI_SYNC_DATA).forEach(function(sheetName) {
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) throw new Error("Missing required sheet: " + sheetName);
    const expected = IZI_SYNC_DATA[sheetName].headers;
    const actual = sheet.getRange(IZI_SYNC_CONFIG.headerRow, 1, 1, expected.length).getValues()[0];
    expected.forEach(function(header, index) {
      if (String(actual[index]).trim() !== header) {
        throw new Error("Unexpected header in " + sheetName + " column " + (index + 1) + ": expected " + header);
      }
    });
  });
}

function buildSyncPlan_(spreadsheet) {
  const plans = {};
  let totalChanges = 0;
  Object.keys(IZI_SYNC_DATA).forEach(function(sheetName) {
    const spec = IZI_SYNC_DATA[sheetName];
    const sheet = spreadsheet.getSheetByName(sheetName);
    const start = IZI_SYNC_CONFIG.dataStartRow;
    const available = sheet.getMaxRows() - start + 1;
    const values = sheet.getRange(start, 1, available, spec.headers.length).getValues();
    const rowById = {};
    const emptyRows = [];
    values.forEach(function(row, offset) {
      const id = String(row[0]).trim();
      const rowNumber = start + offset;
      if (!id) {
        emptyRows.push(rowNumber);
        return;
      }
      if (rowById[id]) throw new Error("Duplicate existing ID in " + sheetName + ": " + id);
      rowById[id] = {rowNumber: rowNumber, values: row};
    });

    const changes = [];
    const unchanged = [];
    spec.rows.forEach(function(managedRow) {
      const id = managedRow[0];
      const existing = rowById[id];
      if (existing) {
        if (rowsEqual_(existing.values.slice(0, managedRow.length), managedRow)) {
          unchanged.push(id);
        } else {
          changes.push({kind: "update", id: id, rowNumber: existing.rowNumber, values: managedRow});
        }
      } else {
        const rowNumber = emptyRows.shift();
        if (!rowNumber) throw new Error("No empty template row remains in " + sheetName + ". Add rows with formulas/validation before syncing.");
        changes.push({kind: "add", id: id, rowNumber: rowNumber, values: managedRow});
      }
    });
    plans[sheetName] = {changes: changes, unchanged: unchanged};
    totalChanges += changes.length;
  });
  return {sheets: plans, totalChanges: totalChanges};
}

function applySyncPlan_(spreadsheet, plan) {
  Object.keys(plan.sheets).forEach(function(sheetName) {
    const sheet = spreadsheet.getSheetByName(sheetName);
    plan.sheets[sheetName].changes.forEach(function(change) {
      sheet.getRange(change.rowNumber, 1, 1, change.values.length).setValues([change.values]);
    });
  });
}

function rowsEqual_(left, right) {
  if (left.length !== right.length) return false;
  return left.every(function(value, index) {
    return String(value == null ? "" : value).trim() === String(right[index] == null ? "" : right[index]).trim();
  });
}

function formatPlan_(plan, completed) {
  const lines = [completed ? "Sync result:" : "Proposed changes:"];
  Object.keys(plan.sheets).forEach(function(sheetName) {
    const sheetPlan = plan.sheets[sheetName];
    const adds = sheetPlan.changes.filter(function(change) { return change.kind === "add"; }).length;
    const updates = sheetPlan.changes.filter(function(change) { return change.kind === "update"; }).length;
    lines.push(sheetName + ": " + adds + " add, " + updates + " update, " + sheetPlan.unchanged.length + " unchanged");
  });
  lines.push("Total row changes: " + plan.totalChanges);
  return lines.join("\n");
}
'''


def render_dataset_js(dataset: dict[str, dict[str, object]]) -> str:
    """Render one semantic workbook row per line for reviewable generated output."""
    sheet_blocks = []
    for sheet_name, spec in dataset.items():
        rows = ",\n".join(
            "      " + json.dumps(row, ensure_ascii=False, separators=(",", ":"))
            for row in spec["rows"]
        )
        sheet_blocks.append(
            "  " + json.dumps(sheet_name, ensure_ascii=False) + ": {\n"
            "    idColumn: " + json.dumps(spec["idColumn"], ensure_ascii=False) + ",\n"
            "    headers: " + json.dumps(spec["headers"], ensure_ascii=False, separators=(",", ":")) + ",\n"
            "    rows: [\n" + rows + "\n    ]\n  }"
        )
    return "{\n" + ",\n".join(sheet_blocks) + "\n}"


def render(dataset: dict[str, dict[str, object]]) -> str:
    config = {
        "spreadsheetId": TARGET_SPREADSHEET_ID,
        "headerRow": 5,
        "dataStartRow": 6,
        "source": "templates/easypark-srs-reference.md",
    }
    return (
        APPS_SCRIPT_TEMPLATE
        .replace("__CONFIG__", json.dumps(config, ensure_ascii=False, separators=(",", ":")))
        .replace("__DATA__", render_dataset_js(dataset))
    )


def resolve_output(value: str) -> Path:
    raw = Path(value)
    path = raw if raw.is_absolute() else ROOT / raw
    resolved = path.resolve()
    if ROOT not in resolved.parents:
        raise ValueError("output must remain inside the repository")
    if resolved.suffix != ".gs":
        raise ValueError("output must use .gs extension")
    return resolved


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Generate the IZI PARK Google Sheet sync Apps Script.")
    parser.add_argument("--output", default=str(DEFAULT_OUTPUT.relative_to(ROOT)))
    args = parser.parse_args(argv)
    text = SOURCE.read_text(encoding="utf-8")
    dataset = build_dataset(text)
    validate_dataset(dataset)
    output = resolve_output(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(render(dataset), encoding="utf-8")
    counts = ", ".join(f"{name}={len(spec['rows'])}" for name, spec in dataset.items())
    print(f"Generated {output.relative_to(ROOT)} ({counts})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
