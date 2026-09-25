# Guía Legal — Automatiza tu trabajo con coding agents

> **VelaraLoop Academy · Track B**
> Para profesionales de legal / compliance sin background técnico.

> ⚠️ **Aviso importante:** estas automatizaciones son de **apoyo**, nunca reemplazan el criterio jurídico. El agente organiza y resume; el abogado decide. Nunca subas información privilegiada de clientes reales sin autorización y sin máscara.

---

## 1. Por qué esta guía

El trabajo legal tiene una parte **altamente estructurada** (resumir, comparar, extraer cláusulas, armar plantillas) que consume horas. Un coding agent hace esa parte y deja al profesional el **análisis y la decisión**. Solo necesitas **especificar** qué quieres extraer y bajo qué reglas.

---

## 2. Tareas que puedes automatizar hoy

| Tarea | Lo que hace el agente |
|-------|-----------------------|
| **Resumen de contratos** | Lee un contrato y extrae partes clave (partes, objeto, plazo, precio, cláusulas de salida) |
| **Primer review de cláusulas** | Marca cláusulas que coinciden con tus "puntos de alerta" predefinidos |
| **Plantillas de documentos** | Arma borradores de cartas/contratos simples a partir de plantilla + datos |
| **Comparación de versiones** | Compara 2 versiones de un documento y lista cambios |
| **Extracción de términos** | Extrae fechas, montos, obligaciones de varios documentos |

---

## 3. Cómo se hace (método en 4 pasos)

1. **Prepara:** copia el documento (texto/PDF) a `MiAutomatizacion/`. **Datos ficticios o máscara si es real.**
2. **Especifica** las reglas de extracción (usa la plantilla).
3. **El agente ejecuta** y te entrega el resumen/marcado.
4. **Tú revisas con criterio jurídico** — el agente solo organiza.

---

## 4. Plantilla de especificación (pega y completa)

```
Carpeta: MiAutomatizacion/
Rol: Asistente jurídico (apoyo, sin criterio legal final)
Tarea: [ej. resumen de contrato + puntos de alerta]
Datos: contrato-ejemplo.txt (texto del contrato)
Lo que quiero:
  1. Extrae: partes, objeto, plazo, precio/pago, terminación, confidencialidad, jurisdicción
  2. Para cada sección: cita textual corta + interpretación simple
  3. Marca con ⚠️ si hay: cláusulas de renovación automática, multas, exclusividad, indemnización ilimitada
  4. Lista fechas clave (vencimientos, renovaciones, entregas)
Entregable: resumen-contrato.md
Criterios de éxito:
  - cada ítem con cita textual del original
  - alertas basadas en las reglas dadas, no en criterio inventado
Límites:
  - NO interpretes legalmente, solo extrae y marca
  - si algo es ambiguo, indícalo como "REQUIERE REVISIÓN LEGAL"
Verificación: muéstrame el resumen antes de guardar
```

---

## 5. Qué debe devolver el agente

- El resumen estructurado con citas textuales.
- Marcado de alertas según tus reglas.
- Todo lo ambiguo marcado como "REQUIERE REVISIÓN LEGAL".

---

## 6. Cómo verificar (no lo confíes a ciegas)

- [ ] Lee el contrato original y cruza al menos las secciones clave.
- [ ] Verifica que las citas textuales sean exactas.
- [ ] Confirma que las alertas sigan tus reglas (no criterio del agente).
- [ ] NUNCA firmes ni decidas con base solo en el resumen del agente.

---

## 7. Ejemplos de especificaciones listas

**Review de cláusulas (puntos de alerta predefinidos):**
```
Tarea: primer review de contrato
Datos: contrato-ejemplo.txt
Puntos de alerta (marca ⚠️ si aparece):
  - renovación automática sin aviso
  - responsabilidad ilimitada
  - exclusividad
  - cambio unilateral de precios
  - ley aplicable extranjera
Entregable: review-clausulas.md (cláusula citada + alerta + ubicación)
```

**Comparación de versiones:**
```
Tarea: compara v1 y v2 del contrato
Datos: contrato-v1.txt y contrato-v2.txt
1. Lista cambios: agregado / eliminado / modificado
2. Para cada cambio: texto viejo → texto nuevo
Entregable: diff-contrato.md
```

---

## 8. Errores comunes y cómo evitarlos

| Error | Solución |
|-------|----------|
| Subir información confidencial real | Solo datos ficticios o máscara; autorización previa |
| Confiar en la interpretación del agente | El agente extrae; TÚ interpretas |
| Citas inexactas | Pide "cita textual" y verifica |
| Alerta por criterio del agente | Define tú las reglas de alerta en la spec |

---

*Parte de VelaraLoop Academy — upvelara.com · "No necesitas programar. Necesitas especificar." · El criterio legal siempre es del profesional.*