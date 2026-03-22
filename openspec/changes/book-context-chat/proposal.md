## Why

Los usuarios quieren un chat contextualizado para cada libro de metodo. Actualmente el chat es generico y no tiene contexto del libro que el usuario esta estudiando. Esto limita la utilidad del asistente de IA para dar consejos especificos sobre el material de practica.

## What Changes

- Crear ruta `/chat/[bookId]` para chats especificos por libro
- Modificar el boton de play en las tarjetas para navegar al chat del libro
- Pasar contexto del libro (nombre, autor) al chat
- Mantener un chat general en `/chat` para consultas sin contexto especifico

## Capabilities

### New Capabilities

- `book-context-chat`: Chat individual por libro con contexto del libro seleccionado

### Modified Capabilities

- `chat-interface`: Actualizar para soportar contexto de libro en el prompt inicial

## Impact

- **Rutas**: Nueva ruta `/chat/[bookId].vue`
- **Componentes**: Modificar ChatContainer para recibir contexto
- **Paginas**: Actualizar index.vue y practice/index.vue con nuevos enlaces
- **API**: Modificar `/api/chat` para incluir contexto del libro
