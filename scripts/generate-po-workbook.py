#!/usr/bin/env python3
"""Generate a deterministic Product Owner workbook for IZI PARK.

The workbook is a standard-library-only OOXML .xlsx package. It contains
fictitious examples and no external relationships, macros, timestamps from the
current environment, local paths, network data, or hidden sheets.
"""
from __future__ import annotations

import argparse
import hashlib
import re
import sys
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable
from xml.etree import ElementTree as ET
from xml.sax.saxutils import escape, quoteattr

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "templates" / "izi-park-product-owner-workbook.xlsx"
FIXED_ZIP_TIME = (2026, 1, 1, 0, 0, 0)
CREATED = "2026-10-01T00:00:00Z"
CREATOR = "IZI PARK prototype"
TITLE = "IZI PARK Product Owner Workbook"

PRIORITY = ["Must", "Should", "Could", "Won't"]
RECORD_STATUS = ["Borrador", "Propuesto", "En revisión", "Aprobado", "Rechazado", "Obsoleto"]
FLOW_TYPE = ["Principal", "Alternativo", "Excepción"]
REQ_TYPE = ["RF", "RN", "RNF", "RD", "INT"]
RELATION_TYPE = ["Principal", "Alternativa", "Excepción", "Transversal"]
COVERAGE = ["Completa", "Parcial", "Pendiente", "No aplica"]
REVIEW_STATUS = ["Pendiente", "Revisado", "Aprobado", "Rechazado"]


@dataclass(frozen=True)
class SheetSpec:
    name: str
    columns: list[str]
    title: str
    instructions: str
    guidance: str
    example: list[str]
    widths: list[float]
    validations: list[tuple[str, list[str]]]
    required: set[str]


SHEETS = [
    SheetSpec(
        name="Casos de uso",
        columns=[
            "ID_Caso_Uso", "Nombre", "Objetivo", "Actor_Principal", "Actores_Secundarios",
            "Disparador", "Precondiciones", "Postcondiciones_Exito", "Postcondiciones_Error",
            "Alcance_Incluye", "Fuera_de_Alcance", "Prioridad", "Estado", "Responsable",
            "Version", "Version_Objetivo", "Reglas_Negocio_IDs", "Requerimientos_IDs",
            "Datos_Involucrados", "Dependencias", "Supuestos", "Decisiones_Pendientes",
            "Criterios_Aceptacion", "Referencias_Visuales", "Notas_PO", "Vinculos_Matriz", "Cobertura",
        ],
        title="Casos de uso - plantilla Product Owner IZI PARK",
        instructions="Una fila por caso de uso. Usá IDs estables, texto de negocio verificable y ejemplos ficticios; este workbook no reemplaza el SRS ni la verdad transaccional.",
        guidance="Las celdas admiten saltos de línea. Separá IDs múltiples con coma, por ejemplo REQ-EJEMPLO-001, RN-EJEMPLO-002. No ingreses teléfonos, patentes, ubicaciones, pagos, credenciales ni secretos reales. Leyenda: encabezado naranja oscuro = obligatorio; encabezado azul = opcional.",
        example=[
            "CU-EJEMPLO-001", "Reservar cochera ficticia con hold", "Validar que una persona conductora pueda revisar una alternativa de casa reservable ficticia y avanzar a trazabilidad PO sin ejecutar pagos reales.",
            "Conductor", "Anfitrión ficticio, Sistema local", "La persona elige una casa de prueba desde resultados simulados.",
            "Existe una alternativa ficticia marcada como publicada y reservable.", "Se registra intención de hold mock y se muestra continuidad hacia checkout ficticio.",
            "Si no hay casa reservable, el flujo vuelve a orientación sin reserva ni cobro.", "Búsqueda, llegada, hold mock, checkout simulado y recibo demo.",
            "GPS real, pagos reales, bloqueo real de disponibilidad, datos personales reales.", "Must", "Borrador", "PO ejemplo", "0.1", "0.2", "RN-EJEMPLO-001", "REQ-EJEMPLO-001", "Destino ficticio; alternativa demo; estado local", "Index prototype", "La disponibilidad es simulada.", "Confirmar copy final del hold.", "Dado un hold mock vigente, cuando se acepta el checkout ficticio, entonces se muestra confirmación demo sin pago real.", "IZI-HOUSE-ARRIVAL-01, IZI-HOLD-01, IZI-MOCK-CHECKOUT-01", "Fila ficticia para demostrar trazabilidad.", "", "",
        ],
        widths=[18, 28, 46, 22, 28, 34, 38, 38, 38, 36, 36, 14, 18, 20, 12, 18, 24, 28, 30, 24, 30, 32, 44, 34, 34, 16, 16],
        validations=[("L6:L205", PRIORITY), ("M6:M205", RECORD_STATUS)],
        required={"ID_Caso_Uso", "Nombre", "Objetivo", "Actor_Principal", "Disparador", "Precondiciones", "Postcondiciones_Exito", "Prioridad", "Estado", "Responsable", "Criterios_Aceptacion"},
    ),
    SheetSpec(
        name="Flujos",
        columns=[
            "ID_Paso", "ID_Caso_Uso", "Tipo_Flujo", "Codigo_Flujo", "Paso_Origen", "Orden", "Actor",
            "Accion_Actor", "Respuesta_Sistema", "Condicion", "Estado_Final", "Requerimientos_IDs",
            "Reglas_Negocio_IDs", "Datos", "Referencias_Visuales", "Notas_PO",
        ],
        title="Flujos - pasos principales, alternativos y excepciones",
        instructions="Una fila por paso. Los pasos alternativos o de excepción deben indicar el Paso_Origen del flujo principal. Usá IDs ficticios y estables.",
        guidance="Las celdas descriptivas pueden ser multilínea. Separá IDs con coma. No documentes datos reales de personas, vehículos, pagos o credenciales. Leyenda: encabezado naranja oscuro = obligatorio; encabezado azul = opcional.",
        example=[
            "FL-EJEMPLO-001", "CU-EJEMPLO-001", "Principal", "PRI-01", "", "1", "Conductor",
            "Selecciona la alternativa ficticia de casa reservable y toca reservar.", "El sistema muestra una ventana de hold local simulada y mantiene copia de que no hay pago real.",
            "Casa publicada y reservable en datos de demo.", "Hold mock visible", "REQ-EJEMPLO-001", "RN-EJEMPLO-001", "iziParkMockHold ficticio", "IZI-HOUSE-ARRIVAL-01, IZI-HOLD-01", "Ejemplo alineado con CU-EJEMPLO-001.",
        ],
        widths=[18, 20, 18, 18, 18, 10, 20, 42, 46, 34, 24, 28, 24, 30, 34, 34],
        validations=[("C6:C205", FLOW_TYPE)],
        required={"ID_Paso", "ID_Caso_Uso", "Tipo_Flujo", "Codigo_Flujo", "Orden", "Actor", "Accion_Actor", "Respuesta_Sistema"},
    ),
    SheetSpec(
        name="Requerimientos",
        columns=[
            "ID_Requerimiento", "Tipo", "Titulo", "Descripcion_Verificable", "Justificacion", "Prioridad", "Estado",
            "Criterio_Aceptacion", "Fuente", "Responsable", "Version_Objetivo", "Dependencias", "Riesgos",
            "Referencias_Visuales", "Notas_PO", "Vinculos_Matriz", "Cobertura",
        ],
        title="Requerimientos - clasificación y evidencia PO",
        instructions="Una fila por requisito verificable. Clasificá tipo, prioridad y estado con listas controladas; dejá trazabilidad con la hoja Matriz.",
        guidance="Usá descripciones verificables y referencias visuales estables separadas por coma. No incluyas URLs privadas, credenciales ni datos reales. Leyenda: encabezado naranja oscuro = obligatorio; encabezado azul = opcional.",
        example=[
            "REQ-EJEMPLO-001", "RF", "Hold mock para casa reservable ficticia", "El prototipo debe mostrar una ventana de hold local cuando el caso de uso ficticio selecciona una casa publicada y reservable.",
            "Permite validar intención de reserva sin afirmar disponibilidad ni pago real.", "Must", "Borrador", "Dado CU-EJEMPLO-001, cuando se activa el paso FL-EJEMPLO-001, entonces existe un vínculo en Matriz y la cobertura del requisito queda Cubierto.",
            "Task PO workbook", "PO ejemplo", "0.2", "CU-EJEMPLO-001", "Confundir ejemplo con verdad de producto.", "IZI-HOLD-01", "Fila ficticia alineada con matriz.", "", "",
        ],
        widths=[22, 12, 32, 48, 40, 14, 18, 52, 22, 20, 18, 28, 32, 34, 34, 16, 16],
        validations=[("B6:B205", REQ_TYPE), ("F6:F205", PRIORITY), ("G6:G205", RECORD_STATUS)],
        required={"ID_Requerimiento", "Tipo", "Titulo", "Descripcion_Verificable", "Prioridad", "Estado", "Criterio_Aceptacion", "Fuente", "Responsable"},
    ),
    SheetSpec(
        name="Matriz",
        columns=[
            "ID_Relacion", "ID_Requerimiento", "ID_Caso_Uso", "ID_Paso", "Tipo_Relacion", "Estado_Cobertura",
            "Evidencia_Referencia", "Observaciones", "Responsable", "Estado_Revision",
        ],
        title="Matriz - trazabilidad normalizada requisito/caso/flujo",
        instructions="Una fila por relación entre requisito, caso de uso y opcionalmente paso. Esta hoja alimenta las fórmulas de cobertura.",
        guidance="Usá IDs separados por filas, no múltiples relaciones en una sola celda. Las evidencias deben ser refs o notas ficticias, nunca datos sensibles reales. Leyenda: encabezado naranja oscuro = obligatorio; encabezado azul = opcional.",
        example=[
            "REL-EJEMPLO-001", "REQ-EJEMPLO-001", "CU-EJEMPLO-001", "FL-EJEMPLO-001", "Principal", "Completa", "IZI-HOLD-01", "Relación ficticia para demostrar cobertura y trazabilidad.", "PO ejemplo", "Pendiente",
        ],
        widths=[22, 24, 22, 20, 18, 20, 32, 42, 20, 20],
        validations=[("E6:E205", RELATION_TYPE), ("F6:F205", COVERAGE), ("J6:J205", REVIEW_STATUS)],
        required={"ID_Relacion", "ID_Requerimiento", "ID_Caso_Uso", "Tipo_Relacion", "Estado_Cobertura", "Responsable", "Estado_Revision"},
    ),
]

EXPECTED_ENTRIES = [
    "[Content_Types].xml",
    "_rels/.rels",
    "docProps/app.xml",
    "docProps/core.xml",
    "xl/_rels/workbook.xml.rels",
    "xl/sharedStrings.xml",
    "xl/styles.xml",
    "xl/workbook.xml",
    "xl/worksheets/sheet1.xml",
    "xl/worksheets/sheet2.xml",
    "xl/worksheets/sheet3.xml",
    "xl/worksheets/sheet4.xml",
]


def col_name(index: int) -> str:
    name = ""
    while index:
        index, rem = divmod(index - 1, 26)
        name = chr(65 + rem) + name
    return name


def resolve_output(path_text: str) -> Path:
    raw = Path(path_text)
    path = raw if raw.is_absolute() else ROOT / raw
    path = path.resolve()
    if path.suffix.lower() != ".xlsx":
        raise SystemExit("generate-po-workbook.py: error: output must be a .xlsx file")
    try:
        path.relative_to(ROOT)
    except ValueError as exc:
        raise SystemExit(f"generate-po-workbook.py: error: output must be inside repository root: {path}") from exc
    return path


def formulas(sheet: SheetSpec, row: int, col_index: int) -> str | None:
    if sheet.name == "Casos de uso":
        if col_index == 26:
            return f"COUNTIF(Matriz!C:C,A{row})"
        if col_index == 27:
            return f'IF(Z{row}>0,"Cubierto","Sin vínculo")'
    if sheet.name == "Requerimientos":
        if col_index == 16:
            return f"COUNTIF(Matriz!B:B,A{row})"
        if col_index == 17:
            return f'IF(P{row}>0,"Cubierto","Sin vínculo")'
    return None


def is_formula_cell(sheet: SheetSpec, col_index: int) -> bool:
    return formulas(sheet, 6, col_index) is not None


def build_rows(sheet: SheetSpec) -> list[list[str]]:
    width = len(sheet.columns)
    rows = [[""] * width for _ in range(205)]
    rows[0][0] = sheet.title
    rows[1][0] = sheet.instructions
    rows[2][0] = sheet.guidance
    rows[4] = sheet.columns[:]
    rows[5] = sheet.example[:]
    for col in range(1, width + 1):
        if is_formula_cell(sheet, col):
            rows[5][col - 1] = ""
    return rows


class SharedStrings:
    def __init__(self) -> None:
        self.index: dict[str, int] = {}
        self.values: list[str] = []
        self.count = 0

    def add(self, value: str) -> int:
        self.count += 1
        if value not in self.index:
            self.index[value] = len(self.values)
            self.values.append(value)
        return self.index[value]

    def lookup(self, value: str) -> int:
        return self.index[value]


def collect_shared_strings() -> SharedStrings:
    ss = SharedStrings()
    for sheet in SHEETS:
        for row in build_rows(sheet):
            for value in row:
                if value:
                    ss.add(value)
    return ss


def attrs(**values: str | int) -> str:
    return "".join(f" {name}={quoteattr(str(value))}" for name, value in values.items())


def xml_text(text: str) -> str:
    return escape(text, {'"': '&quot;'})


def validation_xml(validations: list[tuple[str, list[str]]]) -> str:
    if not validations:
        return ""
    parts = [f'<dataValidations count="{len(validations)}">']
    for sqref, choices in validations:
        joined = ",".join(choices)
        if len(joined) > 255:
            raise ValueError(f"validation list too long for {sqref}")
        parts.append(
            f'<dataValidation type="list" allowBlank="1" showErrorMessage="1" sqref="{sqref}">'
            f'<formula1>"{xml_text(joined)}"</formula1></dataValidation>'
        )
    parts.append("</dataValidations>")
    return "".join(parts)


def sheet_xml(sheet: SheetSpec, shared: SharedStrings) -> str:
    rows = build_rows(sheet)
    max_col = len(sheet.columns)
    max_ref = f"{col_name(max_col)}205"
    col_parts = []
    for i, width in enumerate(sheet.widths, start=1):
        col_parts.append(f'<col min="{i}" max="{i}" width="{width}" customWidth="1"/>')
    row_parts: list[str] = []
    for r, values in enumerate(rows, start=1):
        height = 30 if r in (1, 2, 3) else 24 if r == 5 else 36 if r == 6 else 28
        row_cells: list[str] = []
        for c in range(1, max_col + 1):
            ref = f"{col_name(c)}{r}"
            formula = formulas(sheet, r, c) if r >= 6 else None
            if formula:
                style = 5
                row_cells.append(f'<c r="{ref}" s="{style}"><f>{xml_text(formula)}</f></c>')
                continue
            value = values[c - 1]
            if not value:
                if r >= 7:
                    row_cells.append(f'<c r="{ref}" s="1"/>')
                continue
            style = 2 if r == 1 else 3 if r in (2, 3) else (7 if r == 5 and value in sheet.required else 4 if r == 5 else 6 if r == 6 else 1)
            idx = shared.lookup(value)
            row_cells.append(f'<c r="{ref}" t="s" s="{style}"><v>{idx}</v></c>')
        row_parts.append(f'<row r="{r}" ht="{height}" customHeight="1">{"".join(row_cells)}</row>')
    auto_filter = f'A5:{max_ref}'
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        f'<dimension ref="A1:{max_ref}"/>'
        '<sheetViews><sheetView workbookViewId="0"><pane ySplit="5" topLeftCell="A6" activePane="bottomLeft" state="frozen"/>'
        '<selection pane="bottomLeft" activeCell="A6" sqref="A6"/></sheetView></sheetViews>'
        '<sheetFormatPr defaultRowHeight="28"/>'
        f'<cols>{"".join(col_parts)}</cols>'
        f'<sheetData>{"".join(row_parts)}</sheetData>'
        f'<autoFilter ref="{auto_filter}"/>'
        f'{validation_xml(sheet.validations)}'
        '<pageMargins left="0.5" right="0.5" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>'
        '<pageSetup orientation="landscape"/>'
        '</worksheet>'
    )


def content_types() -> str:
    overrides = [
        ('/docProps/app.xml', 'application/vnd.openxmlformats-officedocument.extended-properties+xml'),
        ('/docProps/core.xml', 'application/vnd.openxmlformats-package.core-properties+xml'),
        ('/xl/workbook.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml'),
        ('/xl/styles.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml'),
        ('/xl/sharedStrings.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml'),
    ] + [(f'/xl/worksheets/sheet{i}.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml') for i in range(1, 5)]
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        + ''.join(f'<Override PartName="{part}" ContentType="{ctype}"/>' for part, ctype in overrides)
        + '</Types>'
    )


def package_rels() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>'
        '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>'
        '</Relationships>'
    )


def workbook_xml() -> str:
    sheets = ''.join(
        f'<sheet name={quoteattr(spec.name)} sheetId="{i}" r:id="rId{i}"/>'
        for i, spec in enumerate(SHEETS, start=1)
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        '<workbookPr date1904="0"/>'
        f'<sheets>{sheets}</sheets>'
        '<calcPr calcId="191029" fullCalcOnLoad="1" forceFullCalc="1"/>'
        '</workbook>'
    )


def workbook_rels() -> str:
    rels = [
        f'<Relationship Id="rId{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{i}.xml"/>'
        for i in range(1, 5)
    ]
    rels.extend([
        '<Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>',
        '<Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>',
    ])
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        + ''.join(rels) + '</Relationships>'
    )


def shared_strings_xml(shared: SharedStrings) -> str:
    items = []
    for value in shared.values:
        preserve = ' xml:space="preserve"' if value.strip() != value or '\n' in value else ''
        items.append(f'<si><t{preserve}>{xml_text(value)}</t></si>')
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        f'<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="{shared.count}" uniqueCount="{len(shared.values)}">'
        + ''.join(items) + '</sst>'
    )


def styles_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        '<fonts count="4">'
        '<font><sz val="11"/><color rgb="FF111827"/><name val="Aptos"/><family val="2"/></font>'
        '<font><b/><sz val="16"/><color rgb="FFFFFFFF"/><name val="Aptos Display"/><family val="2"/></font>'
        '<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Aptos"/><family val="2"/></font>'
        '<font><i/><sz val="10"/><color rgb="FF1F2937"/><name val="Aptos"/><family val="2"/></font>'
        '</fonts>'
        '<fills count="7">'
        '<fill><patternFill patternType="none"/></fill>'
        '<fill><patternFill patternType="gray125"/></fill>'
        '<fill><patternFill patternType="solid"><fgColor rgb="FF0F172A"/><bgColor indexed="64"/></patternFill></fill>'
        '<fill><patternFill patternType="solid"><fgColor rgb="FFE0F2FE"/><bgColor indexed="64"/></patternFill></fill>'
        '<fill><patternFill patternType="solid"><fgColor rgb="FF1D4ED8"/><bgColor indexed="64"/></patternFill></fill>'
        '<fill><patternFill patternType="solid"><fgColor rgb="FFDCFCE7"/><bgColor indexed="64"/></patternFill></fill>'
        '</fills>'
        '<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border>'
        '<border><left style="thin"><color rgb="FFCBD5E1"/></left><right style="thin"><color rgb="FFCBD5E1"/></right><top style="thin"><color rgb="FFCBD5E1"/></top><bottom style="thin"><color rgb="FFCBD5E1"/></bottom><diagonal/></border></borders>'
        '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
        '<cellXfs count="8">'
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"><alignment vertical="top" wrapText="1"/></xf>'
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0"><alignment vertical="top" wrapText="1"/></xf>'
        '<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0"><alignment vertical="center" wrapText="1"/></xf>'
        '<xf numFmtId="0" fontId="3" fillId="3" borderId="1" xfId="0"><alignment vertical="top" wrapText="1"/></xf>'
        '<xf numFmtId="0" fontId="2" fillId="4" borderId="1" xfId="0"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>'
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0"><alignment horizontal="center" vertical="top" wrapText="1"/></xf>'
        '<xf numFmtId="0" fontId="0" fillId="5" borderId="1" xfId="0"><alignment vertical="top" wrapText="1"/></xf>'
        '</cellXfs>'
        '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>'
        '<dxfs count="0"/><tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/>'
        '</styleSheet>'
    )


def core_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
        'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" '
        'xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        f'<dc:title>{xml_text(TITLE)}</dc:title><dc:creator>{xml_text(CREATOR)}</dc:creator>'
        f'<cp:lastModifiedBy>{xml_text(CREATOR)}</cp:lastModifiedBy>'
        '<dc:description>Plantilla deterministica ficticia para Product Owners; importable en Google Sheets.</dc:description>'
        f'<dcterms:created xsi:type="dcterms:W3CDTF">{CREATED}</dcterms:created>'
        f'<dcterms:modified xsi:type="dcterms:W3CDTF">{CREATED}</dcterms:modified>'
        '</cp:coreProperties>'
    )


def app_xml() -> str:
    sheet_names = ''.join(f'<vt:lpstr>{xml_text(s.name)}</vt:lpstr>' for s in SHEETS)
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" '
        'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">'
        '<Application>Python standard library</Application><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop>'
        '<HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>4</vt:i4></vt:variant></vt:vector></HeadingPairs>'
        f'<TitlesOfParts><vt:vector size="4" baseType="lpstr">{sheet_names}</vt:vector></TitlesOfParts>'
        '<Company>IZI PARK prototype</Company><LinksUpToDate>false</LinksUpToDate><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>16.0300</AppVersion>'
        '</Properties>'
    )


def package_parts() -> dict[str, str]:
    shared = collect_shared_strings()
    parts = {
        "[Content_Types].xml": content_types(),
        "_rels/.rels": package_rels(),
        "docProps/app.xml": app_xml(),
        "docProps/core.xml": core_xml(),
        "xl/_rels/workbook.xml.rels": workbook_rels(),
        "xl/sharedStrings.xml": shared_strings_xml(shared),
        "xl/styles.xml": styles_xml(),
        "xl/workbook.xml": workbook_xml(),
    }
    for i, sheet in enumerate(SHEETS, start=1):
        parts[f"xl/worksheets/sheet{i}.xml"] = sheet_xml(sheet, shared)
    return {name: parts[name] for name in EXPECTED_ENTRIES}


def write_xlsx(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    parts = package_parts()
    with zipfile.ZipFile(path, "w", compression=zipfile.ZIP_STORED) as zf:
        for name, content in parts.items():
            info = zipfile.ZipInfo(name, FIXED_ZIP_TIME)
            info.compress_type = zipfile.ZIP_STORED
            info.external_attr = 0o644 << 16
            zf.writestr(info, content.encode("utf-8"))


def parse_xml(data: bytes) -> ET.Element:
    return ET.fromstring(data)


def rel_targets_are_internal(root: ET.Element) -> bool:
    for rel in root:
        target_mode = rel.attrib.get("TargetMode")
        target = rel.attrib.get("Target", "")
        if target_mode == "External" or re.match(r"[a-zA-Z][a-zA-Z0-9+.-]*:", target):
            return False
    return True


def validate(path: Path) -> None:
    errors: list[str] = []
    try:
        with zipfile.ZipFile(path, "r") as zf:
            names = zf.namelist()
            if names != EXPECTED_ENTRIES:
                errors.append(f"unexpected ZIP entries: {names}")
            corrupt = zf.testzip()
            if corrupt is not None:
                errors.append(f"corrupt ZIP member: {corrupt}")
            xml_roots = {}
            for name in names:
                if name.endswith((".xml", ".rels")):
                    try:
                        xml_roots[name] = parse_xml(zf.read(name))
                    except ET.ParseError as exc:
                        errors.append(f"XML parse failed for {name}: {exc}")
            for name, root in xml_roots.items():
                if name.endswith(".rels") and not rel_targets_are_internal(root):
                    errors.append(f"external relationship found in {name}")
            workbook = xml_roots.get("xl/workbook.xml")
            if workbook is not None:
                ns = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
                sheet_nodes = workbook.findall("m:sheets/m:sheet", ns)
                if [s.attrib.get("name") for s in sheet_nodes] != [s.name for s in SHEETS]:
                    errors.append("workbook sheet names/count mismatch")
                for sheet_node in sheet_nodes:
                    if sheet_node.attrib.get("state") in {"hidden", "veryHidden"}:
                        errors.append("hidden sheet found")
                calc = workbook.find("m:calcPr", ns)
                if calc is None or calc.attrib.get("fullCalcOnLoad") != "1" or calc.attrib.get("forceFullCalc") != "1":
                    errors.append("full calculation flags missing")
            rels = xml_roots.get("xl/_rels/workbook.xml.rels")
            if rels is not None:
                targets = [r.attrib.get("Target") for r in rels]
                expected_targets = [f"worksheets/sheet{i}.xml" for i in range(1, 5)] + ["styles.xml", "sharedStrings.xml"]
                if targets != expected_targets:
                    errors.append("workbook relationship targets mismatch")
            content = zf.read("[Content_Types].xml").decode("utf-8")
            for required in ["workbook", "worksheet", "styles", "sharedStrings", "core-properties", "extended-properties"]:
                if required not in content:
                    errors.append(f"content type missing {required}")
            # Sheet-level contract checks.
            formulas_expected = {
                "xl/worksheets/sheet1.xml": ["COUNTIF(Matriz!C:C,A6)", 'IF(Z6&gt;0,&quot;Cubierto&quot;,&quot;Sin vínculo&quot;)', "COUNTIF(Matriz!C:C,A205)", 'IF(Z205&gt;0,&quot;Cubierto&quot;,&quot;Sin vínculo&quot;)'],
                "xl/worksheets/sheet3.xml": ["COUNTIF(Matriz!B:B,A6)", 'IF(P6&gt;0,&quot;Cubierto&quot;,&quot;Sin vínculo&quot;)', "COUNTIF(Matriz!B:B,A205)", 'IF(P205&gt;0,&quot;Cubierto&quot;,&quot;Sin vínculo&quot;)'],
            }
            for name, snippets in formulas_expected.items():
                text = zf.read(name).decode("utf-8")
                for snippet in snippets:
                    if snippet not in text:
                        errors.append(f"formula snippet missing in {name}: {snippet}")
            validations_expected = {
                "xl/worksheets/sheet1.xml": ["L6:L205", "M6:M205", ",".join(PRIORITY), ",".join(RECORD_STATUS)],
                "xl/worksheets/sheet2.xml": ["C6:C205", ",".join(FLOW_TYPE)],
                "xl/worksheets/sheet3.xml": ["B6:B205", "F6:F205", "G6:G205", ",".join(REQ_TYPE)],
                "xl/worksheets/sheet4.xml": ["E6:E205", "F6:F205", "J6:J205", ",".join(RELATION_TYPE), ",".join(COVERAGE), ",".join(REVIEW_STATUS)],
            }
            for name, snippets in validations_expected.items():
                text = zf.read(name).decode("utf-8")
                if "dataValidations" not in text:
                    errors.append(f"data validations missing in {name}")
                for snippet in snippets:
                    if xml_text(snippet) not in text:
                        errors.append(f"validation snippet missing in {name}: {snippet}")
                if 'topLeftCell="A6"' not in text or '<autoFilter ref="A5:' not in text or '<dimension ref="A1:' not in text:
                    errors.append(f"freeze/filter/dimension missing in {name}")
            for index, sheet in enumerate(SHEETS, start=1):
                root = xml_roots.get(f"xl/worksheets/sheet{index}.xml")
                if root is None:
                    continue
                ns_sheet = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
                row5 = root.find("m:sheetData/m:row[@r='5']", ns_sheet)
                if row5 is None:
                    errors.append(f"header row missing for {sheet.name}")
                    continue
                cell_styles = {cell.attrib.get("r"): cell.attrib.get("s") for cell in row5.findall("m:c", ns_sheet)}
                for col_index, header in enumerate(sheet.columns, start=1):
                    ref = f"{col_name(col_index)}5"
                    expected_style = "7" if header in sheet.required else "4"
                    if cell_styles.get(ref) != expected_style:
                        errors.append(f"header style mismatch {sheet.name} {header}: {cell_styles.get(ref)} != {expected_style}")
            shared_root = xml_roots.get("xl/sharedStrings.xml")
            if shared_root is not None:
                expected_shared = collect_shared_strings()
                if shared_root.attrib.get("count") != str(expected_shared.count):
                    errors.append(f"sharedStrings count mismatch: {shared_root.attrib.get('count')} != {expected_shared.count}")
                if shared_root.attrib.get("uniqueCount") != str(len(expected_shared.values)):
                    errors.append(f"sharedStrings uniqueCount mismatch: {shared_root.attrib.get('uniqueCount')} != {len(expected_shared.values)}")
            shared = zf.read("xl/sharedStrings.xml").decode("utf-8")
            for sample in ["CU-EJEMPLO-001", "REQ-EJEMPLO-001", "FL-EJEMPLO-001", "REL-EJEMPLO-001"]:
                if sample not in shared:
                    errors.append(f"example ID missing from shared strings: {sample}")
            bad_patterns = [
                r"<vbaProject", r"TargetMode=\"External\"", r"https?://(?!schemas\.openxmlformats\.org|purl\.org|www\.w3\.org)",
                r"/Users/", r"\b(?:\d[ -]?){8,}\b",
                r"(?i)(?:password|secret|token|api[_-]?key)\s*[:=]",
            ]
            combined = "\n".join(zf.read(name).decode("utf-8", errors="ignore") for name in names if name.endswith((".xml", ".rels")))
            for pattern in bad_patterns:
                if re.search(pattern, combined, re.IGNORECASE):
                    errors.append(f"sensitive/external pattern found: {pattern}")
    except zipfile.BadZipFile as exc:
        errors.append(f"bad ZIP: {exc}")
    if errors:
        raise ValueError("; ".join(errors))


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Generate deterministic IZI PARK Product Owner XLSX workbook.")
    parser.add_argument("--output", default=str(DEFAULT_OUTPUT.relative_to(ROOT)), help="Repo-confined .xlsx output path")
    args = parser.parse_args(argv)
    output = resolve_output(args.output)
    temp = output.with_name(f".{output.name}.tmp")
    try:
        if temp.exists():
            temp.unlink()
        write_xlsx(temp)
        validate(temp)
        temp.replace(output)
    except Exception as exc:  # noqa: BLE001 - CLI must preserve prior valid output and fail closed.
        if temp.exists():
            temp.unlink()
        print(f"generate-po-workbook.py: error: invalid workbook output: {exc}", file=sys.stderr)
        return 1
    finally:
        if temp.exists():
            temp.unlink()
    digest = hashlib.sha256(output.read_bytes()).hexdigest()
    print(f"Wrote {output.relative_to(ROOT)} ({output.stat().st_size} bytes, sha256 {digest})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
