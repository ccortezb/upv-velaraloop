# De Chat a Agente — Guía de Inicio (sin codear)

> **VelaraLoop Academy · Track A (AI Fluency) + Inicio Track B**
> "Entiende la AI. Domina los coding agents. Sin codear. Sin miedo."

---

## 1. La frase que quita el miedo

> **"No necesitas programar. Necesitas especificar."**

Un **coding agent** no es una herramienta para programadores. Es un **asistente que ejecuta tareas** cuando le dices exactamente qué quieres, con qué datos, en qué formato y con qué límites. Tú no escribes el código: tú escribes la **instrucción clara**. El agente hace el resto.

Si sabes pedirle a un asistente humano que haga un trabajo — con contexto, criterios y entregable — ya sabes lo que necesitas. Esto es lo mismo, con un agente.

---

## 2. Qué es un coding agent (en 1 minuto, sin código)

Un coding agent es un programa que:

| Lo hace | Ejemplo |
|---------|---------|
| **Lee archivos** de tu computadora (CSV, Excel, PDF, docs) | "Revisa el archivo `ventas.xlsx`" |
| **Ejecuta tareas** (no solo responde) | "Genera el reporte semanal de ventas" |
| **Crea resultados** (reportes, archivos, resúmenes) | "Guárdame el resultado como `reporte-semana-38.md`" |
| **Se conecta a herramientas** (internet, APIs, apps) | "Busca precios de la competencia" |

**La diferencia con el chat (ChatGPT/Claude):**

| | Chat (ya lo usas) | Coding Agent (lo que aprenderás) |
|---|-------------------|-----------------------------------|
| Te responde | ✅ | ✅ |
| Lee tus archivos | 🟡 (solo si los subes) | ✅ (los ve en tu carpeta) |
| **Ejecuta** el trabajo | ❌ te da texto | ✅ crea el entregable |
| Trabaja en tu contexto | ❌ | ✅ |
| Puedes re-ejecutar con un cambio | ❌ copias todo | ✅ cambias 1 línea y repites |

### El mismo ejemplo:

**Chat:** *"Resume estas ventas."* → te devuelve un texto que tú copias, pegas y das formato.

**Agente:** *"Lee ventas.xlsx, calcula ventas por producto y por vendedor, genera un reporte con tabla y top 5, guárdalo como reporte-semana-38.md."* → el agente lo hace y te entrega el archivo listo.

---

## 3. El miedo más común y por qué no aplica

| Miedo | Realidad |
|-------|----------|
| "Voy a romper algo" | Empiezas en una **carpeta de prueba**; nada se rompe |
| "Tengo que aprender a programar" | No. Especificas, no programas |
| "Es solo para developers" | Los agents leen/escriben archivos, no solo código |
| "No sé ni por dónde empezar" | Esta guía te lleva paso a paso en <30 min |
| "Va a hacer algo incorrecto" | Tú defines los criterios de éxito y **verificas** antes de usar |

---

## 4. Qué necesitas (3 cosas)

1. **Una carpeta de trabajo** — crea `MiAutomatizacion/` en tu escritorio. Ahí vivirá todo.
2. **Un agente** — elige uno de abajo según tu contexto.
3. **Una tarea concreta** — algo que haces cada semana y te quita tiempo.

### Cómo elegir agente (sin saber programar)

| Agente | Para ti si... | Nota |
|--------|---------------|------|
| **Kiro** | Ya usas Kiro / equipo con Kiro | CLI, funciona en tu carpeta |
| **Claude Code** | Usas Claude y quieres un agente simple | Muy conversacional, instala con 1 comando |
| **OpenCode** | Prefieres open source / gratis | Alternativa libre, similar a Claude Code |
| **Cursor** | Quieres ventana con botones (menos terminal) | App con interfaz gráfica |

> **No importa cuál elijas.** El método es el mismo: le dices la tarea, él la ejecuta. Esta guía usa ejemplos genéricos que funcionan en cualquiera.

---

## 5. Setup paso a paso (10-20 min)

### Paso 1: Crea tu carpeta de prueba

```
MiAutomatizacion/
└── (vacía por ahora — aquí entren los datos)
```

### Paso 2: Pon tus datos ahí

Copia a `MiAutomatizacion/` los archivos que usarás (ventas.xlsx, facturas.csv, CVs, etc.). **Regla de oro:** usa una **copia** con datos de prueba, nunca el original.

### Paso 3: Abre el agente en esa carpeta

- **Claude Code / OpenCode:** `cd MiAutomatizacion` y lanza `claude` o `opencode`. Se abre un chat dentro de tu carpeta.
- **Cursor:** "Abre carpeta" → selecciona `MiAutomatizacion` → se abre la ventana.
- **Kiro:** `kiro` (o el comando de tu setup) dentro de `MiAutomatizacion`.

### Paso 4: Primer comando (probemos que ve tu carpeta)

Pega esto:

```
¿Qué archivos hay en esta carpeta? Lista cada archivo con su nombre y tamaño. No cambies nada.
```

El agente debe listarte lo que hay. **Si ve tus archivos, ya estás listo.**

### Paso 5: Tu primera tarea real (plantilla)

```
Carpeta: MiAutomatizacion/
Tarea: [describe TU tarea]
Datos: [qué archivo usar y qué contiene]
Quiero que hagas: [1-2-3 pasos claros]
Entregable: [qué formato, guardarlo como archivo X]
Criterios de éxito: [cómo sé que quedó bien]
Límites: [qué NO debes hacer / tocar]
Verificación: [antes de guardar, muéstrame el resultado]
```

> Si el resultado no es lo que querías: no reinicies. **Dile qué ajustar** ("el formato de la tabla no, mejor por vendedor", "incluye totales"). Iterar es normal.

---

## 6. Cómo NO romper nada (reglas de oro)

1. **Copia de prueba:** nunca trabajes sobre el archivo original. Copia a `MiAutomatizacion/`.
2. **Carpeta aislada:** el agente solo toca lo que está en su carpeta (y lo que le autorizas).
3. **Pide ver antes de guardar:** "muéstrame el resultado antes de escribir el archivo".
4. **Datos sensibles:** no subas datos personales/clientes reales sin máscara. Usa datos ficticios en pruebas.
5. **Revisa siempre:** el agente puede equivocarse. Tu trabajo es **verificar** el resultado contra tus criterios.

---

## 7. Siguiente paso (Track B)

Ya diste el primer paso: pasaste de "preguntar" a "delegar". Los siguientes módulos profundizan:

- `soy-tarea` — convertir cualquier tarea tuya en especificación (el SoW de tarea)
- `automatiza-reportes` — reportes y análisis
- `automatiza-datos` — CSV/Excel
- `automatiza-docs` — documentación, minutas, propuestas
- `automatiza-research` — investigación y comparativas
- `governance-basico` — revisar, versionar, controlar

**Guías por rol disponibles:**
- [Finanzas](rol-finanzas.md) · [Operaciones](rol-operaciones.md) · [Marketing](rol-marketing.md) · [Legal](rol-legal.md) · [RRHH](rol-rrhh.md) · [PO/PM](po-pm.md)

---

## 8. Checklist de inicio

- [ ] Creé `MiAutomatizacion/` y puse una copia de prueba de mis datos
- [ ] Instalé/abí mi agente en esa carpeta
- [ ] El agente listó mis archivos (Paso 4)
- [ ] Hice mi primera tarea con la plantilla (Paso 5)
- [ ] Verifiqué el resultado contra mis criterios

---

*Parte de VelaraLoop Academy — upvelara.com · "No necesitas programar. Necesitas especificar."*