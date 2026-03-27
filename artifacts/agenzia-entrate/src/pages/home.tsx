import { GovHeader } from "@/components/layout/gov-header";
import { GovFooter } from "@/components/layout/gov-footer";
import { ChevronRight, FileText, Download, Info, Shield, Key, Monitor, FileQuestion, Bell, Globe, LayoutDashboard } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const sidebarItems = [
    { icon: Info, label: "Informazioni", href: "/", active: false },
    { icon: FileText, label: "Che cos'è", href: "/", active: true },
    { icon: Globe, label: "CRS – Certificato finanziario", href: "/crs", active: false, highlight: true },
    { icon: Download, label: "Modalità di trasmissione", href: "/", active: false },
    { icon: Shield, label: "Requisiti di sicurezza", href: "/", active: false },
    { icon: Key, label: "Registrazione", href: "/", active: false },
    { icon: Monitor, label: "Servizi disponibili", href: "/", active: false },
    { icon: FileText, label: "Manuali e guide operative", href: "/", active: false },
    { icon: Download, label: "Software", href: "/", active: false },
    { icon: FileQuestion, label: "Info e assistenza", href: "/", active: false },
    { icon: Bell, label: "Avvisi", href: "/", active: false },
  ];

  return (
    <div className="min-h-screen bg-white">
      <GovHeader />

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-3 border-b border-gray-200 text-sm">
        <div className="gov-container flex items-center text-gray-600 gap-2 whitespace-nowrap overflow-x-auto no-scrollbar">
          <Link href="/" className="hover:text-[#003399] hover:underline">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-[#003399] hover:underline cursor-pointer">Tutti i servizi</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-[#003399] hover:underline cursor-pointer">Servizi Trasversali</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-[#003399] hover:underline cursor-pointer">Altri servizi</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-[#003399] hover:underline cursor-pointer">Sistema di Interscambio flussi Dati (SID)</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-gray-900">Che cos'è</span>
        </div>
      </div>

      <div className="gov-container py-10 flex flex-col md:flex-row gap-10">
        {/* Left Sidebar */}
        <aside className="w-full md:w-72 shrink-0">
          <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm overflow-hidden">
            <div className="bg-[#003399] text-white p-4 font-bold text-base leading-tight uppercase">
              Sistema di Interscambio flussi Dati (SID)
            </div>
            <ul className="divide-y divide-gray-200">
              {sidebarItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-white text-[#003399] border-l-4 border-[#003399]"
                        : item.highlight
                        ? "text-[#003399] bg-blue-50 hover:bg-blue-100 border-l-4 border-[#FFCC00] font-semibold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#003399] border-l-4 border-transparent"
                    }`}
                  >
                    <item.icon className={`w-4 h-4 flex-shrink-0 ${item.active ? "text-[#003399]" : item.highlight ? "text-[#003399]" : "text-gray-400"}`} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboard Access Box */}
          <div className="mt-5 border-2 border-[#003399] rounded-sm overflow-hidden shadow-sm">
            <div className="bg-[#003399] text-white px-4 py-3 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="font-bold text-sm uppercase tracking-wide">Area Riservata SID</span>
            </div>
            <div className="p-4 bg-white">
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Accedi alla dashboard per gestire, scaricare e caricare i documenti ufficiali (PDF, Excel) e i template professionali.
              </p>
              <Link
                href="/dashboard"
                className="block w-full text-center bg-[#003399] text-white font-bold py-2.5 px-4 text-sm hover:bg-[#002266] transition-colors mb-2 uppercase tracking-wide"
              >
                Accedi alla Dashboard
              </Link>
              <Link
                href="/templates"
                className="block w-full text-center border border-[#003399] text-[#003399] font-semibold py-2 px-4 text-sm hover:bg-blue-50 transition-colors uppercase tracking-wide"
              >
                Template Ufficiali
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-bold text-[#003399] mb-6">
            Sistema di Interscambio flussi Dati (SID) – Che cos'è
          </h1>

          <div className="prose prose-blue max-w-none text-gray-800 space-y-5">
            <p className="text-base leading-relaxed">
              Per utilizzare l'infrastruttura SID (Sistema di Interscambio flussi Dati) è necessario essere registrati ai servizi telematici dell'Agenzia delle Entrate (Entratel o Fisconline) e accreditare un proprio "nodo" di interscambio oppure selezionare uno dei "nodi" già accreditati che offrono questo servizio di trasmissione.
            </p>

            <p className="leading-relaxed">È necessario, quindi:</p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                essere{" "}
                <a href="#" className="text-[#003399] underline hover:no-underline">
                  registrati ai servizi telematici dell'Agenzia delle Entrate (Entratel o Fisconline)
                </a>
              </li>
              <li>
                <a href="#" className="text-[#003399] underline hover:no-underline">
                  registrarsi al SID mediante apposita procedura
                </a>{" "}
                che permette di scegliere il canale di trasmissione da utilizzare (PEC o FTP)
              </li>
              <li>
                disporre di un proprio certificato rilasciato dall'Agenzia delle Entrate da utilizzare per la predisposizione dei flussi da trasmettere tramite l'infrastruttura e/o per l'elaborazione dei flussi predisposti dall'Agenzia.
              </li>
              <li>
                munirsi del{" "}
                <a href="#" className="text-[#003399] underline hover:no-underline">
                  software SID
                </a>{" "}
                necessario per operare nell'ambito dell'infrastruttura.
              </li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-[#003399] p-5 my-6 rounded-sm">
              <h3 className="text-lg font-bold text-[#003399] mb-2 mt-0">Attenzione</h3>
              <p className="m-0 text-sm leading-relaxed">
                Per utilizzare i servizi del SID è necessario completare la procedura di accreditamento e ottenere le credenziali specifiche. L'accesso è riservato ai soggetti preventivamente autorizzati tramite provvedimento direttoriale.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[#003399] mt-10 mb-4 border-b pb-2">Funzionalità principali</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Trasmissione massiva di flussi documentali (PDF, XML, Excel)</li>
              <li>Scambio di comunicazioni finanziarie obbligatorie (es. CRS, DAC2, Saldi e Movimenti)</li>
              <li>Invio di dichiarazioni da parte di intermediari autorizzati</li>
              <li>Ricezione automatizzata di ricevute ed esiti di elaborazione</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#003399] mt-10 mb-4 border-b pb-2">Servizi disponibili tramite SID</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { label: "CRS – Common Reporting Standard", desc: "Scambio automatico informazioni finanziarie", href: "/crs", cta: "Vai alla sezione CRS" },
                { label: "Flussi Saldi e Movimenti", desc: "Comunicazione dati bancari e finanziari", href: "/", cta: "Scopri di più" },
                { label: "FATCA", desc: "Accordo intergovernativo con gli USA", href: "/", cta: "Scopri di più" },
                { label: "730 precompilato", desc: "Trasmissione dati per la dichiarazione precompilata", href: "/", cta: "Scopri di più" },
              ].map((s, i) => (
                <div key={i} className="border border-gray-200 rounded-sm p-4 hover:border-[#003399] hover:shadow-sm transition-all group">
                  <p className="font-semibold text-[#003399] text-sm mb-1">{s.label}</p>
                  <p className="text-xs text-gray-500 mb-3">{s.desc}</p>
                  <Link href={s.href} className="text-xs font-semibold text-[#003399] hover:underline flex items-center gap-1">
                    {s.cta} <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-[#003399] text-white font-bold py-3 px-6 text-sm hover:bg-[#002266] transition-colors uppercase tracking-wide"
              >
                <LayoutDashboard className="w-4 h-4" />
                Accedi alla Dashboard SID
              </Link>
              <Link
                href="/crs"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#003399] text-[#003399] font-bold py-3 px-6 text-sm hover:bg-blue-50 transition-colors uppercase tracking-wide"
              >
                <Globe className="w-4 h-4" />
                Sezione CRS
              </Link>
            </div>
          </div>
        </main>
      </div>

      <GovFooter />
    </div>
  );
}
