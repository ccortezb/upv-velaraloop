# Guía RRHH — Automatiza tu trabajo con coding agents

> **VelaraLoop Academy · Track B**
> Para profesionales de RRHH / talent acquisition sin background técnico.

> ⚠️ **Aviso importante:** respeta siempre la protección de datos. Nunca subas CVs o datos personales reales sin anonimizar y sin autorización. Usa datos ficticios en las pruebas.

---

## 1. Por qué esta guía

RRHH tiene tareas de **alto volumen y estructura repetitiva**: filtrar CVs, redactar descripciones, resumir entrevistas. El agente hace el trabajo pesado de **organizar y resumir**; tú mantienes el criterio humano sobre personas (nunca una decisión de contratación basada solo en un agente).

---

## 2. Tareas que puedes automatizar hoy

| Tarea | Lo que hace el agente |
|-------|-----------------------|
| **Filtrado inicial de CVs** | Lee CVs y los compara contra criterios del puesto (marca, resume, prioriza) |
| **Descripciones de puesto** | Genera JD (responsabilidades, requisitos, perfil) a partir de una idea |
| **Resumen de entrevistas** | Convierte notas de entrevista en resumen estructurado |
| **Búsqueda de gap de skills** | Lista skills del candidato vs requeridas y marca faltantes |
| **Onboarding checklist** | Arma/actualiza el checklist de onboarding por rol |

---

## 3. Cómo se hace (método en 4 pasos)

1. **Prepara:** CVs (anonimizados) → `MiAutomatizacion/`.
2. **Especifica** los criterios del puesto (usa la plantilla).
3. **El agente filtra/resume** y te entrega un shortlist.
4. **Tú decides** — el shortlist es apoyo, no veredicto.

---

## 4. Plantilla de especificación (pega y completa)

```
Carpeta: MiAutomatizacion/
Rol: Reclutador senior
Tarea: [ej. preselección de CVs para puesto de analista de datos]
Datos: carpeta "cvs/" con CVs anonimizados (candidato-1.txt ... candidato-N.txt)
Requisitos del puesto:
  - obligatorios: [ej. 2 años en análisis, SQL básico]
  - deseables: [ej. experiencia en fintech, inglés avanzado]
Lo que quiero:
  1. Para cada CV: marca obligatorios (cumple/no cumple) y deseables
  2. Score simple 0-10 según cumplimiento
  3. Shortlist: top 5 con una línea de por qué
  4. No compares datos personales, solo skills y experiencia
Entregable: preseleccion.md (tabla: candidato, obligatorios, deseables, score, nota)
Criterios de éxito:
  - cada CV procesado
  - score reproducible a partir de los criterios dados
Límites: no guardes ni expongas datos personales; usa solo los CVs anonimizados
Verificación: muéstrame la tabla antes de guardar
```

---

## 5. Qué debe devolver el agente

- La tabla de preselección con scores.
- Qué skills marcó como cumplidas/no cumplidas por candidato.
- Nota de CVs ambiguos ("REVISAR MANUALMENTE").

---

## 6. Cómo verificar (no lo confíes a ciegas)

- [ ] Abre 2-3 CVs y cruza que el score coincida con lo que ves.
- [ ] Confirma que los criterios se aplicaron tal como los definiste.
- [ ] Verifica que no usó datos personales.
- [ ] La decisión final de entrevistar es tuya.

---

## 7. Ejemplos de especificaciones listas

**Descripción de puesto (JD):**
```
Tarea: redactar descripción de puesto
Puesto: [título]
Nivel: [junior/mid/senior]
Responsabilidades (ideas): [lista breve]
1. Genera: título, objetivo (2 líneas), 6-8 responsabilidades, requisitos (obligatorios/deseables), beneficios (genéricos)
2. Tono: profesional, inclusivo (evita lenguaje de género)
Entregable: jd-[puesto].md
```

**Resumen de entrevista:**
```
Tarea: resumen estructurado de entrevista
Datos: notas-entrevista.txt (notas crudas)
1. Extrae: fortalezas, preocupaciones, skills confirmadas, preguntas pendientes
2. Marca señales de alerta
3. No inventes opiniones que no estén en las notas
Entregable: resumen-entrevista.md
```

---

## 8. Errores comunes y cómo evitarlos

| Error | Solución |
|-------|----------|
| Subir CVs reales sin anonimizar | Anonimiza y usa datos ficticios en pruebas |
| Decidir por el score del agente | El score es apoyo, tú decides |
| Sesgos en la preselección | Define criterios objetivos y explícitos en la spec |
| JD genérico | Da el tono e ideas de la empresa en la spec |

---

*Parte de VelaraLoop Academy — upvelara.com · "No necesitas programar. Necesitas especificar." · Las decisiones sobre personas son humanas.*