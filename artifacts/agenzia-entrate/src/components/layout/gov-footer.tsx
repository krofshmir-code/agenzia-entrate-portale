import { Link } from "wouter";

export function GovFooter() {
  return (
    <footer className="bg-[#1a1f5e] text-white pt-12 pb-6 mt-20 border-t-8 border-[#FFCC00]">
      <div className="gov-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center text-[#1a1f5e] font-serif font-bold text-2xl italic">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold leading-none tracking-tight">Agenzia</span>
                <span className="text-xl font-display font-bold leading-none tracking-tight">Entrate</span>
              </div>
            </div>
            <p className="text-sm text-gray-300 max-w-md leading-relaxed">
              L'Agenzia delle Entrate è l'istituzione italiana che si occupa della gestione e della riscossione dei tributi, garantendo la corretta applicazione delle norme fiscali nel rispetto dei diritti dei contribuenti.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#FFCC00]">Link Rapidi</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white hover:underline transition-colors">Home Page</Link></li>
              <li><Link href="/dashboard" className="hover:text-white hover:underline transition-colors">Area Riservata (Dashboard)</Link></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">Fatturazione Elettronica</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">Dichiarazione Precompilata</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#FFCC00]">Assistenza</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white hover:underline transition-colors">Contatti e recapiti</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">Assistenza online</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">Prenota appuntamento</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">Reclami ed elogi</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Note legali</a>
            <a href="#" className="hover:text-white transition-colors">Accessibilità</a>
            <a href="#" className="hover:text-white transition-colors">Mappa del sito</a>
          </div>
          <p>© {new Date().getFullYear()} Agenzia delle Entrate - Tutti i diritti riservati</p>
        </div>
      </div>
    </footer>
  );
}
