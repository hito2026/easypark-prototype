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

[FUERA DE ALCANCE ACTUAL] Este borrador no especifica todavía las secciones 4 a 12 de requisitos funcionales detallados, datos, NFR, aceptación, trazabilidad, riesgos y apéndices. Esas secciones se incorporarán en T003.

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

- TODO-LEGAL-001: jurisdicción, responsabilidad y términos.
- TODO-PRIV-001: política de privacidad y retención.
- TODO-SEC-001: modelo de amenazas y controles mínimos.
- TODO-OPS-001: operación, soporte y escalamiento.
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

**Incluido en este borrador T002**

- Control documental y aviso legal.
- Propósito, alcance, audiencia, glosario y referencias.
- Perspectiva del producto, objetivos propuestos, roles, ambiente, restricciones, supuestos y alcance.
- Contexto del sistema, límites de confianza e interfaces externas actuales y propuestas.

**Excluido hasta T003**

- Catálogo completo de casos de uso.
- Requisitos funcionales atomizados.
- Reglas de negocio detalladas.
- Modelo conceptual de datos.
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

### 3.8 Nota de cierre de T002

Este documento termina deliberadamente en la sección 3 para mantener el trabajo revisable. Las secciones 4 a 12 —catálogo de características, requisitos funcionales, reglas de negocio, datos, requisitos no funcionales, aceptación, trazabilidad, riesgos, decisiones abiertas y apéndices— se agregarán en el siguiente work unit T003.
