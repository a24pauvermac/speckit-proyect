## Why

La pagina de inicio actual esta sobrecargada con informacion que los usuarios no consultan con frecuencia. Las estadisticas y accesos rapidos distraen del objetivo principal: acceder rapidamente a los libros de practica. Simplificar la interfaz mejora la experiencia y reduce la friccion.

## What Changes

- **Eliminacion de estadisticas**: Remover las 3 tarjetas de estadisticas (minutos, lecciones, racha)
- **Eliminacion de accesos rapidos**: Remover la seccion de accesos rapidos (metronomo, juegos, progreso, chat)
- **Nuevo historial de libros**: Mostrar los libros usados recientemente en orden de ultimo uso
- **Enfoque en contenido**: Pagina de inicio minimalista centrada unicamente en los libros

## Capabilities

### New Capabilities

- `book-history`: Sistema de historial de libros con ordenamiento por ultimo uso

### Modified Capabilities

- `mobile-grid-layout`: Simplificacion para mostrar solo historial de libros

## Impact

- **Paginas**: Modificacion de `pages/index.vue`
- **Composables**: Agregar campo `lastUsedAt` a libros o crear sistema de tracking
- **Estilos**: Actualizacion de estilos para nueva estructura
