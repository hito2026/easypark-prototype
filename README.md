# Prototipo EasyPark

Prototipo móvil en HTML/CSS/JavaScript para validar flujos de EasyPark antes de elegir la pila de implementación productiva.

## Alcance

Este prototipo simula:

- una pantalla inicial orientada al conductor con entrada prominente de destino ficticio (`HOME-DESTINATION-01`) y accesos secundarios agrupados para anfitriones, operación, ayuda, cuenta y onboarding;
- un portal dedicado `help.html` con documentación en español, búsqueda local, navegación lateral, accesibilidad básica, propósito, roles, tipos de oferta, límites del Copilot, pagos ficticios y cómo enviar feedback en Buzz;
- configuración segura de cuenta con perfil, vehículo, preferencias, tarjeta ficticia de conductor, cuenta de cobro ficticia de anfitrión y datos comerciales de muestra;
- onboarding guiado con rol, verificación simulada mediante código fijo visible, perfil, configuración condicional y derivación al flujo de conductor o anfitrión;
- búsqueda manual del conductor con destino primero, filtros de servicios declarados (`DRV-SERVICES-01`, `DRV-FILTER-STATE-01`), resultados en mapa simulado con panel inferior (`DRV-MAP-SHEET-01`), detalles progresivos (`DRV-PROGRESSIVE-01`), flujo urbano ordinario con zona ficticia, o asistencia con EasyPark Copilot;
- Copilot determinístico local, sin API, servidor ni LLM, con historial visible, texto, chips rápidos, dictado y lectura de respuestas cuando el navegador lo permite;
- deducciones editables sobre urgencia, varias paradas, estacionar una vez o mover el auto, tolerancia a caminar, clima/cobertura, vehículo y presupuesto;
- tres estrategias explicables: rápida, estratégica y económica, con ventajas, límites e incertidumbre;
- traspaso desde una recomendación reservable publicada al flujo existente de detalle → pago ficticio → confirmación compacta → línea de estado simulada (`DRV-STATUS-TIMELINE-01`) → recibo → pase de estacionamiento demo → sesión activa (`PARKING-PASS-01`, `PASS-ACCESS-01`, `PASS-QR-01`, `PASS-RULES-01`);
- guía sin pago ni reserva privada para opciones no reservables, como parkings tradicionales o calle;
- selección ficticia de zona urbana con código, tipo, vehículo/patente de prueba, duración y máximo regulatorio visible;
- sesión activa expandida con estado, zona/espacio, vehículo, inicio/fin, recordatorios, confirmación de operador/control ficticia, extensión limitada, finalización temprana e historial/recibos;
- actividad con sesiones actuales/pasadas, estado de pago simulado, recibos automáticos y descarga ficticia;
- entrada/salida automática simulada para parking con barrera compatible, consentimiento de cámara ficticio y fallback manual, sin integración real;
- flujo de incidentes y recuperación (`INCIDENT-HOME-01`, `INCIDENT-TYPE-01`, `INCIDENT-RECOVERY-01`, `INCIDENT-RESULT-01`) con acciones idempotentes, revisión manual simulada y sin reserva, cargo o reembolso real;
- flujo de anfitrión: ubicación, tipo de espacio, servicios/compatibilidad (`PROV-AMENITIES-01`), acceso/reglas (`PROV-ACCESS-01`), disponibilidad, tarifa, cobro y revisión;
- flujo de operación: panel, publicaciones pendientes, incidentes (`OPS-INCIDENTS-01`), triage (`OPS-TRIAGE-01`), resolución simulada (`OPS-RESOLUTION-01`) y liquidaciones manuales;
- selección segura de medio de pago con tarjetas fijas de prueba, persistiendo solo marca y últimos cuatro dígitos ficticios;
- recibo automático ficticio y sesión activa después de una confirmación simulada;
- cocheras creadas por anfitriones en el algoritmo local de selección/ranking;
- etiquetas visibles como `HOME-DESTINATION-01`, `HELP-PORTAL-01`, `ACCOUNT-PAYMENT-01`, `ONB-VERIFY-01`, `DRV-ZONE-01`, `SESSION-ACTIVE-01`, `ACTIVITY-HISTORY-01`, `EXPRESS-CONSENT-01`, `AI-CHAT-01`, `DRV-RESULTS-01`, `DRV-MAP-SHEET-01`, `DRV-PROGRESSIVE-01`, `DRV-STATUS-TIMELINE-01`, `PARKING-PASS-01`, `INCIDENT-HOME-01`, `PROV-TARIFF-01` y `OPS-PENDING-01` para pedir cambios precisos en Buzz.

## Seguridad y límites

No tiene servidor, credenciales productivas, integración real de pagos, SMS real, cámaras, operadores, control municipal, fiscalización, inferencia remota ni datos persistentes de servidor. No ingreses datos reales de tarjeta, CVV, cuenta bancaria/CBU/CVU, identificación fiscal, patente, ubicación, datos de cámara, claves ni secretos. Las tarjetas, cuentas de cobro y datos fiscales son opciones fijas o muestras enmascaradas; se guardan solo metadatos ficticios en `localStorage`.

El dictado usa SpeechRecognition/webkitSpeechRecognition del navegador cuando está disponible; EasyPark no almacena audio. El Copilot es asesor: puede explicar opciones y derivar a detalle, pero no reserva, no cobra, no emite recibos y no modifica la verdad transaccional. La reserva y el recibo simulados ocurren únicamente en el flujo determinístico de confirmación. El mapa del conductor, la hoja inferior, la línea de estado, el pase, los filtros de servicios y la recuperación de incidentes son ayudas de prototipo: no prueban disponibilidad, no sustituyen normas del lugar y no generan cargos, reembolsos, bloqueos, tickets reales, GPS, tracking ni atención operativa.

## Investigación de referencia

Se usaron conceptos públicos de EasyPark España solo como inspiración de patrones de producto: onboarding móvil breve, verificación telefónica, registro de vehículo, medio de pago, selección de zona, control de sesión, historial/recibos, entrada/salida automática y administración de cuenta de negocio. La experiencia de conductor adapta patrones generales de usabilidad de movilidad —destino primero, mapa contextual, acción dominante y divulgación progresiva— sin copiar identidad, marca, textos, íconos, layout exacto ni trade dress de competidores.

Referencias consultadas:

- https://www.easypark.com/es-es
- https://www.easypark.com/es-es/ayuda/empieza-a-aparcar-con-easypark/configuracion-de-la-cuenta-como-crear-tu-cuenta--26776175036572
- https://www.easypark.com/es-es/como-funciona

## Media local y licencias

Las composiciones visuales usan SVG locales de OpenMoji 17.0.0 y CSS propio. No hay recursos remotos en runtime. Los SVG se descargaron sin cambios desde URLs versionadas/pineadas, con licencia en `assets/openmoji/LICENSE.txt` y atribución/hashes SHA-256 en `assets/openmoji/ATTRIBUTION.md`. Las animaciones respetan `prefers-reduced-motion: reduce` y conservan alternativa estática.

## Portal de ayuda

Abrí `help.html` para una documentación dedicada con arquitectura tipo documentación cloud: encabezado fijo, breadcrumb, enlace de vuelta al prototipo, menú lateral con grupos anidados, tabla de contenido, búsqueda/filtro local sin red, estado vacío, foco visible, landmarks semánticos, menú móvil y soporte de movimiento reducido. Cubre proyecto, cómo probar, destino primero, mapa/panel de resultados, detalles progresivos, línea de estado simulada, pase/servicios/incidentes, media/licencias, todos los casos de uso actuales y guía para creadores.

## Plantilla SRS

La sección “Para creadores” incluye descargas de una plantilla original en español para Especificación de Requisitos de Software:

- Fuente editable: `templates/srs-ieee-830-template.md`
- PDF derivado: `templates/srs-ieee-830-template.pdf`
- Generador determinístico: `scripts/generate-srs-pdf.py`

Para regenerar el PDF ejecutá:

```bash
python3 scripts/generate-srs-pdf.py
```

Requisito local: `reportlab` instalado para Python. El Markdown es la fuente de verdad; el PDF se deriva de ese archivo. La plantilla es guía de proyecto inspirada en preocupaciones clásicas de SRS/IEEE 830, no es plantilla oficial IEEE ni certifica conformidad. La página oficial de IEEE 830-1998 indica que fue reemplazada por ISO/IEC/IEEE 29148:2011; verificá siempre la norma y edición vigentes.

## Etiquetas de referencia

Las etiquetas rojas son parte intencional del prototipo. Usalas en Buzz, por ejemplo: `Cambiar EXPRESS-CONSENT-01 para aclarar que no usa cámara real`. Son referencias estables del prototipo, no texto final para clientes. El prototipo incluye un botón para mostrarlas u ocultarlas y el portal documenta el catálogo de prefijos.

## Ejecutar localmente

Abrí `index.html` en un navegador. Para la documentación completa, abrí `help.html` o el enlace “Ayuda” del prototipo.
