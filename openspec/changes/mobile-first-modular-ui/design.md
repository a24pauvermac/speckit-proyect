## Context

La aplicacion PianoMaster esta desarrollada con Nuxt.js 3.x y utiliza Dexie.js para persistencia local en IndexedDB. La interfaz actual tiene los siguientes problemas:

1. **Bug de persistencia**: Al crear un libro, no se guarda correctamente en la base de datos local
2. **Navegacion no optimizada para mobile**: No existe una barra de navegacion inferior para acceso rapido
3. **Grid no responsivo**: Los modulos de acceso rapido en la pagina principal no se adaptan correctamente
4. **Sin transiciones**: La navegacion entre paginas es abrupta sin animaciones suaves

El objetivo es adoptar un enfoque Mobile First con una navegacion intuitiva y una experiencia visual coherente.

## Goals / Non-Goals

**Goals:**
- Corregir el bug de persistencia de libros en IndexedDB
- Implementar barra de navegacion flotante inferior con enlaces de solo texto
- Crear sistema de grid centrado para modulos de acceso rapido
- Agregar transiciones suaves de opacidad y desplazamiento para navegacion

**Non-Goals:**
- No se modificara la estructura de datos existente de IndexedDB (schema v1)
- No se añadiran nuevos endpoints de API o funcionalidades de backend
- No se implementara autenticacion ni perfiles de usuario

## Decisions

### Decision 1: Bottom Navigation Bar
**Choice**: Barra de navegacion fija en la parte inferior de la pantalla con enlaces de texto
**Rationale**: Navegacion standard en apps moviles, facil acceso con el pulgar, mantiene espacio de pantalla limpio
**Alternatives considered**:
- Sidebar: No es ideal para mobile
- Top tabs: Ocupa espacio de contenido
- Hamburger menu: Menos accesible

### Decision 2: Transiciones con CSS
**Choice**: Transiciones CSS nativas (opacity, transform) con ease-in-out
**Rationale**: Mejor rendimiento que animaciones JS, compatible con todos los navegadores, facil de mantener
**Alternatives considered**:
- Vue Transition: Overhead para casos simples
- GSAP: Dependencia adicional innecesaria
- Framer Motion: Solo para React

### Decision 3: Grid Centrado con CSS Grid
**Choice**: CSS Grid con `place-items: center` y media queries
**Rationale**: Soporte nativo en navegadores modernos, semantico, flexible
**Alternatives considered**:
- Flexbox: Requiere mas codigo para grids bidimensionales
- Framework CSS: No se quiere anadir dependencias

### Decision 4: Bug Fix - Async/Await en createBook
**Choice**: Verificar que `createBook` espera correctamente la operacion de Dexie
**Rationale**: El problema parece ser una carrera de condiciones donde `fetchBooks()` se ejecuta antes de que `db.methodBooks.add()` complete
**Alternatives considered**:
- Usar callbacks: Menos legible
- Promesas encadenadas: Funciona pero async/await es mas claro

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Transiciones pueden afectar rendimiento en dispositivos lentos | Usar `will-change` sparingly y `prefers-reduced-motion` |
| Navegacion inferior puede tapar contenido | Padding inferior en `<main>` para espacio |
| Bug de persistencia puede reaparecer | Agregar tests de integracion con Dexie |

## Open Questions

- ¿Se debe guardar el estado activo de navegacion en localStorage?
- ¿Las transiciones deben aplicar a todas las rutas o solo a las principales?
