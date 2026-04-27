'use client';

import { DollarSign, TrendingUp, ArrowDownRight, ArrowUpRight, Banknote, Smartphone, Zap, Download } from 'lucide-react';
import Header from '@/components/shared/Header';

export default function FinanzasPage() {
  const transactions = [
    { id: 'TRX-101', player: 'Martín P.', type: 'Reserva Cancha 1', amount: '+$18.000', method: 'Mercado Pago', date: 'Hoy, 19:30', status: 'Aprobado' },
    { id: 'TRX-102', player: 'Santi G.', type: 'Seña Cancha 2', amount: '+$5.000', method: 'Transferencia', date: 'Hoy, 17:15', status: 'Aprobado' },
    { id: 'TRX-103', player: 'Mantenimiento', type: 'Reparación de red', amount: '-$12.500', method: 'Efectivo', date: 'Hoy, 14:00', status: 'Gasto' },
    { id: 'TRX-104', player: 'Juan C.', type: 'Reserva Cancha 1', amount: '+$15.000', method: 'Mercado Pago', date: 'Ayer, 21:00', status: 'Aprobado' },
    { id: 'TRX-105', player: 'Torneo F5', type: 'Pago Parcial', amount: '+$30.000', method: 'Efectivo', date: 'Ayer, 18:30', status: 'Aprobado' },
  ];

  return (
    <div className="min-h-screen bg-bg text-white pb-32">
      <div className="pt-8 px-6 space-y-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div className="space-y-1">
             <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none text-brand">FINANZAS</h1>
             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Octubre 2026</p>
           </div>
           
           <button className="bg-surface border border-surface-light px-6 py-3 rounded-xl flex items-center gap-2 hover:border-brand/50 transition-colors w-full md:w-auto justify-center">
              <Download className="w-4 h-4 text-gray-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">Exportar Excel</span>
           </button>
        </div>

        {/* High Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-surface/50 border border-surface-light rounded-[32px] p-6 space-y-4">
              <div className="flex justify-between items-center">
                 <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-brand" />
                 </div>
                 <div className="flex items-center gap-1 text-brand text-[10px] font-black uppercase tracking-widest bg-brand/10 px-2 py-1 rounded-md border border-brand/20">
                    <ArrowUpRight className="w-3 h-3" />
                    +15% MES
                 </div>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">INGRESOS NETOS</p>
                 <h3 className="text-4xl font-black italic tracking-tighter leading-none">$1.245.000</h3>
              </div>
           </div>

           <div className="bg-surface/50 border border-surface-light rounded-[32px] p-6 space-y-4">
              <div className="flex justify-between items-center">
                 <div className="w-10 h-10 rounded-xl bg-accent-yellow/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent-yellow" />
                 </div>
                 <div className="flex items-center gap-1 text-accent-yellow text-[10px] font-black uppercase tracking-widest bg-accent-yellow/10 px-2 py-1 rounded-md border border-accent-yellow/20">
                    <ArrowUpRight className="w-3 h-3" />
                    +5% MES
                 </div>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">CANTIDAD RESERVAS</p>
                 <h3 className="text-4xl font-black italic tracking-tighter leading-none">142</h3>
              </div>
           </div>

           <div className="bg-surface/50 border border-surface-light rounded-[32px] p-6 space-y-4">
              <div className="flex justify-between items-center">
                 <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <ArrowDownRight className="w-5 h-5 text-red-500" />
                 </div>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">GASTOS OPERATIVOS</p>
                 <h3 className="text-4xl font-black italic tracking-tighter leading-none text-gray-300">$320.000</h3>
              </div>
           </div>
        </div>

        {/* Methods & Chart Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Payment Methods */}
           <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-black italic tracking-tighter uppercase leading-none px-2">MÉTODOS DE COBRO</h3>
              <div className="bg-surface border border-surface-light rounded-[32px] p-6 flex flex-col gap-4">
                 {[
                   { label: 'Mercado Pago', value: '55%', amount: '$684.750', icon: Smartphone, color: 'text-blue-400', bg: 'bg-blue-400' },
                   { label: 'Efectivo', value: '30%', amount: '$373.500', icon: Banknote, color: 'text-brand', bg: 'bg-brand' },
                   { label: 'Transferencia', value: '15%', amount: '$186.750', icon: Zap, color: 'text-accent-yellow', bg: 'bg-accent-yellow' },
                 ].map((method, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                             <method.icon className={`w-4 h-4 ${method.color}`} />
                             <span className="text-xs font-bold uppercase">{method.label}</span>
                          </div>
                          <span className="text-xs font-black italic">{method.amount}</span>
                       </div>
                       <div className="flex justify-between items-center gap-4">
                          <div className="flex-1 h-1.5 bg-bg rounded-full overflow-hidden border border-white/5">
                             <div className={`h-full rounded-full ${method.bg}`} style={{ width: method.value }} />
                          </div>
                          <span className="text-[10px] font-black text-gray-500 w-8 text-right">{method.value}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Fake Chart Area */}
           <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-black italic tracking-tighter uppercase leading-none px-2">INGRESOS (ÚLTIMOS 7 DÍAS)</h3>
              <div className="bg-surface border border-surface-light rounded-[32px] p-6 h-64 flex items-end justify-between gap-2 md:gap-6 relative">
                 {/* Chart Grid Lines */}
                 <div className="absolute inset-x-6 top-6 bottom-12 border-b border-dashed border-white/10 flex flex-col justify-between z-0">
                    <div className="border-b border-dashed border-white/5 w-full h-0" />
                    <div className="border-b border-dashed border-white/5 w-full h-0" />
                 </div>
                 
                 {/* Bars */}
                 {[40, 60, 45, 80, 55, 90, 75].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 z-10">
                       <div className="w-full max-w-[40px] bg-brand/20 border border-brand/40 rounded-t-xl transition-all hover:bg-brand/40 group relative" style={{ height: `${height}%` }}>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-surface-light">
                             ${(height * 2.5).toFixed(1)}k
                          </div>
                       </div>
                       <span className="text-[8px] font-black text-gray-500 uppercase">Día {i+1}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Recent Transactions List */}
        <div className="space-y-4">
           <h3 className="text-lg font-black italic tracking-tighter uppercase leading-none px-2">ÚLTIMOS MOVIMIENTOS</h3>
           <div className="bg-surface/30 border border-surface-light rounded-[32px] overflow-hidden">
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-surface/50 border-b border-surface-light">
                       <tr>
                          <th className="p-4 text-[9px] font-black text-gray-500 uppercase tracking-widest">ID / Fecha</th>
                          <th className="p-4 text-[9px] font-black text-gray-500 uppercase tracking-widest">Concepto</th>
                          <th className="p-4 text-[9px] font-black text-gray-500 uppercase tracking-widest">Método</th>
                          <th className="p-4 text-[9px] font-black text-gray-500 uppercase tracking-widest text-right">Monto</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-light">
                       {transactions.map((trx, i) => (
                          <tr key={i} className="hover:bg-surface-light/20 transition-colors">
                             <td className="p-4">
                                <div className="space-y-1">
                                   <p className="text-xs font-black italic">{trx.id}</p>
                                   <p className="text-[9px] font-bold text-gray-500 uppercase">{trx.date}</p>
                                </div>
                             </td>
                             <td className="p-4">
                                <div className="space-y-1">
                                   <p className="text-xs font-bold">{trx.type}</p>
                                   <p className="text-[9px] font-bold text-gray-500 uppercase">{trx.player}</p>
                                </div>
                             </td>
                             <td className="p-4">
                                <span className="text-[9px] font-bold text-gray-400 bg-surface border border-white/5 px-2 py-1 rounded-md uppercase tracking-widest">
                                   {trx.method}
                                </span>
                             </td>
                             <td className="p-4 text-right">
                                <div className="space-y-1">
                                   <p className={`text-sm font-black italic tracking-tighter ${trx.amount.startsWith('+') ? 'text-brand' : 'text-white'}`}>
                                      {trx.amount}
                                   </p>
                                   <p className={`text-[8px] font-black uppercase tracking-widest ${trx.status === 'Gasto' ? 'text-red-500' : 'text-brand'}`}>
                                      {trx.status}
                                   </p>
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
