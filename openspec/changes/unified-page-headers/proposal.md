## Why

Cada pagina secundaria necesita un indicador de identidad de la aplicacion y una forma rapida de volver al inicio. Agregar una barra de encabezado consistente en todas las pantallas mejora la navegacion y la experiencia del usuario.

## What Changes

- Crear componente reutilizable PageHeader con nombre y boton home
- Agregar PageHeader a todas las paginas excepto la principal (index.vue)
- Mantener consistencia visual con el estilo monochromatic premium

## Capabilities

### New Capabilities

- `page-header`: Componente de encabezado de pagina reutilizable

## Impact

- Nuevos componentes: components/ui/PageHeader.vue
- Paginas a modificar: metronome.vue, games/index.vue, progress.vue, chat.vue, settings.vue, practice/index.vue
