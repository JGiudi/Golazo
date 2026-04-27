import { OwnerBottomNav, OwnerDesktopSidebar } from '@/components/shared/OwnerNav';

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg md:pl-64">
      {/* Sidebar para Escritorio */}
      <OwnerDesktopSidebar />
      
      {/* Contenido Principal */}
      <main className="w-full">
        <div className="max-w-7xl mx-auto min-h-screen relative">
          {children}
        </div>
      </main>

      {/* Navegación Inferior para Móvil */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <OwnerBottomNav />
      </div>
    </div>
  );
}
