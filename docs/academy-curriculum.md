# VelaraLoop Academy — Currículo Formal

> "Entiende la AI. Domina los coding agents. Sin codear. Sin miedo."
> Para cualquier profesional no-coder. Aplica las 6 fases de VelaraLoop a tareas de trabajo reales.

**Versión:** 1.0
**Fecha:** 2026-09-18
**Fuente:** SoW-UPV-ACD-001 | Plan: `upv-roadmap/epicsprints/academy-plan.md`

---

## 1. Filosofía del programa

Un profesional no-coder **no necesita aprender a programar** para usar coding agents. Necesita aprender a **especificar**: describir qué quiere, con qué criterios de éxito y con qué límites. El agente ejecuta; el profesional dirige, verifica y decide.

> **El lema:** "No necesitas programar. Necesitas especificar."

Cada módulo sigue el patrón de las 6 fases de VelaraLoop aplicadas a **una tarea** (no a un producto):

```
DISCOVER (qué tarea) → DEFINE (especificación) → BUILD (el agente ejecuta) → SHIP (resultado) → GOVERN (control/costo) → LEARN (iterar)
```

---

## 2. Estructura general

| Track | Nivel | Módulos | Horas | Acceso | Credential |
|-------|:-----:|:-------:|:-----:|--------|------------|
| **A · AI Fluency** | Base | 4 | ~4h | Gratis | AI Fluency |
| **B · Agent Automation** | Core | 8 | ~8h | Academy Full | Agent Automation: [Rol] |
| **C · Governance & Escala** | Avanzado | 4 | ~4h | Academy Full + | — |

**Total:** 16 módulos ≈ 12-16h self-paced (más ~2-4h de práctica por credencial).

**Prerrequisitos:**
- Track A: ninguno.
- Track B: completar Track A (o quiz de diagnóstico ≥80%).
- Track C: completar Track B + haber entregado ≥1 automatización real.

**Ritmo recomendado:** 1 módulo/día (2-3h/semana) → Track A en 1 semana, Track B en 2 semanas.

---

## 3. TRACK A · AI Fluency (base, gratis)

Objetivo: entender qué es la AI, qué puede y qué no puede hacer, y cuándo usar chat vs agente. **Sin jerga.**

### A1 · `que-es-ai`
- Qué es un modelo de lenguaje en 5 minutos (sin matemáticas).
- Cómo se entrena y por qué a veces "alucina".
- Límites: qué sabe, qué inventa, qué no puede hacer.
- **Práctica:** abrir un chat (ChatGPT/Claude) y probar 3 casos: resumen, pregunta factual, petición de "inventar".

### A2 · `chat-vs-agent`
- La diferencia clave: **responder** vs **ejecutar**.
- Chat: conversación, ideas, drafts. Agente: hace el trabajo (crea archivos, procesa datos, entrega resultados).
- Cuándo usar cada uno.
- **Práctica:** mismo pedido en chat vs agente, comparar qué recibiste.

### A3 · `prompts-basicos`
- Instrucciones claras = especificaciones: contexto, tarea, formato, criterios.
- Plantilla de prompt de 4 partes (ROL / CONTEXTO / TAREA / FORMATO).
- Errores comunes y cómo corregirlos.
- **Práctica:** reescribir 3 prompts "malos" → "buenos" con la plantilla.

### A4 · `costos-y-riesgos`
- Qué cuesta usar AI (planes, tokens, consumo).
- Qué puede salir mal: datos sensibles, errores, malas decisiones.
- Qué **NO** delegar nunca (reglas de oro).
- **Práctica:** checklist de riesgo para 3 tareas propias.

**Credential base:** completar A1-A4 + quiz ≥80% → **AI Fluency**.

---

## 4. TRACK B · Agent Automation (core, Academy Full)

Objetivo: usar coding agents para automatizar tareas reales del trabajo — **sin escribir código**.

### B1 · `que-es-un-coding-agent`
- Kiro, Claude Code, Cursor, OpenCode: qué son y en qué se diferencian.
- Por qué **no es** "solo para developers".
- Lo que un no-coder puede hacer con ellos (y lo que no).
- **Práctica:** elegir tu agente según tu contexto (equipo, preferencia, costo).

### B2 · `setup-para-no-coders`
- Instalación guiada paso a paso (Kiro/Claude Code/OpenCode).
- Crear una carpeta de trabajo "segura" (no romper nada).
- Primer comando: pedirle al agente que te explique qué ve en la carpeta.
- **Práctica:** agente instalado y respondiendo en <30 min.

### B3 · `sow-tarea`
- Convertir una tarea de trabajo en una **especificación (SoW de tarea)**.
- Las 5 secciones: objetivo, inputs, criterios de éxito, límites, entregable.
- Diferencias: SoW de tarea (reporte, procesar datos) vs SoW de producto.
- **Práctica:** escribir el primer SoW de tarea de TU trabajo (template en ACD-003).

### B4 · `automatiza-reportes`
- El agente genera reportes/análisis a partir de datos.
- Casos: resumen semanal de ventas, dashboard de métricas, informe de estado.
- **Práctica:** generar tu reporte recurrente con datos reales (máscara datos sensibles).

### B5 · `automatiza-docs`
- Documentación, minutas, resúmenes, propuestas, contratos (primer review).
- Casos: minuta de reunión, resumen de investigación, borrador de propuesta.
- **Práctica:** automatizar 1 documento que hagas cada semana.

### B6 · `automatiza-datos`
- Procesar CSV/Excel: transformar, limpiar, organizar, combinar.
- Casos: conciliación, deduplicación, estandarización de datos.
- **Práctica:** procesar un archivo de datos real (copiar sin exponer datos sensibles).

### B7 · `automatiza-research`
- Investigación, síntesis, comparativas, análisis de competencia.
- Casos: benchmark de proveedores, resumen de noticias, perfil de prospecto.
- **Práctica:** hacer una investigación completa con el agente (con fuentes verificadas).

### B8 · `governance-basico`
- Logs y versiones: qué hizo el agente, qué archivos tocó.
- Verificar resultados: ¿cumple los criterios de éxito?
- Cuándo re-ejecutar, ajustar la spec y cuándo parar.
- **Práctica:** revisar 2 resultados del agente con la checklist de verificación.

**Credential rol:** completar B1-B8 + entregar **1 automatización real de tu trabajo** (SoW de tarea + resultado + revisión) → **Agent Automation: [Finanzas/Ops/Marketing/Legal/RRHH/PO-PM/...]**.

---

## 5. TRACK C · Governance & Escala (avanzado)

Objetivo: controlar costos, medir si funciona y escalar de 1 a varias automatizaciones.

### C1 · `costos-reales`
- Token FinOps: cuánto cuesta cada automatización (por llamada, por mes).
- Presupuestar y límites de gasto (patrón Sayay/Tokenfesto, simplificado).
- **Práctica:** estimar el costo mensual de tus automatizaciones.

### C2 · `evals-sencillos`
- Cómo saber si la automatización funciona: golden checks (casos de prueba).
- Umbrales: "siempre entrega X con formato Y".
- **Práctica:** crear 3 golden checks para tu automatización estrella.

### C3 · `escalando`
- De 1 tarea a 5 tareas semanales automatizadas.
- Biblioteca personal de SoWs de tarea (reutilizables).
- Priorizar qué automatizar primero (frecuencia × tiempo × valor).
- **Práctica:** mapear tu semana y seleccionar las 5 tareas top.

### C4 · `caso-roles`
- Casos reales por rol: finanzas, ops, marketing, legal, RRHH, ventas, PO/PM.
- Qué funciona en cada rol, qué errores evitar.
- **Práctica:** caso propio documentado + plan de escalado.

---

## 6. Certificación / Credentials

| Credential | Requisito | Evidencia | Verificación |
|------------|-----------|-----------|--------------|
| **AI Fluency** | A1-A4 + quiz ≥80% | Quiz | Link público con checklist (UPV-ACD-005) |
| **Agent Automation: [Rol]** | B1-B8 + 1 automatización real | SoW de tarea + resultado + revisión | Link público + ejemplos |

**Reglas:**
- Cada credential tiene un **link público verificable** con la lista de criterios cumplidos (patrón badge UPV-008).
- La credencial de rol se personaliza con el rol del profesional → shareable en LinkedIn.
- Base gratis, rol pago (+$100 sobre el programa full).

---

## 7. Mapa de contenidos → SoWs

| Módulo | Contenido vive en | SoW |
|--------|-------------------|:---:|
| A1-A4 | Guías Track A (publicación gratis) | UPV-ACD-003 |
| B1-B3 | Guía intro + guía PO/PM | UPV-ACD-003 |
| B4-B7 | Guías por rol (finanzas/ops/marketing/legal/RRHH) | UPV-ACD-003 |
| B8 | Template pack + checklist | UPV-ACD-003 |
| B4-B8 | Ejercicios hands-on del workshop | UPV-ACD-004 |
| C1-C4 | Academy Full (self-paced) | UPV-ACD-003 (v2) + UPV-ACD-004 |
| Quiz + credentials | Sistema de emisión + badge | UPV-ACD-005 |
| Landing + funnel | Página + captura | UPV-ACD-002 |

---

## 8. Pricing & Paquetes

| Oferta | Contenido | Precio | Pipeline |
|--------|-----------|:------:|----------|
| **Guías gratis** | Track A completo + guía intro B | $0 | Lead gen |
| **Workshop "Automatiza tu semana"** | B4-B8 hands-on (2-4h) | $150-400 | Conversión |
| **Academy Full (self-paced)** | Track A + B (12 módulos) | $199-499 | Core |
| **Academy + Credential de rol** | Full + evaluación + badge | +$100 | Upsell |
| **Enterprise / Team** | Onboarding de equipo + workshops | $2-5K | B2B |

**Funnel:** guías gratis → workshop → academy full → credential de rol.

---

## 9. Success Criteria

- [ ] Un profesional no-coder completa Track B y automatiza ≥1 tarea real de su trabajo.
- [ ] Las guías cubren ≥5 roles no-dev (finanzas, ops, marketing, legal, RRHH).
- [ ] El workshop produce ≥1 automatización real por asistente.
- [ ] Credentials verificables y shareable en LinkedIn.
- [ ] Pipeline funcional: gratis → workshop → full → credential.

---

## 10. Not in Scope

- Bootcamp de programación (excluido a propósito).
- Infraestructura LMS (reusa loop.upvelara.com; SOFE Academy es otra vertical).
- Certificación de consultores (LOOP™ Certified → UPV-027).
- Traducción multi-idioma (español primero).