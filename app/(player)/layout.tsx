import BottomNav from '@/components/shared/BottomNav';
import DesktopSidebar from '@/components/shared/DesktopSidebar';
import Footer from '@/components/shared/Footer';

export default function PlayerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-bg text-white flex overflow-x-hidden">
      {/* Desktop Sidebar (hidden on mobile) */}
      <DesktopSidebar />

      {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col relative min-h-screen bg-bg md:ml-64 transition-all duration-300">
        <div className="flex-1 pb-32 md:pb-12 max-w-7xl mx-auto w-full">
          <main className="w-full px-6 pt-8 md:pt-12 lg:px-12">
            {children}
          </main>
          <div className="max-w-7xl mx-auto w-full">
            <Footer />
          </div>
        </div>
        
        {/* Mobile Bottom Navigation (hidden on desktop) */}
        <div className="fixed bottom-0 w-full z-50 md:hidden pointer-events-none">
          <div className="pointer-events-auto max-w-md mx-auto">
            <BottomNav />
          </div>
        </div>
      </div>
    </div>
  );
}
