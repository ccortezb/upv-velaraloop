# Ejercicios Hands-On por Rol — Workshop

> **VelaraLoop Academy · Workshop** · Usa los templates de `upv-velaraloop/templates/`.
> El facilitador guía el ejercicio principal; cada rol tiene su variante de tarea ejemplo.

---

## Ejercicio principal (todos los roles)

1. Abre tu carpeta `MiAutomatizacion/` con tu agente.
2. Elige tu template: `sow-tarea-reporte.md` | `datos` | `docs` | `research` | `proceso`.
3. Completa las 5 secciones con TU tarea.
4. Pega la spec completa al agente.
5. Pide: "muéstrame el resultado antes de guardar".
6. Verifica contra tus criterios.
7. Guarda la spec + el resultado (para re-ejecutar).

---

## Variantes por rol

### Finanzas
- **Tarea ejemplo:** conciliar banco vs contabilidad de un mes.
- **Template:** `sow-tarea-datos.md`
- **Espec:** 2 archivos (banco.csv, contabilidad.xlsx) → compara por importe+referencia → lista diferencias → totales.
- **Verificación:** recálculo manual de 1 total; no tocó originales.

### Operaciones
- **Tarea ejemplo:** armar la minuta de la reunión de planificación.
- **Template:** `sow-tarea-docs.md`
- **Espec:** notas-reunion.txt → estructura (contexto, acuerdos, pendientes, responsables) → "A CONFIRMAR" lo ambiguo.
- **Verificación:** cruza acuerdos contra notas; no inventó nada.

### Marketing
- **Tarea ejemplo:** calendario de contenido de octubre.
- **Template:** `sow-tarea-docs.md`
- **Espec:** ideas.md → calendario mensual (fecha, tema, formato, gancho, CTA) → sin inventar eventos reales.
- **Verificación:** cobertura sin huecos; tono de marca.

### Legal
- **Tarea ejemplo:** resumen de contrato + puntos de alerta.
- **Template:** `sow-tarea-docs.md` (o `research` si incluye comparar cláusulas)
- **Espec:** contrato.txt → extrae partes/objeto/plazo/precio/terminación → alertas según reglas dadas → "REQUIERE REVISIÓN LEGAL" lo ambiguo.
- **Verificación:** citas textuales exactas; el criterio legal es del profesional.

### RRHH
- **Tarea ejemplo:** preselección de CVs (anonimizados).
- **Template:** `sow-tarea-datos.md`
- **Espec:** carpeta cvs/ → marca obligatorios/deseables → score 0-10 → top 5.
- **Verificación:** cruza 2-3 CVs contra el score; sin datos personales expuestos.

### PO/PM
- **Tarea ejemplo:** convertir ideas sueltas en SoWs candidatas.
- **Template:** `sow-tarea-proceso.md`
- **Espec:** ideas.txt → título, problema, audiencia, ¿producto o tarea?, criterio medible.
- **Verificación:** no perderse ideas; criterios realistas.

---

## Checklist de cierre por asistente

- [ ] Mi agente está abierto en `MiAutomatizacion/`
- [ ] Completé el template con MI tarea
- [ ] El agente ejecutó y me mostró el resultado
- [ ] Verifiqué contra mis criterios de éxito
- [ ] Guardé la spec + el resultado (puedo re-ejecutarlo)

---

*VelaraLoop Academy — upvelara.com*