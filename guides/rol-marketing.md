# Guía Marketing — Automatiza tu trabajo con coding agents

> **VelaraLoop Academy · Track B**
> Para profesionales de marketing / content / growth sin background técnico.

---

## 1. Por qué esta guía

El marketing es **creativo pero repetitivo**: calendarios, resúmenes de campaña, drafts, análisis de competencia. El agente hace la parte repetitiva (estructurar, resumir, comparar) y tú aportas el criterio creativo. Solo necesitas **especificar** qué quieres.

---

## 2. Tareas que puedes automatizar hoy

| Tarea | Lo que hace el agente |
|-------|-----------------------|
| **Calendario de contenido** | Convierte ideas sueltas en calendario mensual con fechas y formatos |
| **Resumen de campaña** | Lee métricas de una campaña y genera resumen ejecutivo |
| **Drafts de posts** | Genera borradores de posts/LinkedIn/email a partir de un tema |
| **Análisis de competencia** | Investiga y compara competidores (precios, propuesta, mensajes) |
| **Reformato de contenido** | Un artículo → varios formatos (LinkedIn, newsletter, hilo) |

---

## 3. Cómo se hace (método en 4 pasos)

1. **Prepara el insumo:** ideas, notas, datos de campaña → `MiAutomatizacion/`.
2. **Especifica** (usa la plantilla).
3. **El agente ejecuta** y te muestra el draft.
4. **Revisas y ajustas** (el draft es punto de partida, tú eres el editor).

---

## 4. Plantilla de especificación (pega y completa)

```
Carpeta: MiAutomatizacion/
Rol: Marketing manager
Tarea: [ej. calendario de contenido para octubre]
Datos: ideas-contenido.md (temas y formatos en mente)
Lo que quiero:
  1. Organiza las ideas en un calendario mensual
  2. Distribuye: 3 posts LinkedIn/semana + 1 newsletter/semana + 1 blog/mes
  3. Alterna formatos (educativo, caso, promocional, conversación)
  4. Para cada pieza: fecha, tema, formato, gancho (1 línea), CTA
Entregable: calendario-octubre.md (tabla)
Criterios de éxito:
  - cobertura sin huecos (≥1 pieza por día laborable)
  - cada pieza con gancho y CTA claros
Límites: usa solo los temas de las ideas; no inventes fechas de eventos reales
Verificación: muéstrame el calendario antes de guardar
```

---

## 5. Qué debe devolver el agente

- El entregable (calendario/draft/resumen).
- Nota de qué asumió (ej. "asumí 5 días laborables") para que lo ajustes.
- Fuentes cuando haga investigación (nunca datos inventados).

---

## 6. Cómo verificar (no lo confíes a ciegas)

- [ ] Revisa que el tono/estilo sea el de tu marca.
- [ ] Verifica datos y cifras (los agentes pueden inventar estadísticas).
- [ ] Ajusta el draft con tu voz antes de publicar.
- [ ] En investigación: exige fuentes y verifica al menos 2.

---

## 7. Ejemplos de especificaciones listas

**Resumen de campaña:**
```
Tarea: resumen ejecutivo de la campaña de agosto
Datos: metricas-agosto.csv (canal, impresiones, clicks, conversiones, costo)
1. Totales por canal
2. Métricas clave: CTR, CVR, CPA
3. Top 2 canales y recomendación (con base en los datos)
Entregable: resumen-campana-agosto.md (máximo 1 página)
```

**Draft de LinkedIn:**
```
Tarea: draft de post LinkedIn
Tema: [tu tema]
Tonos: profesional + cercano, máximo 200 palabras
Estructura: gancho → problema → solución → CTA suave
Entregable: draft + 2 variantes de gancho
Límites: sin emojis excesivos, sin hashtags inflados (máx 3)
```

---

## 8. Errores comunes y cómo evitarlos

| Error | Solución |
|-------|----------|
| Cifras inventadas | Pide "solo usa los datos del archivo" |
| Tono genérico | Da 1 ejemplo de tu estilo en la spec |
| Publicar el draft sin editar | El draft es input, tú eres el editor final |
| Competencia sin fuentes | Exige URLs y verifícalas |

---

*Parte de VelaraLoop Academy — upvelara.com · "No necesitas programar. Necesitas especificar."*