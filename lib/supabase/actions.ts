'use server';

import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { isValidNickname } from '@/lib/constants';

/**
 * Traduce los mensajes de error comunes de Supabase Auth al español.
 */
function translateError(error: string): string {
  const err = error.toLowerCase();
  if (err.includes('invalid login credentials')) return 'Email o contraseña incorrectos.';
  if (err.includes('email not confirmed')) return 'Debes confirmar tu email para ingresar.';
  if (err.includes('user already registered') || err.includes('already registered') || err.includes('email already in use')) {
    return 'Este correo ya está registrado. Intentá iniciar sesión.';
  }
  if (err.includes('password should be at least 6 characters')) return 'La contraseña debe tener al menos 6 caracteres.';
  if (err.includes('too many requests')) return 'Demasiados intentos. Por favor, intenta más tarde.';
  return 'Ocurrió un error inesperado. Por favor, reintenta.';
}

/**
 * Registra un nuevo usuario con correo, contraseña y metadatos de perfil.
 */
export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const nickname = formData.get('nickname') as string;
  const phone = formData.get('phone') as string;
  const location = formData.get('location') as string;
  const level = formData.get('level') as string;
  const sport = formData.get('sport') as string;

  // 1. Validación de apodo en servidor (Local)
  if (!isValidNickname(nickname)) {
    return { error: 'El apodo contiene palabras no permitidas. Por favor, elegí otro.' };
  }

  // 2. Validación vía API (Global - PurgoMalum)
  try {
    const apiResponse = await fetch(`https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(nickname)}`);
    const isProfane = await apiResponse.text();

    if (isProfane === 'true') {
      return { error: 'El apodo contiene contenido inapropiado según nuestras políticas globales.' };
    }
  } catch (apiError) {
    console.warn('Error al consultar API de profanidad, procediendo con chequeo local:', apiError);
  }

  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        nickname,
        phone,
        location,
        level,
        sport,
        full_name: nickname,
      },
    },
  });

  if (error) {
    return { error: translateError(error.message) };
  }

  // Supabase Auth maneja la "Protección de enumeración de usuarios".
  // Si el email ya existe, no devuelve error pero 'identities' estará vacío.
  if (data?.user && (!data.user.identities || data.user.identities.length === 0)) {
    return { error: 'Este correo ya está registrado. Intentá iniciar sesión.' };
  }

  return { success: true };
}

/**
 * Inicia sesión con correo y contraseña.
 */
export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: translateError(error.message) };
  }

  return { success: true };
}

/**
 * Cierra la sesión del usuario actual.
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true };
}

/**
 * Inicia el flujo de autenticación con Google OAuth.
 */
export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: 'No se pudo conectar con Google. Por favor, intenta más tarde.' };
  }

  if (data?.url) {
    redirect(data.url);
  }

  return { error: 'No se pudo generar la URL de autenticación' };
}
