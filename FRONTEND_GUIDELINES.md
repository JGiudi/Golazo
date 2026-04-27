# GOLAZO - Frontend Development Guidelines (AI & Developer Prompt)

> **Instrucción para IAs y Desarrolladores:** Lee este documento detalladamente antes de crear o modificar cualquier componente, pantalla o flujo dentro del frontend de GOLAZO. Este proyecto utiliza Next.js (App Router) y está diseñado con un fuerte enfoque "Mobile First", estéticas vibrantes (dark mode, neón) y micro-interacciones.

## 1. Stack Tecnológico Principal
- **Framework:** Next.js 14+ (App Router).
- **Estilos:** Tailwind CSS.
- **Animaciones:** `motion/react` (Framer Motion).
- **Iconografía:** `lucide-react`.
- **Estado Global:** Context API (`@/lib/context.tsx`).

## 2. Sistema de Diseño (UI/UX)
Para mantener la coherencia visual extrema, respeta las siguientes reglas de diseño:

### Tipografía
- **Títulos y Cabeceras:** Usar `font-black italic uppercase tracking-tighter`. La fuente principal para destacar es `Bebas Neue` (configurada globalmente).
- **Subtítulos y Etiquetas (Tags):** Usar `text-[10px] font-black uppercase tracking-widest text-gray-500` (muy común en etiquetas superiores de secciones).
- **Texto general:** Usar `font-bold` o medium.

### Colores y Fondos
- **Fondo principal (App):** `bg-bg` (Gris súper oscuro/negro).
- **Tarjetas y Superficies (Cards):** `bg-surface` (un tono ligeramente más claro que el fondo) combinado con bordes muy sutiles `border border-white/5`.
- **Acentos:** El verde neón es el color de marca (`text-brand`, `bg-brand`). Para detalles secundarios usar el amarillo (`accent-yellow`).
- **Sombras:** Usar brillos en lugar de sombras oscuras, ej: `shadow-[0_10px_30px_rgba(0,230,118,0.3)]` para botones principales o neón.
- **Glassmorphism:** Para barras fijas (Headers/Footers), usar `bg-bg/80 backdrop-blur-xl`.

### Bordes y Formas
- Todo debe ser extremadamente redondeado. Usar `rounded-2xl`, `rounded-3xl`, o `rounded-[32px]` para tarjetas y contenedores grandes.

## 3. Arquitectura y Layout Responsivo
La app es **Mobile First** pero debe verse impecable en monitores (Desktop/Tablet):

- **Móvil (< 768px):** Diseño de 1 columna. Elementos a pantalla completa. Barra inferior (`BottomNav`).
- **Escritorio (>= 768px, `md:`):** 
  - Usar siempre utilidades `md:` para adaptar.
  - La barra inferior se oculta y la navegación la maneja el `DesktopSidebar`.
  - El contenido principal se expande limitándose con `max-w-7xl mx-auto`.
  - Convertir listas de tarjetas en grillas: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
  - Las vistas de detalle complejas (como `canchas/[id]`) deben dividirse en 2 columnas: `md:grid md:grid-cols-2`.

## 4. Componentes Compartidos (Reusabilidad)
Nunca crees botones o cabeceras desde cero sin revisar si existen en `components/`:

- **Botones (`@/components/ui/Button`):** Tienen soporte nativo de animaciones al hacer tap, variantes (`primary`, `outline`, `ghost`) y tamaños. **SIEMPRE** úsalos para acciones.
- **Header (`@/components/shared/Header`):** 
  - Para pantallas principales usa el default. 
  - Para sub-pantallas (Mis Datos, Detalle de Partido, Notificaciones), usa `variant="back"` pasándole el `title`.
  
## 5. Rutas Restantes por Crear (Checklist)
Cuando se te pida crear una de estas rutas, estructúrala en `app/(player)/...` y aplica el Header tipo `back`:

- [ ] `/perfil/mis-datos`: Formulario para editar perfil. (Usar `Input` ui components).
- [ ] `/perfil/notificaciones`: Lista de alertas (Invitaciones, Confirmaciones).
- [ ] `/perfil/historial`: Lista de partidos pasados (MatchHistory).
- [ ] `/reservas/[id]`: Detalle minucioso de una reserva confirmada (ReservationDetail).
- [ ] `/partidos`: Flujo para buscar partidos abiertos (Armar partido o sumarse).

## 6. Animaciones (Micro-interacciones)
- Usa `<AnimatePresence mode="wait">` para cambios de vista o pestañas.
- Envolvé listas dinámicas con `<motion.div layout>` para transiciones fluidas.
- Elementos que aparecen en pantalla por primera vez deben usar animaciones sutiles verticales: `initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}`.

---

### 📝 Prompt de ejemplo para alimentar a la IA:
*"Actúa como un desarrollador experto en Next.js y TailwindCSS. Revisa el archivo `FRONTEND_GUIDELINES.md` del repositorio. Tu tarea es implementar la pantalla de 'Notificaciones' en `app/(player)/perfil/notificaciones/page.tsx` usando los estilos de UI oscuros, tipografía Bebas Neue en itálica y el Header con variant='back'."*
