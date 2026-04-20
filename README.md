# Golazo

App web (Next.js 14) para organizar fútbol amateur: jugadores, partidos, canchas y pagos.

La versión anterior en Vite/React vive en la carpeta [`Viejo/`](./Viejo/).

## Requisitos

- Node.js 18.18 o superior (recomendado: 20 LTS)
- npm o pnpm

## Instalación

1. Clonar el repositorio e ir a la raíz del proyecto (no a `Viejo/`).

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Variables de entorno:

   ```bash
   cp .env.local.example .env.local
   ```

   Completá los valores de Supabase, Mercado Pago y `NEXT_PUBLIC_APP_URL` según tu entorno.

4. Desarrollo:

   ```bash
   npm run dev
   ```

   Abrí [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando        | Descripción              |
| -------------- | ------------------------ |
| `npm run dev`  | Servidor de desarrollo   |
| `npm run build` | Compilación producción  |
| `npm run start` | Servidor producción      |
| `npm run lint` | ESLint                   |
| `npm run format` | Prettier (formatear)   |

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (`@supabase/supabase-js`)
- ESLint + Prettier

## Estructura principal

- `app/` — rutas y API (grupos `(auth)`, `(owner)`, `(player)`)
- `components/ui` — primitivos de UI
- `components/shared` — layout compartido
- `lib/supabase` — clientes browser y servidor
- `lib/mercadopago` — helpers de configuración (sin SDK extra)
- `hooks/` — hooks React
- `types/` — tipos compartidos
