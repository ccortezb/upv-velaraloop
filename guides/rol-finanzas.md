# Guía Finanzas — Automatiza tu trabajo con coding agents

> **VelaraLoop Academy · Track B**
> Para profesionales de finanzas/contabilidad sin background técnico.

---

## 1. Por qué esta guía

Las tareas financieras son **perfectas** para coding agents: son repetitivas, usan datos estructurados (Excel/CSV) y tienen reglas claras. No necesitas programar: necesitas **especificar** qué tarea quieres y con qué criterios.

---

## 2. Tareas que puedes automatizar hoy

| Tarea | Lo que hace el agente |
|-------|-----------------------|
| **Conciliación** | Compara 2 archivos (banco vs contabilidad) y marca diferencias |
| **Resumen de facturas** | Lee facturas y genera resumen por proveedor/importe/fecha |
| **Reporte mensual** | Arma el reporte mensual de ingresos/gastos con tablas |
| **Revisión de gastos** | Categoriza gastos y detecta anomalías/duplicados |
| **Cálculos recurrentes** | Recálculo de métricas (margen, ticket promedio, etc.) |

---

## 3. Cómo se hace (método en 4 pasos)

1. **Prepara los datos:** copia los archivos (xlsx/csv) a tu carpeta `MiAutomatizacion/`. Usa copias.
2. **Especifica la tarea** (usa la plantilla de abajo).
3. **El agente ejecuta** y te muestra el resultado.
4. **Verificas** contra tus criterios antes de usar el resultado.

---

## 4. Plantilla de especificación (pega y completa)

```
Carpeta: MiAutomatizacion/
Rol: Analista financiero senior
Tarea: [ej. conciliar banco vs contabilidad de marzo]
Datos:
  - archivo 1: estado-de-cuenta-marzo.csv (movimientos del banco)
  - archivo 2: contabilidad-marzo.xlsx (registros contables)
  - ambos tienen columnas: fecha, importe, descripcion, referencia
Lo que quiero:
  1. Compara ambos archivos por importe + referencia
  2. Encuentra movimientos del banco sin registro contable
  3. Encuentra registros contables sin movimiento de banco
  4. Calcula la diferencia total de cada lado
Entregable: archivo conciliacion-marzo.md con:
  - tabla de diferencias (fecha, importe, descripcion)
  - totales por lado
  - flag: CONCILIADO o CON DIFERENCIAS
Criterios de éxito:
  - cada diferencia listada con fecha y monto
  - totales calculados correctamente
Límites: no modifiques los archivos originales
Verificación: muéstrame las tablas antes de guardar
```

---

## 5. Qué debe devolver el agente

- El entregable pedido (reporte/tabla/resumen).
- Qué archivos usó y qué tocó (log simple).
- Si hubo algo dudoso, que lo **mencione** en vez de inventar.

---

## 6. Cómo verificar (no lo confíes a ciegas)

- [ ] Recalcula un total manualmente (muestreo) y compara.
- [ ] Revisa que todas las filas del original aparezcan.
- [ ] Confirma que no modificó los archivos fuente (abre y revisa).
- [ ] Pide que te explique "cómo llegó a este número" si algo se ve raro.

---

## 7. Ejemplos de especificaciones listas

**Resumen de facturas:**
```
Tarea: resumen de facturas-proveedores.csv
1. Agrupa por proveedor
2. Suma importe por proveedor y por mes
3. Lista top 10 proveedores por monto
Entregable: resumen-facturas.md (tabla: proveedor, mes, monto, % del total)
```

**Reporte mensual:**
```
Tarea: genera el reporte mensual de ingresos y gastos
Datos: movimientos-2026.xlsx (hoja: ingresos, hoja: gastos)
1. Totales por mes (ene-dic)
2. Compara mes actual vs anterior (% variación)
3. Identifica los 3 gastos más altos del mes
Entregable: reporte-mensual-[mes].md
```

---

## 8. Errores comunes y cómo evitarlos

| Error | Solución |
|-------|----------|
| Datos con nombres raros en columnas | Dile los nombres exactos en la spec |
| Fechas en formatos distintos | Pide normalizar fecha a YYYY-MM-DD |
| No revisar | Siempre verifica con muestreo manual |
| Trabajar sobre el original | Siempre copia de prueba |

---

*Parte de VelaraLoop Academy — upvelara.com · "No necesitas programar. Necesitas especificar."*