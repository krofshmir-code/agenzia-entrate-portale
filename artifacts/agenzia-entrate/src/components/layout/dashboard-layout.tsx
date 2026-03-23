import { Link, useLocation } from "wouter";
import { LayoutDashboard, FileText, FileSpreadsheet, FileBadge, LogOut, Settings, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard Overview", href: "/dashboard" },
    { icon: FileText, label: "Documenti PDF", href: "/dashboard/pdf" },
    { icon: FileSpreadsheet, label: "Documenti Excel", href: "/dashboard/excel" },
    { icon: FileBadge, label: "Gestione Template", href: "/templates" },
    { icon: BarChart, label: "Statistiche Avanzate", href: "/dashboard/stats" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top header simplified for dashboard */}
      <header className="bg-gov-navy text-white h-16 flex items-center px-6 justify-between shadow-md z-10 sticky top-0">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center text-[#1a1f5e] font-serif font-bold text-xl italic">A</div>
          <span className="font-display font-bold text-lg hidden sm:block">Agenzia Entrate - SID Admin</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm bg-white/10 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>Sistema Operativo</span>
          </div>
          <Link href="/" className="text-sm font-medium hover:text-[#FFCC00] flex items-center gap-2 transition-colors">
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Esci</span>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 shadow-sm hidden md:flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Operatore</p>
            <p className="font-bold text-[#003399]">Mario Rossi</p>
            <p className="text-sm text-gray-500">Ufficio Territoriale Roma 1</p>
          </div>
          <nav className="flex-1 py-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                        isActive 
                          ? "bg-primary/10 text-primary border-l-4 border-primary" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-primary border-l-4 border-transparent"
                      )}
                    >
                      <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-gray-400")} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-100">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors w-full p-2">
              <Settings className="w-4 h-4" /> Impostazioni
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
