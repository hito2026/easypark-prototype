/**
 * IZI PARK prototype → simplified Product Owner workbook.
 * Generated from templates/easypark-srs-reference.md.
 * Install this file in the target Google Sheet through Extensions → Apps Script.
 * The human Google account running it owns every permission grant and mutation.
 */

const IZI_SYNC_CONFIG = {"spreadsheetId":"15ioouFFFV9f3EumAZQHTu8mIBm5XjpzX1zrvR-2QDio","simplifiedSheetNames":["Casos de uso simplificado","Requerimientos simplificado","Relaciones"],"legacySheetNames":["Casos de uso","Flujos","Requerimientos","Matriz"],"headerRow":1,"dataStartRow":2,"source":"templates/easypark-srs-reference.md"};
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
  },
  "Requerimientos simplificado": {
    headers: ["ID","Tipo","Requerimiento","Criterio de aceptación","Prioridad","Estado","Responsable","Notas"],
    rows: [
      ["FR-HOME-001","RF","El inicio debe permitir elegir flujos principales con refs visibles.","Aceptación: los botones data-flow abren el wizard correspondiente. Evidencia: APP-HOME-01, REF-GUIDE-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-HOME-002","RF","El campo de destino del inicio debe iniciar búsqueda al hacer clic o presionar Enter.","Aceptación: homeSearch y Enter ejecutan runHomeSearch. Evidencia: HOME-DESTINATION-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-HOME-003","RF","El usuario debe poder ocultar o mostrar etiquetas rojas sin eliminar refs del DOM.","Aceptación: toggleRefs alterna refs-off. Evidencia: REF-GUIDE-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-ONB-001","RF","El alta debe mostrar que no crea cuenta real ni envía SMS.","Aceptación: copy visible informa código fijo y ausencia de SMS. Evidencia: ONB-WELCOME-01, ONB-VERIFY-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-ONB-002","RF","La verificación simulada debe aceptar solo el código 2468.","Aceptación: código distinto muestra error y no avanza. Evidencia: ONB-VERIFY-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-ONB-003","RF","El alta debe guardar rol, nombre, vehículo y preferencias ficticias localmente.","Aceptación: saveOnboarding escribe easyparkMockOnboarding y cuenta. Evidencia: ONB-DONE-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-ACC-001","RF","Cuenta debe advertir que solo acepta datos ficticios.","Aceptación: pantalla inicial enumera datos prohibidos. Evidencia: ACCOUNT-HOME-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-ACC-002","RF","Pago del conductor debe limitarse a tarjetas fijas de prueba.","Aceptación: solo se elige marca y últimos cuatro ficticios. Evidencia: ACCOUNT-PAYMENT-01, easyparkMockPaymentMethod.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-ACC-003","RF","Cobro anfitrión debe usar cuentas ficticias y no pedir CBU, CVU, IBAN ni cuenta completa.","Aceptación: opciones son presets de muestra. Evidencia: ACCOUNT-PAYOUT-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-ACC-004","RF","Guardar cuenta debe persistir solo metadatos ficticios en easyparkMockAccount.","Aceptación: saveAccount escribe objeto local. Evidencia: ACCOUNT-SUMMARY-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-DRV-001","RF","La búsqueda manual debe empezar por destino, no por ubicación actual.","Aceptación: DRV-START-01 pide destino y no solicita GPS. Evidencia: DRV-START-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-DRV-002","RF","Resultados deben combinar semillas y cocheras del anfitrión normalizadas.","Aceptación: options usa seed y easyparkProviderSpaces. Evidencia: DRV-RESULTS-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-DRV-003","RF","Los filtros deben cubrir ranking, precio, cercanía, cubierto, accesible, EV, compatibilidad y acceso.","Aceptación: al cambiar filtros se altera la lista y puede mostrar estado vacío. Evidencia: DRV-TIME-01, DRV-SERVICES-01, DRV-FILTER-STATE-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-DRV-004","RF","El mapa debe ser simulado y la selección debe ocurrir solo por botones explícitos.","Aceptación: pines y tarjetas tienen data-pick; el detalle usa marcador no interactivo. Evidencia: DRV-MAP-SHEET-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-DRV-005","RF","Parking tradicional y guía de calle no deben acceder a checkout.","Aceptación: DRV-DETAIL-01 vuelve a resultados si no es reservable y publicado. Evidencia: DRV-DETAIL-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-PAY-001","RF","El pago debe aceptar solo tarjetas ficticias y bloquear confirmación ante pago rechazado o hold vencido.","Aceptación: paymentBlocked impide emitir recibo. Evidencia: DRV-PAYMENT-01, DRV-PAY-FAIL-01, DRV-HOLD-EXP-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-PAY-002","RF","Confirmar reserva privada válida debe emitir recibo ficticio local.","Aceptación: issueReceipt genera reservationId, receiptId, total, marca, last4 y status. Evidencia: DRV-CONFIRM-01, DRV-RECEIPT-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-PASS-001","RF","El recibo debe mostrar pase demo, acceso, QR no escaneable y reglas ficticias.","Aceptación: sección de pase incluye PARKING-PASS-01, acceso, QR y reglas. Evidencia: PASS-ACCESS-01, PASS-QR-01, PASS-RULES-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-DRV-006","RF","La sesión privada debe mostrar timeline, llegada simulada, extensión y finalización visual.","Aceptación: timeline avanza y botones actualizan texto local. Evidencia: DRV-STATUS-TIMELINE-01, DRV-SESSION-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-URB-001","RF","La zona urbana debe estar separada de la reserva privada y usar zona y patente ficticias.","Aceptación: el flujo urbano no entra a checkout privado. Evidencia: DRV-ZONE-01, DRV-VEHICLE-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-URB-002","RF","Duración urbana no debe superar el máximo ficticio de la zona.","Aceptación: rango usa max y extendUrban bloquea exceso. Evidencia: DRV-LIMIT-01, SESSION-EXTEND-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-URB-003","RF","Iniciar sesión urbana debe guardar sesión e historial local cuando finaliza.","Aceptación: startUrbanSession, saveSession y endUrban usan easyparkMockSession y easyparkMockHistory. Evidencia: SESSION-ACTIVE-01, SESSION-END-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-URB-004","RF","Terminar o extender sesión debe ser idempotente en estado final.","Aceptación: si no está activa se informa que ya finalizó o no está activa. Evidencia: SESSION-END-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-ACT-001","RF","Actividad debe mostrar sesión actual, historial y último recibo.","Aceptación: vistas leen state.session, state.history y último recibo. Evidencia: ACTIVITY-HOME-01, ACTIVITY-HISTORY-01, ACTIVITY-RECEIPT-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-ACT-002","RF","Descargar recibo en actividad debe ser simulación sin archivo real.","Aceptación: botón solo cambia mensaje de estado. Evidencia: ACTIVITY-RECEIPT-01.","Baja","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-AI-001","RF","Copilot debe ser local, determinístico y asesor, sin reservar ni cobrar.","Aceptación: copy y reglas indican que solo recomienda. Evidencia: AI-ENTRY-01, AI-CHAT-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-AI-002","RF","Copilot debe permitir texto, chips, preferencias editables y demo.","Aceptación: sendAi, data-chip y data-context actualizan estrategias. Evidencia: AI-REFINE-01, AI-CONTEXT-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-AI-003","RF","Voz debe ser opcional y con alternativa textual.","Aceptación: si Speech API falta se muestra mensaje y el input sigue disponible. Evidencia: AI-VOICE-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-AI-004","RF","Handoff a reserva solo debe ocurrir para opción reservable publicada.","Aceptación: handoff deriva a DRV-DETAIL-01 solo si cumple condición. Evidencia: AI-HANDOFF-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-AI-005","RF","Explicaciones deben incluir ventajas y límites.","Aceptación: strategyCard muestra why y risk. Evidencia: AI-EXPLAIN-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-PROV-001","RF","Anfitrión debe capturar ubicación, espacio, servicios, acceso, disponibilidad, tarifa y pago ficticio.","Aceptación: capture recoge campos del flujo. Evidencia: PROV-LOCATION-01 a PROV-REVIEW-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-PROV-002","RF","Guardar cochera debe normalizar estado, pago, vehículos, defaults y visuales allowlisteados; la salida debe escapar textos derivados de usuario o localStorage.","Aceptación: la función de normalización traduce y completa defaults, y las rutas de render usan escape de texto. Evidencia: PROV-AMENITIES-01, PROV-ACCESS-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-PROV-003","RF","Bloqueos y precios pico deben ser descriptivos y no aplicarse automáticamente.","Aceptación: copy visible lo declara. Evidencia: PROV-ACCESS-01, DRV-PROGRESSIVE-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-OPS-001","RF","Operación debe mostrar pendientes, incidentes y liquidaciones manuales desde datos locales.","Aceptación: panel usa spaces, state.incident y no backend. Evidencia: OPS-HOME-01, OPS-PENDING-01, OPS-INCIDENTS-01, OPS-SETTLEMENTS-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-OPS-002","RF","Triage y resolución deben actualizar incidente local sin prometer soporte real.","Aceptación: botones modifican status en easyparkIncident. Evidencia: OPS-TRIAGE-01, OPS-RESOLUTION-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-EXP-001","RF","Express debe separar consentimiento ficticio, entrada, sesión, salida y actividad.","Aceptación: flujo tiene cinco pantallas y no usa cámara real. Evidencia: EXPRESS-HOME-01 a EXPRESS-EXIT-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-EXP-002","RF","Express debe ofrecer fallback manual si no hay consentimiento.","Aceptación: expressFallback avanza sin consentimiento. Evidencia: EXPRESS-CONSENT-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-EXP-003","RF","Guardar recibo Express debe ser idempotente.","Aceptación: saveExpress evita duplicar si saved es verdadero. Evidencia: EXPRESS-EXIT-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-INC-001","RF","Incidentes deben capturar tipo, recuperación, severidad, acción y estado local.","Aceptación: prepareIncident escribe easyparkIncident. Evidencia: INCIDENT-TYPE-01, INCIDENT-RECOVERY-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-INC-002","RF","Recuperación de incidente no debe completar reembolso, cargo ni nueva reserva.","Aceptación: resultado declara ausencia de efectos reales. Evidencia: INCIDENT-RESULT-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-DOC-001","RF","Ayuda debe documentar roles, flujos, límites, refs y feedback.","Aceptación: secciones de ayuda visibles cubren esos temas. Evidencia: HELP-HOME-01 a HELP-FEEDBACK-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-DOC-002","RF","Buzz debe tratarse como coordinación humana de workspace y feedback, no como integración ni canal de secretos; el onboarding de acceso debe pedir que la clave pública se envíe a Alejandro por el contacto existente de WhatsApp.","Aceptación: la guía acepta solo npub... o clave pública hexadecimal de 64 caracteres y prohíbe nsec, claves privadas, contraseñas, códigos de recuperación, seeds, tokens y API keys, sin publicar teléfono. Evidencia: BUZZ-ACCESS-01, HELP-SAFETY-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-DOC-003","RF","La plantilla SRS debe descargarse como Markdown y PDF sin alterar la fuente.","Aceptación: refs de descarga existen en ayuda. Evidencia: CREATOR-SRS-01, SRS-DOWNLOAD-MD-01, SRS-DOWNLOAD-PDF-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-SEC-001","RNF","El prototipo debe advertir que no se ingresen tarjetas, claves, documentos, patentes, ubicaciones ni secretos reales.","Aceptación: copy visible en cuenta, pago y ayuda. Evidencia: HELP-SAFETY-01, ACCOUNT-HOME-01, DRV-PAYMENT-01.","Alta","Actual","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-PRIV-001","RNF","El prototipo debe limitar persistencia a metadatos ficticios locales y declarar que localStorage no es productivo.","Aceptación: sección 7 documenta claves y límites. Evidencia: easyparkMockAccount, easyparkMockHistory.","Alta","Actual","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-ACC-001","RNF","El prototipo debe conservar landmarks, foco visible, textos alternativos y movimiento reducido donde existe evidencia.","Aceptación: revisión estática de HTML y CSS. Evidencia: help.html, index.html, prefers-reduced-motion.","Alta","Actual","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-USE-001","RNF","La experiencia debe priorizar destino primero, mapa simulado, acción dominante y divulgación progresiva.","Aceptación: pantallas reflejan patrón. Evidencia: HOME-DESTINATION-01, DRV-MAP-SHEET-01, DRV-PROGRESSIVE-01.","Media","Actual","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-PERF-001","RNF","La demo estática debe evitar dependencias remotas propias para flujos principales.","Aceptación: revisión de código sin mapas, pagos, LLM, SMS, cámaras ni municipio en runtime. Evidencia: index.html, help.html.","Media","Actual","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-REL-001","RNF","Acciones económicas o de recuperación simuladas deben ser idempotentes o bloqueadas si corresponde.","Aceptación: Express no duplica guardado, incidente reusa id y pagos bloqueados no emiten recibo. Evidencia: EXPRESS-EXIT-01, INCIDENT-RESULT-01, DRV-PAY-FAIL-01.","Alta","Actual","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-COMPAT-001","RNF","Voz debe ser opcional y contar con alternativa textual.","Aceptación: si Speech API falta se muestra fallback textual. Evidencia: AI-VOICE-01.","Media","Actual","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-MAINT-001","RNF","Refs visibles, IDs de requisitos y Markdown fuente deben mantenerse estables.","Aceptación: no renumerar IDs y conservar refs usadas por feedback. Evidencia: REF-GUIDE-01, este SRS.","Alta","Actual","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-OBS-001","RNF","La observabilidad del prototipo se limita a estado local visible y refs.","Aceptación: no se declara logging remoto ni auditoría real. Evidencia: OPS-HOME-01, HELP-FEEDBACK-01.","Media","Actual","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-LOC-001","RNF","El contenido visible debe estar en español profesional y mantener límites de simulación.","Aceptación: revisión textual de README, Help y SRS. Evidencia: README.md, help.html.","Media","Actual","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-DOC-001","RNF","Licencias y fuentes de assets locales deben documentarse.","Aceptación: atribución OpenMoji con hashes disponible. Evidencia: assets/openmoji/ATTRIBUTION.md, MEDIA-CREDITS-01.","Alta","Actual","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-DOC-002","RNF","El PDF de SRS debe derivarse desde Markdown con generador determinístico.","Aceptación: comando local genera PDF con metadatos esperados. Evidencia: scripts/generate-srs-pdf.py.","Alta","Actual","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-IZI-001","RF","El producto visible debe presentarse como IZI PARK sin romper identidad técnica easypark-prototype.","Aceptación: README, Help y este SRS declaran alias visible/legado; URLs y paths easypark-prototype permanecen. Evidencia: README.md, help.html, templates/easypark-srs-reference.md.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-IZI-002","RF","Las páginas 6–17 del PDF autorizado deben tener contraparte observable o límite explícito.","Aceptación: tabla 13.1 mapea páginas a refs; refs existen en index.html. Evidencia: REF-PDF-IZI-001, IZI-MAP-HOME-01 a IZI-SESSION-COPILOT-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-IZI-ARR-001","RF","La llegada debe diferenciar orientación de parking/tradicional y casa reservable.","Aceptación: parking/tradicional muestra copy no transaccional; casa publicada permite hold. Evidencia: IZI-PARKING-ARRIVAL-01, IZI-HOUSE-ARRIVAL-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-IZI-HOLD-001","RF","Una casa publicada reservable debe crear un hold local de 5 minutos idempotente por selección.","Aceptación: beginHold valida isReservableHouse, reutiliza hold activo y escribe iziParkMockHold; expirado/cancelado muestra 00:00. Evidencia: IZI-HOLD-01, IZI-HOLD-TIMER-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-IZI-CHECKOUT-001","RF","El checkout debe ser seguro, preset-only y sin campos ni SDK de pago real.","Aceptación: no hay PAN, CVV, vencimiento, nombre, banco, SDK ni red; solo tarjetas ficticias. Evidencia: IZI-MOCK-CHECKOUT-01, DRV-PAYMENT-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-IZI-RECEIPT-001","RF","Emitir recibo requiere hold activo válido y debe ser idempotente.","Aceptación: issueReceipt() devuelve falso sin holdValidForPayment() y true si ya existe recibo para el mismo hold. Evidencia: DRV-CONFIRM-01, DRV-RECEIPT-01, easyparkLastMockReceipt.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-IZI-SESSION-001","RF","La sesión privada debe iniciar solo desde recibo válido de casa publicada y separarse de la sesión urbana.","Aceptación: startPrivateSession() exige reservationId, receiptId e isReservableHouse; persiste en iziParkMockPrivateSession y no pisa easyparkMockSession. Evidencia: IZI-SESSION-MAP-01, DRV-SESSION-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-IZI-SESSION-002","RF","El countdown privado debe sobrevivir recarga, limpiar intervalos al salir y mostrar 00:00 al expirar/finalizar.","Aceptación: safePrivateSession, clearPrivateTimer, expirePrivateIfNeeded y estado inactivo actualizan mapa/detalle. Evidencia: IZI-SESSION-TIMER-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-IZI-SESSION-003","RF","Extender sesión privada debe requerir sesión activa y no debe afirmar cargo/pago.","Aceptación: extendPrivateSession() valida privateActive y copy visible dice que no hay cargo/pago. Evidencia: IZI-ACTIVE-SESSION-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-IZI-SESSION-004","RF","Finalizar sesión privada debe requerir sesión activa y agregar exactamente una fila de historial por reserva.","Aceptación: finalizePrivateSession() no muta si está inactiva/expirada/finalizada y usa historyKey para evitar duplicados. Evidencia: easyparkMockHistory, ACTIVITY-HISTORY-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-IZI-COPILOT-001","RF","Los compositores IZI de sesión deben ser asesoría local y no mutar sesión, pago, reembolso ni reserva.","Aceptación: privateCopilotReply solo cambia estado textual y dirige a botones. Evidencia: IZI-MAP-COPILOT-01, IZI-SESSION-COPILOT-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["FR-IZI-ACTIVITY-001","RF","Actividad debe reflejar estado privado IZI e historial sin romper urbano/Express.","Aceptación: ACTIVITY-HOME-01 lee state.privateSession; historial conserva entradas urbanas/Express y private keyed rows. Evidencia: ACTIVITY-HOME-01, ACTIVITY-HISTORY-01.","Media","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-IZI-LOCAL-001","RNF","La UI derivada del PDF debe usar solo runtime local y no cargar el PDF ni assets remotos.","Aceptación: README/Help/SRS declaran que el PDF no se distribuye ni se carga; runtime mantiene recursos locales. Evidencia: REF-PDF-IZI-001, MEDIA-CREDITS-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-IZI-PRIV-001","RNF","El prototipo no debe solicitar ni guardar GPS, PAN, CVV, vencimiento, credenciales, cámara real ni audio.","Aceptación: copy y formularios no contienen esos campos; voz es opcional del navegador y no se guarda audio. Evidencia: HELP-SAFETY-01, AI-VOICE-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-IZI-ACC-001","RNF","Countdown y estado activo/inactivo deben tener texto accesible además del anillo visual.","Aceptación: estado visible y role=status existen para hold/sesión; refs no distorsionan anillos. Evidencia: IZI-HOLD-TIMER-01, IZI-SESSION-TIMER-01.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["NFR-IZI-REF-001","RNF","Cada data-ref debe contener un único ID estable.","Aceptación: verificación estática reportó single-ID refs. Evidencia: checks T002/T003/T004.","Alta","Implementado en prototipo","Producto","Importado desde requisito implementado/actual; no implica aprobación productiva."],
      ["BR-FLOW-001","RN","Reserva privada, zona urbana, guía, Copilot, Express e incidente son flujos separados.","Probar navegación y ausencia de checkout cruzado.","Alta","Implementado en prototipo","Producto","Importado desde regla implementada; no implica aprobación productiva."],
      ["BR-CHECKOUT-001","RN","Solo una cochera privada con reservable:true y estado Publicado puede pasar a pago.","Seleccionar parking tradicional o guía y confirmar retorno a resultados.","Alta","Implementado en prototipo","Producto","Importado desde regla implementada; no implica aprobación productiva."],
      ["BR-DATA-001","RN","Todo dato de demo debe ser ficticio y local.","Revisar copys de cuenta, pago, patente, SMS, cámara y soporte.","Alta","Implementado en prototipo","Producto","Importado desde regla implementada; no implica aprobación productiva."],
      ["BR-AI-001","RN","Copilot es asesor: no reserva, no cobra, no emite recibos y no altera verdad transaccional.","Usar AI-HANDOFF-01 con opción no reservable.","Alta","Implementado en prototipo","Producto","Importado desde regla implementada; no implica aprobación productiva."],
      ["BR-PRICE-001","RN","Precio, disponibilidad, distancia, ranking, pico y servicios son caveats de demo, no disponibilidad viva.","Ver DRV-PROGRESSIVE-01 y copy de detalle.","Media","Implementado en prototipo","Producto","Importado desde regla implementada; no implica aprobación productiva."],
      ["BR-URB-001","RN","Zona urbana no puede superar el máximo ficticio de la zona.","Intentar extensión por encima de max.","Media","Implementado en prototipo","Producto","Importado desde regla implementada; no implica aprobación productiva."],
      ["BR-IDEMP-001","RN","Incidentes, fin de sesión y guardado Express deben evitar efectos económicos duplicados.","Repetir acciones y verificar mensajes idempotentes.","Alta","Implementado en prototipo","Producto","Importado desde regla implementada; no implica aprobación productiva."],
      ["BR-INC-001","RN","Incidente puede proponer alternativa, solicitar revisión o escalar, pero nunca ejecutar reembolso real.","Ver INCIDENT-RESULT-01.","Media","Implementado en prototipo","Producto","Importado desde regla implementada; no implica aprobación productiva."],
      ["BR-MEDIA-001","RN","OpenMoji debe permanecer local, atribuido y con licencia documentada.","Revisar MEDIA-CREDITS-01 y assets/openmoji/ATTRIBUTION.md.","Media","Implementado en prototipo","Producto","Importado desde regla implementada; no implica aprobación productiva."],
      ["BR-BUZZ-001","RN","Buzz puede usarse para refs y contexto de feedback; las solicitudes de acceso se envían a Alejandro por el WhatsApp ya existente con solo npub... o clave pública hexadecimal de 64 caracteres, nunca nsec, claves privadas, contraseñas, códigos de recuperación, seeds, tokens ni API keys.","Revisar BUZZ-ACCESS-01 y ayuda de seguridad, sin agregar número telefónico.","Media","Implementado en prototipo","Producto","Importado desde regla implementada; no implica aprobación productiva."],
      ["BR-SRS-001","RN","Markdown es fuente de verdad y el PDF se deriva con el generador.","Ejecutar scripts/generate-srs-pdf.py con fuente explícita.","Media","Implementado en prototipo","Producto","Importado desde regla implementada; no implica aprobación productiva."]
    ]
  },
  "Relaciones": {
    headers: ["ID relación","ID requerimiento","Caso de uso (ID — Nombre)","Tipo de relación","Cobertura","Notas"],
    rows: [
      ["REL-FR-ONB-001-UC-ONB-001","FR-ONB-001","UC-ONB-001 — Alta guiada de prueba","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-ONB-002-UC-ONB-001","FR-ONB-002","UC-ONB-001 — Alta guiada de prueba","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-ONB-003-UC-ONB-001","FR-ONB-003","UC-ONB-001 — Alta guiada de prueba","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-DATA-001-UC-ONB-001","BR-DATA-001","UC-ONB-001 — Alta guiada de prueba","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-ACC-001-UC-ONB-001","NFR-ACC-001","UC-ONB-001 — Alta guiada de prueba","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-ACC-001-UC-ACC-001","FR-ACC-001","UC-ACC-001 — Configurar cuenta segura ficticia","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-ACC-002-UC-ACC-001","FR-ACC-002","UC-ACC-001 — Configurar cuenta segura ficticia","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-ACC-003-UC-ACC-001","FR-ACC-003","UC-ACC-001 — Configurar cuenta segura ficticia","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-ACC-004-UC-ACC-001","FR-ACC-004","UC-ACC-001 — Configurar cuenta segura ficticia","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-DATA-001-UC-ACC-001","BR-DATA-001","UC-ACC-001 — Configurar cuenta segura ficticia","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-SEC-001-UC-ACC-001","NFR-SEC-001","UC-ACC-001 — Configurar cuenta segura ficticia","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-PRIV-001-UC-ACC-001","NFR-PRIV-001","UC-ACC-001 — Configurar cuenta segura ficticia","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-IZI-PRIV-001-UC-ACC-001","NFR-IZI-PRIV-001","UC-ACC-001 — Configurar cuenta segura ficticia","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-HOME-001-UC-DRV-001","FR-HOME-001","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-HOME-002-UC-DRV-001","FR-HOME-002","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-HOME-003-UC-DRV-001","FR-HOME-003","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-DRV-001-UC-DRV-001","FR-DRV-001","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-DRV-002-UC-DRV-001","FR-DRV-002","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-DRV-003-UC-DRV-001","FR-DRV-003","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-DRV-004-UC-DRV-001","FR-DRV-004","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-PAY-001-UC-DRV-001","FR-PAY-001","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-PAY-002-UC-DRV-001","FR-PAY-002","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-PASS-001-UC-DRV-001","FR-PASS-001","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-DRV-006-UC-DRV-001","FR-DRV-006","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-IZI-001-UC-DRV-001","FR-IZI-001","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-IZI-002-UC-DRV-001","FR-IZI-002","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-IZI-ARR-001-UC-DRV-001","FR-IZI-ARR-001","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-IZI-HOLD-001-UC-DRV-001","FR-IZI-HOLD-001","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-IZI-CHECKOUT-001-UC-DRV-001","FR-IZI-CHECKOUT-001","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-IZI-RECEIPT-001-UC-DRV-001","FR-IZI-RECEIPT-001","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-IZI-SESSION-001-UC-DRV-001","FR-IZI-SESSION-001","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-IZI-SESSION-002-UC-DRV-001","FR-IZI-SESSION-002","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-IZI-SESSION-003-UC-DRV-001","FR-IZI-SESSION-003","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-IZI-SESSION-004-UC-DRV-001","FR-IZI-SESSION-004","UC-DRV-001 — Buscar cochera privada reservable","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-FLOW-001-UC-DRV-001","BR-FLOW-001","UC-DRV-001 — Buscar cochera privada reservable","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-CHECKOUT-001-UC-DRV-001","BR-CHECKOUT-001","UC-DRV-001 — Buscar cochera privada reservable","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-DATA-001-UC-DRV-001","BR-DATA-001","UC-DRV-001 — Buscar cochera privada reservable","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-PRICE-001-UC-DRV-001","BR-PRICE-001","UC-DRV-001 — Buscar cochera privada reservable","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-IDEMP-001-UC-DRV-001","BR-IDEMP-001","UC-DRV-001 — Buscar cochera privada reservable","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-SEC-001-UC-DRV-001","NFR-SEC-001","UC-DRV-001 — Buscar cochera privada reservable","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-USE-001-UC-DRV-001","NFR-USE-001","UC-DRV-001 — Buscar cochera privada reservable","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-REL-001-UC-DRV-001","NFR-REL-001","UC-DRV-001 — Buscar cochera privada reservable","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-IZI-LOCAL-001-UC-DRV-001","NFR-IZI-LOCAL-001","UC-DRV-001 — Buscar cochera privada reservable","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-IZI-PRIV-001-UC-DRV-001","NFR-IZI-PRIV-001","UC-DRV-001 — Buscar cochera privada reservable","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-IZI-ACC-001-UC-DRV-001","NFR-IZI-ACC-001","UC-DRV-001 — Buscar cochera privada reservable","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-DRV-005-UC-DRV-002","FR-DRV-005","UC-DRV-002 — Consultar orientación sin checkout","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-FLOW-001-UC-DRV-002","BR-FLOW-001","UC-DRV-002 — Consultar orientación sin checkout","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-CHECKOUT-001-UC-DRV-002","BR-CHECKOUT-001","UC-DRV-002 — Consultar orientación sin checkout","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-DATA-001-UC-DRV-002","BR-DATA-001","UC-DRV-002 — Consultar orientación sin checkout","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-PRICE-001-UC-DRV-002","BR-PRICE-001","UC-DRV-002 — Consultar orientación sin checkout","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-URB-001-UC-URB-001","FR-URB-001","UC-URB-001 — Iniciar sesión urbana simulada","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-URB-002-UC-URB-001","FR-URB-002","UC-URB-001 — Iniciar sesión urbana simulada","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-URB-003-UC-URB-001","FR-URB-003","UC-URB-001 — Iniciar sesión urbana simulada","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-URB-004-UC-URB-001","FR-URB-004","UC-URB-001 — Iniciar sesión urbana simulada","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-FLOW-001-UC-URB-001","BR-FLOW-001","UC-URB-001 — Iniciar sesión urbana simulada","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-DATA-001-UC-URB-001","BR-DATA-001","UC-URB-001 — Iniciar sesión urbana simulada","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-URB-001-UC-URB-001","BR-URB-001","UC-URB-001 — Iniciar sesión urbana simulada","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-IDEMP-001-UC-URB-001","BR-IDEMP-001","UC-URB-001 — Iniciar sesión urbana simulada","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-REL-001-UC-URB-001","NFR-REL-001","UC-URB-001 — Iniciar sesión urbana simulada","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-ACT-001-UC-ACT-001","FR-ACT-001","UC-ACT-001 — Revisar actividad y recibos","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-ACT-002-UC-ACT-001","FR-ACT-002","UC-ACT-001 — Revisar actividad y recibos","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-IZI-ACTIVITY-001-UC-ACT-001","FR-IZI-ACTIVITY-001","UC-ACT-001 — Revisar actividad y recibos","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-DATA-001-UC-ACT-001","BR-DATA-001","UC-ACT-001 — Revisar actividad y recibos","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-AI-001-UC-AI-001","FR-AI-001","UC-AI-001 — Usar Copilot asesor","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-AI-002-UC-AI-001","FR-AI-002","UC-AI-001 — Usar Copilot asesor","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-AI-003-UC-AI-001","FR-AI-003","UC-AI-001 — Usar Copilot asesor","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-AI-004-UC-AI-001","FR-AI-004","UC-AI-001 — Usar Copilot asesor","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-AI-005-UC-AI-001","FR-AI-005","UC-AI-001 — Usar Copilot asesor","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-IZI-COPILOT-001-UC-AI-001","FR-IZI-COPILOT-001","UC-AI-001 — Usar Copilot asesor","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-FLOW-001-UC-AI-001","BR-FLOW-001","UC-AI-001 — Usar Copilot asesor","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-CHECKOUT-001-UC-AI-001","BR-CHECKOUT-001","UC-AI-001 — Usar Copilot asesor","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-DATA-001-UC-AI-001","BR-DATA-001","UC-AI-001 — Usar Copilot asesor","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-AI-001-UC-AI-001","BR-AI-001","UC-AI-001 — Usar Copilot asesor","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-USE-001-UC-AI-001","NFR-USE-001","UC-AI-001 — Usar Copilot asesor","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-COMPAT-001-UC-AI-001","NFR-COMPAT-001","UC-AI-001 — Usar Copilot asesor","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-IZI-PRIV-001-UC-AI-001","NFR-IZI-PRIV-001","UC-AI-001 — Usar Copilot asesor","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-PROV-001-UC-PROV-001","FR-PROV-001","UC-PROV-001 — Publicar cochera ficticia","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-PROV-002-UC-PROV-001","FR-PROV-002","UC-PROV-001 — Publicar cochera ficticia","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-PROV-003-UC-PROV-001","FR-PROV-003","UC-PROV-001 — Publicar cochera ficticia","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-DATA-001-UC-PROV-001","BR-DATA-001","UC-PROV-001 — Publicar cochera ficticia","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-PRICE-001-UC-PROV-001","BR-PRICE-001","UC-PROV-001 — Publicar cochera ficticia","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-PRIV-001-UC-PROV-001","NFR-PRIV-001","UC-PROV-001 — Publicar cochera ficticia","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-OPS-001-UC-OPS-001","FR-OPS-001","UC-OPS-001 — Revisar operación simulada","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-OPS-002-UC-OPS-001","FR-OPS-002","UC-OPS-001 — Revisar operación simulada","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-DATA-001-UC-OPS-001","BR-DATA-001","UC-OPS-001 — Revisar operación simulada","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-OBS-001-UC-OPS-001","NFR-OBS-001","UC-OPS-001 — Revisar operación simulada","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-EXP-001-UC-EXP-001","FR-EXP-001","UC-EXP-001 — Entrada Express simulada","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-EXP-002-UC-EXP-001","FR-EXP-002","UC-EXP-001 — Entrada Express simulada","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-EXP-003-UC-EXP-001","FR-EXP-003","UC-EXP-001 — Entrada Express simulada","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-FLOW-001-UC-EXP-001","BR-FLOW-001","UC-EXP-001 — Entrada Express simulada","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-DATA-001-UC-EXP-001","BR-DATA-001","UC-EXP-001 — Entrada Express simulada","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-IDEMP-001-UC-EXP-001","BR-IDEMP-001","UC-EXP-001 — Entrada Express simulada","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-SEC-001-UC-EXP-001","NFR-SEC-001","UC-EXP-001 — Entrada Express simulada","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-PRIV-001-UC-EXP-001","NFR-PRIV-001","UC-EXP-001 — Entrada Express simulada","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-REL-001-UC-EXP-001","NFR-REL-001","UC-EXP-001 — Entrada Express simulada","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-INC-001-UC-INC-001","FR-INC-001","UC-INC-001 — Reportar y recuperar incidente","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-INC-002-UC-INC-001","FR-INC-002","UC-INC-001 — Reportar y recuperar incidente","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-FLOW-001-UC-INC-001","BR-FLOW-001","UC-INC-001 — Reportar y recuperar incidente","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-DATA-001-UC-INC-001","BR-DATA-001","UC-INC-001 — Reportar y recuperar incidente","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-IDEMP-001-UC-INC-001","BR-IDEMP-001","UC-INC-001 — Reportar y recuperar incidente","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-INC-001-UC-INC-001","BR-INC-001","UC-INC-001 — Reportar y recuperar incidente","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-REL-001-UC-INC-001","NFR-REL-001","UC-INC-001 — Reportar y recuperar incidente","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-DOC-001-UC-DOC-001","FR-DOC-001","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-DOC-002-UC-DOC-001","FR-DOC-002","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-FR-DOC-003-UC-DOC-001","FR-DOC-003","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Principal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-DATA-001-UC-DOC-001","BR-DATA-001","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-MEDIA-001-UC-DOC-001","BR-MEDIA-001","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-BUZZ-001-UC-DOC-001","BR-BUZZ-001","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-BR-SRS-001-UC-DOC-001","BR-SRS-001","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-SEC-001-UC-DOC-001","NFR-SEC-001","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-ACC-001-UC-DOC-001","NFR-ACC-001","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-PERF-001-UC-DOC-001","NFR-PERF-001","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-MAINT-001-UC-DOC-001","NFR-MAINT-001","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-LOC-001-UC-DOC-001","NFR-LOC-001","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-DOC-001-UC-DOC-001","NFR-DOC-001","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-DOC-002-UC-DOC-001","NFR-DOC-002","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-IZI-LOCAL-001-UC-DOC-001","NFR-IZI-LOCAL-001","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."],
      ["REL-NFR-IZI-REF-001-UC-DOC-001","NFR-IZI-REF-001","UC-DOC-001 — Consultar ayuda, SRS y Buzz","Transversal","Completa","Relación derivada del SRS implementado/actual; revisar si cambia el alcance."]
    ]
  }
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("IZI PARK")
    .addItem("Preview simplified workbook", "previewPrototypeWorkbookSync")
    .addItem("Sync simplified workbook", "syncPrototypeWorkbook")
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
    "Confirm simplified workbook sync",
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
    const backupName = spreadsheet.getName() + " — backup before simplified workbook sync — " + new Date().toISOString();
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
  IZI_SYNC_CONFIG.simplifiedSheetNames.forEach(function(sheetName) {
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (sheet) validateSimplifiedHeaders_(sheetName, sheet);
  });
}

function validateSimplifiedHeaders_(sheetName, sheet) {
  const expected = IZI_SYNC_DATA[sheetName].headers;
  const actual = sheet.getRange(IZI_SYNC_CONFIG.headerRow, 1, 1, expected.length).getValues()[0];
  expected.forEach(function(header, index) {
    if (String(actual[index]).trim() !== header) {
      throw new Error("Unexpected header in " + sheetName + " column " + (index + 1) + ": expected " + header);
    }
  });
}

function buildSyncPlan_(spreadsheet) {
  const plan = {
    sheets: {},
    hideLegacySheets: IZI_SYNC_CONFIG.legacySheetNames.filter(function(sheetName) {
      return !spreadsheet.getSheetByName(sheetName).isSheetHidden();
    }),
    totalChanges: 0,
  };

  IZI_SYNC_CONFIG.simplifiedSheetNames.forEach(function(sheetName) {
    const spec = IZI_SYNC_DATA[sheetName];
    const sheet = spreadsheet.getSheetByName(sheetName);
    const sheetPlan = {
      createSheet: !sheet,
      showSheet: Boolean(sheet && sheet.isSheetHidden()),
      changes: [],
      unchanged: [],
    };

    if (!sheet) {
      spec.rows.forEach(function(row, index) {
        sheetPlan.changes.push({
          kind: "add",
          id: managedId_(sheetName, row[0]),
          rowNumber: IZI_SYNC_CONFIG.dataStartRow + index,
          values: row,
        });
      });
    } else {
      validateSimplifiedHeaders_(sheetName, sheet);
      const available = sheet.getMaxRows() - IZI_SYNC_CONFIG.dataStartRow + 1;
      const values = sheet.getRange(IZI_SYNC_CONFIG.dataStartRow, 1, available, spec.headers.length).getValues();
      const rowById = {};
      const emptyRows = [];
      const managedIds = {};
      spec.rows.forEach(function(row) { managedIds[managedId_(sheetName, row[0])] = true; });
      values.forEach(function(row, offset) {
        const firstCell = String(row[0]).trim();
        const rowNumber = IZI_SYNC_CONFIG.dataStartRow + offset;
        if (!firstCell) {
          emptyRows.push(rowNumber);
          return;
        }
        const id = managedId_(sheetName, firstCell);
        if (!id || !managedIds[id]) return; // Preserve every row outside the generated dataset.
        if (rowById[id]) throw new Error("Duplicate managed ID in " + sheetName + ": " + id);
        rowById[id] = {rowNumber: rowNumber, values: row};
      });

      spec.rows.forEach(function(managedRow) {
        const id = managedId_(sheetName, managedRow[0]);
        const existing = rowById[id];
        if (existing) {
          if (rowsEqual_(existing.values.slice(0, managedRow.length), managedRow)) {
            sheetPlan.unchanged.push(id);
          } else {
            sheetPlan.changes.push({kind: "update", id: id, rowNumber: existing.rowNumber, values: managedRow});
          }
        } else {
          const rowNumber = emptyRows.shift();
          if (!rowNumber) throw new Error("No empty row remains in " + sheetName + ". Add empty rows before syncing.");
          sheetPlan.changes.push({kind: "add", id: id, rowNumber: rowNumber, values: managedRow});
        }
      });
    }

    plan.sheets[sheetName] = sheetPlan;
    plan.totalChanges += sheetPlan.changes.length + (sheetPlan.createSheet ? 1 : 0) + (sheetPlan.showSheet ? 1 : 0);
  });

  plan.totalChanges += plan.hideLegacySheets.length;
  return plan;
}

function applySyncPlan_(spreadsheet, plan) {
  IZI_SYNC_CONFIG.simplifiedSheetNames.forEach(function(sheetName) {
    const spec = IZI_SYNC_DATA[sheetName];
    const sheetPlan = plan.sheets[sheetName];
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (sheetPlan.createSheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      sheet.getRange(IZI_SYNC_CONFIG.headerRow, 1, 1, spec.headers.length)
        .setValues([spec.headers])
        .setFontWeight("bold")
        .setBackground("#8a3f00")
        .setFontColor("#ffffff");
      sheet.setFrozenRows(1);
      sheet.autoResizeColumns(1, spec.headers.length);
    }
    sheetPlan.changes.forEach(function(change) {
      sheet.getRange(change.rowNumber, 1, 1, change.values.length).setValues([change.values]);
    });
    if (sheetPlan.showSheet || sheetPlan.createSheet) sheet.showSheet();
  });
  plan.hideLegacySheets.forEach(function(sheetName) {
    spreadsheet.getSheetByName(sheetName).hideSheet();
  });
}

function caseId_(label) {
  const match = String(label || "").trim().match(/^(UC-[A-Z]+-\d{3})\s+—\s+.+/);
  return match ? match[1] : "";
}

function managedId_(sheetName, value) {
  if (sheetName === IZI_SYNC_CONFIG.simplifiedSheetNames[0]) return caseId_(value);
  return String(value || "").trim();
}

function rowsEqual_(left, right) {
  if (left.length !== right.length) return false;
  return left.every(function(value, index) {
    return String(value == null ? "" : value).trim() === String(right[index] == null ? "" : right[index]).trim();
  });
}

function formatPlan_(plan, completed) {
  const lines = [completed ? "Sync result:" : "Proposed changes:"];
  IZI_SYNC_CONFIG.simplifiedSheetNames.forEach(function(sheetName) {
    const sheetPlan = plan.sheets[sheetName];
    const adds = sheetPlan.changes.filter(function(change) { return change.kind === "add"; }).length;
    const updates = sheetPlan.changes.filter(function(change) { return change.kind === "update"; }).length;
    lines.push(sheetName + ": " + adds + " add, " + updates + " update, " + sheetPlan.unchanged.length +
      " unchanged; create " + (sheetPlan.createSheet ? "yes" : "no") +
      "; show " + (sheetPlan.showSheet ? "yes" : "no"));
  });
  lines.push("Hide legacy sheets: " + (plan.hideLegacySheets.length ? plan.hideLegacySheets.join(", ") : "none"));
  lines.push("Total changes: " + plan.totalChanges);
  return lines.join("\n");
}
