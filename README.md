# Prototipo IZI PARK

Prototipo móvil estático en HTML/CSS/JavaScript para validar la experiencia visible de **IZI PARK** antes de elegir una pila productiva. El repositorio, rutas públicas y artefactos históricos conservan el nombre técnico `easypark-prototype` / EasyPark para continuidad de evidencia.

## Alcance

Este prototipo simula:

- una pantalla inicial IZI map-first con entrada prominente de destino ficticio (`HOME-DESTINATION-01`), mapa local (`IZI-MAP-HOME-01`), compositor (`IZI-COPILOT-COMPOSER-01`) y sugerencias (`IZI-ALTERNATIVES-01`);
- un portal dedicado `help.html` con documentación en español, búsqueda local, navegación lateral, accesibilidad básica, propósito, roles, tipos de oferta, límites del Copilot, pagos ficticios, refs estables y cómo enviar feedback en Buzz;
- configuración segura de cuenta con perfil, vehículo, preferencias, tarjeta ficticia de conductor, cuenta de cobro ficticia de anfitrión y datos comerciales de muestra;
- onboarding guiado con rol, verificación simulada mediante código fijo visible, perfil, configuración condicional y derivación al flujo de conductor o anfitrión;
- búsqueda manual del conductor con destino primero, filtros de servicios declarados (`DRV-SERVICES-01`, `DRV-FILTER-STATE-01`), resultados en mapa simulado con panel inferior (`DRV-MAP-SHEET-01`), detalles progresivos (`DRV-PROGRESSIVE-01`) y alternativas mixtas;
- navegación estática simulada (`IZI-NAV-01`, `DRV-NAV-01`) sin GPS, tracking ni proveedor externo;
- llegada diferenciada: orientación para parking tradicional/calle (`IZI-PARKING-ARRIVAL-01`) y llegada a casa reservable (`IZI-HOUSE-ARRIVAL-01`) dentro de `IZI-ARRIVAL-01`;
- hold local de 5 minutos para casas publicadas reservables (`IZI-HOLD-01`, `IZI-HOLD-TIMER-01`) persistido en `iziParkMockHold`, con expiración/cancelación y guardas idempotentes;
- checkout mock preset-only (`IZI-MOCK-CHECKOUT-01`) sin SDK, PAN, CVV, vencimiento, nombre, banco ni credenciales, seguido de confirmación verde (`IZI-BOOKED-01`), recibo (`DRV-RECEIPT-01`) y pase demo (`PARKING-PASS-01`, `PASS-ACCESS-01`, `PASS-QR-01`, `PASS-RULES-01`);
- sesión privada IZI separada (`IZI-SESSION-MAP-01`, `IZI-ACTIVE-SESSION-01`, `IZI-SESSION-TIMER-01`, `DRV-SESSION-01`) persistida en `iziParkMockPrivateSession`, con mapa simulado, countdown, extensión explícita de 30 minutos sin ejecutar ni afirmar un cargo/pago y finalización idempotente con una sola fila de historial;
- dos compositores locales de sesión (`IZI-MAP-COPILOT-01`, `IZI-SESSION-COPILOT-01`) que responden por reglas simples y no pueden extender, finalizar, reembolsar, reservar ni mutar la verdad transaccional;
- Copilot determinístico local, sin API, servidor ni LLM remoto, con historial visible, texto, chips rápidos, dictado y lectura de respuestas cuando el navegador lo permite;
- deducciones editables sobre urgencia, varias paradas, estacionar una vez o mover el auto, tolerancia a caminar, clima/cobertura, vehículo y presupuesto;
- guía sin pago ni reserva privada para opciones no reservables, como parkings tradicionales o calle;
- selección ficticia de zona urbana con código, tipo, vehículo/patente de prueba, duración y máximo regulatorio visible, guardada en el estado legado `easyparkMockSession` sin mezclarse con sesiones privadas;
- actividad con sesión urbana persistida, recibos Express de historial, sesión privada IZI, historial local (`easyparkMockHistory`), estado de pago simulado, recibos automáticos y descarga ficticia;
- entrada/salida automática simulada para parking con barrera compatible, consentimiento de cámara ficticio y fallback manual, sin integración real;
- flujo de incidentes y recuperación (`INCIDENT-HOME-01`, `INCIDENT-TYPE-01`, `INCIDENT-RECOVERY-01`, `INCIDENT-RESULT-01`) con acciones idempotentes, revisión manual simulada y sin reserva, cargo o reembolso real;
- flujo de anfitrión: ubicación, tipo de espacio, servicios/compatibilidad (`PROV-AMENITIES-01`), acceso/reglas (`PROV-ACCESS-01`), disponibilidad, tarifa, cobro y revisión;
- flujo de operación: panel, publicaciones pendientes, incidentes (`OPS-INCIDENTS-01`), triage (`OPS-TRIAGE-01`), resolución simulada (`OPS-RESOLUTION-01`) y liquidaciones manuales;
- etiquetas visibles como `HOME-DESTINATION-01`, `HELP-PORTAL-01`, `ACCOUNT-PAYMENT-01`, `ONB-VERIFY-01`, `DRV-ZONE-01`, `SESSION-ACTIVE-01`, `ACTIVITY-HISTORY-01`, `EXPRESS-CONSENT-01`, `AI-CHAT-01`, `DRV-RESULTS-01`, `DRV-MAP-SHEET-01`, `IZI-HOLD-01`, `IZI-SESSION-MAP-01`, `IZI-SESSION-COPILOT-01`, `DRV-STATUS-TIMELINE-01`, `PARKING-PASS-01`, `INCIDENT-HOME-01`, `PROV-TARIFF-01` y `OPS-PENDING-01` para pedir cambios precisos en Buzz.

## Seguridad y límites

No tiene servidor, credenciales productivas, integración real de pagos, SMS real, cámaras, operadores, control municipal, fiscalización, inferencia remota, mapas remotos, GPS, geolocalización, tracking, disponibilidad en vivo ni datos persistentes de servidor. No ingreses datos reales de tarjeta, PAN, CVV, vencimiento, cuenta bancaria/CBU/CVU, identificación fiscal, patente, ubicación, datos de cámara, claves ni secretos. Las tarjetas, cuentas de cobro y datos fiscales son opciones fijas o muestras enmascaradas; se guardan solo metadatos ficticios en `localStorage`.

El dictado usa SpeechRecognition/webkitSpeechRecognition del navegador cuando está disponible; IZI PARK no almacena audio y el proveedor/plataforma del navegador puede depender de red. El Copilot es asesor: puede explicar opciones y derivar a detalle, pero no reserva, no cobra, no emite recibos, no extiende/finaliza sesiones y no modifica la verdad transaccional. La reserva, el recibo y la sesión privada simulados ocurren únicamente en el flujo determinístico con hold vigente, checkout mock aceptado y casa publicada reservable. Street guidance y parking tradicional son orientación: no crean hold, pago, recibo, pase ni sesión privada.

## Fuente autorizada IZI PARK

La experiencia visual actual se reconcilió con el documento local **`IZI PARK - Product Strategy - V2.pdf`** (SHA-256 `d6da2f3ef6dcfbce83ab8b1cb80ee239656af9d0ec57353dc5899b289ca5aacc`, 17 páginas). Las pantallas de referencia de páginas 6–17 tienen contraparte explícita: páginas 6–8 home/mapa/compositor/sugerencias, 9 alternativas mixtas, 10 navegación estática, 11 llegada parking/tradicional, 12 llegada casa reservable, 13 hold de 5 minutos, 14 checkout seguro, 15 confirmación, 16 mapa de sesión activa y 17 detalle/countdown/extender/finalizar. El equipo/usuario confirmó autorización para implementar esta referencia en el prototipo. El PDF no se distribuye, no se enlaza, no se carga en runtime y no se copian identidades propietarias externas ni assets ajenos.

## Investigación de referencia

Se usaron conceptos públicos de EasyPark España solo como inspiración histórica de patrones de producto: onboarding móvil breve, verificación telefónica, registro de vehículo, medio de pago, selección de zona, control de sesión, historial/recibos, entrada/salida automática y administración de cuenta de negocio. Esas URLs se preservan como evidencia comparativa pública; la marca visible actual del prototipo es IZI PARK y la fuente visual autorizada es el PDF local descrito arriba.

Referencias consultadas:

- https://www.easypark.com/es-es
- https://www.easypark.com/es-es/ayuda/empieza-a-aparcar-con-easypark/configuracion-de-la-cuenta-como-crear-tu-cuenta--26776175036572
- https://www.easypark.com/es-es/como-funciona

## Media local y licencias

Las composiciones visuales usan SVG locales de OpenMoji 17.0.0 y CSS propio. No hay recursos remotos en runtime. Los SVG se descargaron sin cambios desde URLs versionadas/pineadas, con licencia en `assets/openmoji/LICENSE.txt` y atribución/hashes SHA-256 en `assets/openmoji/ATTRIBUTION.md`. Las animaciones respetan `prefers-reduced-motion: reduce` y conservan alternativa estática.

## Portal de ayuda

Abrí `help.html` para una documentación dedicada con arquitectura tipo documentación cloud: encabezado fijo, breadcrumb, enlace de vuelta al prototipo, menú lateral con grupos anidados, tabla de contenido, búsqueda/filtro local sin red, estado vacío, foco visible, landmarks semánticos, menú móvil y soporte de movimiento reducido. Cubre proyecto, fuente autorizada, cómo probar, destino primero, mapa/panel de resultados, navegación, llegada, hold, checkout, confirmación, recibo/pase, sesión activa, incidentes, media/licencias, todos los casos de uso actuales y guía para creadores.

## Recursos SRS

La sección “Para creadores” incluye dos familias de artefactos SRS en español. Son enlaces relativos del repositorio y su disponibilidad pública depende de aprobación final, push y publicación.

### Plantilla reutilizable en blanco

- Fuente editable: `templates/srs-ieee-830-template.md`
- PDF derivado: `templates/srs-ieee-830-template.pdf`
- Uso: copiar, completar placeholders y adaptar a otro proyecto.

Para regenerar el PDF en blanco con los valores por defecto ejecutá:

```bash
python3 scripts/generate-srs-pdf.py
```

### Referencia IZI PARK / EasyPark completada

- Fuente completada: `templates/easypark-srs-reference.md`
- PDF derivado: `templates/easypark-srs-reference.pdf`
- PDF actual: 116.876 bytes, 38 páginas, SHA-256 `0311075a52266771bd00ce018bce8b1323143edc0b5b7cf897080b435103d134`
- Markdown actual: 93.751 bytes, SHA-256 `6c9e41e688761502b1b19b6a5fbf40c2bdf532546f777882ccd623d5a45089a2`
- Uso: ejemplo de trabajo con etiquetas de estado, refs visibles, requisitos estables, TODOs explícitos y límites de prototipo. No reemplaza aprobación humana ni autoriza producción.

Para regenerar el PDF completado con metadatos explícitos ejecutá:

```bash
python3 scripts/generate-srs-pdf.py --source templates/easypark-srs-reference.md --output templates/easypark-srs-reference.pdf --title 'SRS IZI PARK / EasyPark - borrador completado de referencia' --subject 'Especificación de requisitos IZI PARK en elaboración'
```

### Workbook para Product Owners

- Artefacto importable: `templates/izi-park-product-owner-workbook.xlsx`
- Generador determinístico: `scripts/generate-po-workbook.py`
- XLSX actual: 363.331 bytes, SHA-256 `aad43078d09cf74df551816fc35986e6d2438518be28d475fe94dca0a087b639`

El workbook es una ayuda de planificación para Product Owners y no reemplaza el SRS aprobado ni la verdad de producto. Contiene ejemplos ficticios; no ingreses teléfonos, patentes, ubicaciones, pagos, credenciales, secretos ni datos personales reales. Está preparado para importarse en Google Sheets, pero la fidelidad completa queda pendiente hasta observar una importación manual.

Modelo exacto de cuatro hojas:

1. `Casos de uso`: una fila por caso de uso, con objetivo, actores, disparador, precondiciones, resultados, alcance, prioridad, estado, responsable, criterios y refs.
2. `Flujos`: una fila por paso principal, alternativo o de excepción; los pasos alternativos/excepciones referencian su `Paso_Origen`.
3. `Requerimientos`: una fila por requerimiento verificable, clasificado como `RF`, `RN`, `RNF`, `RD` o `INT`.
4. `Matriz`: una relación normalizada muchos-a-muchos por fila entre requerimiento, caso de uso y opcionalmente paso. Esta matriz puede convertirse en una tabla dinámica de Google Sheets, por lo que no impone un límite fijo de columnas de casos de uso.

Convenciones de edición:

- Encabezado naranja oscuro: campo obligatorio. Encabezado azul: campo opcional.
- La fila 6 es un ejemplo ficticio alineado entre las cuatro hojas (`CU-EJEMPLO-001`, `REQ-EJEMPLO-001`, `FL-EJEMPLO-001`, `REL-EJEMPLO-001`).
- Las columnas de cobertura usan fórmulas `COUNTIF`/`IF` para detectar vínculos de matriz; las clasificaciones controladas usan dropdowns.
- Usá IDs separados por coma solo en campos explícitamente multi-ID, como `Requerimientos_IDs`, `Reglas_Negocio_IDs` o `Referencias_Visuales`; la hoja `Matriz` debe mantener una relación por fila.

Orden sugerido de completado:

1. Definir requerimientos verificables.
2. Completar casos de uso de negocio.
3. Desglosar pasos de flujo principales, alternativos y de excepción.
4. Cargar la matriz de trazabilidad una relación por fila.
5. Revisar cobertura hasta que casos y requerimientos esperados queden vinculados.

Para regenerar el workbook en la ruta por defecto ejecutá:

```bash
python3 scripts/generate-po-workbook.py
```

Para generar una copia de verificación dentro del repositorio:

```bash
python3 scripts/generate-po-workbook.py --output templates/po-workbook-verify.xlsx
```

Importación sugerida en Google Sheets: crear o abrir una hoja, usar Archivo → Importar → Subir, seleccionar `templates/izi-park-product-owner-workbook.xlsx` y revisar hojas, dropdowns, fórmulas y filtros antes de adoptarlo como insumo formal.

Generador determinístico: `scripts/generate-srs-pdf.py`. Requisito local: `reportlab` instalado para Python. El Markdown es la fuente de verdad; cada PDF se deriva de su Markdown correspondiente. Estos recursos son guías originales de proyecto inspiradas en preocupaciones clásicas de SRS/IEEE 830, no son plantillas oficiales IEEE ni certifican conformidad. La página oficial de IEEE 830-1998 indica que fue reemplazada por ISO/IEC/IEEE 29148:2011; verificá siempre la norma y edición vigentes.

## Etiquetas de referencia

Las etiquetas rojas son parte intencional del prototipo. Usalas en Buzz, por ejemplo: `Cambiar IZI-SESSION-TIMER-01 para aclarar el final de sesión`. Son referencias estables del prototipo, no texto final para clientes. El prototipo incluye un botón para mostrarlas u ocultarlas y el portal documenta el catálogo de prefijos.

## Ejecutar localmente

Abrí `index.html` en un navegador. Para la documentación completa, abrí `help.html` o el enlace “Ayuda” del prototipo. Para reiniciar pruebas, usá la consola del navegador y ejecutá `localStorage.clear()`; esto borra tanto claves legadas `easypark...` como las claves IZI `iziParkMockHold` y `iziParkMockPrivateSession`.
