# Emisión, Verificación y Share — Credentials

> **VelaraLoop Academy** · Cómo se emite, verifica y comparte cada credential.

---

## 1. Flujo de emisión

```
AI Fluency (automático)
  Alumno completa Track A → quiz ≥80% → se genera link:
  credential-page.html?name=...&credential=ai-fluency&date=...&id=VL-XXXX

Agent Automation: [Rol] (revisión)
  Alumno completa Track B → entrega evidencia (spec + resultado + verificación)
  → revisión (rúbrica de credentials-definition.md) → aprobado
  → se genera link:
  credential-page.html?name=...&credential=agent-automation&role=Finanzas&date=...&id=VL-XXXX
```

**ID de credential:** formato `VL-XXXX-XXXX` (VL + 4 chars + 4 chars). Se registra en una hoja (Sheets/Notion) para verificación manual.

---

## 2. Verificación

- **Página pública** (`credential-page.html`) muestra: nombre, credential, rol, fecha, criterios cumplidos, ID.
- **Verificación manual:** quien dude del credential escribe a sandra@upvelara.com con el ID.
- **v1 sin API** (fuera de scope). Si escala → endpoint `GET /credential/[id]` en api.upvelara.com.

---

## 3. LinkedIn Share

La página ya incluye el botón **"Compartir en LinkedIn"** (share-offsite con la URL del credential).

### Texto sugerido para el post (AI Fluency)

> Entendí cómo funciona la AI de verdad — más allá del chat. Ahora doy el paso a los **coding agents** para automatizar mi trabajo.
> No necesitas programar. Necesitas especificar.
> #AIFluency #VelaraLoopAcademy #CodingAgents

### Texto sugerido para el post (Agent Automation: [Rol])

> Automatizo mi trabajo con **coding agents** — sin escribir una línea de código.
> Completé "Agent Automation: [Rol]" en VelaraLoop Academy. 🔁
> No necesitas programar. Necesitas especificar.
> #AgentAutomation #VelaraLoopAcademy #[Rol]

---

## 4. Upsell / Funnel

```
AI Fluency (gratis)
  → Workshop "Automatiza tu semana" ($150-250)
  → Academy Full ($199-499)
  → Credential Agent Automation: [Rol] (+$100, o $75 con homework del workshop)
```

**Mensajes de upsell:**
- En la página de AI Fluency: "Ya entiendes la AI. Ahora automatiza tu trabajo → Academy Full".
- En la página de rol: "Comparte tu logro. ¿Quieres ir más lejos? → Academy Full / Managed".

---

## 5. Assets

| Asset | Ruta |
|-------|------|
| Badge AI Fluency | `credentials/badge-ai-fluency.svg` |
| Badge Agent Automation (rol) | `credentials/badge-agent-automation.svg` |
| Página verificable | `credentials/credential-page.html` |

**Hosting sugerido:** copiar a `loop.upvelara.com/credential/` (o `upvelara.com/credential/`) junto con los 2 SVG.
Al ser HTML estático + query params, no requiere backend.

---

## 6. Checklist de emisión (operativo)

- [ ] Alumno cumple requisitos (quiz / evidencia aprobada)
- [ ] Registrar ID + nombre + credential en la hoja de credenciales
- [ ] Generar link con query params correctos
- [ ] Enviar link al alumno + texto sugerido para LinkedIn
- [ ] Guardar el link emitido (trazabilidad)

---

*VelaraLoop Academy — upvelara.com*