#!/usr/bin/env python3
"""Generate deterministic SRS PDFs from Markdown sources.

Requires local reportlab. No network, timestamps, local paths, or hidden build metadata.
"""
from __future__ import annotations

import argparse
import re
from pathlib import Path

from reportlab import rl_config
rl_config.invariant = 1

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Preformatted,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "templates" / "srs-ieee-830-template.md"
OUTPUT = ROOT / "templates" / "srs-ieee-830-template.pdf"
TITLE = "Plantilla SRS - guía original inspirada en preocupaciones clásicas de IEEE 830"
AUTHOR = "EasyPark prototype"
SUBJECT = "Plantilla editable de Especificación de Requisitos de Software"


def clean_inline(text: str) -> str:
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    text = re.sub(r"`([^`]+)`", r"<font name='Courier'>\1</font>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"\*([^*]+)\*", r"<i>\1</i>", text)
    text = re.sub(r"&lt;(https?://[^&]+)&gt;", r"<link href='\1'>\1</link>", text)
    return text


def make_styles():
    base = getSampleStyleSheet()
    styles = {
        "title": ParagraphStyle("title", parent=base["Title"], fontName="Helvetica-Bold", fontSize=20, leading=24, spaceAfter=14, alignment=TA_CENTER),
        "h1": ParagraphStyle("h1", parent=base["Heading1"], fontName="Helvetica-Bold", fontSize=17, leading=21, spaceBefore=12, spaceAfter=8, keepWithNext=True),
        "h2": ParagraphStyle("h2", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=14, leading=18, spaceBefore=10, spaceAfter=6, keepWithNext=True),
        "h3": ParagraphStyle("h3", parent=base["Heading3"], fontName="Helvetica-Bold", fontSize=12, leading=15, spaceBefore=8, spaceAfter=4, keepWithNext=True),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName="Helvetica", fontSize=9.5, leading=13, spaceAfter=5),
        "quote": ParagraphStyle("quote", parent=base["BodyText"], fontName="Helvetica-Oblique", fontSize=9, leading=12, leftIndent=12, rightIndent=8, borderColor=colors.HexColor("#d8e2f0"), borderWidth=0.8, borderPadding=6, backColor=colors.HexColor("#f7faff"), spaceAfter=7),
        "code": ParagraphStyle("code", fontName="Courier", fontSize=7.5, leading=10, leftIndent=8, backColor=colors.HexColor("#f3f4f6"), borderPadding=5, spaceAfter=6),
        "cell": ParagraphStyle("cell", fontName="Helvetica", fontSize=7.1, leading=9),
        "cell_head": ParagraphStyle("cell_head", fontName="Helvetica-Bold", fontSize=7.1, leading=9, textColor=colors.white),
        "footer": ParagraphStyle("footer", fontName="Helvetica", fontSize=7, leading=8, alignment=TA_LEFT, textColor=colors.HexColor("#5d6b82")),
    }
    return styles


def parse_table(lines, start, styles):
    rows = []
    i = start
    while i < len(lines) and lines[i].strip().startswith("|"):
        raw = lines[i].strip().strip("|")
        cells = [c.strip() for c in raw.split("|")]
        if not all(re.fullmatch(r":?-{3,}:?", c or "") for c in cells):
            style = styles["cell_head"] if not rows else styles["cell"]
            rows.append([Paragraph(clean_inline(c), style) for c in cells])
        i += 1
    if not rows:
        return [], i
    table = Table(rows, repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1d4ed8")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#d8e2f0")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#fbfdff")]),
    ]))
    return [table, Spacer(1, 6)], i


def flush_paragraph(buffer, story, styles):
    if buffer:
        story.append(Paragraph(clean_inline(" ".join(buffer).strip()), styles["body"]))
        buffer.clear()


def parse_markdown(text: str):
    styles = make_styles()
    story = []
    lines = text.splitlines()
    paragraph = []
    in_code = False
    code_lines = []
    bullet_items = []
    checklist_items = []
    number_items = []

    def flush_lists():
        nonlocal bullet_items, checklist_items, number_items
        if bullet_items:
            story.append(ListFlowable([ListItem(Paragraph(clean_inline(x), styles["body"])) for x in bullet_items], bulletType="bullet", leftIndent=16))
            story.append(Spacer(1, 4))
            bullet_items = []
        if checklist_items:
            for item in checklist_items:
                story.append(Paragraph(clean_inline("[ ] " + item), styles["body"]))
            story.append(Spacer(1, 4))
            checklist_items = []
        if number_items:
            story.append(ListFlowable([ListItem(Paragraph(clean_inline(x), styles["body"])) for x in number_items], bulletType="1", start="1", leftIndent=18))
            story.append(Spacer(1, 4))
            number_items = []

    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        if stripped.startswith("```"):
            flush_paragraph(paragraph, story, styles); flush_lists()
            if in_code:
                story.append(Preformatted("\n".join(code_lines), styles["code"]))
                code_lines = []
                in_code = False
            else:
                in_code = True
            i += 1
            continue
        if in_code:
            code_lines.append(line)
            i += 1
            continue
        if not stripped:
            flush_paragraph(paragraph, story, styles); flush_lists()
            story.append(Spacer(1, 3))
            i += 1
            continue
        if stripped.startswith("|"):
            flush_paragraph(paragraph, story, styles); flush_lists()
            flow, i = parse_table(lines, i, styles)
            story.extend(flow)
            continue
        if stripped.startswith("# "):
            flush_paragraph(paragraph, story, styles); flush_lists()
            story.append(Paragraph(clean_inline(stripped[2:]), styles["title"]))
            i += 1
            continue
        if stripped.startswith("## "):
            flush_paragraph(paragraph, story, styles); flush_lists()
            if re.match(r"## \d+\. ", stripped):
                story.append(PageBreak())
            story.append(Paragraph(clean_inline(stripped[3:]), styles["h1"]))
            i += 1
            continue
        if stripped.startswith("### "):
            flush_paragraph(paragraph, story, styles); flush_lists()
            story.append(Paragraph(clean_inline(stripped[4:]), styles["h2"]))
            i += 1
            continue
        if stripped.startswith("#### "):
            flush_paragraph(paragraph, story, styles); flush_lists()
            story.append(Paragraph(clean_inline(stripped[5:]), styles["h3"]))
            i += 1
            continue
        if stripped.startswith(">"):
            flush_paragraph(paragraph, story, styles); flush_lists()
            quote = stripped.lstrip("> ")
            story.append(Paragraph(clean_inline(quote), styles["quote"]))
            i += 1
            continue
        if re.match(r"^[-*] \[[ xX]\] ", stripped):
            flush_paragraph(paragraph, story, styles)
            flush_lists()
            checklist_items.append(stripped[6:])
            i += 1
            continue
        if re.match(r"^[-*] ", stripped):
            flush_paragraph(paragraph, story, styles)
            bullet_items.append(stripped[2:])
            i += 1
            continue
        if re.match(r"^\d+\. ", stripped):
            flush_paragraph(paragraph, story, styles)
            number_items.append(re.sub(r"^\d+\. ", "", stripped))
            i += 1
            continue
        paragraph.append(stripped)
        i += 1
    flush_paragraph(paragraph, story, styles); flush_lists()
    return story, styles


def resolve_under_root(value: str | Path, *, expected_suffix: str, label: str, must_exist: bool) -> Path:
    raw = Path(value)
    candidate = raw if raw.is_absolute() else ROOT / raw
    try:
        resolved = candidate.resolve(strict=must_exist)
    except FileNotFoundError as exc:
        raise ValueError(f"{label} does not exist: {raw}") from exc
    if not must_exist:
        resolved = candidate.resolve(strict=False)
    try:
        resolved.relative_to(ROOT)
    except ValueError as exc:
        raise ValueError(f"{label} must be inside repository root: {raw}") from exc
    if resolved.suffix.lower() != expected_suffix:
        raise ValueError(f"{label} must be a {expected_suffix} file: {raw}")
    return resolved


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate a deterministic SRS PDF from Markdown.")
    parser.add_argument("--source", default=str(SOURCE.relative_to(ROOT)), help="Markdown source path inside the repository root.")
    parser.add_argument("--output", default=str(OUTPUT.relative_to(ROOT)), help="PDF output path inside the repository root.")
    parser.add_argument("--title", default=TITLE, help="PDF title metadata.")
    parser.add_argument("--subject", default=SUBJECT, help="PDF subject metadata.")
    args = parser.parse_args(argv)
    try:
        args.source = resolve_under_root(args.source, expected_suffix=".md", label="source", must_exist=True)
        args.output = resolve_under_root(args.output, expected_suffix=".pdf", label="output", must_exist=False)
    except ValueError as exc:
        parser.error(str(exc))
    return args


def header_label(title: str) -> str:
    if title == TITLE:
        return "Plantilla SRS · guía original · Markdown es fuente de verdad"
    normalized = " ".join(title.split()) or "Documento SRS"
    if len(normalized) > 72:
        normalized = normalized[:69].rstrip() + "..."
    return f"{normalized} · Markdown es fuente de verdad"


def make_header_footer(title: str, subject: str):
    visible_header = header_label(title)

    def header_footer(canvas, doc):
        canvas.saveState()
        canvas.setTitle(title)
        canvas.setAuthor(AUTHOR)
        canvas.setSubject(subject)
        canvas.setCreator("scripts/generate-srs-pdf.py")
        width, height = A4
        canvas.setFont("Helvetica", 7)
        canvas.setFillColor(colors.HexColor("#5d6b82"))
        canvas.drawString(1.6 * cm, height - 1.1 * cm, visible_header)
        canvas.drawRightString(width - 1.6 * cm, 0.9 * cm, f"Página {doc.page}")
        canvas.restoreState()

    return header_footer


def build_pdf(source: Path = SOURCE, output: Path = OUTPUT, title: str = TITLE, subject: str = SUBJECT):
    source_text = source.read_text(encoding="utf-8")
    story, _styles = parse_markdown(source_text)
    output.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(output),
        pagesize=A4,
        leftMargin=1.6 * cm,
        rightMargin=1.6 * cm,
        topMargin=1.8 * cm,
        bottomMargin=1.4 * cm,
        title=title,
        author=AUTHOR,
        subject=subject,
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=make_header_footer(title, subject))])
    doc.build(story)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    build_pdf(args.source, args.output, args.title, args.subject)
    print(f"Generated {args.output.relative_to(ROOT)} from {args.source.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
