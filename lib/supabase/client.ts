import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';

/**
 * Cliente de Supabase para uso en el navegador (Client Components).
 * Utiliza @supabase/ssr para gestionar la persistencia de la sesión mediante cookies.
 */
export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  return createSupabaseBrowserClient(url, anonKey);
}
