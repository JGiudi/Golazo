export default function ReviewReservaPage() {
  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <a
          href="/reservas"
          className="text-sm font-sans text-electric-green underline underline-offset-4"
        >
          Volver
        </a>
        <span className="text-xs font-sans text-gray-500">Revisión</span>
      </div>

      <section className="rounded-3xl border border-white/10 bg-dark-surface/60 p-6 space-y-4">
        <h1 className="font-display text-3xl text-white">Revisar reserva</h1>
        <p className="font-sans text-sm text-gray-400">
          Acá entra el flujo de split de pago y generación del link/checkout con
          Mercado Pago (server).
        </p>

        <div className="rounded-2xl border border-white/10 bg-pitch-black p-4">
          <div className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gray-500">
            Split de pago
          </div>
          <div className="mt-2 font-sans text-sm text-gray-300">
            (mock) Activado · 10 jugadores
          </div>
        </div>

        <a
          href="/reservas/confirmacion"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-electric-green px-5 py-3 text-sm font-sans font-semibold text-pitch-black hover:bg-electric-green/90 transition"
        >
          Confirmar (demo)
        </a>
      </section>
    </main>
  );
}

