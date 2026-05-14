import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // next es la ruta a la que el usuario quería ir originalmente (por defecto "/home")
  const next = searchParams.get('next') ?? '/home';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Validar si el próximo destino es una URL relativa para seguridad
      const isInternalRedirect = next.startsWith('/');
      const finalUrl = isInternalRedirect ? `${origin}${next}` : `${origin}/home`;
      return NextResponse.redirect(finalUrl);
    }
  }

  // Redirigir al login con un mensaje de error claro si falla
  return NextResponse.redirect(`${origin}/login?error=Ocurrió un problema al sincronizar tu sesión. Por favor, reintenta.`);
}
