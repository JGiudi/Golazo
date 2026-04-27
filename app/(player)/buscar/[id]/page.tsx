type Params = {
  params: { id: string };
};

export default function CourtDetailPage({ params }: Params) {
  const id = params.id;

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <a
          href="/buscar"
          className="text-sm font-sans text-electric-green underline underline-offset-4"
        >
          Volver
        </a>
        <span className="text-xs font-sans text-gray-500">Cancha #{id}</span>
      </div>

      <section className="rounded-[32px] overflow-hidden border border-white/10 bg-dark-surface/60">
        <div className="aspect-[16/9] bg-gradient-to-br from-dark-surface to-pitch-black" />
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-electric-green/30 bg-electric-green/10 px-3 py-1 text-[10px] font-sans font-semibold uppercase tracking-widest text-electric-green">
              Fútbol
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-sans font-semibold uppercase tracking-widest text-gray-300">
              Techada · Sintético
            </span>
          </div>
          <h1 className="font-display text-4xl text-white">
            Detalle de cancha (mock)
          </h1>
          <p className="font-sans text-sm text-gray-400 max-w-2xl">
            Esta pantalla reemplaza el flujo de Vite (CourtDetail). Acá vamos a
            enganchar horarios disponibles, split de pago y creación de reserva
            con Supabase + webhook Mercado Pago.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-pitch-black p-4">
              <div className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gray-500">
                Precio
              </div>
              <div className="mt-2 font-display text-2xl text-goal-yellow">
                $12.500 / hora
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-pitch-black p-4">
              <div className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gray-500">
                Ubicación
              </div>
              <div className="mt-2 font-sans text-sm text-gray-300">
                Palermo, Buenos Aires
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/reservas/revisar"
              className="inline-flex items-center justify-center rounded-2xl bg-electric-green px-5 py-3 text-sm font-sans font-semibold text-pitch-black hover:bg-electric-green/90 transition"
            >
              Reservar (demo)
            </a>
            <a
              href="/reservas"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-sans font-semibold text-white hover:bg-white/10 transition"
            >
              Ver mis reservas
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

