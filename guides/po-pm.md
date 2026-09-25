# Guía PO/PM — Del chat a los coding agents (tu semana, no solo tu producto)

> **VelaraLoop Academy · Track B**
> Para Product Owners / Product Managers que ya usan VelaraLoop para entregar productos.

---

## 1. Esto ya lo conoces (una parte)

Si eres PO/PM con VelaraLoop, ya sabes que los coding agents construyen **productos** por ti:

```
DISCOVER → DEFINE → BUILD → SHIP → GOVERN → LEARN
   (producto completo con AI agents)
```

Ese es el **Track A de LOOP™ (DELIVER)**. Esta guía agrega el otro lado: el mismo framework aplicado a **tu semana de trabajo**, no al producto. El agente no solo te construye la app — también te arma el backlog, el reporte de stakeholders, el análisis de competencia y la minuta.

**El mensaje:** "No necesitas programar. Necesitas especificar." — y tú ya eres experto en especificar (SoWs).

---

## 2. Tu semana tiene tareas automatizables

| Tarea de PO/PM | Lo que hace el agente |
|----------------|-----------------------|
| **Backlog grooming** | Toma notas/ideas sueltas y las convierte en SoWs candidatas (con criterios) |
| **Reporte de stakeholders** | Arma el status semanal a partir de tu sprint board/kanban |
| **Minuta + action items** | Convierte notas de la daily/review en minuta con responsables |
| **Análisis de competencia** | Investiga competidores y arma comparativa |
| **Specs a partir de ideas** | "Tengo esta idea" → primer borrador de SoW |
| **Retro** | Convierte notas de la retro en acciones priorizadas |

---

## 3. La conexión con VelaraLoop

Cada tarea usa las 6 fases, pero el "producto" es un entregable de tu semana:

| Fase | Aplicada a tu semana |
|------|----------------------|
| DISCOVER | ¿Qué tarea repetitiva me consume tiempo? |
| DEFINE | Escribo el SoW de tarea (spec de la tarea) |
| BUILD | El agente ejecuta y entrega |
| SHIP | Uso/dufundo el resultado |
| GOVERN | Reviso, versiono, guardo en mi kanban |
| LEARN | Ajusto la spec para la próxima semana |

> **No empieces por el producto. Empieza por la tarea que más te molesta hacer cada semana.**

---

## 4. Plantilla de especificación (pega y completa)

```
Carpeta: MiAutomatizacion/
Rol: Product Owner
Tarea: [ej. convertir ideas sueltas en SoWs candidatas]
Datos: ideas.txt (backlog en bruto: ideas, pedidos, mejoras)
Lo que quiero:
  1. Para cada idea: título candidato, problema que resuelve, audiencia
  2. Estima si es "producto" (requiere build) o "tarea" (automatizable)
  3. Para las de producto: propone 1 criterio de éxito medible
  4. Prioriza con 1 línea de justificación
Entregable: backlog-candidato.md (tabla)
Criterios de éxito:
  - cada idea procesada sin perderse
  - criterios medibles y realistas
Límites: no escribas specs completas aún, solo candidatas
Verificación: muéstrame la tabla antes de guardar
```

---

## 5. Qué debe devolver el agente

- El entregable (candidatos de backlog/status/report).
- Qué asumió (para que lo ajustes).
- Separación clara entre hecho y sugerencia.

---

## 6. Cómo verificar (no lo confíes a ciegas)

- [ ] Compara el reporte contra tu sprint board real.
- [ ] Verifica que los criterios de éxito sean los tuyos (ajusta si no).
- [ ] En investigación: pide fuentes y verifícalas.
- [ ] Recuerda: el agente propone, tú priorizas.

---

## 7. Ejemplos de especificaciones listas

**Reporte de stakeholders:**
```
Tarea: status semanal para stakeholders
Datos: sprint-board.md (o export de tu kanban)
1. Extrae: completado esta semana, en curso, bloqueado, siguiente
2. Traduce a lenguaje no técnico (sin jerga de dev)
3. Máximo 1 página, sección "necesito decisión de" al final
Entregable: status-stakeholders-semana.md
```

**Idea → borrador de SoW:**
```
Tarea: primer borrador de SoW a partir de una idea
Idea: [describe]
1. Rellena el template de SoW (objetivo, alcance, deliverables, criterios)
2. Marca secciones incompletas como "PENDIENTE: tú decides"
3. Propone estimación por fases
Entregable: sow-borrador-[nombre].md
```

---

## 8. Errores comunes y cómo evitarlos

| Error | Solución |
|-------|----------|
| Delegar la priorización al agente | Tú priorizas; el agente solo organiza |
| Reporte con jerga técnica | Exige "lenguaje para stakeholders" en la spec |
| Specs sin criterios medibles | Pide "criterio de éxito medible" explícitamente |
| Confundir tarea con producto | Haz que el agente clasifique en la spec |

---

*Parte de VelaraLoop Academy — upvelara.com · Combina con VelaraLoop Framework (`upv-velaraloop/docs/framework.md`) y Spec-Driven Guides (kit.upvelara.com/guides).*