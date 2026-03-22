## Context

La interfaz actual de PianoMaster utiliza una paleta de colores grises neutras con acentos monocromaticos. El diseno carece de personalidad y no refleja la calidad premium que los estudiantes de piano esperan de una herramienta de estudio seria. El objetivo es una transformacion visual completa hacia "Premium Monochromatic" con tipografia Montserrat, geometria organica y movimiento sutil.

## Goals / Non-Goals

**Goals:**
- Establecer Montserrat como fuente unica para toda la interfaz
- Implementar esquema de color monocromatico estricto (negro #000, blanco #FFF, gris #F4F4F4)
- Crear componentes con bordes redondeados extremos (40px+)
- Disenar header modular con patron de ondas y bordes inferiores redondeados
- Implementar navegacion flotante estilo pilula con iconos lineales
- Aplicar transiciones suaves de 600ms con cubic-bezier(0.22, 1, 0.36, 1)

**Non-Goals:**
- No cambiar logica de negocio o funcionalidades
- No modificar estructura de datos
- No agregar dependencias externas de JavaScript
- No implementar modo oscuro/claro (solo monocromatico)

## Decisions

### Decision 1: Montserrat como fuente unica
**Choice**: Montserrat de Google Fonts
**Rationale**: Tipografia moderna, limpia y legible que transmite profesionalismo
**Alternatives considered**:
- Inter: Muy comun, no destaca
- Poppins: Demasiado rounded, menos seria
- System fonts: No proporciona coherencia

### Decision 2: Patron SVG de ondas para texturas
**Choice**: SVG inline con ondas concéntricas
**Rationale**: Texturas sutiles sin impact in performance, escalable
**Alternatives considered**:
- Imagen PNG: No escala bien, mayor peso
- CSS gradients: Menos control sobre el patron
- Canvas: Overkill para staticos

### Decision 3: Transiciones con cubic-bezier personalizado
**Choice**: cubic-bezier(0.22, 1, 0.36, 1) para todas las animaciones
**Rationale**: Curva suave con inicio rapido y frenado elegante, transmite calma profesional
**Alternatives considered**:
- ease-in-out: Muy generico
- spring animations: Excesivo para UI
- linear: Artificial

### Decision 4: Navegacion sin texto
**Choice**: Solo iconos de trazo lineal en navegacion
**Rationale**: Maximo minimalismo, interfaz limpia
**Alternatives considered**:
- Iconos + texto: Menos minimalista
- Solo texto: Menos reconocible
- Solo iconos circulares activos: Mas confuso

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Montserrat no carga | Fallback a system-ui |
| Transiciones lentas en dispositivos antiguos | Reducir duracion a 300ms con media query |
| Contenido poco legible en tarjetas negras | Usar blanco puro para texto |

## Open Questions

- ¿El patron de ondas debe aparecer en todas las tarjetas o solo en el header?
- ¿Los botones de accion deben tener hover state con escala o solo cambio de color?
