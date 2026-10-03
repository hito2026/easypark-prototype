#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const sourcePath = new URL("../templates/izi-park-google-sheet-sync.gs", import.meta.url);
const source = fs.readFileSync(sourcePath, "utf8");

function loadScript() {
  const events = [];
  const ui = {
    ButtonSet: { OK: "OK", YES_NO: "YES_NO" },
    Button: { YES: "YES", NO: "NO" },
    response: "YES",
    alerts: [],
    createMenu() {
      return { addItem() { return this; }, addToUi() { events.push("menu"); } };
    },
    alert(title, message, buttons) {
      this.alerts.push({ title, message, buttons });
      return buttons === this.ButtonSet.YES_NO ? this.response : this.Button.OK;
    },
  };

  const context = vm.createContext({ console, Date, Object, Error, String, Array, Boolean });
  vm.runInContext(
    source + "\nthis.__syncExports = {IZI_SYNC_CONFIG,IZI_SYNC_DATA,onOpen,previewPrototypeWorkbookSync,syncPrototypeWorkbook,validateTarget_,validateSimplifiedHeaders_,buildSyncPlan_,applySyncPlan_,caseId_,managedId_};",
    context,
    { filename: "izi-park-google-sheet-sync.gs" },
  );
  const api = context.__syncExports;

  class MockRange {
    constructor(sheet, row, column, rows, columns) {
      this.sheet = sheet;
      this.row = row;
      this.column = column;
      this.rows = rows;
      this.columns = columns;
    }
    getValues() {
      return Array.from({ length: this.rows }, (_, rowOffset) =>
        Array.from({ length: this.columns }, (_, columnOffset) =>
          this.sheet.valueAt(this.row + rowOffset, this.column + columnOffset),
        ),
      );
    }
    setValues(values) {
      assert.equal(values.length, this.rows);
      values.forEach((row, rowOffset) => {
        assert.equal(row.length, this.columns);
        row.forEach((value, columnOffset) => {
          this.sheet.setValue(this.row + rowOffset, this.column + columnOffset, value);
        });
      });
      events.push(`write:${this.sheet.name}:${this.row}`);
      return this;
    }
    setFontWeight() { events.push(`format-weight:${this.sheet.name}`); return this; }
    setBackground() { events.push(`format-background:${this.sheet.name}`); return this; }
    setFontColor() { events.push(`format-color:${this.sheet.name}`); return this; }
  }

  class MockSheet {
    constructor(name, width = 1, hidden = false) {
      this.name = name;
      this.hidden = hidden;
      this.maxRows = 250;
      this.grid = Array.from({ length: this.maxRows }, () => Array(width).fill(""));
    }
    getMaxRows() { return this.maxRows; }
    getRange(row, column, rows, columns) { return new MockRange(this, row, column, rows, columns); }
    valueAt(row, column) { return this.grid[row - 1]?.[column - 1] ?? ""; }
    setValue(row, column, value) {
      while (this.grid[row - 1].length < column) this.grid[row - 1].push("");
      this.grid[row - 1][column - 1] = value;
    }
    isSheetHidden() { return this.hidden; }
    hideSheet() { this.hidden = true; events.push(`hide:${this.name}`); return this; }
    showSheet() { this.hidden = false; events.push(`show:${this.name}`); return this; }
    setFrozenRows(rows) { events.push(`freeze:${this.name}:${rows}`); return this; }
    autoResizeColumns(start, count) { events.push(`resize:${this.name}:${start}:${count}`); return this; }
    rowForId(id) {
      return this.grid.findIndex((row) => api.managedId_(this.name, row[0]) === id) + 1;
    }
  }

  class MockSpreadsheet {
    constructor(id = api.IZI_SYNC_CONFIG.spreadsheetId) {
      this.id = id;
      this.name = "IZI PARK Product Owner Workbook";
      this.sheets = Object.fromEntries(
        api.IZI_SYNC_CONFIG.legacySheetNames.map((name) => [name, new MockSheet(name)]),
      );
    }
    getId() { return this.id; }
    getName() { return this.name; }
    getSheetByName(name) { return this.sheets[name] ?? null; }
    insertSheet(name) {
      if (this.sheets[name]) throw new Error(`Sheet already exists: ${name}`);
      const width = api.IZI_SYNC_DATA[name].headers.length;
      const sheet = new MockSheet(name, width);
      this.sheets[name] = sheet;
      events.push(`create:${name}`);
      return sheet;
    }
    copy(name) {
      events.push(`backup:${name}`);
      return { getUrl: () => "https://docs.google.com/spreadsheets/d/mock-backup/edit" };
    }
    addExistingSimplifiedSheet(name, { hidden = false, malformed = false, populated = false } = {}) {
      const spec = api.IZI_SYNC_DATA[name];
      const sheet = new MockSheet(name, spec.headers.length, hidden);
      sheet.grid[0] = Array.from(spec.headers);
      if (malformed) sheet.grid[0][0] = "Wrong header";
      if (populated) {
        spec.rows.forEach((row, index) => { sheet.grid[index + 1] = Array.from(row); });
      }
      this.sheets[name] = sheet;
      return sheet;
    }
  }

  let activeSpreadsheet = new MockSpreadsheet();
  context.SpreadsheetApp = {
    getActiveSpreadsheet: () => activeSpreadsheet,
    getUi: () => ui,
    flush: () => events.push("flush"),
  };
  context.LockService = {
    getDocumentLock: () => ({
      waitLock: () => events.push("lock"),
      releaseLock: () => events.push("unlock"),
    }),
  };

  return {
    api,
    events,
    ui,
    get spreadsheet() { return activeSpreadsheet; },
    set spreadsheet(value) { activeSpreadsheet = value; },
    MockSpreadsheet,
  };
}

function assertThrowsMessage(fn, fragment) {
  assert.throws(fn, (error) => String(error.message).includes(fragment));
}

const harness = loadScript();
const { api, events, ui, MockSpreadsheet } = harness;
const [simpleName, requirementsName, relationshipsName] = api.IZI_SYNC_CONFIG.simplifiedSheetNames;
const simpleSpec = api.IZI_SYNC_DATA[simpleName];
const requirementsSpec = api.IZI_SYNC_DATA[requirementsName];
const relationshipsSpec = api.IZI_SYNC_DATA[relationshipsName];
assert.deepEqual(Object.keys(api.IZI_SYNC_DATA), [simpleName, requirementsName, relationshipsName]);
assert.deepEqual(Array.from(simpleSpec.headers), [
  "Nro y nombre de caso", "Objetivo", "Alcance", "Precondición", "Post condición",
  "Flujo principal", "Flujo alternativo", "Criterio de aceptación", "Requerimientos",
  "Actores principales", "Estado",
]);
assert.deepEqual(Array.from(requirementsSpec.headers), [
  "ID", "Tipo", "Requerimiento", "Criterio de aceptación", "Prioridad", "Estado", "Responsable", "Notas",
]);
assert.deepEqual(Array.from(relationshipsSpec.headers), [
  "ID relación", "ID requerimiento", "Caso de uso (ID — Nombre)", "Tipo de relación", "Cobertura", "Notas",
]);
assert.equal(simpleSpec.rows.length, 12);
assert.equal(requirementsSpec.rows.length, 82);
assert.equal(relationshipsSpec.rows.length, 118);
assert.equal(new Set(simpleSpec.rows.map((row) => api.caseId_(row[0]))).size, 12);
assert.equal(new Set(requirementsSpec.rows.map((row) => row[0])).size, requirementsSpec.rows.length);
assert.equal(new Set(relationshipsSpec.rows.map((row) => row[0])).size, relationshipsSpec.rows.length);
assert.ok(requirementsSpec.rows.every((row) => ["Implementado en prototipo", "Actual"].includes(row[5])));
const requirementIds = new Set(requirementsSpec.rows.map((row) => row[0]));
const caseLabels = new Set(simpleSpec.rows.map((row) => row[0]));
assert.ok(relationshipsSpec.rows.every((row) => requirementIds.has(row[1]) && caseLabels.has(row[2])));
assert.deepEqual(new Set(relationshipsSpec.rows.map((row) => row[1])), requirementIds);
assert.deepEqual(new Set(relationshipsSpec.rows.map((row) => row[2])), caseLabels);

const documentationRefSource = String.raw`(?:[A-Z][A-Z0-9]*-){2,}[A-Z0-9]+`;
const documentationRefPattern = new RegExp(String.raw`\b${documentationRefSource}\b`);
const parenthesizedRefGroupSource = String.raw`\((?:${documentationRefSource})(?:,\s*(?:${documentationRefSource}))*\)`;
const parenthesizedRefGroupAtEnd = new RegExp(`${parenthesizedRefGroupSource}$`);
const parenthesizedRefGroupGlobal = new RegExp(parenthesizedRefGroupSource, "g");
const storageKeyPattern = /\b(?:easypark|iziPark)[A-Za-z0-9]+\b/;
simpleSpec.rows.forEach((row) => {
  [["main", row[5]], ["alternative", row[6]]].forEach(([flowKind, flow]) => {
    assert.ok(flow.trim(), `${row[0]} must have a ${flowKind} flow`);
    const elements = flow.split(";").map((element) => element.trim()).filter(Boolean);
    assert.ok(elements.length >= 2, `${row[0]} ${flowKind} flow must describe multiple elements`);
    elements.forEach((element) => {
      assert.match(element, parenthesizedRefGroupAtEnd, `${row[0]} ${flowKind} element needs contextual refs: ${element}`);
    });
    const proseOnly = flow.replace(parenthesizedRefGroupGlobal, "");
    assert.equal(documentationRefPattern.test(proseOnly), false, `${row[0]} ${flowKind} flow contains an uncontextualized ref`);
    assert.equal(storageKeyPattern.test(flow), false, `${row[0]} ${flowKind} flow contains a storage key`);
  });
});

const totalManagedRows = Object.values(api.IZI_SYNC_DATA).reduce((total, sheetSpec) => total + sheetSpec.rows.length, 0);
const preview = api.previewPrototypeWorkbookSync();
api.IZI_SYNC_CONFIG.simplifiedSheetNames.forEach((name) => {
  assert.equal(preview.sheets[name].createSheet, true);
  assert.equal(preview.sheets[name].changes.length, api.IZI_SYNC_DATA[name].rows.length);
});
assert.equal(preview.hideLegacySheets.length, 4);
assert.equal(preview.totalChanges, totalManagedRows + 3 + 4);
assert.equal(events.some((event) => event.startsWith("backup:")), false);
assert.equal(events.some((event) => event.startsWith("write:")), false);

harness.spreadsheet = new MockSpreadsheet("wrong-spreadsheet");
assertThrowsMessage(() => api.previewPrototypeWorkbookSync(), "Wrong spreadsheet");

harness.spreadsheet = new MockSpreadsheet();
delete harness.spreadsheet.sheets.Matriz;
assertThrowsMessage(() => api.previewPrototypeWorkbookSync(), "Missing legacy sheet");

api.IZI_SYNC_CONFIG.simplifiedSheetNames.forEach((name) => {
  harness.spreadsheet = new MockSpreadsheet();
  harness.spreadsheet.addExistingSimplifiedSheet(name, { malformed: true });
  assertThrowsMessage(() => api.previewPrototypeWorkbookSync(), "Unexpected header");
});

harness.spreadsheet = new MockSpreadsheet();
const duplicateSheet = harness.spreadsheet.addExistingSimplifiedSheet(requirementsName);
duplicateSheet.grid[1][0] = requirementsSpec.rows[0][0];
duplicateSheet.grid[2][0] = requirementsSpec.rows[0][0];
assertThrowsMessage(() => api.previewPrototypeWorkbookSync(), "Duplicate managed ID");

// Match the currently deployed live state: use cases exist, legacy sheets are hidden, new sheets are absent.
harness.spreadsheet = new MockSpreadsheet();
harness.spreadsheet.addExistingSimplifiedSheet(simpleName, { populated: true });
api.IZI_SYNC_CONFIG.legacySheetNames.forEach((name) => { harness.spreadsheet.sheets[name].hidden = true; });
const migrationPreview = api.previewPrototypeWorkbookSync();
assert.equal(migrationPreview.sheets[simpleName].unchanged.length, 12);
assert.equal(migrationPreview.sheets[requirementsName].createSheet, true);
assert.equal(migrationPreview.sheets[relationshipsName].createSheet, true);
assert.equal(migrationPreview.totalChanges, requirementsSpec.rows.length + relationshipsSpec.rows.length + 2);

harness.spreadsheet = new MockSpreadsheet();
events.length = 0;
const firstSync = api.syncPrototypeWorkbook();
assert.equal(firstSync.totalChanges, totalManagedRows + 3 + 4);
const backupIndex = events.findIndex((event) => event.startsWith("backup:"));
const mutationIndexes = events
  .map((event, index) => ({ event, index }))
  .filter(({ event }) => /^(create|write|hide|show):/.test(event))
  .map(({ index }) => index);
assert.ok(backupIndex >= 0 && mutationIndexes.every((index) => index > backupIndex), "backup must precede every workbook mutation");
assert.ok(events.includes("lock"));
assert.ok(events.includes("flush"));
assert.equal(events.at(-1), "unlock");
api.IZI_SYNC_CONFIG.simplifiedSheetNames.forEach((name) => {
  const sheet = harness.spreadsheet.getSheetByName(name);
  assert.ok(sheet);
  assert.deepEqual(sheet.grid[0], Array.from(api.IZI_SYNC_DATA[name].headers));
  assert.equal(sheet.isSheetHidden(), false);
  api.IZI_SYNC_DATA[name].rows.forEach((row) => {
    assert.ok(sheet.rowForId(api.managedId_(name, row[0])) >= 2);
  });
});
api.IZI_SYNC_CONFIG.legacySheetNames.forEach((name) => {
  assert.equal(harness.spreadsheet.getSheetByName(name).isSheetHidden(), true);
});

const customRows = {
  [simpleName]: ["UC-CUSTOM-999 — User-owned case", "Preserve use case"],
  [requirementsName]: ["REQ-CUSTOM-001", "Preserve requirement"],
  [relationshipsName]: ["REL-CUSTOM-001", "Preserve relationship"],
};
api.IZI_SYNC_CONFIG.simplifiedSheetNames.forEach((name) => {
  const sheet = harness.spreadsheet.getSheetByName(name);
  sheet.grid[220][0] = customRows[name][0];
  sheet.grid[220][1] = customRows[name][1];
});
events.length = 0;
const secondSync = api.syncPrototypeWorkbook();
assert.equal(secondSync.totalChanges, 0);
assert.equal(events.some((event) => event.startsWith("backup:")), false);
api.IZI_SYNC_CONFIG.simplifiedSheetNames.forEach((name) => {
  assert.equal(harness.spreadsheet.getSheetByName(name).grid[220][1], customRows[name][1]);
});

api.IZI_SYNC_CONFIG.simplifiedSheetNames.forEach((name) => {
  const sheet = harness.spreadsheet.getSheetByName(name);
  const managedRow = sheet.rowForId(api.managedId_(name, api.IZI_SYNC_DATA[name].rows[0][0]));
  sheet.setValue(managedRow, 2, `Changed managed value in ${name}`);
});
events.length = 0;
const updateSync = api.syncPrototypeWorkbook();
assert.equal(updateSync.totalChanges, 3);
assert.ok(events.find((event) => event.startsWith("backup:")));
api.IZI_SYNC_CONFIG.simplifiedSheetNames.forEach((name) => {
  const sheet = harness.spreadsheet.getSheetByName(name);
  const managedRow = sheet.rowForId(api.managedId_(name, api.IZI_SYNC_DATA[name].rows[0][0]));
  assert.equal(sheet.valueAt(managedRow, 2), api.IZI_SYNC_DATA[name].rows[0][1]);
  assert.equal(sheet.grid[220][1], customRows[name][1]);
});

api.IZI_SYNC_CONFIG.simplifiedSheetNames.forEach((name) => {
  harness.spreadsheet.getSheetByName(name).hidden = true;
});
events.length = 0;
const showSync = api.syncPrototypeWorkbook();
assert.equal(showSync.totalChanges, 3);
api.IZI_SYNC_CONFIG.simplifiedSheetNames.forEach((name) => {
  assert.equal(harness.spreadsheet.getSheetByName(name).isSheetHidden(), false);
  assert.ok(events.includes(`show:${name}`));
});

harness.spreadsheet = new MockSpreadsheet();
ui.response = ui.Button.NO;
events.length = 0;
const cancelled = api.syncPrototypeWorkbook();
assert.equal(cancelled.cancelled, true);
assert.equal(events.some((event) => event.startsWith("backup:")), false);
assert.equal(events.some((event) => /^(create|write|hide|show):/.test(event)), false);

console.log("simplified_google_sheet_sync_tests=PASS");
