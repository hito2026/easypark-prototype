/**
 * IZI PARK prototype → simplified Product Owner use-case sheet.
 * Generated from templates/easypark-srs-reference.md.
 * Install this file in the target Google Sheet through Extensions → Apps Script.
 * The human Google account running it owns every permission grant and mutation.
 */

const IZI_SYNC_CONFIG = {"spreadsheetId":"15ioouFFFV9f3EumAZQHTu8mIBm5XjpzX1zrvR-2QDio","simpleSheetName":"Casos de uso simplificado","legacySheetNames":["Casos de uso","Flujos","Requerimientos","Matriz"],"headerRow":1,"dataStartRow":2,"source":"templates/easypark-srs-reference.md"};
const IZI_SYNC_DATA = {
  "Casos de uso simplificado": {
    headers: ["Nro y nombre de caso","Objetivo","Alcance","Precondición","Post condición","Flujo principal","Flujo alternativo","Criterio de aceptación","Requerimientos","Actores principales","Estado"],
    rows: [
      ["UC-ONB-001 — Alta guiada de prueba","Validar alta guiada de prueba dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el prototipo está abierto y el usuario elige onboarding.","se guardan preferencias ficticias en easyparkMockOnboarding y, si corresponde, cuenta ficticia en easyparkMockAccount.","El actor recorre alta guiada de prueba mediante las referencias documentadas: ONB-WELCOME-01, ONB-ROLE-01, ONB-VERIFY-01, ONB-PROFILE-01, ONB-SETUP-01, ONB-PREFS-01, ONB-DONE-01..","código distinto de 2468 bloquea avance; rol anfitrión o proveedor deriva a flujo anfitrión.","Dado UC-ONB-001, cuando se recorren sus refs (ONB-WELCOME-01, ONB-ROLE-01, ONB-VERIFY-01, ONB-PROFILE-01, ONB-SETUP-01, ONB-PREFS-01, ONB-DONE-01.), entonces se observa: se guardan preferencias ficticias en easyparkMockOnboarding y, si corresponde, cuenta ficticia en easyparkMockAccount.","FR-ONB-001, FR-ONB-002, FR-ONB-003, BR-DATA-001, NFR-ACC-001","Usuario nuevo","Prototipo implementado"],
      ["UC-ACC-001 — Configurar cuenta segura ficticia","Validar configurar cuenta segura ficticia dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario entra a cuenta segura.","perfil, vehículo, pago de prueba, cobro ficticio, datos comerciales de muestra y preferencias quedan visibles y se guardan localmente.","El actor recorre configurar cuenta segura ficticia mediante las referencias documentadas: ACCOUNT-HOME-01, ACCOUNT-PROFILE-01, ACCOUNT-VEHICLE-01, ACCOUNT-PAYMENT-01, ACCOUNT-PAYOUT-01, ACCOUNT-BUSINESS-01, ACCOUNT-PREFS-01, ACCOUNT-SUMMARY-01..","no hay campos para PAN, CVV, CBU, CVU, IBAN completo, CUIT real, credenciales ni secretos.","Dado UC-ACC-001, cuando se recorren sus refs (ACCOUNT-HOME-01, ACCOUNT-PROFILE-01, ACCOUNT-VEHICLE-01, ACCOUNT-PAYMENT-01, ACCOUNT-PAYOUT-01, ACCOUNT-BUSINESS-01, ACCOUNT-PREFS-01, ACCOUNT-SUMMARY-01.), entonces se observa: perfil, vehículo, pago de prueba, cobro ficticio, datos comerciales de muestra y preferencias quedan visibles y se guardan localmente.","FR-ACC-001, FR-ACC-002, FR-ACC-003, FR-ACC-004, BR-DATA-001, NFR-SEC-001, NFR-PRIV-001, NFR-IZI-PRIV-001","Usuario","Prototipo implementado"],
      ["UC-DRV-001 — Buscar cochera privada reservable","Validar buscar cochera privada reservable dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","existe una opción reservable y publicada; el usuario usa datos ficticios y un medio de pago de prueba.","se crea recibo local con reservationId, receiptId, total, marca de pago y últimos cuatro dígitos ficticios en easyparkLastMockReceipt; la sesión privada se visualiza con timeline y pase no escaneable.","elegir búsqueda privada, ingresar destino, configurar hora, duración, vehículo y filtros, seleccionar pin o tarjeta, revisar detalle, elegir tarjeta de prueba, confirmar, ver recibo, pase y sesión.","DRV-PAY-FAIL-01 bloquea confirmación; DRV-HOLD-EXP-01 vence la reserva temporal; filtros pueden dejar resultados vacíos; el botón de resultados queda oculto hasta selección explícita.","Dado UC-DRV-001, cuando se recorren sus refs (DRV-CHOICE-01, DRV-START-01, DRV-TIME-01, DRV-RESULTS-01, DRV-MAP-SHEET-01, DRV-DETAIL-01, DRV-PAYMENT-01, DRV-CONFIRM-01, DRV-RECEIPT-01, PARKING-PASS-01, DRV-SESSION-01.), entonces se observa: se crea recibo local con reservationId, receiptId, total, marca de pago y últimos cuatro dígitos ficticios en easyparkLastMockReceipt; la sesión privada se visualiza con timeline y pase no escaneable.","FR-HOME-001, FR-HOME-002, FR-HOME-003, FR-DRV-001, FR-DRV-002, FR-DRV-003, FR-DRV-004, FR-PAY-001, FR-PAY-002, FR-PASS-001, FR-DRV-006, FR-IZI-001, FR-IZI-002, FR-IZI-ARR-001, FR-IZI-HOLD-001, FR-IZI-CHECKOUT-001, FR-IZI-RECEIPT-001, FR-IZI-SESSION-001, FR-IZI-SESSION-002, FR-IZI-SESSION-003, FR-IZI-SESSION-004, BR-FLOW-001, BR-CHECKOUT-001, BR-DATA-001, BR-PRICE-001, BR-IDEMP-001, NFR-SEC-001, NFR-USE-001, NFR-REL-001, NFR-IZI-LOCAL-001, NFR-IZI-PRIV-001, NFR-IZI-ACC-001","Conductor","Prototipo implementado"],
      ["UC-DRV-002 — Consultar orientación sin checkout","Validar consultar orientación sin checkout dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario selecciona parking tradicional o guía de calle no reservable.","el prototipo vuelve a resultados y no muestra pago, recibo, pase ni sesión privada.","elegir opción de orientación, revisar distancia, precio visible, caveats y servicios, intentar continuar.","Copilot también puede derivar a orientación y debe explicar que no permite pagar ni reservar.","Dado UC-DRV-002, cuando se recorren sus refs (DRV-RESULTS-01, DRV-RESULT-CARD-01, DRV-DETAIL-01, AI-HANDOFF-01.), entonces se observa: el prototipo vuelve a resultados y no muestra pago, recibo, pase ni sesión privada.","FR-DRV-005, BR-FLOW-001, BR-CHECKOUT-001, BR-DATA-001, BR-PRICE-001","Conductor","Prototipo implementado"],
      ["UC-URB-001 — Iniciar sesión urbana simulada","Validar iniciar sesión urbana simulada dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario elige zona urbana o parking común y usa patente ficticia.","easyparkMockSession guarda zona, tipo, patente ficticia, minutos, máximo, horario, importe ficticio, recibo y controlId; easyparkMockHistory recibe una entrada al finalizar.","elegir zona, confirmar vehículo, seleccionar minutos dentro del máximo, iniciar sesión, extender o terminar.","extensión se bloquea si excede máximo; terminar dos veces indica que la sesión ya finalizó; no hay comunicación municipal.","Dado UC-URB-001, cuando se recorren sus refs (DRV-ZONE-01, DRV-VEHICLE-01, DRV-DURATION-01, DRV-LIMIT-01, SESSION-ACTIVE-01, SESSION-EXTEND-01, SESSION-END-01.), entonces se observa: easyparkMockSession guarda zona, tipo, patente ficticia, minutos, máximo, horario, importe ficticio, recibo y controlId; easyparkMockHistory recibe una entrada al finalizar.","FR-URB-001, FR-URB-002, FR-URB-003, FR-URB-004, BR-FLOW-001, BR-DATA-001, BR-URB-001, BR-IDEMP-001, NFR-REL-001","Conductor","Prototipo implementado"],
      ["UC-ACT-001 — Revisar actividad y recibos","Validar revisar actividad y recibos dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","puede existir sesión, historial o recibo local.","se muestran sesión actual, historial local, último recibo y una acción de descarga simulada que no crea archivo real.","El actor recorre revisar actividad y recibos mediante las referencias documentadas: ACTIVITY-HOME-01, ACTIVITY-HISTORY-01, ACTIVITY-RECEIPT-01..","sin historial se muestra estado vacío; recibo puede mostrar sin recibo.","Dado UC-ACT-001, cuando se recorren sus refs (ACTIVITY-HOME-01, ACTIVITY-HISTORY-01, ACTIVITY-RECEIPT-01.), entonces se observa: se muestran sesión actual, historial local, último recibo y una acción de descarga simulada que no crea archivo real.","FR-ACT-001, FR-ACT-002, FR-IZI-ACTIVITY-001, BR-DATA-001","Conductor","Prototipo implementado"],
      ["UC-AI-001 — Usar Copilot asesor","Validar usar copilot asesor dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario abre Copilot y escribe, dicta si el navegador lo soporta o usa chips.","Copilot ordena estrategias determinísticas y deriva a detalle solo si la opción es reservable y publicada.","ingresar plan, deducir preferencias editables, ver itinerario y estrategias, elegir handoff a detalle.","si la opción no es reservable, agrega explicación al chat y no cobra ni reserva; si voz no existe, ofrece texto; el audio no se almacena por código del prototipo.","Dado UC-AI-001, cuando se recorren sus refs (AI-ENTRY-01, AI-CHAT-01, AI-VOICE-01, AI-CONTEXT-01, AI-REFINE-01, AI-ITINERARY-01, AI-STRATEGY-01, AI-EXPLAIN-01, AI-HANDOFF-01.), entonces se observa: Copilot ordena estrategias determinísticas y deriva a detalle solo si la opción es reservable y publicada.","FR-AI-001, FR-AI-002, FR-AI-003, FR-AI-004, FR-AI-005, FR-IZI-COPILOT-001, BR-FLOW-001, BR-CHECKOUT-001, BR-DATA-001, BR-AI-001, NFR-USE-001, NFR-COMPAT-001, NFR-IZI-PRIV-001","Conductor","Prototipo implementado"],
      ["UC-PROV-001 — Publicar cochera ficticia","Validar publicar cochera ficticia dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario elige ofrecer cochera y usa datos ficticios.","se normaliza la publicación y se agrega a easyparkProviderSpaces con estado, servicios, acceso, tarifa, pago, ícono local, distancia simulada y reservable:true.","El actor recorre publicar cochera ficticia mediante las referencias documentadas: PROV-LOCATION-01, PROV-SPACE-01, PROV-AMENITIES-01, PROV-ACCESS-01, PROV-AVAIL-01, PROV-TARIFF-01, PROV-PAYMENT-01, PROV-REVIEW-01..","estados Pending review y On site se traducen al español; campos ausentes reciben valores seguros de demo; la normalización allowlistea el ícono visual. Los renderizados escapan texto de usuario o localStorage para evitar inyección visual.","Dado UC-PROV-001, cuando se recorren sus refs (PROV-LOCATION-01, PROV-SPACE-01, PROV-AMENITIES-01, PROV-ACCESS-01, PROV-AVAIL-01, PROV-TARIFF-01, PROV-PAYMENT-01, PROV-REVIEW-01.), entonces se observa: se normaliza la publicación y se agrega a easyparkProviderSpaces con estado, servicios, acceso, tarifa, pago, ícono local, distancia simulada y reservable:true.","FR-PROV-001, FR-PROV-002, FR-PROV-003, BR-DATA-001, BR-PRICE-001, NFR-PRIV-001","Anfitrión","Prototipo implementado"],
      ["UC-OPS-001 — Revisar operación simulada","Validar revisar operación simulada dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","pueden existir publicaciones o incidentes locales.","se muestran conteos, cocheras pendientes, incidentes y liquidaciones manuales sin backend.","El actor recorre revisar operación simulada mediante las referencias documentadas: OPS-HOME-01, OPS-PENDING-01, OPS-INCIDENTS-01, OPS-TRIAGE-01, OPS-RESOLUTION-01, OPS-SETTLEMENTS-01..","sin datos se muestran estados vacíos; triage o resolución actualizan incidente local sin soporte real.","Dado UC-OPS-001, cuando se recorren sus refs (OPS-HOME-01, OPS-PENDING-01, OPS-INCIDENTS-01, OPS-TRIAGE-01, OPS-RESOLUTION-01, OPS-SETTLEMENTS-01.), entonces se observa: se muestran conteos, cocheras pendientes, incidentes y liquidaciones manuales sin backend.","FR-OPS-001, FR-OPS-002, BR-DATA-001, NFR-OBS-001","Operación","Prototipo implementado"],
      ["UC-EXP-001 — Entrada Express simulada","Validar entrada express simulada dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario abre Express y usa patente ficticia.","se crea recibo RC-X... y una entrada de historial al guardar; guardar dos veces no duplica actividad.","ver sitio compatible ficticio, aceptar consentimiento o usar fallback manual, registrar entrada, sesión, salida y guardar recibo.","si no acepta consentimiento, el fallback manual avanza a entrada simulada; no hay cámara, OCR, barrera ni operador.","Dado UC-EXP-001, cuando se recorren sus refs (EXPRESS-HOME-01, EXPRESS-CONSENT-01, EXPRESS-ENTRY-01, EXPRESS-SESSION-01, EXPRESS-EXIT-01.), entonces se observa: se crea recibo RC-X... y una entrada de historial al guardar; guardar dos veces no duplica actividad.","FR-EXP-001, FR-EXP-002, FR-EXP-003, BR-FLOW-001, BR-DATA-001, BR-IDEMP-001, NFR-SEC-001, NFR-PRIV-001, NFR-REL-001","Conductor","Prototipo implementado"],
      ["UC-INC-001 — Reportar y recuperar incidente","Validar reportar y recuperar incidente dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario abre incidente desde menú, pase o sesión.","easyparkIncident contiene id, tipo, recuperación, severidad, acción y estado; una propuesta de alternativa limpia filtros y selección sin reservar.","elegir tipo, elegir recuperación, guardar incidente local, ver resultado y opcionalmente triage o resolución en operación.","cargo incorrecto no reembolsa; problema de seguridad solo marca severidad alta; acciones son idempotentes y simuladas.","Dado UC-INC-001, cuando se recorren sus refs (INCIDENT-HOME-01, INCIDENT-TYPE-01, INCIDENT-RECOVERY-01, INCIDENT-RESULT-01, OPS-TRIAGE-01, OPS-RESOLUTION-01.), entonces se observa: easyparkIncident contiene id, tipo, recuperación, severidad, acción y estado; una propuesta de alternativa limpia filtros y selección sin reservar.","FR-INC-001, FR-INC-002, BR-FLOW-001, BR-DATA-001, BR-IDEMP-001, BR-INC-001, NFR-REL-001","Conductor y operación","Prototipo implementado"],
      ["UC-DOC-001 — Consultar ayuda, SRS y Buzz","Validar consultar ayuda, srs y buzz dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario abre ayuda o flujo de documentación.","ve propósito, roles, flujos, límites de seguridad, feedback con refs, acceso Buzz y descargas de plantilla SRS.","El actor recorre consultar ayuda, srs y buzz mediante las referencias documentadas: HELP-HOME-01, HELP-PROJECT-01, HELP-ROLES-01, HELP-FLOWS-01, HELP-SAFETY-01, HELP-FEEDBACK-01, BUZZ-ACCESS-01, CREATOR-SRS-01, SRS-DOWNLOAD-MD-01, SRS-DOWNLOAD-PDF-01, MEDIA-CREDITS-01..","Buzz es coordinación de workspace y feedback; los pedidos de acceso se enrutan por el contacto existente de WhatsApp con Alejandro y solo deben incluir npub... o clave pública hexadecimal de 64 caracteres, nunca nsec, claves privadas, contraseñas, códigos de recuperación, seeds, tokens ni API keys.","Dado UC-DOC-001, cuando se recorren sus refs (HELP-HOME-01, HELP-PROJECT-01, HELP-ROLES-01, HELP-FLOWS-01, HELP-SAFETY-01, HELP-FEEDBACK-01, BUZZ-ACCESS-01, CREATOR-SRS-01, SRS-DOWNLOAD-MD-01, SRS-DOWNLOAD-PDF-01, MEDIA-CREDITS-01.), entonces se observa: ve propósito, roles, flujos, límites de seguridad, feedback con refs, acceso Buzz y descargas de plantilla SRS.","FR-DOC-001, FR-DOC-002, FR-DOC-003, BR-DATA-001, BR-MEDIA-001, BR-BUZZ-001, BR-SRS-001, NFR-SEC-001, NFR-ACC-001, NFR-PERF-001, NFR-MAINT-001, NFR-LOC-001, NFR-DOC-001, NFR-DOC-002, NFR-IZI-LOCAL-001, NFR-IZI-REF-001","Tester o creador","Prototipo implementado"]
    ]
  }
};

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
