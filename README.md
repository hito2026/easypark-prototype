# Prototipo EasyPark

Prototipo móvil en HTML/CSS/JavaScript para validar flujos de EasyPark antes de elegir la pila de implementación productiva.

## Alcance

Este prototipo simula:

- una pantalla inicial guiada con casos de uso para conductores, anfitriones de cocheras, operación EasyPark, ayuda, cuenta y onboarding;
- un centro de ayuda del proyecto con propósito, roles, tipos de oferta, límites del Copilot, pagos ficticios y cómo enviar feedback en Buzz;
- configuración segura de cuenta con perfil, vehículo, preferencias, tarjeta ficticia de conductor, cuenta de cobro ficticia de anfitrión y datos comerciales de muestra;
- onboarding guiado con rol, verificación simulada mediante código fijo visible, perfil, configuración condicional y derivación al flujo de conductor o anfitrión;
- búsqueda manual del conductor o asistencia con EasyPark Copilot;
- Copilot determinístico local, sin API, servidor ni LLM, con historial visible, texto, chips rápidos, dictado y lectura de respuestas cuando el navegador lo permite;
- deducciones editables sobre urgencia, varias paradas, estacionar una vez o mover el auto, tolerancia a caminar, clima/cobertura, vehículo y presupuesto;
- tres estrategias explicables: rápida, estratégica y económica, con ventajas, límites e incertidumbre;
- traspaso desde una recomendación reservable publicada al flujo existente de detalle → pago ficticio → confirmación → recibo → sesión activa;
- guía sin pago ni reserva para opciones no reservables, como parkings tradicionales o calle;
- flujo de anfitrión: ubicación, tipo de espacio, disponibilidad, tarifa, cobro y revisión;
- flujo de operación: panel, publicaciones pendientes, incidentes y liquidaciones manuales;
- selección segura de medio de pago con tarjetas fijas de prueba, persistiendo solo marca y últimos cuatro dígitos ficticios;
- recibo automático ficticio y sesión activa después de una confirmación simulada;
- cocheras creadas por anfitriones en el algoritmo local de selección/ranking;
- etiquetas visibles como `HELP-HOME-01`, `ACCOUNT-PAYMENT-01`, `ONB-VERIFY-01`, `AI-CHAT-01`, `DRV-RESULTS-01`, `PROV-TARIFF-01` y `OPS-PENDING-01` para pedir cambios precisos en Buzz.

## Seguridad y límites

No tiene servidor, credenciales productivas, integración real de pagos, SMS real, inferencia remota ni datos persistentes de servidor. No ingreses datos reales de tarjeta, CVV, cuenta bancaria/CBU/CVU, identificación fiscal, claves ni secretos. Las tarjetas, cuentas de cobro y datos fiscales son opciones fijas o muestras enmascaradas; se guardan solo metadatos ficticios en `localStorage`.

El dictado usa SpeechRecognition/webkitSpeechRecognition del navegador cuando está disponible; EasyPark no almacena audio. El Copilot es asesor: puede explicar opciones y derivar a detalle, pero no reserva, no cobra, no emite recibos y no modifica la verdad transaccional. La reserva y el recibo simulados ocurren únicamente en el flujo determinístico de confirmación.

## Investigación de referencia

Se usaron conceptos públicos de EasyPark España solo como inspiración de patrones de producto: onboarding móvil breve, verificación telefónica, registro de vehículo, medio de pago, control de sesión, historial/recibos y administración de cuenta de negocio. No se copian textos, imágenes, íconos, marca visual ni trade dress.

Referencias consultadas:

- https://www.easypark.com/es-es
- https://www.easypark.com/es-es/ayuda/empieza-a-aparcar-con-easypark/configuracion-de-la-cuenta-como-crear-tu-cuenta--26776175036572

## Etiquetas de referencia

Las etiquetas rojas son parte intencional del prototipo. Usalas en Buzz, por ejemplo: `Cambiar HELP-FEEDBACK-01 para explicar mejor cómo reportar bugs`. Son referencias estables del prototipo, no texto final para clientes. El prototipo incluye un botón para mostrarlas u ocultarlas.

## Ejecutar localmente

Abrí `index.html` en un navegador.
