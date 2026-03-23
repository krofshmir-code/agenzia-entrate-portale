import { GovHeader } from "@/components/layout/gov-header";
import { GovFooter } from "@/components/layout/gov-footer";
import { ChevronRight, FileText, Download, Info, Shield, Key, Monitor, FileQuestion, Bell, Globe, AlertCircle, CheckCircle, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function CRS() {
  const sidebarItems = [
    { label: "Informazioni", href: "/" },
    { label: "Che cos'è", href: "/" },
    { label: "CRS - Common Reporting Standard", href: "/crs", active: true },
    { label: "Modalità di trasmissione", href: "/" },
    { label: "Requisiti di sicurezza", href: "/" },
    { label: "Registrazione", href: "/" },
    { label: "Servizi disponibili", href: "/" },
    { label: "Manuali e guide operative", href: "/" },
    { label: "Software", href: "/" },
    { label: "Info e assistenza", href: "/" },
    { label: "Avvisi", href: "/" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <GovHeader />

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-3 border-b border-gray-200 text-sm">
        <div className="gov-container flex items-center text-gray-600 gap-2 whitespace-nowrap overflow-x-auto">
          <Link href="/" className="hover:text-[#003399] hover:underline">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="hover:text-[#003399] hover:underline cursor-pointer">Tutti i servizi</span>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="hover:text-[#003399] hover:underline cursor-pointer">Servizi Trasversali</span>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <Link href="/" className="hover:text-[#003399] hover:underline">Sistema di Interscambio flussi Dati (SID)</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="font-semibold text-gray-900">CRS - Common Reporting Standard</span>
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
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#003399] border-l-4 border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Access Dashboard Box */}
          <div className="mt-6 border border-[#003399] rounded-sm overflow-hidden">
            <div className="bg-[#003399] text-white p-3 font-bold text-sm uppercase">Area Riservata SID</div>
            <div className="p-4 bg-white">
              <p className="text-xs text-gray-600 mb-3">Accedi all'area riservata per caricare, scaricare e gestire i flussi CRS.</p>
              <Link
                href="/dashboard"
                className="block w-full text-center bg-[#FFCC00] text-[#003399] font-bold py-2 px-4 text-sm hover:bg-[#E6B800] transition-colors"
              >
                Accedi alla Dashboard
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-bold text-[#003399] mb-2">
            Sistema di Interscambio flussi Dati (SID) – CRS
          </h1>
          <h2 className="text-xl text-gray-700 mb-6 font-normal">
            Common Reporting Standard – Scambio automatico di informazioni finanziarie
          </h2>

          <div className="bg-blue-50 border-l-4 border-[#003399] p-5 mb-8 rounded-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#003399] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#003399] mb-1">Obbligo di comunicazione</p>
                <p className="text-sm text-gray-700">
                  Le istituzioni finanziarie italiane sono tenute a comunicare all'Agenzia delle Entrate le informazioni sui conti finanziari detenuti da soggetti residenti in giurisdizioni estere aderenti al CRS, ai sensi del D.Lgs. 90/2016.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-blue max-w-none text-gray-800 space-y-6">
            <h2 className="text-2xl font-bold text-[#003399] border-b border-gray-200 pb-2">Che cos'è il CRS</h2>
            <p className="leading-relaxed">
              Il <strong>Common Reporting Standard (CRS)</strong> è lo standard internazionale per lo scambio automatico di informazioni finanziarie ai fini fiscali, sviluppato dall'OCSE (Organizzazione per la Cooperazione e lo Sviluppo Economico) e adottato dall'Unione Europea con la Direttiva 2014/107/UE (DAC2).
            </p>
            <p className="leading-relaxed">
              In Italia, il CRS è stato recepito con il <strong>Decreto Legislativo 15 marzo 2017, n. 40</strong> e con il Decreto del Ministero dell'Economia e delle Finanze del 28 dicembre 2015. Le istituzioni finanziarie residenti in Italia (banche, assicurazioni, fondi di investimento, ecc.) sono tenute a raccogliere le informazioni sui conti finanziari e a comunicarle annualmente all'Agenzia delle Entrate.
            </p>

            <h2 className="text-2xl font-bold text-[#003399] border-b border-gray-200 pb-2 mt-8">Soggetti obbligati</h2>
            <p>Sono tenute agli obblighi di comunicazione le <strong>Istituzioni Finanziarie Italiane Tenute alla Comunicazione (IFTC)</strong>:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Banche e istituti di credito</li>
              <li>Compagnie di assicurazione che emettono contratti di assicurazione per i quali è misurabile un valore monetario</li>
              <li>Organismi di investimento collettivo del risparmio (OICR)</li>
              <li>Fiduciarie e trust companies</li>
              <li>Ogni altra entità che accetta depositi nel normale svolgimento di attività bancarie o simili</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#003399] border-b border-gray-200 pb-2 mt-8">Informazioni da comunicare</h2>
            <p>Le istituzioni finanziarie devono comunicare, per ciascun conto finanziario soggetto a comunicazione:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              {[
                { title: "Dati del titolare del conto", desc: "Nome, indirizzo, giurisdizione(i) di residenza, NIF (numero di identificazione fiscale), data e luogo di nascita" },
                { title: "Dati del conto", desc: "Numero di conto, saldo o valore del conto al 31 dicembre di ciascun anno di riferimento" },
                { title: "Dati dell'istituzione finanziaria", desc: "Nome e codice identificativo dell'istituzione finanziaria comunicante" },
                { title: "Proventi", desc: "Interessi, dividendi, altri redditi e proventi totali lordi da vendita o riscatto di attività finanziarie" },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-sm p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-800 text-sm">{item.title}</span>
                  </div>
                  <p className="text-xs text-gray-600 pl-6">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-[#003399] border-b border-gray-200 pb-2 mt-8">Modalità di trasmissione tramite SID</h2>
            <p>Le comunicazioni CRS devono essere trasmesse all'Agenzia delle Entrate esclusivamente attraverso il <strong>Sistema di Interscambio Dati (SID)</strong>, utilizzando il formato XML secondo lo schema XSD dell'OCSE.</p>

            <div className="bg-yellow-50 border border-yellow-300 rounded-sm p-5 my-4">
              <p className="font-semibold text-yellow-900 mb-2">Scadenza annuale</p>
              <p className="text-sm text-yellow-800">
                Le comunicazioni relative all'anno solare precedente devono essere trasmesse entro il <strong>30 aprile</strong> di ciascun anno. Per l'anno d'imposta 2024, la scadenza è il <strong>30 aprile 2025</strong>.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[#003399] border-b border-gray-200 pb-2 mt-8">Documentazione e template disponibili</h2>
            <p>Nell'area riservata della dashboard SID sono disponibili i seguenti documenti ufficiali:</p>
            <div className="space-y-3">
              {[
                { name: "Schema XSD CRS – Formato XML per la comunicazione", type: "XML/ZIP", size: "1.2 MB" },
                { name: "Guida alla compilazione flusso CRS 2024", type: "PDF", size: "3.4 MB" },
                { name: "Template Excel – Raccolta dati CRS per istituzioni finanziarie", type: "XLSX", size: "890 KB" },
                { name: "Istruzioni operative trasmissione SID-CRS", type: "PDF", size: "2.1 MB" },
                { name: "FAQ – Domande frequenti sul CRS", type: "PDF", size: "780 KB" },
                { name: "Provvedimento del Direttore dell'Agenzia delle Entrate – CRS", type: "PDF", size: "540 KB" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-sm bg-white hover:border-[#003399] hover:bg-blue-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#003399]" />
                    <div>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-[#003399]">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.type} · {doc.size}</p>
                    </div>
                  </div>
                  <Link href="/dashboard" className="flex items-center gap-1 text-xs font-medium text-[#003399] hover:underline">
                    <Download className="w-4 h-4" />
                    Scarica
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-[#003399] text-white p-6 rounded-sm">
              <div className="flex items-start gap-4">
                <Globe className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Accedi all'area riservata SID per i flussi CRS</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Per caricare, consultare e scaricare i documenti CRS è necessario accedere all'area riservata con le credenziali Entratel/Fisconline o con SPID/CIE.
                  </p>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 bg-[#FFCC00] text-[#003399] font-bold px-6 py-3 hover:bg-[#E6B800] transition-colors text-sm uppercase"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Vai alla Dashboard SID
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <GovFooter />
    </div>
  );
}
