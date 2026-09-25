# Guía Operaciones — Automatiza tu trabajo con coding agents

> **VelaraLoop Academy · Track B**
> Para profesionales de operaciones / administración / logística sin background técnico.

---

## 1. Por qué esta guía

Las operaciones son **procesos repetitivos**: minutas, seguimientos, checklists, estandarización. Un coding agent ejecuta el proceso mientras tú te ocupas de lo que requiere criterio humano. Solo necesitas **especificar** el proceso.

---

## 2. Tareas que puedes automatizar hoy

| Tarea | Lo que hace el agente |
|-------|-----------------------|
| **Minutas de reunión** | Convierte notas/transcripción en minuta estructurada con acuerdos y responsables |
| **Seguimiento de entregas** | Lee un registro de tareas y genera el status por responsable |
| **Estandarización de procesos** | Convierte un procedimiento desordenado en checklist paso a paso |
| **Checklists** | Arma/actualiza checklists de onboarding, calidad, apertura/cierre |
| **Consolidación** | Junta información de varios archivos/notas en un documento |

---

## 3. Cómo se hace (método en 4 pasos)

1. **Prepara el insumo:** copia tus notas/archivos a `MiAutomatizacion/`.
2. **Especifica el proceso** (usa la plantilla).
3. **El agente ejecuta** y te muestra el resultado.
4. **Verificas** los acuerdos/responsables antes de difundir.

---

## 4. Plantilla de especificación (pega y completa)

```
Carpeta: MiAutomatizacion/
Rol: Coordinador de operaciones
Tarea: [ej. armar la minuta de la reunión de planificación]
Datos: notas-reunion.txt (notas crudas de la reunión)
Lo que quiero:
  1. Lee las notas
  2. Estructura la minuta: contexto, acuerdos, pendientes, responsables, fechas
  3. Cada pendiente → dueño + fecha límite (si aparece en las notas)
  4. Marca puntos sin resolver como "A CONFIRMAR"
Entregable: minuta-2026-09-18.md (formato claro, listo para compartir)
Criterios de éxito:
  - todos los acuerdos de las notas aparecen
  - responsables y fechas explícitos
  - no inventes nada que no esté en las notas
Límites: no modifiques notas-reunion.txt
Verificación: muéstrame el borrador antes de guardar
```

---

## 5. Qué debe devolver el agente

- El entregable (minuta/status/checklist).
- Nota de qué puntos estaban incompletos (para que tú decidas).
- Qué insumos usó.

---

## 6. Cómo verificar (no lo confíes a ciegas)

- [ ] Cruza los acuerdos de la minuta contra las notas originales.
- [ ] Verifica que los responsables/fechas sean correctos.
- [ ] Revisa que no haya inventado información.
- [ ] Confirma que el formato sirva para compartir tal cual.

---

## 7. Ejemplos de especificaciones listas

**Status de entregas:**
```
Tarea: status semanal de entregas
Datos: entregas-semana.csv (tarea, responsable, estado, fecha-limite)
1. Agrupa por responsable
2. Marca vencidas (rojo) / en curso (amarillo) / completadas (verde)
3. Lista las 3 más urgentes primero
Entregable: status-entregas-semana.md
```

**Checklist de proceso:**
```
Tarea: convierte el procedimiento en checklist
Datos: procedimiento-apertura.md (texto desordenado)
1. Extrae los pasos en orden
2. Cada paso → checkbox + responsable + herramienta (si aplica)
3. Agrega sección "verificación final"
Entregable: checklist-apertura.md
```

---

## 8. Errores comunes y cómo evitarlos

| Error | Solución |
|-------|----------|
| Notas ambiguas | Pide "marca lo ambiguo como A CONFIRMAR", no inventes |
| Minuta sin dueños | Exige en la spec "cada pendiente con responsable" |
| Difundir sin revisar | Siempre verifica acuerdos antes de enviar |
| Proceso con muchos matices | Empezar con el caso más simple y luego iterar |

---

*Parte de VelaraLoop Academy — upvelara.com · "No necesitas programar. Necesitas especificar."*