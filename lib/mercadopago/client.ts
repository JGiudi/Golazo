/**
 * Configuración y helpers para Mercado Pago (sin SDK extra).
 * Las llamadas a la API REST se hacen con fetch usando MP_ACCESS_TOKEN en el servidor.
 */

export function getMercadoPagoPublicKey(): string {
  const key = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
  if (!key) {
    throw new Error('Falta NEXT_PUBLIC_MP_PUBLIC_KEY');
  }
  return key;
}

export function getMercadoPagoAccessToken(): string {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    throw new Error('Falta MP_ACCESS_TOKEN');
  }
  return token;
}

export function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL;
  if (!url) {
    throw new Error('Falta NEXT_PUBLIC_APP_URL');
  }
  return url.replace(/\/$/, '');
}
