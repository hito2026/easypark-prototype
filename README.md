# Prototipo EasyPark

Prototipo móvil en HTML/CSS/JavaScript para validar flujos de EasyPark antes de elegir la pila de implementación productiva.

## Alcance

Este prototipo simula:

- una pantalla inicial guiada con casos de uso para conductores, anfitriones de cocheras y operación EasyPark;
- búsqueda manual del conductor o asistencia con EasyPark Copilot;
- Copilot determinístico local, sin API, servidor ni LLM, con historial visible, texto, chips rápidos, dictado y lectura de respuestas cuando el navegador lo permite;
- deducciones editables sobre urgencia, varias paradas, estacionar una vez o mover el auto, tolerancia a caminar, clima/cobertura, vehículo y presupuesto;
- tres estrategias explicables: rápida, estratégica y económica, con tradeoffs e incertidumbre;
- traspaso desde una recomendación reservable publicada al flujo existente de detalle → pago ficticio → confirmación → recibo → sesión activa;
- guía sin pago ni reserva para opciones no reservables, como parkings tradicionales o calle;
- flujo de anfitrión: ubicación, tipo de espacio, disponibilidad, tarifa, cobro y revisión;
- flujo de operación: panel, publicaciones pendientes, incidentes y liquidaciones manuales;
- selección segura de medio de pago con tarjetas fijas de prueba, persistiendo solo marca y últimos cuatro dígitos ficticios;
- recibo automático ficticio y sesión activa después de una confirmación simulada;
- cocheras creadas por anfitriones en el algoritmo local de selección/ranking;
- etiquetas visibles como `AI-CHAT-01`, `AI-STRATEGY-01`, `DRV-RESULTS-01`, `PROV-TARIFF-01` y `OPS-PENDING-01` para pedir cambios precisos en Buzz.

No tiene servidor, credenciales productivas, integración real de pagos, inferencia remota ni datos persistentes de servidor. No ingreses datos reales de tarjeta: las tarjetas son opciones fijas de prueba y solo se guardan metadatos ficticios de marca/últimos cuatro dígitos en `localStorage`. El dictado usa SpeechRecognition/webkitSpeechRecognition del navegador cuando está disponible; EasyPark no almacena audio.

El Copilot es asesor: puede explicar opciones y derivar a detalle, pero no reserva, no cobra, no emite recibos y no modifica la verdad transaccional. La reserva y el recibo simulados ocurren únicamente en el flujo determinístico de confirmación.

## Etiquetas de referencia

Las etiquetas rojas son parte intencional del prototipo. Usalas en Buzz, por ejemplo: `Cambiar AI-EXPLAIN-01 para explicar mejor la lluvia`. Son referencias estables del prototipo, no texto final para clientes. El prototipo incluye un botón para mostrarlas u ocultarlas.

## Ejecutar localmente

Abrí `index.html` en un navegador.
