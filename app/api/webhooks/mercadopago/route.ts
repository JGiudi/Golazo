import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.text();

  // TODO: validar firma de Mercado Pago y procesar el webhook
  if (process.env.NODE_ENV === 'development') {
    console.log('[mercadopago webhook]', body.slice(0, 200));
  }

  return NextResponse.json({ received: true });
}
