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

SIMPLE_SHEET_NAME = "Casos de uso simplificado"
LEGACY_SHEET_NAMES = ["Casos de uso", "Flujos", "Requerimientos", "Matriz"]
HEADERS = {
    SIMPLE_SHEET_NAME: [
        "Nro y nombre de caso", "Objetivo", "Alcance", "Precondición", "Post condición",
        "Flujo principal", "Flujo alternativo", "Criterio de aceptación", "Requerimientos",
        "Actores principales", "Estado",
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

FLOW_DESCRIPTIONS = {
    "UC-ONB-001": (
        "Abre la bienvenida del alta guiada (ONB-WELCOME-01); elige su rol (ONB-ROLE-01); "
        "valida el código de demostración (ONB-VERIFY-01); completa el perfil (ONB-PROFILE-01); "
        "configura sus datos de uso y preferencias (ONB-SETUP-01, ONB-PREFS-01); "
        "llega a la confirmación y al inicio correspondiente (ONB-DONE-01)",
        "Si el código de demostración es incorrecto, el avance se bloquea (ONB-VERIFY-01); "
        "si elige el rol de anfitrión o proveedor, continúa hacia el formulario para ofrecer una cochera "
        "(ONB-ROLE-01, ONB-DONE-01)",
    ),
    "UC-ACC-001": (
        "Abre Cuenta segura (ACCOUNT-HOME-01); revisa o completa el perfil (ACCOUNT-PROFILE-01); "
        "configura un vehículo ficticio (ACCOUNT-VEHICLE-01); elige un pago de prueba (ACCOUNT-PAYMENT-01); "
        "revisa el cobro ficticio (ACCOUNT-PAYOUT-01); completa datos comerciales de muestra "
        "(ACCOUNT-BUSINESS-01); guarda sus preferencias (ACCOUNT-PREFS-01, ACCOUNT-SUMMARY-01)",
        "El pago de prueba no solicita números completos de tarjeta ni credenciales (ACCOUNT-PAYMENT-01); "
        "el cobro ficticio no solicita números completos de cuenta bancaria (ACCOUNT-PAYOUT-01); "
        "los datos comerciales no solicitan identificación fiscal real ni secretos (ACCOUNT-BUSINESS-01)",
    ),
    "UC-DRV-001": (
        "Elige la búsqueda de cochera privada (DRV-CHOICE-01); ingresa un destino y configura horario, "
        "duración, vehículo y filtros (DRV-START-01, DRV-TIME-01); compara opciones en el mapa y las tarjetas "
        "(DRV-RESULTS-01, DRV-MAP-SHEET-01); revisa el detalle de una cochera reservable (DRV-DETAIL-01); "
        "elige una tarjeta de prueba (DRV-PAYMENT-01); confirma la operación simulada (DRV-CONFIRM-01); "
        "consulta el recibo y el pase (DRV-RECEIPT-01, PARKING-PASS-01); revisa la sesión privada (DRV-SESSION-01)",
        "Si el pago simulado falla, no se confirma la reserva (DRV-PAY-FAIL-01); si vence la reserva temporal, "
        "debe volver a elegir una opción (DRV-HOLD-EXP-01); si los filtros no encuentran coincidencias, "
        "la lista de resultados queda vacía (DRV-TIME-01, DRV-RESULTS-01)",
    ),
    "UC-DRV-002": (
        "Compara opciones no reservables en los resultados (DRV-RESULTS-01); elige una tarjeta de parking "
        "tradicional o guía de calle (DRV-RESULT-CARD-01); revisa distancia, precio orientativo, condiciones "
        "y servicios en el detalle (DRV-DETAIL-01); intenta continuar y vuelve a los resultados sin checkout "
        "(DRV-DETAIL-01, DRV-RESULTS-01)",
        "Si llega desde Copilot, el asistente explica que la opción solo brinda orientación (AI-HANDOFF-01); "
        "no se muestran pago, recibo, pase ni sesión privada (DRV-DETAIL-01, DRV-RESULTS-01)",
    ),
    "UC-URB-001": (
        "Elige una zona urbana o parking común (DRV-ZONE-01); confirma un vehículo ficticio (DRV-VEHICLE-01); "
        "selecciona una duración dentro del máximo (DRV-DURATION-01, DRV-LIMIT-01); inicia la sesión urbana "
        "(SESSION-ACTIVE-01); extiende o termina la sesión (SESSION-EXTEND-01, SESSION-END-01)",
        "Si la extensión supera el máximo permitido, queda bloqueada (DRV-LIMIT-01, SESSION-EXTEND-01); "
        "si intenta terminar una sesión ya finalizada, el prototipo lo informa sin duplicar la actividad "
        "(SESSION-END-01)",
    ),
    "UC-ACT-001": (
        "Abre el resumen de Actividad (ACTIVITY-HOME-01); revisa la sesión actual y el historial "
        "(ACTIVITY-HISTORY-01); abre el último recibo disponible (ACTIVITY-RECEIPT-01); solicita una descarga "
        "simulada desde el detalle (ACTIVITY-RECEIPT-01)",
        "Si todavía no hay actividad, el historial muestra un estado vacío (ACTIVITY-HISTORY-01); "
        "si una entrada no tiene recibo, el detalle lo indica sin crear un comprobante real (ACTIVITY-RECEIPT-01)",
    ),
    "UC-AI-001": (
        "Abre Copilot (AI-ENTRY-01); describe su plan por texto, sugerencias o voz opcional (AI-CHAT-01, AI-VOICE-01); "
        "revisa el contexto y las preferencias detectadas (AI-CONTEXT-01, AI-REFINE-01); compara el itinerario "
        "propuesto (AI-ITINERARY-01); evalúa estrategias explicadas (AI-STRATEGY-01, AI-EXPLAIN-01); "
        "elige una opción para abrir su detalle (AI-HANDOFF-01)",
        "Si la opción no es reservable, Copilot explica el límite y no cobra ni reserva (AI-EXPLAIN-01, AI-HANDOFF-01); "
        "si el navegador no admite voz, mantiene disponible la entrada por texto (AI-VOICE-01, AI-CHAT-01)",
    ),
    "UC-PROV-001": (
        "Completa una ubicación ficticia (PROV-LOCATION-01); describe la cochera y sus servicios "
        "(PROV-SPACE-01, PROV-AMENITIES-01); define las reglas de acceso (PROV-ACCESS-01); configura la disponibilidad "
        "(PROV-AVAIL-01); establece una tarifa ficticia (PROV-TARIFF-01); revisa el cobro simulado (PROV-PAYMENT-01); "
        "revisa y guarda la publicación como publicada o pendiente (PROV-REVIEW-01)",
        "Si faltan datos opcionales, el formulario aplica valores seguros de demostración (PROV-SPACE-01, PROV-AMENITIES-01); "
        "los estados se presentan en español (PROV-REVIEW-01); el contenido ingresado se muestra como texto sin ejecutar código "
        "(PROV-LOCATION-01, PROV-ACCESS-01)",
    ),
    "UC-OPS-001": (
        "Abre el panel de operación y revisa sus conteos (OPS-HOME-01); consulta cocheras pendientes (OPS-PENDING-01); "
        "revisa incidentes y puede clasificarlos o resolverlos (OPS-INCIDENTS-01, OPS-TRIAGE-01, OPS-RESOLUTION-01); "
        "consulta liquidaciones simuladas (OPS-SETTLEMENTS-01)",
        "Cuando no hay publicaciones o incidentes, las secciones muestran estados vacíos (OPS-PENDING-01, OPS-INCIDENTS-01); "
        "las acciones actualizan solo la demostración local y no contactan soporte ni sistemas de pago reales "
        "(OPS-RESOLUTION-01, OPS-SETTLEMENTS-01)",
    ),
    "UC-EXP-001": (
        "Abre Express y revisa un sitio compatible ficticio (EXPRESS-HOME-01); acepta el consentimiento o elige el "
        "ingreso manual (EXPRESS-CONSENT-01); registra la entrada simulada (EXPRESS-ENTRY-01); revisa la sesión "
        "(EXPRESS-SESSION-01); registra la salida y guarda el recibo en Actividad (EXPRESS-EXIT-01)",
        "Si no acepta el consentimiento, continúa por el ingreso manual simulado (EXPRESS-CONSENT-01, EXPRESS-ENTRY-01); "
        "si guarda el recibo nuevamente, no duplica la actividad y no intervienen cámaras, barreras ni operadores reales "
        "(EXPRESS-EXIT-01)",
    ),
    "UC-INC-001": (
        "Abre la recuperación desde el menú, el pase o una sesión (INCIDENT-HOME-01); elige el tipo de incidente "
        "(INCIDENT-TYPE-01); selecciona una alternativa de recuperación (INCIDENT-RECOVERY-01); guarda el reporte y "
        "consulta el resultado (INCIDENT-RESULT-01); Operación puede clasificarlo o resolverlo después "
        "(OPS-TRIAGE-01, OPS-RESOLUTION-01)",
        "Un cargo incorrecto no genera un reembolso real (INCIDENT-RECOVERY-01); un problema de seguridad solo eleva "
        "la severidad del reporte (INCIDENT-TYPE-01); repetir una acción no duplica efectos (INCIDENT-RESULT-01)",
    ),
    "UC-DOC-001": (
        "Abre Ayuda y revisa el propósito del prototipo (HELP-HOME-01, HELP-PROJECT-01); consulta roles y recorridos "
        "(HELP-ROLES-01, HELP-FLOWS-01); revisa límites de seguridad (HELP-SAFETY-01); usa el formato de feedback "
        "(HELP-FEEDBACK-01); consulta los recursos y descargas del SRS (CREATOR-SRS-01, SRS-DOWNLOAD-MD-01, SRS-DOWNLOAD-PDF-01); "
        "revisa las instrucciones de acceso a Buzz y los créditos multimedia (BUZZ-ACCESS-01, MEDIA-CREDITS-01)",
        "Si necesita acceso a Buzz, comparte únicamente su clave pública por el canal acordado (BUZZ-ACCESS-01); "
        "las claves privadas, contraseñas, códigos de recuperación, semillas y tokens nunca se solicitan (HELP-SAFETY-01, BUZZ-ACCESS-01)",
    ),
}

REFERENCE_TAG_PATTERN_TEXT = r"(?:[A-Z][A-Z0-9]*-){2,}[A-Z0-9]+"
DOCUMENTATION_REF_PATTERN = re.compile(rf"\b{REFERENCE_TAG_PATTERN_TEXT}\b")
CONTEXTUAL_REF_GROUP_PATTERN = re.compile(
    rf"\((?:{REFERENCE_TAG_PATTERN_TEXT})(?:,\s*(?:{REFERENCE_TAG_PATTERN_TEXT}))*\)$"
)
STORAGE_KEY_PATTERN = re.compile(r"\b(?:easypark|iziPark)[A-Za-z0-9]+\b")


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


def linked_requirement_ids(
    case_id: str,
    requirements: list[dict[str, str]],
    all_case_ids: list[str],
) -> list[str]:
    available = {row["id"] for row in requirements}
    linked = requirement_ids_for(case_id, requirements) + rule_ids_for(case_id, all_case_ids)
    linked.extend(nfr_id for nfr_id, case_ids in NFR_CASES.items() if case_id in case_ids)
    return list(dict.fromkeys(req_id for req_id in linked if req_id in available))


def build_dataset(text: str) -> dict[str, dict[str, object]]:
    cases = parse_use_cases(text)
    requirements = parse_requirement_rows(text)
    case_ids = [case.id for case in cases]
    rows: list[list[str]] = []

    if set(FLOW_DESCRIPTIONS) != set(case_ids):
        missing = sorted(set(case_ids) - set(FLOW_DESCRIPTIONS))
        extra = sorted(set(FLOW_DESCRIPTIONS) - set(case_ids))
        raise ValueError(f"flow description coverage mismatch: missing={missing}, extra={extra}")
    known_reference_tags = set(DOCUMENTATION_REF_PATTERN.findall(text))
    flow_reference_tags = {
        tag
        for flows in FLOW_DESCRIPTIONS.values()
        for flow in flows
        for tag in DOCUMENTATION_REF_PATTERN.findall(flow)
    }
    unknown_flow_tags = sorted(flow_reference_tags - known_reference_tags)
    if unknown_flow_tags:
        raise ValueError(f"flow descriptions use unknown SRS refs: {unknown_flow_tags}")

    for case in cases:
        refs = case.fields["Refs"]
        result = case.fields["Resultado observable"]
        principal, alternative = FLOW_DESCRIPTIONS[case.id]
        req_ids = linked_requirement_ids(case.id, requirements, case_ids)
        rows.append([
            f"{case.id} — {case.name}",
            f"Validar {case.name.lower()} dentro de los límites locales y ficticios del prototipo.",
            "Incluye el comportamiento observable documentado y sus límites de simulación. "
            "Excluye integraciones, decisiones y efectos productivos reales.",
            case.fields["Precondiciones"],
            result,
            principal,
            alternative,
            f"Dado {case.id}, cuando se recorren sus refs ({refs}), entonces se observa: {result}",
            ", ".join(req_ids),
            case.actor,
            "Prototipo implementado",
        ])

    return {
        SIMPLE_SHEET_NAME: {
            "headers": HEADERS[SIMPLE_SHEET_NAME],
            "rows": rows,
        },
    }


def validate_flow_description(case_label: str, flow_kind: str, flow: str) -> None:
    elements = [element.strip() for element in flow.split(";") if element.strip()]
    if len(elements) < 2:
        raise ValueError(f"{case_label} {flow_kind} flow must describe multiple elements")
    for element in elements:
        group = CONTEXTUAL_REF_GROUP_PATTERN.search(element)
        if not group:
            raise ValueError(f"{case_label} {flow_kind} element lacks contextual refs: {element}")
        prose = element[:group.start()].strip()
        if not prose:
            raise ValueError(f"{case_label} {flow_kind} element lacks a component description")
        if DOCUMENTATION_REF_PATTERN.search(prose):
            raise ValueError(f"{case_label} {flow_kind} element has an uncontextualized ref: {element}")
        if STORAGE_KEY_PATTERN.search(element):
            raise ValueError(f"{case_label} {flow_kind} element exposes a storage key: {element}")


def validate_dataset(dataset: dict[str, dict[str, object]]) -> None:
    if list(dataset) != [SIMPLE_SHEET_NAME]:
        raise ValueError("simplified sheet mismatch")
    spec = dataset[SIMPLE_SHEET_NAME]
    headers = spec["headers"]
    rows = spec["rows"]
    if headers != HEADERS[SIMPLE_SHEET_NAME]:
        raise ValueError("simplified headers mismatch")
    if not isinstance(rows, list) or len(rows) != 12:
        raise ValueError("expected exactly 12 simplified use cases")
    if any(len(row) != len(headers) for row in rows):
        raise ValueError("simplified row width mismatch")
    case_ids = []
    for row in rows:
        match = re.match(r"^(UC-[A-Z]+-\d{3}) — .+", row[0])
        if not match:
            raise ValueError(f"invalid combined use-case label: {row[0]}")
        case_ids.append(match.group(1))
        validate_flow_description(row[0], "main", row[5])
        validate_flow_description(row[0], "alternative", row[6])
        if not row[8]:
            raise ValueError(f"use case without linked requirements: {row[0]}")
    if len(case_ids) != len(set(case_ids)):
        raise ValueError("duplicate simplified use-case IDs")

    available_requirements = {row["id"] for row in parse_requirement_rows(SOURCE.read_text(encoding="utf-8"))}
    for row in rows:
        for req_id in [value.strip() for value in row[8].split(",") if value.strip()]:
            if req_id not in available_requirements:
                raise ValueError(f"unresolved requirement {req_id} in {row[0]}")


APPS_SCRIPT_TEMPLATE = r'''/**
 * IZI PARK prototype → simplified Product Owner use-case sheet.
 * Generated from templates/easypark-srs-reference.md.
 * Install this file in the target Google Sheet through Extensions → Apps Script.
 * The human Google account running it owns every permission grant and mutation.
 */

const IZI_SYNC_CONFIG = __CONFIG__;
const IZI_SYNC_DATA = __DATA__;

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("IZI PARK")
    .addItem("Preview simplified use cases", "previewPrototypeWorkbookSync")
    .addItem("Sync simplified use cases", "syncPrototypeWorkbook")
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
    "Confirm simplified use-case sync",
    formatPlan_(plan, false) + "\n\nA full timestamped backup will be created before sheet, row, or visibility changes.",
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
    const backupName = spreadsheet.getName() + " — backup before simplified IZI sync — " + new Date().toISOString();
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
  IZI_SYNC_CONFIG.legacySheetNames.forEach(function(sheetName) {
    if (!spreadsheet.getSheetByName(sheetName)) throw new Error("Missing legacy sheet required for safe migration: " + sheetName);
  });
  const simpleSheet = spreadsheet.getSheetByName(IZI_SYNC_CONFIG.simpleSheetName);
  if (simpleSheet) validateSimpleHeaders_(simpleSheet);
}

function validateSimpleHeaders_(sheet) {
  const expected = IZI_SYNC_DATA[IZI_SYNC_CONFIG.simpleSheetName].headers;
  const actual = sheet.getRange(IZI_SYNC_CONFIG.headerRow, 1, 1, expected.length).getValues()[0];
  expected.forEach(function(header, index) {
    if (String(actual[index]).trim() !== header) {
      throw new Error("Unexpected simplified header in column " + (index + 1) + ": expected " + header);
    }
  });
}

function buildSyncPlan_(spreadsheet) {
  const spec = IZI_SYNC_DATA[IZI_SYNC_CONFIG.simpleSheetName];
  const sheet = spreadsheet.getSheetByName(IZI_SYNC_CONFIG.simpleSheetName);
  const plan = {
    createSheet: !sheet,
    showSimpleSheet: Boolean(sheet && sheet.isSheetHidden()),
    hideLegacySheets: IZI_SYNC_CONFIG.legacySheetNames.filter(function(sheetName) {
      return !spreadsheet.getSheetByName(sheetName).isSheetHidden();
    }),
    changes: [],
    unchanged: [],
    totalChanges: 0,
  };

  if (!sheet) {
    spec.rows.forEach(function(row, index) {
      plan.changes.push({kind: "add", id: caseId_(row[0]), rowNumber: IZI_SYNC_CONFIG.dataStartRow + index, values: row});
    });
  } else {
    validateSimpleHeaders_(sheet);
    const available = sheet.getMaxRows() - IZI_SYNC_CONFIG.dataStartRow + 1;
    const values = sheet.getRange(IZI_SYNC_CONFIG.dataStartRow, 1, available, spec.headers.length).getValues();
    const rowById = {};
    const emptyRows = [];
    const managedIds = {};
    spec.rows.forEach(function(row) { managedIds[caseId_(row[0])] = true; });
    values.forEach(function(row, offset) {
      const label = String(row[0]).trim();
      const rowNumber = IZI_SYNC_CONFIG.dataStartRow + offset;
      if (!label) {
        emptyRows.push(rowNumber);
        return;
      }
      const id = caseId_(label);
      if (!id || !managedIds[id]) return; // Preserve every row outside the generated dataset.
      if (rowById[id]) throw new Error("Duplicate managed use-case ID in simplified sheet: " + id);
      rowById[id] = {rowNumber: rowNumber, values: row};
    });

    spec.rows.forEach(function(managedRow) {
      const id = caseId_(managedRow[0]);
      const existing = rowById[id];
      if (existing) {
        if (rowsEqual_(existing.values.slice(0, managedRow.length), managedRow)) {
          plan.unchanged.push(id);
        } else {
          plan.changes.push({kind: "update", id: id, rowNumber: existing.rowNumber, values: managedRow});
        }
      } else {
        const rowNumber = emptyRows.shift();
        if (!rowNumber) throw new Error("No empty row remains in the simplified sheet. Add empty rows before syncing.");
        plan.changes.push({kind: "add", id: id, rowNumber: rowNumber, values: managedRow});
      }
    });
  }

  plan.totalChanges = plan.changes.length + (plan.createSheet ? 1 : 0) +
    (plan.showSimpleSheet ? 1 : 0) + plan.hideLegacySheets.length;
  return plan;
}

function applySyncPlan_(spreadsheet, plan) {
  const spec = IZI_SYNC_DATA[IZI_SYNC_CONFIG.simpleSheetName];
  let sheet = spreadsheet.getSheetByName(IZI_SYNC_CONFIG.simpleSheetName);
  if (plan.createSheet) {
    sheet = spreadsheet.insertSheet(IZI_SYNC_CONFIG.simpleSheetName);
    sheet.getRange(IZI_SYNC_CONFIG.headerRow, 1, 1, spec.headers.length)
      .setValues([spec.headers])
      .setFontWeight("bold")
      .setBackground("#8a3f00")
      .setFontColor("#ffffff");
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, spec.headers.length);
  }
  plan.changes.forEach(function(change) {
    sheet.getRange(change.rowNumber, 1, 1, change.values.length).setValues([change.values]);
  });
  if (plan.showSimpleSheet || plan.createSheet) sheet.showSheet();
  plan.hideLegacySheets.forEach(function(sheetName) {
    spreadsheet.getSheetByName(sheetName).hideSheet();
  });
}

function caseId_(label) {
  const match = String(label || "").trim().match(/^(UC-[A-Z]+-\d{3})\s+—\s+.+/);
  return match ? match[1] : "";
}

function rowsEqual_(left, right) {
  if (left.length !== right.length) return false;
  return left.every(function(value, index) {
    return String(value == null ? "" : value).trim() === String(right[index] == null ? "" : right[index]).trim();
  });
}

function formatPlan_(plan, completed) {
  const adds = plan.changes.filter(function(change) { return change.kind === "add"; }).length;
  const updates = plan.changes.filter(function(change) { return change.kind === "update"; }).length;
  const lines = [completed ? "Sync result:" : "Proposed changes:"];
  lines.push(IZI_SYNC_CONFIG.simpleSheetName + ": " + adds + " add, " + updates + " update, " + plan.unchanged.length + " unchanged");
  lines.push("Create simplified sheet: " + (plan.createSheet ? "yes" : "no"));
  lines.push("Show simplified sheet: " + (plan.showSimpleSheet ? "yes" : "no"));
  lines.push("Hide legacy sheets: " + (plan.hideLegacySheets.length ? plan.hideLegacySheets.join(", ") : "none"));
  lines.push("Total changes: " + plan.totalChanges);
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
            "    headers: " + json.dumps(spec["headers"], ensure_ascii=False, separators=(",", ":")) + ",\n"
            "    rows: [\n" + rows + "\n    ]\n  }"
        )
    return "{\n" + ",\n".join(sheet_blocks) + "\n}"


def render(dataset: dict[str, dict[str, object]]) -> str:
    config = {
        "spreadsheetId": TARGET_SPREADSHEET_ID,
        "simpleSheetName": SIMPLE_SHEET_NAME,
        "legacySheetNames": LEGACY_SHEET_NAMES,
        "headerRow": 1,
        "dataStartRow": 2,
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
