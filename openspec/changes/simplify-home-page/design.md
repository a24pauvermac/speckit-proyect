## Context

La pagina de inicio actual muestra:
- 3 tarjetas de estadisticas (minutos de practica, lecciones completadas, dias de racha)
- Seccion de accesos rapidos (Metronomo, Juegos, Progreso, Chat)

El usuario quiere simplificar la pagina para enfocarse unicamente en los libros de practica.

## Goals / Non-Goals

**Goals:**
- Eliminar estadisticas de la pagina de inicio
- Eliminar accesos rapidos
- Mostrar historial de libros ordenados por ultimo uso
- Mantener el boton "Comenzar a practicar"

**Non-Goals:**
- No cambiar la navegacion inferior
- No modificar paginas diferentes a inicio
- No agregar nuevas funcionalidades de libros

## Decisions

### Decision 1: Historial de libros en lugar de estadisticas
**Choice**: Mostrar libros ordenados por fecha de ultimo uso
**Rationale**: Los usuarios acceden frecuentemente a los mismos libros, es util verlos rapidamente

### Decision 2: Tracking de ultimo uso
**Choice**: Agregar campo `lastUsedAt` a cada libro
**Rationale**: Permite ordenar por uso reciente sin necesidad de consultar sesiones

## Open Questions

- ¿Cuantos libros mostrar en el historial? (Sugerencia: 5-10)
- ¿Que pasa si no hay libros? Mostrar mensaje para crear uno
