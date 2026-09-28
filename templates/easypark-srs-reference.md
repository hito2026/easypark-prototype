# SRS EasyPark — borrador completado de referencia

> **Estado legal y de uso**: este documento es un borrador completado de referencia para el prototipo EasyPark. No es una plantilla oficial de IEEE, no reproduce el texto de ningún estándar, no implica conformidad, certificación, aprobación regulatoria ni autorización productiva. La referencia histórica IEEE 830-1998 se cita solo como contexto y la página oficial indicada la identifica como reemplazada por ISO/IEC/IEEE 29148:2011. Mantener este aviso visible en toda copia, PDF derivado o versión publicada.

> **Instrucción de mantenimiento**: este Markdown es la fuente de verdad. Todo PDF debe generarse desde este archivo con `scripts/generate-srs-pdf.py`. No reemplazar etiquetas de estado por afirmaciones definitivas sin evidencia revisada. No inventar propietarios, aprobaciones, SLAs, jurisdicciones, integraciones, obligaciones legales ni métricas productivas.

## 0. Control del documento

| Campo | Valor |
| --- | --- |
| Proyecto | EasyPark prototype |
| Documento | SRS EasyPark — borrador completado de referencia |
| Código interno | SRS-EASYPARK-001 |
| Versión | 0.1.0 |
| Estado | Borrador de referencia en elaboración |
| Fecha | 2026-09-28 |
| Idioma | Español |
| Fuente Markdown | `templates/easypark-srs-reference.md` |
| PDF previsto | `templates/easypark-srs-reference.pdf` |
| Prototipo | `index.html` |
| Ayuda | `help.html` |
| Plantilla en blanco | `templates/srs-ieee-830-template.md` |
| Repositorio público | https://github.com/hito2026/easypark-prototype |
| URL pública del prototipo | https://hito2026.github.io/easypark-prototype/ |
| URL pública de ayuda | https://hito2026.github.io/easypark-prototype/help.html |
| Dueño del documento | TODO-GOV-001 definir rol o persona responsable |
| Aprobaciones | TODO-GOV-002 definir proceso, criterios y evidencia de aprobación |

### 0.1 Aviso de estatus y evidencia

Este documento mezcla hechos observables del prototipo con propuestas y decisiones pendientes. Cada afirmación material debe conservar una etiqueta de estado:

- `[PROTOTIPO IMPLEMENTADO]`: existe en los archivos actuales del prototipo o documentación local y puede verificarse por refs visibles o rutas del repositorio.
- `[REQUISITO PROPUESTO]`: describe intención futura o comportamiento deseable para un producto real; no debe leerse como ya implementado.
- `[DECISIÓN PENDIENTE]`: falta decisión de producto, ingeniería, legal, privacidad, operación, país, proveedor o negocio.
- `[FUERA DE ALCANCE ACTUAL]`: se registra explícitamente para evitar suposiciones o trabajo no autorizado.

### 0.2 Checklist de revisión y aprobación

- [ ] Producto revisó objetivos, alcance incluido y alcance excluido.
- [ ] Ingeniería revisó factibilidad, interfaces, datos y límites técnicos.
- [ ] QA revisó verificabilidad, estados de error y trazabilidad futura.
- [ ] Seguridad y privacidad revisaron datos sensibles, consentimiento y retención.
- [ ] Legal revisó país, términos, obligaciones regulatorias y uso de marcas.
- [ ] Operaciones revisó soporte, incidentes, liquidaciones y recuperación.
- [ ] Stakeholders aprobaron explícitamente la versión y evidencia asociada.

### 0.3 Historial de revisiones

| Versión | Fecha | Autoría | Cambio | Evidencia |
| --- | --- | --- | --- | --- |
| 0.1.0 | 2026-09-28 | Borrador asistido | Fundación hasta sección 3 | `odd/tasks/easypark-srs-reference.md` |

### 0.4 Inventario inicial de TODOs de gobierno

- TODO-GOV-001: definir dueño del documento.
- TODO-GOV-002: definir flujo de aprobación y evidencia aceptada.
- TODO-LEGAL-001: definir jurisdicciones, obligaciones legales y términos de servicio aplicables.
- TODO-PRIV-001: definir clasificación de datos, base legal, retención y derechos de titulares.
- TODO-METRIC-001: definir fuentes, instrumentos y metas reales de métricas de éxito.
- TODO-OPS-001: definir modelo operativo, soporte, horarios, escalamiento y responsabilidades.

## 1. Introducción

### 1.1 Propósito

[PROTOTIPO IMPLEMENTADO] EasyPark es un prototipo estático en HTML, CSS y JavaScript para validar una experiencia móvil de estacionamiento antes de elegir una pila productiva. Este SRS de referencia explica el alcance visible, las fronteras de confianza y las interfaces simuladas del prototipo, y separa esas evidencias de requisitos propuestos para una posible implementación real.

[REQUISITO PROPUESTO] El documento debe servir como base de conversación entre producto, ingeniería, QA, seguridad, privacidad, operaciones, anfitriones, conductores y stakeholders de negocio. Debe enseñar cómo escribir requisitos verificables sin presentar decisiones no tomadas como si fueran aprobadas.

[DECISIÓN PENDIENTE] Este documento no define país de lanzamiento, entidad legal, contrato, SLA, proveedor de pagos, proveedor de mapas, proveedor de SMS, política de privacidad ni arquitectura backend definitiva. Esos puntos requieren dueños y aprobaciones explícitas.

### 1.2 Alcance incluido

[PROTOTIPO IMPLEMENTADO] La referencia cubre los flujos visibles actuales del prototipo:

- Inicio orientado al conductor con destino ficticio y refs `APP-HOME-01`, `HOME-DESTINATION-01`, `REF-GUIDE-01` y `HELP-PORTAL-01`.
- Búsqueda privada con destino, horario, vehículo, filtros, mapa simulado, hoja inferior, detalle, pago ficticio, confirmación, recibo, pase y sesión: `DRV-START-01`, `DRV-TIME-01`, `DRV-SERVICES-01`, `DRV-FILTER-STATE-01`, `DRV-RESULTS-01`, `DRV-MAP-SHEET-01`, `DRV-PROGRESSIVE-01`, `DRV-DETAIL-01`, `DRV-PAYMENT-01`, `DRV-CONFIRM-01`, `DRV-RECEIPT-01`, `DRV-RECEIPT-DOC-01`, `DRV-STATUS-TIMELINE-01`, `DRV-SESSION-01`, `PARKING-PASS-01`, `PASS-ACCESS-01`, `PASS-QR-01` y `PASS-RULES-01`.
- Zona urbana simulada con código, vehículo, duración y límite: `DRV-ZONE-01`, `DRV-VEHICLE-01`, `DRV-DURATION-01`, `DRV-LIMIT-01`, `SESSION-ACTIVE-01`, `SESSION-OPERATOR-01`, `SESSION-ALERT-01`, `SESSION-EXTEND-01` y `SESSION-END-01`.
- Actividad e historial local: `ACTIVITY-HOME-01`, `ACTIVITY-HISTORY-01` y `ACTIVITY-RECEIPT-01`.
- Copilot local determinístico: `AI-ENTRY-01`, `AI-CHAT-01`, `AI-VOICE-01`, `AI-CONTEXT-01`, `AI-REFINE-01`, `AI-ITINERARY-01`, `AI-STRATEGY-01`, `AI-EXPLAIN-01` y `AI-HANDOFF-01`.
- Anfitrión de cochera: `PROV-LOCATION-01`, `PROV-SPACE-01`, `PROV-AMENITIES-01`, `PROV-ACCESS-01`, `PROV-AVAIL-01`, `PROV-TARIFF-01`, `PROV-PAYMENT-01` y `PROV-REVIEW-01`.
- Operación: `OPS-HOME-01`, `OPS-PENDING-01`, `OPS-INCIDENTS-01`, `OPS-TRIAGE-01`, `OPS-RESOLUTION-01` y `OPS-SETTLEMENTS-01`.
- Express simulado: `EXPRESS-HOME-01`, `EXPRESS-CONSENT-01`, `EXPRESS-ENTRY-01`, `EXPRESS-SESSION-01` y `EXPRESS-EXIT-01`.
- Incidentes y recuperación: `INCIDENT-HOME-01`, `INCIDENT-TYPE-01`, `INCIDENT-RECOVERY-01` y `INCIDENT-RESULT-01`.
- Cuenta segura y onboarding: `ACCOUNT-HOME-01`, `ACCOUNT-PROFILE-01`, `ACCOUNT-VEHICLE-01`, `ACCOUNT-PAYMENT-01`, `ACCOUNT-PAYOUT-01`, `ACCOUNT-BUSINESS-01`, `ACCOUNT-PREFS-01`, `ACCOUNT-SUMMARY-01`, `ONB-WELCOME-01`, `ONB-ROLE-01`, `ONB-VERIFY-01`, `ONB-PROFILE-01`, `ONB-SETUP-01`, `ONB-PREFS-01` y `ONB-DONE-01`.
- Ayuda, coordinación y descargas: `HELP-HOME-01`, `HELP-PROJECT-01`, `HELP-ROLES-01`, `HELP-FLOWS-01`, `HELP-SAFETY-01`, `HELP-FEEDBACK-01`, `BUZZ-ACCESS-01`, `CREATOR-SRS-01`, `SRS-DOWNLOAD-MD-01`, `SRS-DOWNLOAD-PDF-01` y `MEDIA-CREDITS-01`.

### 1.3 Fuera de alcance y no objetivos

[PROTOTIPO IMPLEMENTADO] Este borrador ya cubre la fundación del documento y, en esta versión, incorpora catálogo de casos de uso, requisitos funcionales, reglas de negocio y datos hasta la sección 7. Las secciones 8 a 12 quedan pendientes para el siguiente work unit.

[FUERA DE ALCANCE ACTUAL] El prototipo no incluye backend, pagos reales, integración bancaria, SMS real, mapas reales, GPS, cámaras, lectura de patente, operador real, control municipal, fiscalización, modelo LLM remoto, tickets reales, reembolsos reales, reservas reales, liquidaciones reales ni publicación productiva.

[FUERA DE ALCANCE ACTUAL] El documento no autoriza uso de tarjetas reales, patentes reales, ubicaciones reales, claves, credenciales, CBU, CVU, CUIT real, documentos fiscales ni datos de cámara.

[FUERA DE ALCANCE ACTUAL] No se copia identidad, marca, textos, íconos, layout exacto ni trade dress de competidores. Las referencias públicas se usan solo para entender patrones generales de movilidad.

### 1.4 Audiencia

| Audiencia | Uso previsto | Riesgo si interpreta mal |
| --- | --- | --- |
| Producto | Definir alcance y priorización futura | Convertir una demo en promesa productiva |
| Ingeniería | Identificar interfaces y dependencias | Diseñar integraciones no aprobadas |
| QA | Preparar criterios verificables | Validar comportamiento fuera de alcance |
| Seguridad | Revisar límites de datos y amenazas | Omitir controles antes de producción |
| Privacidad y legal | Revisar datos, consentimiento y jurisdicción | Asumir cumplimiento no decidido |
| Operaciones | Evaluar soporte, incidentes y liquidaciones | Prometer atención o SLA inexistente |
| Stakeholders | Comprender madurez y límites | Confundir simulación con producto real |
| Anfitriones | Entender publicación y cobro ficticio | Esperar reservas o pagos reales |
| Conductores | Probar flujos con datos ficticios | Ingresar datos reales o depender del pase |

### 1.5 Glosario

| Término | Definición operacional |
| --- | --- |
| SRS | Documento de requisitos verificables y trazables para EasyPark. |
| Prototipo | Sitio estático local compuesto por `index.html`, `help.html`, assets y plantillas. |
| Ref visible | Identificador rojo estable usado para pedir cambios y ubicar pantallas. |
| Conductor | Persona usuaria que busca, compara y simula estacionamiento. |
| Anfitrión | Persona que declara una cochera privada ficticia. |
| Operación | Rol que revisa colas, incidentes y liquidaciones simuladas. |
| Cochera privada reservable | Oferta publicada que puede llegar al checkout ficticio. |
| Parking tradicional | Opción informativa o de orientación sin checkout privado. |
| Guía de calle | Orientación incierta de disponibilidad pública sin reserva ni garantía. |
| Zona urbana | Flujo con código de zona ficticio, vehículo y duración limitada. |
| Express | Simulación de entrada y salida automática en parking compatible ficticio. |
| Copilot | Asistente local determinístico que recomienda estrategias sin reservar ni cobrar. |
| Pase demo | Composición local posterior al recibo con QR no escaneable y reglas ficticias. |
| Incidente | Registro local ficticio para recuperación manual simulada. |
| Liquidación | Vista operativa simulada sin transferencia ni conciliación real. |
| Buzz | Herramienta de coordinación mencionada por la ayuda; no es integración del prototipo. |
| OpenMoji | Fuente de SVG locales usados como ilustraciones con atribución. |
| localStorage | Almacenamiento del navegador usado solo para metadatos ficticios de demo. |
| Verdad transaccional | Estado que autoriza reserva, pago, recibo o liquidación. En el prototipo es local y ficticio. |

### 1.6 Referencias

| ID | Referencia | Uso |
| --- | --- | --- |
| REF-STD-001 | https://standards.ieee.org/ieee/830/1222/ | Contexto histórico; IEEE 830-1998 figura como reemplazada. |
| REF-REPO-001 | `index.html` | Evidencia principal de flujos y refs visibles. |
| REF-REPO-002 | `help.html` | Evidencia de guía para testers y límites. |
| REF-REPO-003 | `README.md` | Evidencia de alcance, seguridad y referencias públicas. |
| REF-PUBLIC-REPO-001 | https://github.com/hito2026/easypark-prototype | Repositorio público verificado. |
| REF-PUBLIC-SITE-001 | https://hito2026.github.io/easypark-prototype/ | Prototipo público verificado. |
| REF-PUBLIC-HELP-001 | https://hito2026.github.io/easypark-prototype/help.html | Ayuda pública verificada. |
| REF-TPL-001 | `templates/srs-ieee-830-template.md` | Plantilla en blanco preservada. |
| REF-TPL-002 | `templates/srs-ieee-830-template.pdf` | PDF en blanco derivado de la plantilla. |
| REF-GEN-001 | `scripts/generate-srs-pdf.py` | Generador determinístico parametrizado. |
| REF-MEDIA-001 | `assets/openmoji/ATTRIBUTION.md` | Atribución, licencia y hashes de OpenMoji. |
| REF-PUBLIC-001 | https://www.easypark.com/es-es | Inspiración pública general de patrones de estacionamiento. |
| REF-PUBLIC-002 | https://www.easypark.com/es-es/como-funciona | Inspiración pública general de funcionamiento. |
| REF-PUBLIC-003 | https://www.easypark.com/es-es/ayuda/empieza-a-aparcar-con-easypark/configuracion-de-la-cuenta-como-crear-tu-cuenta--26776175036572 | Inspiración pública general de onboarding y cuenta. |
| REF-ODD-001 | `odd/tasks/easypark-srs-reference.md` | Objetivo y aceptación de esta referencia SRS. |
| REF-ODD-002 | `odd/tasks/driver-map-experience.md` | Evidencia de destino primero, mapa simulado y timeline. |
| REF-ODD-003 | `odd/tasks/trust-visual-iteration.md` | Evidencia de pase, incidentes y OpenMoji. |
| REF-ODD-004 | `odd/tasks/help-documentation-portal.md` | Evidencia del portal de ayuda. |
| REF-ODD-005 | `odd/tasks/srs-template-download.md` | Evidencia de descargas de plantilla SRS. |

## 2. Descripción general

### 2.1 Perspectiva del producto

[PROTOTIPO IMPLEMENTADO] EasyPark, en este repositorio, es una prueba de experiencia móvil y documental. El sistema actual corre como archivos estáticos sin servidor. Sus datos persistentes viven en `localStorage` del navegador y son deliberadamente ficticios.

[REQUISITO PROPUESTO] Un producto real podría evolucionar hacia una plataforma con app móvil, backend transaccional, administración de anfitriones, operaciones, pagos, soporte e integraciones reguladas. Esa evolución requiere decisiones de arquitectura, cumplimiento, proveedores y operaciones que todavía no están aprobadas.

[DECISIÓN PENDIENTE] La relación entre marca EasyPark del prototipo, entidad operadora, mercados, moneda, impuestos, facturación, protección al consumidor y permisos municipales no está definida en esta referencia.

### 2.2 Objetivos y métricas de éxito propuestas

| Objetivo | Métrica propuesta | Meta | Fuente |
| --- | --- | --- | --- |
| Reducir fricción de búsqueda | Tiempo de inicio a resultados | TODO-METRIC-001 | TODO-METRIC-002 instrumentación |
| Aumentar comprensión de límites | Porcentaje que identifica simulación | TODO-METRIC-003 | TODO-METRIC-004 prueba moderada |
| Evitar datos reales | Incidentes de entrada sensible | TODO-METRIC-005 | TODO-METRIC-006 auditoría de formularios |
| Mejorar selección de opción | Tasa de selección sin abrir ayuda | TODO-METRIC-007 | TODO-METRIC-008 analítica futura |
| Mantener accesibilidad | Tareas completadas con teclado | TODO-METRIC-009 | TODO-METRIC-010 evaluación manual |
| Soportar operación | Tiempo de triage de incidente | TODO-METRIC-011 | TODO-METRIC-012 sistema futuro |

[DECISIÓN PENDIENTE] Ninguna meta numérica está aprobada. Las métricas anteriores son campos de trabajo, no compromisos.

### 2.3 Stakeholders, roles, necesidades y riesgos

| Rol | Necesidad | Riesgo principal |
| --- | --- | --- |
| Conductor | Encontrar alternativa clara y segura | Confundir guía con reserva real |
| Anfitrión | Declarar cochera y reglas | Creer que cobra o publica realmente |
| Operación | Ver colas, incidentes y liquidaciones | Asumir soporte o SLA real |
| Producto | Validar alcance y mensajes | Sobregeneralizar desde una demo |
| Ingeniería | Distinguir simulación de integración | Diseñar dependencias inexistentes |
| QA | Verificar flujos y refs estables | No cubrir límites transaccionales |
| Seguridad | Detectar datos sensibles prohibidos | Permitir captura de datos reales |
| Privacidad | Evaluar consentimiento y retención | Omitir bases legales futuras |
| Legal | Revisar país, obligaciones y marca | Inferir cumplimiento no revisado |
| Soporte | Preparar recuperación e incidentes | Prometer atención no implementada |
| Stakeholder externo | Entender progreso y restricciones | Tratar prototipo como producción |

### 2.4 Ambiente operativo actual y propuesto

[PROTOTIPO IMPLEMENTADO] Ambiente actual:

- Archivos locales: `index.html`, `help.html`, `README.md`, `templates/`, `scripts/` y `assets/openmoji/`.
- Runtime: navegador moderno con HTML, CSS, JavaScript y `localStorage`.
- Librería externa de generación PDF: ReportLab instalado localmente para ejecutar `scripts/generate-srs-pdf.py`.
- Voz opcional: APIs del navegador `SpeechRecognition`, `webkitSpeechRecognition` y `speechSynthesis` cuando existen; el procesamiento puede depender del navegador, plataforma o proveedor, y puede operar fuera del equipo o requerir conexión de red.
- Datos persistidos: metadatos ficticios de cuenta, método de pago de prueba, historial, sesión, incidente y cocheras locales.

[REQUISITO PROPUESTO] Ambiente productivo potencial:

- Aplicación web o móvil con backend autenticado.
- Base de datos transaccional y auditoría de eventos.
- Proveedor de pagos, facturación y liquidaciones aprobado.
- Proveedor de mapas, geocodificación y ruteo aprobado.
- Sistemas de notificación, SMS o email aprobados.
- Consola operacional con gestión real de incidentes.
- Políticas de seguridad, privacidad, retención y observabilidad aprobadas.

[DECISIÓN PENDIENTE] El stack, proveedores, regiones, nubes, SLAs, entornos, monitoreo y estrategia de despliegue son TODO-ARCH-001.

### 2.5 Restricciones

[PROTOTIPO IMPLEMENTADO]

- Solo archivos estáticos y JavaScript local.
- El código del prototipo no carga recursos remotos de mapas, pagos, cámaras, operadores, SMS, LLM o municipios en runtime; las APIs de voz del navegador, si se usan, dependen de la implementación de cada navegador o plataforma.
- Solo datos ficticios; el UI advierte no ingresar datos reales.
- Las refs visibles deben conservarse para coordinación y feedback.
- Las animaciones deben respetar `prefers-reduced-motion`.
- OpenMoji se usa localmente con atribución y hashes.
- El PDF SRS debe ser determinístico y generado desde Markdown.

[REQUISITO PROPUESTO]

- Requisitos futuros deben ser verificables, trazables y etiquetados.
- Toda integración productiva debe tener dueño, contrato, seguridad, privacidad y modo de falla definidos.
- Todo dato sensible debe tener clasificación, minimización, retención, acceso y borrado definidos.

[DECISIÓN PENDIENTE]

- Depende de TODO-LEGAL-001 para jurisdicción, responsabilidad y términos.
- Depende de TODO-PRIV-001 para política de privacidad y retención.
- TODO-SEC-001: modelo de amenazas y controles mínimos.
- Depende de TODO-OPS-001 para operación, soporte y escalamiento.
- TODO-ACC-001: estándar de accesibilidad objetivo.

### 2.6 Supuestos y dependencias

| ID | Supuesto o dependencia | Estado | Validación requerida |
| --- | --- | --- | --- |
| DEP-001 | Testers usarán datos ficticios | [PROTOTIPO IMPLEMENTADO] | Revisión de copy y formularios |
| DEP-002 | `localStorage` está disponible | [PROTOTIPO IMPLEMENTADO] | Prueba en navegador soportado |
| DEP-003 | ReportLab existe localmente | [PROTOTIPO IMPLEMENTADO] | Ejecución del generador PDF |
| DEP-004 | Producto definirá países | [DECISIÓN PENDIENTE] | TODO-LEGAL-002 |
| DEP-005 | Proveedor de pagos será aprobado | [DECISIÓN PENDIENTE] | TODO-PAY-001 |
| DEP-006 | Proveedor de mapas será aprobado | [DECISIÓN PENDIENTE] | TODO-MAP-001 |
| DEP-007 | Operación definirá SLA | [DECISIÓN PENDIENTE] | TODO-OPS-002 |
| DEP-008 | Buzz seguirá siendo coordinación externa | [PROTOTIPO IMPLEMENTADO] | No tratar como integración |

### 2.7 Alcance incluido y excluido

**Incluido en esta versión de referencia**

- Control documental y aviso legal.
- Propósito, alcance, audiencia, glosario y referencias.
- Perspectiva del producto, objetivos propuestos, roles, ambiente, restricciones, supuestos y alcance.
- Contexto del sistema, límites de confianza e interfaces externas actuales y propuestas.
- Catálogo de casos de uso, requisitos funcionales, reglas de negocio y datos hasta la sección 7.

**Pendiente para el siguiente work unit**

- Requisitos no funcionales completos.
- Estrategia de aceptación, trazabilidad, riesgos, decisiones y apéndices.

## 3. Contexto del sistema e interfaces externas

### 3.1 Contexto y límites de confianza

[PROTOTIPO IMPLEMENTADO] El límite del sistema actual es el navegador que abre los archivos estáticos. El usuario interactúa con pantallas, botones, formularios y refs. El prototipo guarda metadatos ficticios en `localStorage`. No existe servidor de EasyPark, cuenta real, pago real, reserva real ni operador conectado.

[PROTOTIPO IMPLEMENTADO] Límites de confianza actuales:

- Navegador local: confiado solo para ejecutar la demo y almacenar datos ficticios.
- Usuario tester: responsable de no ingresar datos reales.
- Archivos del repositorio: fuente de verdad para comportamiento visible.
- Buzz: canal humano de coordinación, no integración técnica del prototipo.
- OpenMoji local: assets estáticos con atribución, no proveedor en runtime.

[REQUISITO PROPUESTO] En producción debería existir separación entre cliente, backend, pagos, mapas, notificaciones, soporte, operaciones, auditoría y proveedores externos. Cada frontera requiere autenticación, autorización, logging, idempotencia, privacidad y manejo de fallos.

### 3.2 Catálogo de interfaces de usuario actuales

| UI | Actor | Propósito | Refs principales |
| --- | --- | --- | --- |
| UI-HOME | Todos | Elegir destino o flujo | `APP-HOME-01`, `HOME-DESTINATION-01` |
| UI-HELP | Tester | Entender límites y refs | `HELP-PORTAL-01`, `HELP-SAFETY-01` |
| UI-BUZZ | Colaborador | Acceso humano al workspace | `BUZZ-ACCESS-01` |
| UI-ONB | Usuario nuevo | Alta guiada ficticia | `ONB-WELCOME-01`, `ONB-DONE-01` |
| UI-ACCOUNT | Usuario | Cuenta segura ficticia | `ACCOUNT-HOME-01`, `ACCOUNT-SUMMARY-01` |
| UI-DRV-PRIVATE | Conductor | Buscar y reservar demo | `DRV-RESULTS-01`, `DRV-DETAIL-01` |
| UI-DRV-MAP | Conductor | Mapa simulado y hoja inferior | `DRV-MAP-SHEET-01`, `DRV-PROGRESSIVE-01` |
| UI-DRV-PAY | Conductor | Pago y recibo ficticios | `DRV-PAYMENT-01`, `DRV-RECEIPT-01` |
| UI-PASS | Conductor | Pase demo no escaneable | `PARKING-PASS-01`, `PASS-QR-01` |
| UI-URBAN | Conductor | Zona urbana simulada | `DRV-ZONE-01`, `SESSION-ACTIVE-01` |
| UI-ACTIVITY | Conductor | Historial y recibos | `ACTIVITY-HISTORY-01`, `ACTIVITY-RECEIPT-01` |
| UI-AI | Conductor | Recomendación local | `AI-CHAT-01`, `AI-STRATEGY-01` |
| UI-HOST | Anfitrión | Cargar cochera ficticia | `PROV-LOCATION-01`, `PROV-REVIEW-01` |
| UI-OPS | Operación | Revisar colas simuladas | `OPS-HOME-01`, `OPS-INCIDENTS-01` |
| UI-EXPRESS | Conductor | Entrada y salida simuladas | `EXPRESS-CONSENT-01`, `EXPRESS-EXIT-01` |
| UI-INCIDENT | Conductor y operación | Recuperación manual demo | `INCIDENT-HOME-01`, `OPS-TRIAGE-01` |
| UI-SRS | Creador | Plantilla SRS descargable | `CREATOR-SRS-01`, `SRS-DOWNLOAD-PDF-01` |
| UI-MEDIA | Creador | Créditos de OpenMoji | `MEDIA-CREDITS-01` |

### 3.3 Fronteras transaccionales por flujo

[PROTOTIPO IMPLEMENTADO] Flujo privado reservable: solo una cochera privada publicada puede pasar de detalle a pago ficticio, confirmación, recibo, pase y sesión. `DRV-PAY-FAIL-01` y `DRV-HOLD-EXP-01` bloquean o reinician la confirmación. El recibo no es fiscal ni productivo.

[PROTOTIPO IMPLEMENTADO] Flujo urbano: inicia una sesión urbana local con zona, patente ficticia y duración limitada por máximo visible. No reserva cochera privada, no cobra, no contacta municipio y no fiscaliza.

[PROTOTIPO IMPLEMENTADO] Guía de parking tradicional o calle: informa orientación y vuelve a resultados. No puede avanzar a checkout ni emitir recibo privado.

[PROTOTIPO IMPLEMENTADO] Express: simula consentimiento, entrada, sesión, salida y recibo en actividad. No usa cámara real, OCR, operador, barrera ni lectura real de patente.

[PROTOTIPO IMPLEMENTADO] Copilot: recomienda y explica opciones con reglas locales. Puede derivar a detalle solo si la opción es reservable publicada. No reserva, no cobra, no emite recibos y no modifica verdad transaccional.

[PROTOTIPO IMPLEMENTADO] Incidentes: generan un registro local idempotente y acciones de recuperación simuladas. No completan reembolsos, cargos, reservas alternativas ni atención real automática.

### 3.4 Interfaces de hardware

[PROTOTIPO IMPLEMENTADO] No hay hardware integrado. El prototipo no se conecta a barreras, cámaras, impresoras, lectores QR, GPS, sensores de ocupación, parquímetros, terminales POS ni dispositivos municipales.

[PROTOTIPO IMPLEMENTADO] El QR del pase es una composición visual no escaneable. Las imágenes OpenMoji son locales y no implican soporte de hardware.

[REQUISITO PROPUESTO] Cualquier hardware futuro requiere TODO-HW-001 para identificar proveedor, protocolo, seguridad física, accesibilidad, fallos, privacidad y soporte.

### 3.5 Interfaces de software actuales

| Sistema | Estado | Dirección | Datos |
| --- | --- | --- | --- |
| Navegador | [PROTOTIPO IMPLEMENTADO] | Local | HTML, CSS y JavaScript |
| localStorage | [PROTOTIPO IMPLEMENTADO] | Lectura y escritura local | Metadatos ficticios |
| ReportLab | [PROTOTIPO IMPLEMENTADO] | Generación local | Markdown a PDF |
| SpeechRecognition | [PROTOTIPO IMPLEMENTADO] | Opcional del navegador | Dictado provisto por el navegador; el prototipo no almacena audio y el procesamiento puede depender de servicios del navegador, plataforma o proveedor. |
| speechSynthesis | [PROTOTIPO IMPLEMENTADO] | Opcional del navegador | Lectura de texto provista por el navegador; disponibilidad y procesamiento dependen del navegador o plataforma. |
| OpenMoji SVG | [PROTOTIPO IMPLEMENTADO] | Archivo local | Ilustraciones estáticas |

[PROTOTIPO IMPLEMENTADO] El código de `index.html` y `help.html` no carga APIs externas de mapas, pagos, LLM, SMS, cámaras, operadores ni municipios para ejecutar los flujos del prototipo. La capacidad de voz opcional queda delegada al navegador y puede tener dependencias propias fuera del código del prototipo.

### 3.6 Interfaces de software propuestas o ausentes

| Sistema | Estado | Observación |
| --- | --- | --- |
| Backend EasyPark | [DECISIÓN PENDIENTE] | TODO-ARCH-001 definir arquitectura |
| Autenticación | [DECISIÓN PENDIENTE] | TODO-AUTH-001 definir identidad |
| Pagos | [DECISIÓN PENDIENTE] | TODO-PAY-001 definir proveedor y cumplimiento |
| Mapas y geocoding | [DECISIÓN PENDIENTE] | TODO-MAP-001 definir proveedor |
| GPS y tracking | [FUERA DE ALCANCE ACTUAL] | No existe en prototipo |
| SMS o WhatsApp | [DECISIÓN PENDIENTE] | TODO-NOTIF-001 definir comunicaciones |
| Cámaras y OCR | [FUERA DE ALCANCE ACTUAL] | No existe lectura real |
| Operador backend | [DECISIÓN PENDIENTE] | TODO-OPS-003 definir consola real |
| Municipio o fiscalización | [DECISIÓN PENDIENTE] | TODO-GOV-003 definir convenio |
| LLM remoto | [FUERA DE ALCANCE ACTUAL] | Copilot actual es local determinístico |
| Buzz API | [FUERA DE ALCANCE ACTUAL] | Buzz es coordinación humana |

### 3.7 Interfaces de comunicaciones

[PROTOTIPO IMPLEMENTADO] La UI estática principal puede ejecutarse localmente cuando los archivos están disponibles. Los enlaces externos en documentación son referencias para lectura humana, no dependencias de runtime de mapas, pagos, LLM, SMS, cámaras, operadores o municipios.

[PROTOTIPO IMPLEMENTADO] La voz opcional usa capacidades del navegador; según navegador, plataforma o proveedor, el dictado o la síntesis pueden no estar disponibles, puede requerir red o puede procesarse fuera del repositorio. El prototipo no almacena audio.

[PROTOTIPO IMPLEMENTADO] Las descargas de la plantilla SRS son archivos locales del repositorio. El PDF se genera localmente desde Markdown.

[REQUISITO PROPUESTO] Producción debería especificar TLS, autenticación, autorización, reintentos, idempotencia, límites de tasa, auditoría, observabilidad, protección contra duplicados, recuperación ante timeouts y compatibilidad offline parcial si aplica.

[DECISIÓN PENDIENTE] TODO-COMM-001 define protocolos, formatos, reintentos y responsabilidades entre cliente, backend y proveedores.

## 4. Catálogo de características y casos de uso

[PROTOTIPO IMPLEMENTADO] Los casos de uso describen pantallas y resultados observables del prototipo. No equivalen a compromisos productivos. Cuando el caso toca reserva, pago, patente, incidente o soporte, el resultado es local, ficticio y sin autoridad transaccional real.

### 4.1 Catálogo resumido de casos de uso

| ID | Caso | Actor | Prioridad | Estado |
| --- | --- | --- | --- | --- |
| UC-ONB-001 | Alta guiada de prueba | Usuario nuevo | Alta | [PROTOTIPO IMPLEMENTADO] |
| UC-ACC-001 | Configurar cuenta segura ficticia | Usuario | Alta | [PROTOTIPO IMPLEMENTADO] |
| UC-DRV-001 | Buscar cochera privada reservable | Conductor | Alta | [PROTOTIPO IMPLEMENTADO] |
| UC-DRV-002 | Consultar orientación sin checkout | Conductor | Alta | [PROTOTIPO IMPLEMENTADO] |
| UC-URB-001 | Iniciar sesión urbana simulada | Conductor | Alta | [PROTOTIPO IMPLEMENTADO] |
| UC-ACT-001 | Revisar actividad y recibos | Conductor | Media | [PROTOTIPO IMPLEMENTADO] |
| UC-AI-001 | Usar Copilot asesor | Conductor | Alta | [PROTOTIPO IMPLEMENTADO] |
| UC-PROV-001 | Publicar cochera ficticia | Anfitrión | Alta | [PROTOTIPO IMPLEMENTADO] |
| UC-OPS-001 | Revisar operación simulada | Operación | Media | [PROTOTIPO IMPLEMENTADO] |
| UC-EXP-001 | Entrada Express simulada | Conductor | Media | [PROTOTIPO IMPLEMENTADO] |
| UC-INC-001 | Reportar y recuperar incidente | Conductor y operación | Alta | [PROTOTIPO IMPLEMENTADO] |
| UC-DOC-001 | Consultar ayuda, SRS y Buzz | Tester o creador | Alta | [PROTOTIPO IMPLEMENTADO] |

### 4.2 Alta guiada de prueba

- Actor: usuario nuevo.
- Precondiciones: el prototipo está abierto y el usuario elige onboarding.
- Resultado observable: se guardan preferencias ficticias en `easyparkMockOnboarding` y, si corresponde, cuenta ficticia en `easyparkMockAccount`.
- Variantes o fallas: código distinto de `2468` bloquea avance; rol anfitrión o proveedor deriva a flujo anfitrión.
- Prioridad: Alta.
- Refs: `ONB-WELCOME-01`, `ONB-ROLE-01`, `ONB-VERIFY-01`, `ONB-PROFILE-01`, `ONB-SETUP-01`, `ONB-PREFS-01`, `ONB-DONE-01`.
- Estado: [PROTOTIPO IMPLEMENTADO].

### 4.3 Configurar cuenta segura ficticia

- Actor: usuario.
- Precondiciones: el usuario entra a cuenta segura.
- Resultado observable: perfil, vehículo, pago de prueba, cobro ficticio, datos comerciales de muestra y preferencias quedan visibles y se guardan localmente.
- Variantes o fallas: no hay campos para PAN, CVV, CBU, CVU, IBAN completo, CUIT real, credenciales ni secretos.
- Prioridad: Alta.
- Refs: `ACCOUNT-HOME-01`, `ACCOUNT-PROFILE-01`, `ACCOUNT-VEHICLE-01`, `ACCOUNT-PAYMENT-01`, `ACCOUNT-PAYOUT-01`, `ACCOUNT-BUSINESS-01`, `ACCOUNT-PREFS-01`, `ACCOUNT-SUMMARY-01`.
- Estado: [PROTOTIPO IMPLEMENTADO].

### 4.4 Reserva privada simulada

- Actor: conductor.
- Precondiciones: existe una opción `reservable` y publicada; el usuario usa datos ficticios y un medio de pago de prueba.
- Flujo principal: elegir búsqueda privada, ingresar destino, configurar hora, duración, vehículo y filtros, seleccionar pin o tarjeta, revisar detalle, elegir tarjeta de prueba, confirmar, ver recibo, pase y sesión.
- Resultado observable: se crea recibo local con `reservationId`, `receiptId`, total, marca de pago y últimos cuatro dígitos ficticios en `easyparkLastMockReceipt`; la sesión privada se visualiza con timeline y pase no escaneable.
- Variantes o fallas: `DRV-PAY-FAIL-01` bloquea confirmación; `DRV-HOLD-EXP-01` vence la reserva temporal; filtros pueden dejar resultados vacíos; el botón de resultados queda oculto hasta selección explícita.
- Prioridad: Alta.
- Refs: `DRV-CHOICE-01`, `DRV-START-01`, `DRV-TIME-01`, `DRV-RESULTS-01`, `DRV-MAP-SHEET-01`, `DRV-DETAIL-01`, `DRV-PAYMENT-01`, `DRV-CONFIRM-01`, `DRV-RECEIPT-01`, `PARKING-PASS-01`, `DRV-SESSION-01`.
- Estado: [PROTOTIPO IMPLEMENTADO].

### 4.5 Orientación sin checkout

- Actor: conductor.
- Precondiciones: el usuario selecciona parking tradicional o guía de calle no reservable.
- Flujo principal: elegir opción de orientación, revisar distancia, precio visible, caveats y servicios, intentar continuar.
- Resultado observable: el prototipo vuelve a resultados y no muestra pago, recibo, pase ni sesión privada.
- Variantes o fallas: Copilot también puede derivar a orientación y debe explicar que no permite pagar ni reservar.
- Prioridad: Alta.
- Refs: `DRV-RESULTS-01`, `DRV-RESULT-CARD-01`, `DRV-DETAIL-01`, `AI-HANDOFF-01`.
- Estado: [PROTOTIPO IMPLEMENTADO].

### 4.6 Sesión urbana simulada

- Actor: conductor.
- Precondiciones: el usuario elige zona urbana o parking común y usa patente ficticia.
- Flujo principal: elegir zona, confirmar vehículo, seleccionar minutos dentro del máximo, iniciar sesión, extender o terminar.
- Resultado observable: `easyparkMockSession` guarda zona, tipo, patente ficticia, minutos, máximo, horario, importe ficticio, recibo y `controlId`; `easyparkMockHistory` recibe una entrada al finalizar.
- Variantes o fallas: extensión se bloquea si excede máximo; terminar dos veces indica que la sesión ya finalizó; no hay comunicación municipal.
- Prioridad: Alta.
- Refs: `DRV-ZONE-01`, `DRV-VEHICLE-01`, `DRV-DURATION-01`, `DRV-LIMIT-01`, `SESSION-ACTIVE-01`, `SESSION-EXTEND-01`, `SESSION-END-01`.
- Estado: [PROTOTIPO IMPLEMENTADO].

### 4.7 Actividad y recibos

- Actor: conductor.
- Precondiciones: puede existir sesión, historial o recibo local.
- Resultado observable: se muestran sesión actual, historial local, último recibo y una acción de descarga simulada que no crea archivo real.
- Variantes o fallas: sin historial se muestra estado vacío; recibo puede mostrar `sin recibo`.
- Prioridad: Media.
- Refs: `ACTIVITY-HOME-01`, `ACTIVITY-HISTORY-01`, `ACTIVITY-RECEIPT-01`.
- Estado: [PROTOTIPO IMPLEMENTADO].

### 4.8 Copilot asesor y handoff

- Actor: conductor.
- Precondiciones: el usuario abre Copilot y escribe, dicta si el navegador lo soporta o usa chips.
- Flujo principal: ingresar plan, deducir preferencias editables, ver itinerario y estrategias, elegir handoff a detalle.
- Resultado observable: Copilot ordena estrategias determinísticas y deriva a detalle solo si la opción es reservable y publicada.
- Variantes o fallas: si la opción no es reservable, agrega explicación al chat y no cobra ni reserva; si voz no existe, ofrece texto; el audio no se almacena por código del prototipo.
- Prioridad: Alta.
- Refs: `AI-ENTRY-01`, `AI-CHAT-01`, `AI-VOICE-01`, `AI-CONTEXT-01`, `AI-REFINE-01`, `AI-ITINERARY-01`, `AI-STRATEGY-01`, `AI-EXPLAIN-01`, `AI-HANDOFF-01`.
- Estado: [PROTOTIPO IMPLEMENTADO].

### 4.9 Publicar cochera ficticia

- Actor: anfitrión.
- Precondiciones: el usuario elige ofrecer cochera y usa datos ficticios.
- Resultado observable: se normaliza la publicación y se agrega a `easyparkProviderSpaces` con estado, servicios, acceso, tarifa, pago, ícono local, distancia simulada y `reservable:true`.
- Variantes o fallas: estados `Pending review` y `On site` se traducen al español; campos ausentes reciben valores seguros de demo; la normalización allowlistea el ícono visual. Los renderizados escapan texto de usuario o `localStorage` para evitar inyección visual.
- Prioridad: Alta.
- Refs: `PROV-LOCATION-01`, `PROV-SPACE-01`, `PROV-AMENITIES-01`, `PROV-ACCESS-01`, `PROV-AVAIL-01`, `PROV-TARIFF-01`, `PROV-PAYMENT-01`, `PROV-REVIEW-01`.
- Estado: [PROTOTIPO IMPLEMENTADO].

### 4.10 Operación simulada

- Actor: operación.
- Precondiciones: pueden existir publicaciones o incidentes locales.
- Resultado observable: se muestran conteos, cocheras pendientes, incidentes y liquidaciones manuales sin backend.
- Variantes o fallas: sin datos se muestran estados vacíos; triage o resolución actualizan incidente local sin soporte real.
- Prioridad: Media.
- Refs: `OPS-HOME-01`, `OPS-PENDING-01`, `OPS-INCIDENTS-01`, `OPS-TRIAGE-01`, `OPS-RESOLUTION-01`, `OPS-SETTLEMENTS-01`.
- Estado: [PROTOTIPO IMPLEMENTADO].

### 4.11 Entrada Express simulada

- Actor: conductor.
- Precondiciones: el usuario abre Express y usa patente ficticia.
- Flujo principal: ver sitio compatible ficticio, aceptar consentimiento o usar fallback manual, registrar entrada, sesión, salida y guardar recibo.
- Resultado observable: se crea recibo `RC-X...` y una entrada de historial al guardar; guardar dos veces no duplica actividad.
- Variantes o fallas: si no acepta consentimiento, el fallback manual avanza a entrada simulada; no hay cámara, OCR, barrera ni operador.
- Prioridad: Media.
- Refs: `EXPRESS-HOME-01`, `EXPRESS-CONSENT-01`, `EXPRESS-ENTRY-01`, `EXPRESS-SESSION-01`, `EXPRESS-EXIT-01`.
- Estado: [PROTOTIPO IMPLEMENTADO].

### 4.12 Incidente y recuperación manual

- Actor: conductor y operación.
- Precondiciones: el usuario abre incidente desde menú, pase o sesión.
- Flujo principal: elegir tipo, elegir recuperación, guardar incidente local, ver resultado y opcionalmente triage o resolución en operación.
- Resultado observable: `easyparkIncident` contiene id, tipo, recuperación, severidad, acción y estado; una propuesta de alternativa limpia filtros y selección sin reservar.
- Variantes o fallas: cargo incorrecto no reembolsa; problema de seguridad solo marca severidad alta; acciones son idempotentes y simuladas.
- Prioridad: Alta.
- Refs: `INCIDENT-HOME-01`, `INCIDENT-TYPE-01`, `INCIDENT-RECOVERY-01`, `INCIDENT-RESULT-01`, `OPS-TRIAGE-01`, `OPS-RESOLUTION-01`.
- Estado: [PROTOTIPO IMPLEMENTADO].

### 4.13 Ayuda, creador, SRS y Buzz

- Actor: tester o creador.
- Precondiciones: el usuario abre ayuda o flujo de documentación.
- Resultado observable: ve propósito, roles, flujos, límites de seguridad, feedback con refs, acceso Buzz y descargas de plantilla SRS.
- Variantes o fallas: Buzz es coordinación de workspace y feedback; los pedidos de acceso se enrutan por el contacto existente de WhatsApp con Alejandro y solo deben incluir `npub...` o clave pública hexadecimal de 64 caracteres, nunca `nsec`, claves privadas, contraseñas, códigos de recuperación, seeds, tokens ni API keys.
- Prioridad: Alta.
- Refs: `HELP-HOME-01`, `HELP-PROJECT-01`, `HELP-ROLES-01`, `HELP-FLOWS-01`, `HELP-SAFETY-01`, `HELP-FEEDBACK-01`, `BUZZ-ACCESS-01`, `CREATOR-SRS-01`, `SRS-DOWNLOAD-MD-01`, `SRS-DOWNLOAD-PDF-01`, `MEDIA-CREDITS-01`.
- Estado: [PROTOTIPO IMPLEMENTADO].

## 5. Requisitos funcionales

[PROTOTIPO IMPLEMENTADO] Los requisitos marcados como implementados se verifican contra `index.html`, `help.html`, `README.md` o assets locales. [REQUISITO PROPUESTO] Los requisitos propuestos no están implementados y dependen de TODOs explícitos.

### 5.1 HOME

| ID | Prioridad | Estado | Requisito | Aceptación y evidencia |
| --- | --- | --- | --- | --- |
| FR-HOME-001 | Alta | Implementado en prototipo | El inicio debe permitir elegir flujos principales con refs visibles. | Aceptación: los botones `data-flow` abren el wizard correspondiente. Evidencia: `APP-HOME-01`, `REF-GUIDE-01`. |
| FR-HOME-002 | Alta | Implementado en prototipo | El campo de destino del inicio debe iniciar búsqueda al hacer clic o presionar Enter. | Aceptación: `homeSearch` y Enter ejecutan `runHomeSearch`. Evidencia: `HOME-DESTINATION-01`. |
| FR-HOME-003 | Media | Implementado en prototipo | El usuario debe poder ocultar o mostrar etiquetas rojas sin eliminar refs del DOM. | Aceptación: `toggleRefs` alterna `refs-off`. Evidencia: `REF-GUIDE-01`. |

### 5.2 ONB

| ID | Prioridad | Estado | Requisito | Aceptación y evidencia |
| --- | --- | --- | --- | --- |
| FR-ONB-001 | Alta | Implementado en prototipo | El alta debe mostrar que no crea cuenta real ni envía SMS. | Aceptación: copy visible informa código fijo y ausencia de SMS. Evidencia: `ONB-WELCOME-01`, `ONB-VERIFY-01`. |
| FR-ONB-002 | Alta | Implementado en prototipo | La verificación simulada debe aceptar solo el código `2468`. | Aceptación: código distinto muestra error y no avanza. Evidencia: `ONB-VERIFY-01`. |
| FR-ONB-003 | Media | Implementado en prototipo | El alta debe guardar rol, nombre, vehículo y preferencias ficticias localmente. | Aceptación: `saveOnboarding` escribe `easyparkMockOnboarding` y cuenta. Evidencia: `ONB-DONE-01`. |

### 5.3 ACC

| ID | Prioridad | Estado | Requisito | Aceptación y evidencia |
| --- | --- | --- | --- | --- |
| FR-ACC-001 | Alta | Implementado en prototipo | Cuenta debe advertir que solo acepta datos ficticios. | Aceptación: pantalla inicial enumera datos prohibidos. Evidencia: `ACCOUNT-HOME-01`. |
| FR-ACC-002 | Alta | Implementado en prototipo | Pago del conductor debe limitarse a tarjetas fijas de prueba. | Aceptación: solo se elige marca y últimos cuatro ficticios. Evidencia: `ACCOUNT-PAYMENT-01`, `easyparkMockPaymentMethod`. |
| FR-ACC-003 | Alta | Implementado en prototipo | Cobro anfitrión debe usar cuentas ficticias y no pedir CBU, CVU, IBAN ni cuenta completa. | Aceptación: opciones son presets de muestra. Evidencia: `ACCOUNT-PAYOUT-01`. |
| FR-ACC-004 | Media | Implementado en prototipo | Guardar cuenta debe persistir solo metadatos ficticios en `easyparkMockAccount`. | Aceptación: `saveAccount` escribe objeto local. Evidencia: `ACCOUNT-SUMMARY-01`. |

### 5.4 DRV, PAY y PASS

| ID | Prioridad | Estado | Requisito | Aceptación y evidencia |
| --- | --- | --- | --- | --- |
| FR-DRV-001 | Alta | Implementado en prototipo | La búsqueda manual debe empezar por destino, no por ubicación actual. | Aceptación: `DRV-START-01` pide destino y no solicita GPS. Evidencia: `DRV-START-01`. |
| FR-DRV-002 | Alta | Implementado en prototipo | Resultados deben combinar semillas y cocheras del anfitrión normalizadas. | Aceptación: `options` usa `seed` y `easyparkProviderSpaces`. Evidencia: `DRV-RESULTS-01`. |
| FR-DRV-003 | Alta | Implementado en prototipo | Los filtros deben cubrir ranking, precio, cercanía, cubierto, accesible, EV, compatibilidad y acceso. | Aceptación: al cambiar filtros se altera la lista y puede mostrar estado vacío. Evidencia: `DRV-TIME-01`, `DRV-SERVICES-01`, `DRV-FILTER-STATE-01`. |
| FR-DRV-004 | Alta | Implementado en prototipo | El mapa debe ser simulado y la selección debe ocurrir solo por botones explícitos. | Aceptación: pines y tarjetas tienen `data-pick`; el detalle usa marcador no interactivo. Evidencia: `DRV-MAP-SHEET-01`. |
| FR-DRV-005 | Alta | Implementado en prototipo | Parking tradicional y guía de calle no deben acceder a checkout. | Aceptación: `DRV-DETAIL-01` vuelve a resultados si no es reservable y publicado. Evidencia: `DRV-DETAIL-01`. |
| FR-PAY-001 | Alta | Implementado en prototipo | El pago debe aceptar solo tarjetas ficticias y bloquear confirmación ante pago rechazado o hold vencido. | Aceptación: `paymentBlocked` impide emitir recibo. Evidencia: `DRV-PAYMENT-01`, `DRV-PAY-FAIL-01`, `DRV-HOLD-EXP-01`. |
| FR-PAY-002 | Alta | Implementado en prototipo | Confirmar reserva privada válida debe emitir recibo ficticio local. | Aceptación: `issueReceipt` genera `reservationId`, `receiptId`, total, marca, last4 y status. Evidencia: `DRV-CONFIRM-01`, `DRV-RECEIPT-01`. |
| FR-PASS-001 | Alta | Implementado en prototipo | El recibo debe mostrar pase demo, acceso, QR no escaneable y reglas ficticias. | Aceptación: sección de pase incluye `PARKING-PASS-01`, acceso, QR y reglas. Evidencia: `PASS-ACCESS-01`, `PASS-QR-01`, `PASS-RULES-01`. |
| FR-DRV-006 | Media | Implementado en prototipo | La sesión privada debe mostrar timeline, llegada simulada, extensión y finalización visual. | Aceptación: timeline avanza y botones actualizan texto local. Evidencia: `DRV-STATUS-TIMELINE-01`, `DRV-SESSION-01`. |

### 5.5 URB y ACT

| ID | Prioridad | Estado | Requisito | Aceptación y evidencia |
| --- | --- | --- | --- | --- |
| FR-URB-001 | Alta | Implementado en prototipo | La zona urbana debe estar separada de la reserva privada y usar zona y patente ficticias. | Aceptación: el flujo urbano no entra a checkout privado. Evidencia: `DRV-ZONE-01`, `DRV-VEHICLE-01`. |
| FR-URB-002 | Alta | Implementado en prototipo | Duración urbana no debe superar el máximo ficticio de la zona. | Aceptación: rango usa `max` y `extendUrban` bloquea exceso. Evidencia: `DRV-LIMIT-01`, `SESSION-EXTEND-01`. |
| FR-URB-003 | Alta | Implementado en prototipo | Iniciar sesión urbana debe guardar sesión e historial local cuando finaliza. | Aceptación: `startUrbanSession`, `saveSession` y `endUrban` usan `easyparkMockSession` y `easyparkMockHistory`. Evidencia: `SESSION-ACTIVE-01`, `SESSION-END-01`. |
| FR-URB-004 | Media | Implementado en prototipo | Terminar o extender sesión debe ser idempotente en estado final. | Aceptación: si no está activa se informa que ya finalizó o no está activa. Evidencia: `SESSION-END-01`. |
| FR-ACT-001 | Media | Implementado en prototipo | Actividad debe mostrar sesión actual, historial y último recibo. | Aceptación: vistas leen `state.session`, `state.history` y último recibo. Evidencia: `ACTIVITY-HOME-01`, `ACTIVITY-HISTORY-01`, `ACTIVITY-RECEIPT-01`. |
| FR-ACT-002 | Baja | Implementado en prototipo | Descargar recibo en actividad debe ser simulación sin archivo real. | Aceptación: botón solo cambia mensaje de estado. Evidencia: `ACTIVITY-RECEIPT-01`. |

### 5.6 AI

| ID | Prioridad | Estado | Requisito | Aceptación y evidencia |
| --- | --- | --- | --- | --- |
| FR-AI-001 | Alta | Implementado en prototipo | Copilot debe ser local, determinístico y asesor, sin reservar ni cobrar. | Aceptación: copy y reglas indican que solo recomienda. Evidencia: `AI-ENTRY-01`, `AI-CHAT-01`. |
| FR-AI-002 | Alta | Implementado en prototipo | Copilot debe permitir texto, chips, preferencias editables y demo. | Aceptación: `sendAi`, `data-chip` y `data-context` actualizan estrategias. Evidencia: `AI-REFINE-01`, `AI-CONTEXT-01`. |
| FR-AI-003 | Media | Implementado en prototipo | Voz debe ser opcional y con alternativa textual. | Aceptación: si Speech API falta se muestra mensaje y el input sigue disponible. Evidencia: `AI-VOICE-01`. |
| FR-AI-004 | Alta | Implementado en prototipo | Handoff a reserva solo debe ocurrir para opción reservable publicada. | Aceptación: `handoff` deriva a `DRV-DETAIL-01` solo si cumple condición. Evidencia: `AI-HANDOFF-01`. |
| FR-AI-005 | Media | Implementado en prototipo | Explicaciones deben incluir ventajas y límites. | Aceptación: `strategyCard` muestra `why` y `risk`. Evidencia: `AI-EXPLAIN-01`. |

### 5.7 PROV y OPS

| ID | Prioridad | Estado | Requisito | Aceptación y evidencia |
| --- | --- | --- | --- | --- |
| FR-PROV-001 | Alta | Implementado en prototipo | Anfitrión debe capturar ubicación, espacio, servicios, acceso, disponibilidad, tarifa y pago ficticio. | Aceptación: `capture` recoge campos del flujo. Evidencia: `PROV-LOCATION-01` a `PROV-REVIEW-01`. |
| FR-PROV-002 | Alta | Implementado en prototipo | Guardar cochera debe normalizar estado, pago, vehículos, defaults y visuales allowlisteados; la salida debe escapar textos derivados de usuario o `localStorage`. | Aceptación: la función de normalización traduce y completa defaults, y las rutas de render usan escape de texto. Evidencia: `PROV-AMENITIES-01`, `PROV-ACCESS-01`. |
| FR-PROV-003 | Media | Implementado en prototipo | Bloqueos y precios pico deben ser descriptivos y no aplicarse automáticamente. | Aceptación: copy visible lo declara. Evidencia: `PROV-ACCESS-01`, `DRV-PROGRESSIVE-01`. |
| FR-OPS-001 | Media | Implementado en prototipo | Operación debe mostrar pendientes, incidentes y liquidaciones manuales desde datos locales. | Aceptación: panel usa `spaces`, `state.incident` y no backend. Evidencia: `OPS-HOME-01`, `OPS-PENDING-01`, `OPS-INCIDENTS-01`, `OPS-SETTLEMENTS-01`. |
| FR-OPS-002 | Media | Implementado en prototipo | Triage y resolución deben actualizar incidente local sin prometer soporte real. | Aceptación: botones modifican `status` en `easyparkIncident`. Evidencia: `OPS-TRIAGE-01`, `OPS-RESOLUTION-01`. |

### 5.8 EXP, INC, DOC y propuestas productivas

| ID | Prioridad | Estado | Requisito | Aceptación y evidencia |
| --- | --- | --- | --- | --- |
| FR-EXP-001 | Media | Implementado en prototipo | Express debe separar consentimiento ficticio, entrada, sesión, salida y actividad. | Aceptación: flujo tiene cinco pantallas y no usa cámara real. Evidencia: `EXPRESS-HOME-01` a `EXPRESS-EXIT-01`. |
| FR-EXP-002 | Media | Implementado en prototipo | Express debe ofrecer fallback manual si no hay consentimiento. | Aceptación: `expressFallback` avanza sin consentimiento. Evidencia: `EXPRESS-CONSENT-01`. |
| FR-EXP-003 | Media | Implementado en prototipo | Guardar recibo Express debe ser idempotente. | Aceptación: `saveExpress` evita duplicar si `saved` es verdadero. Evidencia: `EXPRESS-EXIT-01`. |
| FR-INC-001 | Alta | Implementado en prototipo | Incidentes deben capturar tipo, recuperación, severidad, acción y estado local. | Aceptación: `prepareIncident` escribe `easyparkIncident`. Evidencia: `INCIDENT-TYPE-01`, `INCIDENT-RECOVERY-01`. |
| FR-INC-002 | Alta | Implementado en prototipo | Recuperación de incidente no debe completar reembolso, cargo ni nueva reserva. | Aceptación: resultado declara ausencia de efectos reales. Evidencia: `INCIDENT-RESULT-01`. |
| FR-DOC-001 | Alta | Implementado en prototipo | Ayuda debe documentar roles, flujos, límites, refs y feedback. | Aceptación: secciones de ayuda visibles cubren esos temas. Evidencia: `HELP-HOME-01` a `HELP-FEEDBACK-01`. |
| FR-DOC-002 | Alta | Implementado en prototipo | Buzz debe tratarse como coordinación humana de workspace y feedback, no como integración ni canal de secretos; el onboarding de acceso debe pedir que la clave pública se envíe a Alejandro por el contacto existente de WhatsApp. | Aceptación: la guía acepta solo `npub...` o clave pública hexadecimal de 64 caracteres y prohíbe `nsec`, claves privadas, contraseñas, códigos de recuperación, seeds, tokens y API keys, sin publicar teléfono. Evidencia: `BUZZ-ACCESS-01`, `HELP-SAFETY-01`. |
| FR-DOC-003 | Alta | Implementado en prototipo | La plantilla SRS debe descargarse como Markdown y PDF sin alterar la fuente. | Aceptación: refs de descarga existen en ayuda. Evidencia: `CREATOR-SRS-01`, `SRS-DOWNLOAD-MD-01`, `SRS-DOWNLOAD-PDF-01`. |
| FR-PRD-001 | Alta | Propuesto | Producción debe autenticar usuarios y separar roles reales. | Aceptación: diseño futuro con pruebas de autorización. Evidencia: TODO-AUTH-001, TODO-ARCH-001. |
| FR-PRD-002 | Alta | Propuesto | Producción debe implementar reserva, pago, soporte, mapas y notificaciones reales solo con proveedores aprobados. | Aceptación: contratos, entornos y pruebas de integración aprobadas. Evidencia: TODO-PAY-001, TODO-MAP-001, TODO-NOTIF-001, TODO-OPS-001. |
| FR-PRD-003 | Alta | Propuesto | Producción debe reemplazar `localStorage` por persistencia segura con auditoría y controles de privacidad. | Aceptación: modelo de datos, cifrado, acceso y borrado definidos. Evidencia: TODO-DATA-001, TODO-PRIV-001, TODO-SEC-001. |

## 6. Reglas de negocio

| ID | Estado | Regla | Verificación |
| --- | --- | --- | --- |
| BR-FLOW-001 | [PROTOTIPO IMPLEMENTADO] | Reserva privada, zona urbana, guía, Copilot, Express e incidente son flujos separados. | Probar navegación y ausencia de checkout cruzado. |
| BR-CHECKOUT-001 | [PROTOTIPO IMPLEMENTADO] | Solo una cochera privada con `reservable:true` y estado `Publicado` puede pasar a pago. | Seleccionar parking tradicional o guía y confirmar retorno a resultados. |
| BR-DATA-001 | [PROTOTIPO IMPLEMENTADO] | Todo dato de demo debe ser ficticio y local. | Revisar copys de cuenta, pago, patente, SMS, cámara y soporte. |
| BR-AI-001 | [PROTOTIPO IMPLEMENTADO] | Copilot es asesor: no reserva, no cobra, no emite recibos y no altera verdad transaccional. | Usar `AI-HANDOFF-01` con opción no reservable. |
| BR-PRICE-001 | [PROTOTIPO IMPLEMENTADO] | Precio, disponibilidad, distancia, ranking, pico y servicios son caveats de demo, no disponibilidad viva. | Ver `DRV-PROGRESSIVE-01` y copy de detalle. |
| BR-URB-001 | [PROTOTIPO IMPLEMENTADO] | Zona urbana no puede superar el máximo ficticio de la zona. | Intentar extensión por encima de `max`. |
| BR-IDEMP-001 | [PROTOTIPO IMPLEMENTADO] | Incidentes, fin de sesión y guardado Express deben evitar efectos económicos duplicados. | Repetir acciones y verificar mensajes idempotentes. |
| BR-INC-001 | [PROTOTIPO IMPLEMENTADO] | Incidente puede proponer alternativa, solicitar revisión o escalar, pero nunca ejecutar reembolso real. | Ver `INCIDENT-RESULT-01`. |
| BR-MEDIA-001 | [PROTOTIPO IMPLEMENTADO] | OpenMoji debe permanecer local, atribuido y con licencia documentada. | Revisar `MEDIA-CREDITS-01` y `assets/openmoji/ATTRIBUTION.md`. |
| BR-BUZZ-001 | [PROTOTIPO IMPLEMENTADO] | Buzz puede usarse para refs y contexto de feedback; las solicitudes de acceso se envían a Alejandro por el WhatsApp ya existente con solo `npub...` o clave pública hexadecimal de 64 caracteres, nunca `nsec`, claves privadas, contraseñas, códigos de recuperación, seeds, tokens ni API keys. | Revisar `BUZZ-ACCESS-01` y ayuda de seguridad, sin agregar número telefónico. |
| BR-SRS-001 | [PROTOTIPO IMPLEMENTADO] | Markdown es fuente de verdad y el PDF se deriva con el generador. | Ejecutar `scripts/generate-srs-pdf.py` con fuente explícita. |
| BR-PROD-001 | [REQUISITO PROPUESTO] | Producción no debe activar pagos, mapas, soporte, cámaras, SMS, municipios ni LLM sin aprobación de proveedor y controles. | Depende de TODO-PAY-001, TODO-MAP-001, TODO-OPS-001, TODO-NOTIF-001, TODO-GOV-003. |

## 7. Datos, retención y migración

[PROTOTIPO IMPLEMENTADO] El prototipo usa `localStorage` como comodidad de demo. `localStorage` no es seguro ni productivo: no cifra, no autentica usuarios, no aísla roles y puede persistir más de lo esperado según navegador. No ingresar datos reales.

### 7.1 Entidades conceptuales y claves actuales

| Entidad | Clave o fuente actual | Campos actuales | Sensibilidad y retención actual |
| --- | --- | --- | --- |
| ParkingSpace y Listing | `seed`, `easyparkProviderSpaces` | id, kind, title, location, comment, schedule, price, payment, meters, covered, rating, status, reservable, services, access, blocked, peak, visual | Ficticia. Persiste hasta limpieza del navegador o sobrescritura local. |
| Zone | constante `zones` | id, type, area, max, price, note | Ficticia. No persiste salvo sesión. |
| Account | `easyparkMockAccount` | name, contact, phone, vehicle, plate, payout, business, fiscal, notify, privacy | Ficticia pero sensible si el usuario ingresa datos reales. Persiste localmente. |
| PaymentMethod | `easyparkMockPaymentMethod` | id, brand, last4 | Ficticia. Persiste localmente. No hay PAN ni CVV. |
| Onboarding | `easyparkMockOnboarding` | role, code, verified, name, vehicle, provider, prefs | Ficticia. Persiste localmente. |
| Session e History | `easyparkMockSession`, `easyparkMockHistory` | mode, status, zone, plate, minutes, max, times, amount, receipt, controlId, history rows | Ficticia. Persiste localmente. |
| Receipt | `easyparkLastMockReceipt`, history | reservationId, receiptId, issuedAt, total, paymentBrand, last4, status | Ficticia. Persiste localmente. No es fiscal. |
| Incident | `easyparkIncident` | id, type, recovery, severity, action, status | Ficticia. Persiste localmente. |
| Copilot context | estado JS en memoria | urgency, stops, parkOnce, walk, covered, vehicle, budget, transcript, strategies | Ficticia. No se guarda como clave dedicada. Voz no almacena audio por código del prototipo. |

### 7.2 Validación actual por entidad

| ID | Entidad | Validación actual | Límite |
| --- | --- | --- | --- |
| DATA-CUR-001 | ParkingSpace | La función de normalización completa defaults, traduce estados y allowlistea visuales; las rutas de render escapan texto derivado de usuario o `localStorage`. | No verifica propiedad, disponibilidad ni dirección real. |
| DATA-CUR-002 | Account | Formularios piden datos ficticios y máscaras. | No impide que usuario escriba datos reales. |
| DATA-CUR-003 | PaymentMethod | Selección restringida a tarjetas mock. | No hay tokenización real ni procesador. |
| DATA-CUR-004 | Session | Duración urbana se limita por `max`. | No hay reloj confiable ni servidor. |
| DATA-CUR-005 | Incident | Reusa id existente si ya hay incidente local. | No hay cola real ni SLA. |
| DATA-CUR-006 | Copilot | Parseo por reglas locales y contexto editable. | No entiende lenguaje libre completo ni garantías. |

### 7.3 Requisitos propuestos de datos de producción

| ID | Prioridad | Estado | Requisito | Aceptación y evidencia |
| --- | --- | --- | --- | --- |
| DR-DATA-001 | Alta | Propuesto | Definir modelo canónico para usuarios, roles, cocheras, reservas, sesiones, pagos, recibos, incidentes y auditoría. | Aceptación: esquema versionado y revisado. Evidencia: TODO-DATA-001. |
| DR-DATA-002 | Alta | Propuesto | Validar y minimizar datos por finalidad antes de persistir. | Aceptación: matriz campo finalidad obligatoriedad retención. Evidencia: TODO-PRIV-002. |
| DR-DATA-003 | Alta | Propuesto | Clasificar datos personales, financieros, ubicación, vehículo, soporte y telemetría. | Aceptación: clasificación aprobada por privacidad y seguridad. Evidencia: TODO-PRIV-003, TODO-SEC-002. |
| DR-DATA-004 | Alta | Propuesto | Definir retención y borrado sin inventar duración hasta decisión legal. | Aceptación: política con duración aprobada por jurisdicción. Evidencia: TODO-LEGAL-003, TODO-RET-001. |
| DR-DATA-005 | Alta | Propuesto | Cifrar datos sensibles en tránsito y reposo según arquitectura aprobada. | Aceptación: pruebas de configuración y revisión de claves. Evidencia: TODO-SEC-003. |
| DR-DATA-006 | Alta | Propuesto | Implementar control de acceso por rol y auditoría de cambios transaccionales. | Aceptación: pruebas de autorización y logs inmutables definidos. Evidencia: TODO-AUTH-002, TODO-AUDIT-001. |
| DR-DATA-007 | Media | Propuesto | Migrar datos desde versiones con scripts reversibles y pruebas de rollback. | Aceptación: plan de migración con fixtures ficticios y rollback probado. Evidencia: TODO-MIG-001. |
| DR-DATA-008 | Alta | Propuesto | Separar datos de demo, staging y producción. | Aceptación: entornos y secretos separados, sin datos reales en demos públicas. Evidencia: TODO-ENV-001. |
| DR-DATA-009 | Alta | Propuesto | Reemplazar recibos ficticios por documentos fiscales solo tras decisión legal y proveedor aprobado. | Aceptación: diseño fiscal validado. Evidencia: TODO-LEGAL-004, TODO-PAY-002. |
| DR-DATA-010 | Media | Propuesto | Definir exportación y eliminación de cuenta cuando aplique. | Aceptación: pruebas de solicitud, ejecución y evidencia de borrado. Evidencia: TODO-PRIV-004. |

### 7.4 Migración desde el prototipo

[REQUISITO PROPUESTO] La migración productiva no debe importar `localStorage` de testers como dato real. Los datos locales sirven solo como fixtures de diseño y ejemplos de pantalla.

| Paso | Acción propuesta | Dependencia |
| --- | --- | --- |
| MIG-STEP-001 | Congelar schema conceptual y mapear campos actuales a entidades productivas. | TODO-DATA-001 |
| MIG-STEP-002 | Crear fixtures ficticios equivalentes para QA y demos. | TODO-ENV-001 |
| MIG-STEP-003 | Diseñar importación productiva solo desde fuentes autorizadas. | TODO-LEGAL-003 |
| MIG-STEP-004 | Probar migraciones con rollback y auditoría. | TODO-MIG-001 |
| MIG-STEP-005 | Documentar exclusión explícita de datos de navegador público. | TODO-PRIV-002 |

### 7.5 Transición a próximas secciones

Las secciones 8 a 12 se completarán en el siguiente work unit con requisitos no funcionales, aceptación, trazabilidad, riesgos, decisiones abiertas y apéndices. Esta sección 7 deja explícito que los datos locales del prototipo no son una base productiva segura ni migrable sin rediseño.
