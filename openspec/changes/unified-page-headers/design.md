## Context

El diseno actual tiene una barra de navegacion flotante inferior pero no tiene indicadores de donde esta el usuario ni forma directa de volver al inicio desde cada pagina.

## Goals / Non-Goals

**Goals:**
- Crear encabezado consistente en paginas secundarias
- Mostrar "PianoMaster" a la izquierda
- Mostrar boton home a la derecha
- Reutilizar en todas las paginas

**Non-Goals:**
- No agregar a la pagina principal (ya tiene su propio header)
- No cambiar la navegacion inferior

## Decisions

### Decision 1: Componente reutilizable
**Choice**: Crear PageHeader.vue como componente
**Rationale**:DRY, consistencia, facil mantenimiento

### Decision 2: Slot para titulo personalizado
**Choice**: Permitir override del titulo por pagina
**Rationale**: Algunas paginas pueden querer su propio titulo
