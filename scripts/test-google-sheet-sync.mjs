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
    source + "\nthis.__syncExports = {IZI_SYNC_CONFIG,IZI_SYNC_DATA,onOpen,previewPrototypeWorkbookSync,syncPrototypeWorkbook,validateTarget_,validateSimpleHeaders_,buildSyncPlan_,applySyncPlan_,caseId_};",
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
      this.maxRows = 100;
      this.width = width;
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
      return this.grid.findIndex((row) => String(row[0]).startsWith(`${id} — `)) + 1;
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
    addExistingSimpleSheet({ hidden = false, malformed = false } = {}) {
      const name = api.IZI_SYNC_CONFIG.simpleSheetName;
      const spec = api.IZI_SYNC_DATA[name];
      const sheet = new MockSheet(name, spec.headers.length, hidden);
      sheet.grid[0] = spec.headers.slice();
      if (malformed) sheet.grid[0][0] = "Wrong header";
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
const simpleName = "Casos de uso simplificado";
const spec = api.IZI_SYNC_DATA[simpleName];
assert.deepEqual(Object.keys(api.IZI_SYNC_DATA), [simpleName]);
assert.equal(spec.headers.length, 11);
assert.equal(spec.rows.length, 12);
assert.equal(new Set(spec.rows.map((row) => api.caseId_(row[0]))).size, 12);
const documentationRefSource = String.raw`(?:[A-Z][A-Z0-9]*-){2,}[A-Z0-9]+`;
const documentationRefPattern = new RegExp(String.raw`\b${documentationRefSource}\b`);
const parenthesizedRefGroupSource = String.raw`\((?:${documentationRefSource})(?:,\s*(?:${documentationRefSource}))*\)`;
const parenthesizedRefGroupAtEnd = new RegExp(`${parenthesizedRefGroupSource}$`);
const parenthesizedRefGroupGlobal = new RegExp(parenthesizedRefGroupSource, "g");
const storageKeyPattern = /\b(?:easypark|iziPark)[A-Za-z0-9]+\b/;
spec.rows.forEach((row) => {
  [
    ["main", row[5]],
    ["alternative", row[6]],
  ].forEach(([flowKind, flow]) => {
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

const preview = api.previewPrototypeWorkbookSync();
assert.equal(preview.createSheet, true);
assert.equal(preview.changes.length, 12);
assert.equal(preview.hideLegacySheets.length, 4);
assert.equal(preview.totalChanges, 17);
assert.equal(events.some((event) => event.startsWith("backup:")), false);
assert.equal(events.some((event) => event.startsWith("write:")), false);

harness.spreadsheet = new MockSpreadsheet("wrong-spreadsheet");
assertThrowsMessage(() => api.previewPrototypeWorkbookSync(), "Wrong spreadsheet");

harness.spreadsheet = new MockSpreadsheet();
delete harness.spreadsheet.sheets.Matriz;
assertThrowsMessage(() => api.previewPrototypeWorkbookSync(), "Missing legacy sheet");

harness.spreadsheet = new MockSpreadsheet();
harness.spreadsheet.addExistingSimpleSheet({ malformed: true });
assertThrowsMessage(() => api.previewPrototypeWorkbookSync(), "Unexpected simplified header");

harness.spreadsheet = new MockSpreadsheet();
const duplicateSheet = harness.spreadsheet.addExistingSimpleSheet();
duplicateSheet.grid[1][0] = spec.rows[0][0];
duplicateSheet.grid[2][0] = spec.rows[0][0];
assertThrowsMessage(() => api.previewPrototypeWorkbookSync(), "Duplicate managed use-case ID");

harness.spreadsheet = new MockSpreadsheet();
events.length = 0;
const firstSync = api.syncPrototypeWorkbook();
assert.equal(firstSync.totalChanges, 17);
const backupIndex = events.findIndex((event) => event.startsWith("backup:"));
const mutationIndexes = events
  .map((event, index) => ({ event, index }))
  .filter(({ event }) => /^(create|write|hide|show):/.test(event))
  .map(({ index }) => index);
assert.ok(backupIndex >= 0 && mutationIndexes.every((index) => index > backupIndex), "backup must precede every workbook mutation");
assert.ok(events.includes("lock"));
assert.ok(events.includes("flush"));
assert.equal(events.at(-1), "unlock");
const simpleSheet = harness.spreadsheet.getSheetByName(simpleName);
assert.ok(simpleSheet);
assert.deepEqual(simpleSheet.grid[0], Array.from(spec.headers));
assert.equal(simpleSheet.isSheetHidden(), false);
api.IZI_SYNC_CONFIG.legacySheetNames.forEach((name) => assert.equal(harness.spreadsheet.getSheetByName(name).isSheetHidden(), true));
spec.rows.forEach((row) => assert.ok(simpleSheet.rowForId(api.caseId_(row[0])) >= 2));

simpleSheet.grid[20][0] = "UC-CUSTOM-999 — User-owned case";
simpleSheet.grid[20][1] = "Preserve me";
events.length = 0;
const secondSync = api.syncPrototypeWorkbook();
assert.equal(secondSync.totalChanges, 0);
assert.equal(events.some((event) => event.startsWith("backup:")), false);
assert.equal(simpleSheet.grid[20][1], "Preserve me");

const managedId = api.caseId_(spec.rows[0][0]);
const managedRow = simpleSheet.rowForId(managedId);
simpleSheet.setValue(managedRow, 2, "User changed managed objective");
events.length = 0;
const updateSync = api.syncPrototypeWorkbook();
assert.equal(updateSync.totalChanges, 1);
assert.ok(events.find((event) => event.startsWith("backup:")));
assert.equal(simpleSheet.valueAt(managedRow, 2), spec.rows[0][1]);
assert.equal(simpleSheet.grid[20][1], "Preserve me");

simpleSheet.hidden = true;
events.length = 0;
const showSync = api.syncPrototypeWorkbook();
assert.equal(showSync.totalChanges, 1);
assert.equal(simpleSheet.isSheetHidden(), false);
assert.ok(events.includes(`show:${simpleName}`));

harness.spreadsheet = new MockSpreadsheet();
ui.response = ui.Button.NO;
events.length = 0;
const cancelled = api.syncPrototypeWorkbook();
assert.equal(cancelled.cancelled, true);
assert.equal(events.some((event) => event.startsWith("backup:")), false);
assert.equal(events.some((event) => /^(create|write|hide|show):/.test(event)), false);

console.log("simplified_google_sheet_sync_tests=PASS");
