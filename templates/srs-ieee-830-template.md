# Plantilla de Especificación de Requisitos de Software (SRS)

> **Estado y derechos**: esta plantilla es una guía original de proyecto para escribir una SRS. No es una plantilla oficial de IEEE, no reproduce el texto del estándar, y no implica conformidad, certificación ni aprobación por IEEE. La referencia oficial de IEEE 830 está en <https://standards.ieee.org/ieee/830/1222/>. Esa página oficial identifica IEEE 830-1998 como reemplazado por ISO/IEC/IEEE 29148:2011. Antes de usar esta guía contractual o regulatoriamente, verificá la norma, edición y licencia vigentes aplicables a tu organización.

> **Cómo usarla**: reemplazá todos los campos entre `{{...}}`, eliminá instrucciones que no apliquen y mantené requisitos verificables. El Markdown es la fuente de verdad; cualquier PDF derivado debe generarse nuevamente desde este archivo.

## 0. Control del documento

| Campo | Valor a completar |
| --- | --- |
| Proyecto | `{{Nombre del producto o sistema}}` |
| Documento | Especificación de Requisitos de Software |
| Código interno | `{{SRS-XXX}}` |
| Dueño del documento | `{{Nombre / rol}}` |
| Estado | `Borrador / En revisión / Aprobado / Obsoleto` |
| Versión | `{{0.1.0}}` |
| Fecha objetivo | `{{AAAA-MM-DD}}` |
| Repositorio o ubicación | `{{URL o ruta interna aprobada}}` |

### 0.1 Aprobaciones

| Rol | Nombre | Criterio de aprobación | Fecha | Firma o evidencia |
| --- | --- | --- | --- | --- |
| Producto | `{{...}}` | Alcance correcto | `{{...}}` | `{{...}}` |
| Ingeniería | `{{...}}` | Factible y verificable | `{{...}}` | `{{...}}` |
| Seguridad / Legal | `{{...}}` | Riesgos aceptados | `{{...}}` | `{{...}}` |

### 0.2 Historial de revisiones

| Versión | Fecha | Autor | Cambio | Motivo | Evidencia |
| --- | --- | --- | --- | --- | --- |
| 0.1.0 | `{{AAAA-MM-DD}}` | `{{...}}` | Borrador inicial | Inicio de especificación | `{{PR, ticket, acta}}` |

### 0.3 Estado de lectura obligatoria

- [ ] Producto revisó objetivos y alcance.
- [ ] Ingeniería revisó factibilidad, interfaces y datos.
- [ ] QA revisó aceptación y trazabilidad.
- [ ] Seguridad/privacidad revisó datos, amenazas y retención.
- [ ] Operaciones revisó observabilidad, soporte y recuperación.

## 1. Introducción

### 1.1 Propósito

`{{Describir por qué existe esta SRS, qué decisión habilita y qué nivel de detalle promete.}}`

### 1.2 Alcance del sistema

`{{Describir qué producto, módulo, servicio, app o integración cubre. Indicar qué queda fuera.}}`

### 1.3 Audiencia

- Lectores primarios: `{{producto, ingeniería, QA, seguridad, negocio}}`.
- Lectores secundarios: `{{soporte, operaciones, proveedores, auditoría}}`.
- Conocimientos asumidos: `{{dominio, regulaciones, plataforma}}`.

### 1.4 Definiciones, acrónimos y abreviaturas

| Término | Definición operacional |
| --- | --- |
| `{{SRS}}` | Documento que expresa requisitos verificables del sistema. |
| `{{Actor}}` | Persona, sistema externo o rol que interactúa con el sistema. |
| `{{...}}` | `{{...}}` |

### 1.5 Referencias

| ID | Referencia | Uso en este documento |
| --- | --- | --- |
| REF-STD-001 | IEEE 830 official page: <https://standards.ieee.org/ieee/830/1222/> | Contexto histórico; verificar edición vigente. |
| REF-STD-002 | `{{Norma vigente o política interna}}` | `{{Cumplimiento, seguridad, accesibilidad}}` |
| REF-PRD-001 | `{{PRD, épica, investigación, contrato}}` | Fuente de alcance y objetivos. |

## 2. Descripción general

### 2.1 Perspectiva del producto

`{{Explicar si el sistema es nuevo, reemplaza otro, se integra con plataformas existentes o forma parte de una suite. Incluir límites de responsabilidad.}}`

### 2.2 Objetivos y métricas de éxito

| Objetivo | Métrica | Meta | Fuente de medición |
| --- | --- | --- | --- |
| `{{Reducir tiempo de tarea}}` | `{{p95 de flujo}}` | `{{≤ X min}}` | `{{analítica, prueba QA}}` |
| `{{Aumentar confiabilidad}}` | `{{tasa de error}}` | `{{≤ Y%}}` | `{{logs, monitoreo}}` |

### 2.3 Stakeholders, usuarios y personas

| Persona / rol | Necesidad | Frecuencia | Riesgo si falla |
| --- | --- | --- | --- |
| `{{Usuario final}}` | `{{...}}` | `{{...}}` | `{{...}}` |
| `{{Operador}}` | `{{...}}` | `{{...}}` | `{{...}}` |
| `{{Sistema externo}}` | `{{...}}` | `{{...}}` | `{{...}}` |

### 2.4 Ambiente operativo

- Plataformas cliente: `{{web, iOS, Android, escritorio, navegador soportado}}`.
- Servicios backend: `{{lenguaje, runtime, regiones, dependencias}}`.
- Datos y almacenamiento: `{{base, caché, archivos, retención}}`.
- Entornos: `{{desarrollo, staging, producción, demo}}`.

### 2.5 Restricciones

- Técnicas: `{{lenguaje, framework, latencia, compatibilidad}}`.
- Negocio: `{{presupuesto, calendario, contrato}}`.
- Seguridad y privacidad: `{{datos sensibles, cifrado, consentimiento}}`.
- Regulatorias: `{{norma, país, industria}}`.
- Operativas: `{{soporte, monitoreo, recuperación}}`.

### 2.6 Supuestos y dependencias

| ID | Supuesto / dependencia | Validación requerida | Dueño | Fecha límite |
| --- | --- | --- | --- | --- |
| DEP-001 | `{{Proveedor X entrega API estable}}` | `{{Contrato / sandbox / prueba}}` | `{{...}}` | `{{...}}` |

### 2.7 Alcance incluido y excluido

**Incluido**

- `{{Capacidad incluida 1}}`
- `{{Capacidad incluida 2}}`

**Excluido**

- `{{Capacidad no incluida 1}}`
- `{{Automatización o integración futura no comprometida}}`

## 3. Contexto del sistema e interfaces externas

### 3.1 Contexto del sistema

`{{Describir actores, sistemas externos, límites de confianza, entradas, salidas y eventos. Incluir un diagrama propio si corresponde.}}`

### 3.2 Interfaces de usuario

| UI | Actor | Propósito | Requisitos asociados |
| --- | --- | --- | --- |
| UI-001 | `{{Usuario}}` | `{{Tarea principal}}` | `{{REQ-...}}` |

Incluir: estados vacíos, errores, carga, confirmaciones, accesibilidad, localización, contenido sensible y restricciones de entrada.

### 3.3 Interfaces de hardware

`{{Sensores, impresoras, terminales, cámaras, dispositivos o “No aplica”. Indicar simulaciones por separado.}}`

### 3.4 Interfaces de software

| Sistema | Dirección | Protocolo | Datos | Fallos esperados |
| --- | --- | --- | --- | --- |
| `{{Sistema externo}}` | Entrada / salida | `{{REST, eventos, archivo}}` | `{{campos}}` | `{{timeout, rechazo, duplicado}}` |

### 3.5 Interfaces de comunicaciones

`{{Redes, TLS, colas, webhooks, formatos, autenticación, reintentos, idempotencia.}}`

## 4. Catálogo de características y casos de uso

| ID | Nombre | Actor principal | Resultado observable | Prioridad | Requisitos |
| --- | --- | --- | --- | --- | --- |
| UC-001 | `{{Nombre del caso}}` | `{{Actor}}` | `{{Resultado}}` | Alta/Media/Baja | `{{REQ-...}}` |

### 4.1 Plantilla de caso de uso

- **ID**: `UC-{{###}}`
- **Nombre**: `{{verbo + objeto}}`
- **Actor primario**: `{{rol}}`
- **Precondiciones**: `{{estado requerido}}`
- **Flujo principal**: `{{pasos numerados}}`
- **Variantes**: `{{alternativas}}`
- **Fallos y recuperación**: `{{errores, mensajes, reintentos}}`
- **Postcondiciones**: `{{estado final verificable}}`
- **Requisitos vinculados**: `{{REQ-...}}`

## 5. Requisitos funcionales

### 5.1 Convención de IDs

Usar IDs estables y semánticos:

- `REQ-F-###` funcional.
- `REQ-BR-###` regla de negocio.
- `REQ-D-###` datos.
- `REQ-NF-###` no funcional.
- `REQ-INT-###` integración/interfaz.
- `REQ-OBS-###` observabilidad.

No renumerar IDs eliminados; marcarlos como `Obsoleto` y conservar trazabilidad.

### 5.2 Plantilla de registro de requisito

| Campo | Contenido |
| --- | --- |
| ID | `REQ-F-001` |
| Título | `{{Capacidad específica}}` |
| Declaración | `El sistema debe {{comportamiento verificable}} cuando {{condición}}.` |
| Rationale | `{{Por qué importa}}` |
| Fuente | `{{Stakeholder, contrato, métrica, incidente}}` |
| Prioridad | `MUST / SHOULD / COULD / WON'T por ahora` |
| Dueño | `{{rol responsable}}` |
| Estado | `Propuesto / Aprobado / Implementado / Verificado / Obsoleto` |
| Dependencias | `{{REQ, sistema, dato, decisión}}` |
| Precondiciones | `{{estado antes}}` |
| Postcondiciones | `{{estado después}}` |
| Criterios de aceptación / fit | `{{prueba objetiva, umbral, evidencia}}` |
| Trazas | `{{UC, diseño, prueba, ticket}}` |
| Evidencia | `{{captura, log, reporte, test}}` |

### 5.3 Ejemplos EasyPark (solo ilustrativos, datos ficticios)

> Estos ejemplos no son requisitos comprometidos. Sirven para mostrar nivel de detalle y redacción verificable.

| Campo | Ejemplo |
| --- | --- |
| ID | REQ-F-URB-001 |
| Título | Bloqueo de duración superior al máximo urbano |
| Declaración | El sistema debe impedir iniciar o extender una sesión urbana ficticia por encima del máximo regulatorio visible de la zona seleccionada. |
| Rationale | Evita que el prototipo sugiera un comportamiento contrario a la regla de zona. |
| Fuente | Flujo de prueba `DRV-DURATION-01` / `DRV-LIMIT-01` |
| Prioridad | MUST |
| Dueño | Producto movilidad |
| Estado | Ejemplo |
| Dependencias | Catálogo de zonas ficticias |
| Precondiciones | Zona ficticia seleccionada y vehículo ficticio confirmado |
| Postcondiciones | Duración queda clamped o extensión rechazada con mensaje visible |
| Criterios de aceptación / fit | Dado un máximo de 120 min, cuando se intenta extender a 150 min, entonces se bloquea la extensión y se conserva la sesión previa |
| Trazas | UC-Urbano, prueba de límite |
| Evidencia | Captura de pantalla y resultado de prueba manual |

| Campo | Ejemplo |
| --- | --- |
| ID | REQ-F-AI-002 |
| Título | Límite asesor del Copilot |
| Declaración | El sistema debe permitir que el Copilot recomiende opciones y derive a detalle, pero debe impedir que el Copilot emita reservas, cobros o recibos por sí mismo. |
| Rationale | Mantiene la verdad transaccional en flujos determinísticos. |
| Fuente | Límite de seguridad del prototipo |
| Prioridad | MUST |
| Dueño | Producto IA |
| Estado | Ejemplo |
| Dependencias | Flujo de detalle y checkout privado |
| Precondiciones | Usuario interactúa con Copilot mediante texto, chips o voz |
| Postcondiciones | Opción reservable deriva a detalle; guía no reservable no entra a checkout |
| Criterios de aceptación / fit | No existe acción del Copilot que cree recibo sin pasar por confirmación determinística |
| Trazas | UC-Copilot, AI-HANDOFF-01 |
| Evidencia | Revisión UI y prueba de handoff |

### 5.4 Checklist de calidad de requisitos

Cada requisito debe ser:

- [ ] Necesario para un objetivo o restricción explícita.
- [ ] No ambiguo para producto, ingeniería y QA.
- [ ] Atómico: expresa una obligación principal.
- [ ] Factible con tecnología y restricciones conocidas.
- [ ] Verificable con prueba, inspección, análisis o demostración.
- [ ] Trazable a fuente, caso de uso, diseño y evidencia.
- [ ] Priorizado y con dueño claro.
- [ ] Neutral a implementación cuando el diseño no está decidido.
- [ ] Compatible con privacidad, seguridad y accesibilidad.

## 6. Reglas de negocio

| ID | Regla | Motivo | Excepciones | Requisitos asociados |
| --- | --- | --- | --- | --- |
| REQ-BR-001 | `{{Regla verificable}}` | `{{Motivo}}` | `{{Ninguna / lista}}` | `{{REQ-F-...}}` |

## 7. Datos, retención y migración

### 7.1 Modelo de datos conceptual

| Entidad | Campos principales | Sensibilidad | Retención | Dueño |
| --- | --- | --- | --- | --- |
| `{{Entidad}}` | `{{campos}}` | Pública / interna / sensible | `{{política}}` | `{{rol}}` |

### 7.2 Calidad, migración y borrado

- Reglas de validación: `{{formatos, unicidad, rangos}}`.
- Migración inicial: `{{fuente, transformación, reconciliación}}`.
- Retención y eliminación: `{{plazos, solicitudes, auditoría}}`.
- Datos de prueba: `{{ficticios, anonimizados, sintéticos}}`.

## 8. Requisitos no funcionales

### 8.1 Performance y capacidad

- `REQ-NF-PERF-001`: El sistema debe `{{responder en X ms para Y percentil bajo Z carga}}`.
- Capacidad esperada: `{{usuarios, eventos, almacenamiento}}`.

### 8.2 Seguridad

- Autenticación y autorización: `{{roles, permisos, sesiones}}`.
- Protección de secretos: `{{gestión, rotación, no exposición}}`.
- Amenazas principales: `{{abuso, fraude, inyección, replay}}`.

### 8.3 Privacidad

- Datos personales: `{{categorías}}`.
- Base legal o consentimiento: `{{si aplica}}`.
- Minimización: `{{datos no recolectados}}`.
- Derechos del usuario: `{{acceso, borrado, exportación}}`.

### 8.4 Disponibilidad y recuperación

- Objetivo de disponibilidad: `{{porcentaje / ventana}}`.
- RPO/RTO: `{{valores}}`.
- Modo degradado: `{{qué sigue funcionando}}`.
- Copias y restauración: `{{prueba y frecuencia}}`.

### 8.5 Usabilidad y accesibilidad

- Estándar o política: `{{WCAG, política interna}}`.
- Navegación por teclado: `{{sí/no, alcance}}`.
- Lectores de pantalla: `{{labels, orden semántico}}`.
- Localización: `{{idiomas, formatos, moneda, fechas}}`.

### 8.6 Mantenibilidad y portabilidad

- Modularidad esperada: `{{fronteras}}`.
- Compatibilidad: `{{versiones, plataformas}}`.
- Configuración: `{{variables, flags, entornos}}`.

### 8.7 Observabilidad

- Logs estructurados: `{{eventos, correlación, privacidad}}`.
- Métricas: `{{latencia, errores, negocio}}`.
- Trazas: `{{fronteras de servicio}}`.
- Alertas: `{{síntomas, severidad, dueños}}`.
- Auditoría: `{{eventos críticos, retención, acceso}}`.

### 8.8 Cumplimiento y auditoría

`{{Normas, controles, evidencias, revisiones y excepciones aceptadas.}}`

## 9. Estrategia de aceptación

| Nivel | Alcance | Evidencia requerida | Responsable |
| --- | --- | --- | --- |
| Revisión de requisitos | Completitud, calidad, trazabilidad | Checklist firmado | Producto + QA |
| Pruebas funcionales | Casos de uso y reglas | Reporte de pruebas | QA |
| Pruebas no funcionales | Seguridad, performance, accesibilidad | Reportes específicos | Especialistas |
| Aceptación de negocio | Objetivos y métricas | Acta o aprobación | Sponsor |

## 10. Matriz de trazabilidad

| Requisito | Fuente | Caso de uso | Diseño / componente | Prueba | Estado | Evidencia |
| --- | --- | --- | --- | --- | --- | --- |
| REQ-F-001 | REF-PRD-001 | UC-001 | `{{...}}` | TEST-001 | Propuesto | `{{...}}` |

## 11. Riesgos, asuntos abiertos y decisiones

### 11.1 Riesgos

| ID | Riesgo | Probabilidad | Impacto | Mitigación | Dueño |
| --- | --- | --- | --- | --- | --- |
| RISK-001 | `{{Riesgo}}` | Baja/Media/Alta | Bajo/Medio/Alto | `{{Plan}}` | `{{rol}}` |

### 11.2 Asuntos abiertos

| ID | Pregunta | Impacto | Fecha necesaria | Dueño |
| --- | --- | --- | --- | --- |
| OPEN-001 | `{{Pregunta}}` | `{{Decisión bloqueada}}` | `{{AAAA-MM-DD}}` | `{{rol}}` |

### 11.3 Decisiones

| ID | Decisión | Alternativas consideradas | Motivo | Fecha | Dueño |
| --- | --- | --- | --- | --- | --- |
| DEC-001 | `{{Decisión}}` | `{{Opciones}}` | `{{Razón}}` | `{{AAAA-MM-DD}}` | `{{rol}}` |

## 12. Apéndices

### 12.1 Bocetos, diagramas o flujos

`{{Enlaces o diagramas propios. No incluir material con derechos sin permiso.}}`

### 12.2 Glosario extendido

`{{Términos adicionales}}`

### 12.3 Lista de verificación previa a aprobación

- [ ] Todos los requisitos tienen ID único.
- [ ] No hay requisitos duplicados o contradictorios.
- [ ] Cada requisito tiene criterio de aceptación.
- [ ] Los requisitos críticos tienen prueba asociada.
- [ ] Las reglas de datos y retención están definidas.
- [ ] Los riesgos abiertos tienen dueño.
- [ ] Las referencias externas están permitidas y vigentes.
- [ ] La versión PDF, si existe, fue generada desde este Markdown.

