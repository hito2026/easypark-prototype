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

  const context = vm.createContext({ console, Date, Object, Error, String, Array });
  vm.runInContext(
    source + "\nthis.__syncExports = {IZI_SYNC_CONFIG,IZI_SYNC_DATA,onOpen,previewPrototypeWorkbookSync,syncPrototypeWorkbook,validateTarget_,buildSyncPlan_,applySyncPlan_};",
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
  }

  class MockSheet {
    constructor(name, headers) {
      this.name = name;
      this.maxRows = 205;
      this.width = headers.length;
      this.grid = Array.from({ length: this.maxRows }, () => Array(this.width).fill(""));
      this.grid[4] = headers.slice();
      this.grid[5][0] = `USER-SAMPLE-${name}`;
      this.grid[5][1] = "Existing user-owned sample";
    }
    getMaxRows() { return this.maxRows; }
    getRange(row, column, rows, columns) { return new MockRange(this, row, column, rows, columns); }
    valueAt(row, column) { return this.grid[row - 1]?.[column - 1] ?? ""; }
    setValue(row, column, value) { this.grid[row - 1][column - 1] = value; }
    rowForId(id) { return this.grid.findIndex((row) => String(row[0]) === id) + 1; }
  }

  class MockSpreadsheet {
    constructor(id = api.IZI_SYNC_CONFIG.spreadsheetId) {
      this.id = id;
      this.name = "IZI PARK Product Owner Workbook";
      this.sheets = Object.fromEntries(
        Object.entries(api.IZI_SYNC_DATA).map(([name, spec]) => [name, new MockSheet(name, spec.headers)]),
      );
    }
    getId() { return this.id; }
    getName() { return this.name; }
    getSheetByName(name) { return this.sheets[name] ?? null; }
    copy(name) {
      events.push(`backup:${name}`);
      return { getUrl: () => "https://docs.google.com/spreadsheets/d/mock-backup/edit" };
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
const expectedCounts = Object.fromEntries(
  Object.entries(api.IZI_SYNC_DATA).map(([name, spec]) => [name, spec.rows.length]),
);
assert.deepEqual(expectedCounts, {
  "Casos de uso": 12,
  Flujos: 24,
  Requerimientos: 82,
  Matriz: 118,
});

const preview = api.previewPrototypeWorkbookSync();
assert.equal(preview.totalChanges, 236);
assert.equal(events.some((event) => event.startsWith("backup:")), false);
assert.equal(events.some((event) => event.startsWith("write:")), false);

harness.spreadsheet = new MockSpreadsheet("wrong-spreadsheet");
assertThrowsMessage(() => api.previewPrototypeWorkbookSync(), "Wrong spreadsheet");

harness.spreadsheet = new MockSpreadsheet();
delete harness.spreadsheet.sheets.Matriz;
assertThrowsMessage(() => api.previewPrototypeWorkbookSync(), "Missing required sheet: Matriz");

harness.spreadsheet = new MockSpreadsheet();
harness.spreadsheet.sheets.Flujos.grid[4][0] = "Wrong_Header";
assertThrowsMessage(() => api.previewPrototypeWorkbookSync(), "Unexpected header in Flujos");

harness.spreadsheet = new MockSpreadsheet();
const casesSheet = harness.spreadsheet.sheets["Casos de uso"];
casesSheet.grid[6][0] = "DUPLICATE-001";
casesSheet.grid[7][0] = "DUPLICATE-001";
assertThrowsMessage(() => api.previewPrototypeWorkbookSync(), "Duplicate existing ID");

harness.spreadsheet = new MockSpreadsheet();
events.length = 0;
const firstSync = api.syncPrototypeWorkbook();
assert.equal(firstSync.totalChanges, 236);
const backupIndex = events.findIndex((event) => event.startsWith("backup:"));
const writeIndex = events.findIndex((event) => event.startsWith("write:"));
assert.ok(backupIndex >= 0 && writeIndex > backupIndex, "backup must happen before the first workbook write");
assert.ok(events.includes("lock"));
assert.ok(events.includes("flush"));
assert.equal(events.at(-1), "unlock");
assert.equal(harness.spreadsheet.sheets["Casos de uso"].grid[5][0], "USER-SAMPLE-Casos de uso");
for (const [sheetName, spec] of Object.entries(api.IZI_SYNC_DATA)) {
  for (const row of spec.rows) {
    assert.ok(harness.spreadsheet.sheets[sheetName].rowForId(row[0]) >= 7, `${row[0]} must be upserted`);
  }
}

events.length = 0;
const secondSync = api.syncPrototypeWorkbook();
assert.equal(secondSync.totalChanges, 0);
assert.equal(events.some((event) => event.startsWith("backup:")), false);
assert.equal(events.some((event) => event.startsWith("write:")), false);

const managedId = api.IZI_SYNC_DATA["Casos de uso"].rows[0][0];
const managedRow = harness.spreadsheet.sheets["Casos de uso"].rowForId(managedId);
harness.spreadsheet.sheets["Casos de uso"].setValue(managedRow, 2, "User changed managed prototype title");
events.length = 0;
const updateSync = api.syncPrototypeWorkbook();
assert.equal(updateSync.totalChanges, 1);
assert.ok(events.find((event) => event.startsWith("backup:")));
assert.equal(harness.spreadsheet.sheets["Casos de uso"].valueAt(managedRow, 2), api.IZI_SYNC_DATA["Casos de uso"].rows[0][1]);

harness.spreadsheet = new MockSpreadsheet();
ui.response = ui.Button.NO;
events.length = 0;
const cancelled = api.syncPrototypeWorkbook();
assert.equal(cancelled.cancelled, true);
assert.equal(events.some((event) => event.startsWith("backup:")), false);
assert.equal(events.some((event) => event.startsWith("write:")), false);

console.log("google_sheet_sync_tests=PASS");
