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
      ["UC-ONB-001 — Alta guiada de prueba","Validar alta guiada de prueba dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el prototipo está abierto y el usuario elige onboarding.","se guardan preferencias ficticias en easyparkMockOnboarding y, si corresponde, cuenta ficticia en easyparkMockAccount.","Abre la bienvenida del alta guiada (ONB-WELCOME-01); elige su rol (ONB-ROLE-01); valida el código de demostración (ONB-VERIFY-01); completa el perfil (ONB-PROFILE-01); configura sus datos de uso y preferencias (ONB-SETUP-01, ONB-PREFS-01); llega a la confirmación y al inicio correspondiente (ONB-DONE-01)","Si el código de demostración es incorrecto, el avance se bloquea (ONB-VERIFY-01); si elige el rol de anfitrión o proveedor, continúa hacia el formulario para ofrecer una cochera (ONB-ROLE-01, ONB-DONE-01)","Dado UC-ONB-001, cuando se recorren sus refs (ONB-WELCOME-01, ONB-ROLE-01, ONB-VERIFY-01, ONB-PROFILE-01, ONB-SETUP-01, ONB-PREFS-01, ONB-DONE-01.), entonces se observa: se guardan preferencias ficticias en easyparkMockOnboarding y, si corresponde, cuenta ficticia en easyparkMockAccount.","FR-ONB-001, FR-ONB-002, FR-ONB-003, BR-DATA-001, NFR-ACC-001","Usuario nuevo","Prototipo implementado"],
      ["UC-ACC-001 — Configurar cuenta segura ficticia","Validar configurar cuenta segura ficticia dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario entra a cuenta segura.","perfil, vehículo, pago de prueba, cobro ficticio, datos comerciales de muestra y preferencias quedan visibles y se guardan localmente.","Abre Cuenta segura (ACCOUNT-HOME-01); revisa o completa el perfil (ACCOUNT-PROFILE-01); configura un vehículo ficticio (ACCOUNT-VEHICLE-01); elige un pago de prueba (ACCOUNT-PAYMENT-01); revisa el cobro ficticio (ACCOUNT-PAYOUT-01); completa datos comerciales de muestra (ACCOUNT-BUSINESS-01); guarda sus preferencias (ACCOUNT-PREFS-01, ACCOUNT-SUMMARY-01)","El pago de prueba no solicita números completos de tarjeta ni credenciales (ACCOUNT-PAYMENT-01); el cobro ficticio no solicita números completos de cuenta bancaria (ACCOUNT-PAYOUT-01); los datos comerciales no solicitan identificación fiscal real ni secretos (ACCOUNT-BUSINESS-01)","Dado UC-ACC-001, cuando se recorren sus refs (ACCOUNT-HOME-01, ACCOUNT-PROFILE-01, ACCOUNT-VEHICLE-01, ACCOUNT-PAYMENT-01, ACCOUNT-PAYOUT-01, ACCOUNT-BUSINESS-01, ACCOUNT-PREFS-01, ACCOUNT-SUMMARY-01.), entonces se observa: perfil, vehículo, pago de prueba, cobro ficticio, datos comerciales de muestra y preferencias quedan visibles y se guardan localmente.","FR-ACC-001, FR-ACC-002, FR-ACC-003, FR-ACC-004, BR-DATA-001, NFR-SEC-001, NFR-PRIV-001, NFR-IZI-PRIV-001","Usuario","Prototipo implementado"],
      ["UC-DRV-001 — Buscar cochera privada reservable","Validar buscar cochera privada reservable dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","existe una opción reservable y publicada; el usuario usa datos ficticios y un medio de pago de prueba.","se crea recibo local con reservationId, receiptId, total, marca de pago y últimos cuatro dígitos ficticios en easyparkLastMockReceipt; la sesión privada se visualiza con timeline y pase no escaneable.","Elige la búsqueda de cochera privada (DRV-CHOICE-01); ingresa un destino y configura horario, duración, vehículo y filtros (DRV-START-01, DRV-TIME-01); compara opciones en el mapa y las tarjetas (DRV-RESULTS-01, DRV-MAP-SHEET-01); revisa el detalle de una cochera reservable (DRV-DETAIL-01); elige una tarjeta de prueba (DRV-PAYMENT-01); confirma la operación simulada (DRV-CONFIRM-01); consulta el recibo y el pase (DRV-RECEIPT-01, PARKING-PASS-01); revisa la sesión privada (DRV-SESSION-01)","Si el pago simulado falla, no se confirma la reserva (DRV-PAY-FAIL-01); si vence la reserva temporal, debe volver a elegir una opción (DRV-HOLD-EXP-01); si los filtros no encuentran coincidencias, la lista de resultados queda vacía (DRV-TIME-01, DRV-RESULTS-01)","Dado UC-DRV-001, cuando se recorren sus refs (DRV-CHOICE-01, DRV-START-01, DRV-TIME-01, DRV-RESULTS-01, DRV-MAP-SHEET-01, DRV-DETAIL-01, DRV-PAYMENT-01, DRV-CONFIRM-01, DRV-RECEIPT-01, PARKING-PASS-01, DRV-SESSION-01.), entonces se observa: se crea recibo local con reservationId, receiptId, total, marca de pago y últimos cuatro dígitos ficticios en easyparkLastMockReceipt; la sesión privada se visualiza con timeline y pase no escaneable.","FR-HOME-001, FR-HOME-002, FR-HOME-003, FR-DRV-001, FR-DRV-002, FR-DRV-003, FR-DRV-004, FR-PAY-001, FR-PAY-002, FR-PASS-001, FR-DRV-006, FR-IZI-001, FR-IZI-002, FR-IZI-ARR-001, FR-IZI-HOLD-001, FR-IZI-CHECKOUT-001, FR-IZI-RECEIPT-001, FR-IZI-SESSION-001, FR-IZI-SESSION-002, FR-IZI-SESSION-003, FR-IZI-SESSION-004, BR-FLOW-001, BR-CHECKOUT-001, BR-DATA-001, BR-PRICE-001, BR-IDEMP-001, NFR-SEC-001, NFR-USE-001, NFR-REL-001, NFR-IZI-LOCAL-001, NFR-IZI-PRIV-001, NFR-IZI-ACC-001","Conductor","Prototipo implementado"],
      ["UC-DRV-002 — Consultar orientación sin checkout","Validar consultar orientación sin checkout dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario selecciona parking tradicional o guía de calle no reservable.","el prototipo vuelve a resultados y no muestra pago, recibo, pase ni sesión privada.","Compara opciones no reservables en los resultados (DRV-RESULTS-01); elige una tarjeta de parking tradicional o guía de calle (DRV-RESULT-CARD-01); revisa distancia, precio orientativo, condiciones y servicios en el detalle (DRV-DETAIL-01); intenta continuar y vuelve a los resultados sin checkout (DRV-DETAIL-01, DRV-RESULTS-01)","Si llega desde Copilot, el asistente explica que la opción solo brinda orientación (AI-HANDOFF-01); no se muestran pago, recibo, pase ni sesión privada (DRV-DETAIL-01, DRV-RESULTS-01)","Dado UC-DRV-002, cuando se recorren sus refs (DRV-RESULTS-01, DRV-RESULT-CARD-01, DRV-DETAIL-01, AI-HANDOFF-01.), entonces se observa: el prototipo vuelve a resultados y no muestra pago, recibo, pase ni sesión privada.","FR-DRV-005, BR-FLOW-001, BR-CHECKOUT-001, BR-DATA-001, BR-PRICE-001","Conductor","Prototipo implementado"],
      ["UC-URB-001 — Iniciar sesión urbana simulada","Validar iniciar sesión urbana simulada dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario elige zona urbana o parking común y usa patente ficticia.","easyparkMockSession guarda zona, tipo, patente ficticia, minutos, máximo, horario, importe ficticio, recibo y controlId; easyparkMockHistory recibe una entrada al finalizar.","Elige una zona urbana o parking común (DRV-ZONE-01); confirma un vehículo ficticio (DRV-VEHICLE-01); selecciona una duración dentro del máximo (DRV-DURATION-01, DRV-LIMIT-01); inicia la sesión urbana (SESSION-ACTIVE-01); extiende o termina la sesión (SESSION-EXTEND-01, SESSION-END-01)","Si la extensión supera el máximo permitido, queda bloqueada (DRV-LIMIT-01, SESSION-EXTEND-01); si intenta terminar una sesión ya finalizada, el prototipo lo informa sin duplicar la actividad (SESSION-END-01)","Dado UC-URB-001, cuando se recorren sus refs (DRV-ZONE-01, DRV-VEHICLE-01, DRV-DURATION-01, DRV-LIMIT-01, SESSION-ACTIVE-01, SESSION-EXTEND-01, SESSION-END-01.), entonces se observa: easyparkMockSession guarda zona, tipo, patente ficticia, minutos, máximo, horario, importe ficticio, recibo y controlId; easyparkMockHistory recibe una entrada al finalizar.","FR-URB-001, FR-URB-002, FR-URB-003, FR-URB-004, BR-FLOW-001, BR-DATA-001, BR-URB-001, BR-IDEMP-001, NFR-REL-001","Conductor","Prototipo implementado"],
      ["UC-ACT-001 — Revisar actividad y recibos","Validar revisar actividad y recibos dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","puede existir sesión, historial o recibo local.","se muestran sesión actual, historial local, último recibo y una acción de descarga simulada que no crea archivo real.","Abre el resumen de Actividad (ACTIVITY-HOME-01); revisa la sesión actual y el historial (ACTIVITY-HISTORY-01); abre el último recibo disponible (ACTIVITY-RECEIPT-01); solicita una descarga simulada desde el detalle (ACTIVITY-RECEIPT-01)","Si todavía no hay actividad, el historial muestra un estado vacío (ACTIVITY-HISTORY-01); si una entrada no tiene recibo, el detalle lo indica sin crear un comprobante real (ACTIVITY-RECEIPT-01)","Dado UC-ACT-001, cuando se recorren sus refs (ACTIVITY-HOME-01, ACTIVITY-HISTORY-01, ACTIVITY-RECEIPT-01.), entonces se observa: se muestran sesión actual, historial local, último recibo y una acción de descarga simulada que no crea archivo real.","FR-ACT-001, FR-ACT-002, FR-IZI-ACTIVITY-001, BR-DATA-001","Conductor","Prototipo implementado"],
      ["UC-AI-001 — Usar Copilot asesor","Validar usar copilot asesor dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario abre Copilot y escribe, dicta si el navegador lo soporta o usa chips.","Copilot ordena estrategias determinísticas y deriva a detalle solo si la opción es reservable y publicada.","Abre Copilot (AI-ENTRY-01); describe su plan por texto, sugerencias o voz opcional (AI-CHAT-01, AI-VOICE-01); revisa el contexto y las preferencias detectadas (AI-CONTEXT-01, AI-REFINE-01); compara el itinerario propuesto (AI-ITINERARY-01); evalúa estrategias explicadas (AI-STRATEGY-01, AI-EXPLAIN-01); elige una opción para abrir su detalle (AI-HANDOFF-01)","Si la opción no es reservable, Copilot explica el límite y no cobra ni reserva (AI-EXPLAIN-01, AI-HANDOFF-01); si el navegador no admite voz, mantiene disponible la entrada por texto (AI-VOICE-01, AI-CHAT-01)","Dado UC-AI-001, cuando se recorren sus refs (AI-ENTRY-01, AI-CHAT-01, AI-VOICE-01, AI-CONTEXT-01, AI-REFINE-01, AI-ITINERARY-01, AI-STRATEGY-01, AI-EXPLAIN-01, AI-HANDOFF-01.), entonces se observa: Copilot ordena estrategias determinísticas y deriva a detalle solo si la opción es reservable y publicada.","FR-AI-001, FR-AI-002, FR-AI-003, FR-AI-004, FR-AI-005, FR-IZI-COPILOT-001, BR-FLOW-001, BR-CHECKOUT-001, BR-DATA-001, BR-AI-001, NFR-USE-001, NFR-COMPAT-001, NFR-IZI-PRIV-001","Conductor","Prototipo implementado"],
      ["UC-PROV-001 — Publicar cochera ficticia","Validar publicar cochera ficticia dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario elige ofrecer cochera y usa datos ficticios.","se normaliza la publicación y se agrega a easyparkProviderSpaces con estado, servicios, acceso, tarifa, pago, ícono local, distancia simulada y reservable:true.","Completa una ubicación ficticia (PROV-LOCATION-01); describe la cochera y sus servicios (PROV-SPACE-01, PROV-AMENITIES-01); define las reglas de acceso (PROV-ACCESS-01); configura la disponibilidad (PROV-AVAIL-01); establece una tarifa ficticia (PROV-TARIFF-01); revisa el cobro simulado (PROV-PAYMENT-01); revisa y guarda la publicación como publicada o pendiente (PROV-REVIEW-01)","Si faltan datos opcionales, el formulario aplica valores seguros de demostración (PROV-SPACE-01, PROV-AMENITIES-01); los estados se presentan en español (PROV-REVIEW-01); el contenido ingresado se muestra como texto sin ejecutar código (PROV-LOCATION-01, PROV-ACCESS-01)","Dado UC-PROV-001, cuando se recorren sus refs (PROV-LOCATION-01, PROV-SPACE-01, PROV-AMENITIES-01, PROV-ACCESS-01, PROV-AVAIL-01, PROV-TARIFF-01, PROV-PAYMENT-01, PROV-REVIEW-01.), entonces se observa: se normaliza la publicación y se agrega a easyparkProviderSpaces con estado, servicios, acceso, tarifa, pago, ícono local, distancia simulada y reservable:true.","FR-PROV-001, FR-PROV-002, FR-PROV-003, BR-DATA-001, BR-PRICE-001, NFR-PRIV-001","Anfitrión","Prototipo implementado"],
      ["UC-OPS-001 — Revisar operación simulada","Validar revisar operación simulada dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","pueden existir publicaciones o incidentes locales.","se muestran conteos, cocheras pendientes, incidentes y liquidaciones manuales sin backend.","Abre el panel de operación y revisa sus conteos (OPS-HOME-01); consulta cocheras pendientes (OPS-PENDING-01); revisa incidentes y puede clasificarlos o resolverlos (OPS-INCIDENTS-01, OPS-TRIAGE-01, OPS-RESOLUTION-01); consulta liquidaciones simuladas (OPS-SETTLEMENTS-01)","Cuando no hay publicaciones o incidentes, las secciones muestran estados vacíos (OPS-PENDING-01, OPS-INCIDENTS-01); las acciones actualizan solo la demostración local y no contactan soporte ni sistemas de pago reales (OPS-RESOLUTION-01, OPS-SETTLEMENTS-01)","Dado UC-OPS-001, cuando se recorren sus refs (OPS-HOME-01, OPS-PENDING-01, OPS-INCIDENTS-01, OPS-TRIAGE-01, OPS-RESOLUTION-01, OPS-SETTLEMENTS-01.), entonces se observa: se muestran conteos, cocheras pendientes, incidentes y liquidaciones manuales sin backend.","FR-OPS-001, FR-OPS-002, BR-DATA-001, NFR-OBS-001","Operación","Prototipo implementado"],
      ["UC-EXP-001 — Entrada Express simulada","Validar entrada express simulada dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario abre Express y usa patente ficticia.","se crea recibo RC-X... y una entrada de historial al guardar; guardar dos veces no duplica actividad.","Abre Express y revisa un sitio compatible ficticio (EXPRESS-HOME-01); acepta el consentimiento o elige el ingreso manual (EXPRESS-CONSENT-01); registra la entrada simulada (EXPRESS-ENTRY-01); revisa la sesión (EXPRESS-SESSION-01); registra la salida y guarda el recibo en Actividad (EXPRESS-EXIT-01)","Si no acepta el consentimiento, continúa por el ingreso manual simulado (EXPRESS-CONSENT-01, EXPRESS-ENTRY-01); si guarda el recibo nuevamente, no duplica la actividad y no intervienen cámaras, barreras ni operadores reales (EXPRESS-EXIT-01)","Dado UC-EXP-001, cuando se recorren sus refs (EXPRESS-HOME-01, EXPRESS-CONSENT-01, EXPRESS-ENTRY-01, EXPRESS-SESSION-01, EXPRESS-EXIT-01.), entonces se observa: se crea recibo RC-X... y una entrada de historial al guardar; guardar dos veces no duplica actividad.","FR-EXP-001, FR-EXP-002, FR-EXP-003, BR-FLOW-001, BR-DATA-001, BR-IDEMP-001, NFR-SEC-001, NFR-PRIV-001, NFR-REL-001","Conductor","Prototipo implementado"],
      ["UC-INC-001 — Reportar y recuperar incidente","Validar reportar y recuperar incidente dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario abre incidente desde menú, pase o sesión.","easyparkIncident contiene id, tipo, recuperación, severidad, acción y estado; una propuesta de alternativa limpia filtros y selección sin reservar.","Abre la recuperación desde el menú, el pase o una sesión (INCIDENT-HOME-01); elige el tipo de incidente (INCIDENT-TYPE-01); selecciona una alternativa de recuperación (INCIDENT-RECOVERY-01); guarda el reporte y consulta el resultado (INCIDENT-RESULT-01); Operación puede clasificarlo o resolverlo después (OPS-TRIAGE-01, OPS-RESOLUTION-01)","Un cargo incorrecto no genera un reembolso real (INCIDENT-RECOVERY-01); un problema de seguridad solo eleva la severidad del reporte (INCIDENT-TYPE-01); repetir una acción no duplica efectos (INCIDENT-RESULT-01)","Dado UC-INC-001, cuando se recorren sus refs (INCIDENT-HOME-01, INCIDENT-TYPE-01, INCIDENT-RECOVERY-01, INCIDENT-RESULT-01, OPS-TRIAGE-01, OPS-RESOLUTION-01.), entonces se observa: easyparkIncident contiene id, tipo, recuperación, severidad, acción y estado; una propuesta de alternativa limpia filtros y selección sin reservar.","FR-INC-001, FR-INC-002, BR-FLOW-001, BR-DATA-001, BR-IDEMP-001, BR-INC-001, NFR-REL-001","Conductor y operación","Prototipo implementado"],
      ["UC-DOC-001 — Consultar ayuda, SRS y Buzz","Validar consultar ayuda, srs y buzz dentro de los límites locales y ficticios del prototipo.","Incluye el comportamiento observable documentado y sus límites de simulación. Excluye integraciones, decisiones y efectos productivos reales.","el usuario abre ayuda o flujo de documentación.","ve propósito, roles, flujos, límites de seguridad, feedback con refs, acceso Buzz y descargas de plantilla SRS.","Abre Ayuda y revisa el propósito del prototipo (HELP-HOME-01, HELP-PROJECT-01); consulta roles y recorridos (HELP-ROLES-01, HELP-FLOWS-01); revisa límites de seguridad (HELP-SAFETY-01); usa el formato de feedback (HELP-FEEDBACK-01); consulta los recursos y descargas del SRS (CREATOR-SRS-01, SRS-DOWNLOAD-MD-01, SRS-DOWNLOAD-PDF-01); revisa las instrucciones de acceso a Buzz y los créditos multimedia (BUZZ-ACCESS-01, MEDIA-CREDITS-01)","Si necesita acceso a Buzz, comparte únicamente su clave pública por el canal acordado (BUZZ-ACCESS-01); las claves privadas, contraseñas, códigos de recuperación, semillas y tokens nunca se solicitan (HELP-SAFETY-01, BUZZ-ACCESS-01)","Dado UC-DOC-001, cuando se recorren sus refs (HELP-HOME-01, HELP-PROJECT-01, HELP-ROLES-01, HELP-FLOWS-01, HELP-SAFETY-01, HELP-FEEDBACK-01, BUZZ-ACCESS-01, CREATOR-SRS-01, SRS-DOWNLOAD-MD-01, SRS-DOWNLOAD-PDF-01, MEDIA-CREDITS-01.), entonces se observa: ve propósito, roles, flujos, límites de seguridad, feedback con refs, acceso Buzz y descargas de plantilla SRS.","FR-DOC-001, FR-DOC-002, FR-DOC-003, BR-DATA-001, BR-MEDIA-001, BR-BUZZ-001, BR-SRS-001, NFR-SEC-001, NFR-ACC-001, NFR-PERF-001, NFR-MAINT-001, NFR-LOC-001, NFR-DOC-001, NFR-DOC-002, NFR-IZI-LOCAL-001, NFR-IZI-REF-001","Tester o creador","Prototipo implementado"]
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
