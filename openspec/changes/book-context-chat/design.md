## Context

Actualmente existe un chat generico en `/chat` que no tiene informacion del libro que el usuario esta estudiando. El objetivo es que al tocar el boton de play en un libro, se abra un chat con el contexto de ese libro especifico.

## Goals / Non-Goals

**Goals:**
- Crear chat por libro con contexto (nombre, autor)
- Mantener chat general para consultas sin contexto
- Pasar contexto como parte del prompt del sistema

**Non-Goals:**
- No cambiar la interfaz del chat existente
- No crear base de datos separada para mensajes de libro

## Decisions

### Decision 1: Nueva ruta vs parametro
**Choice**: Crear ruta `/chat/[bookId]` 
**Rationale**: URL limpia, permite compartir, mejor SEO

### Decision 2: Contexto en prompt del sistema
**Choice**: Incluir contexto del libro en el mensaje inicial del sistema
**Rationale**: No requiere cambiar el schema de la base de datos

## Open Questions

- ¿Cuanto contexto del libro incluir? (nombre, autor, descripcion, lecciones)
- ¿Mantener historial de chat por libro o reiniciar cada vez?
