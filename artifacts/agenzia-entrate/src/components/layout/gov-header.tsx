import { Link, useLocation } from "wouter";
import { Search, User, Menu, Phone, MapPin, Mail, ChevronRight, Facebook, Twitter, Linkedin, Youtube, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GovHeader() {
  const [location] = useLocation();

  return (
    <header className="w-full flex flex-col font-sans border-b-4 border-[#003399]">
      {/* Topmost MEF bar */}
      <div className="bg-gov-navy text-white text-xs py-1.5">
        <div className="gov-container flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="font-semibold tracking-wider">Ministero dell'Economia e delle Finanze</span>
            <div className="hidden md:flex space-x-3 opacity-80">
              <Facebook className="w-3.5 h-3.5 hover:opacity-100 cursor-pointer transition-opacity" />
              <Twitter className="w-3.5 h-3.5 hover:opacity-100 cursor-pointer transition-opacity" />
              <Linkedin className="w-3.5 h-3.5 hover:opacity-100 cursor-pointer transition-opacity" />
              <Youtube className="w-3.5 h-3.5 hover:opacity-100 cursor-pointer transition-opacity" />
              <Rss className="w-3.5 h-3.5 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
          </div>
          <div className="flex items-center space-x-4 font-semibold opacity-90">
            <span className="cursor-pointer hover:underline">ITA</span>
            <span className="cursor-pointer hover:underline text-gray-400">ENG</span>
            <span className="cursor-pointer hover:underline text-gray-400">DEU</span>
          </div>
        </div>
      </div>

      {/* Utilities bar */}
      <div className="bg-gray-100 border-b border-gray-200 py-2 hidden md:block">
        <div className="gov-container flex justify-end space-x-6 text-sm text-[#003399] font-medium">
          <button className="hover:underline flex items-center gap-1.5"><ChevronRight className="w-4 h-4" /> Prenota appuntamento</button>
          <button className="hover:underline flex items-center gap-1.5"><ChevronRight className="w-4 h-4" /> Disdici appuntamento</button>
          <button className="hover:underline flex items-center gap-1.5"><Phone className="w-4 h-4" /> Chiamaci 800.90.96.96</button>
          <button className="hover:underline flex items-center gap-1.5"><Mail className="w-4 h-4" /> Contatti e assistenza</button>
          <button className="hover:underline flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Trova l'ufficio</button>
        </div>
      </div>

      {/* Logo & Search */}
      <div className="bg-white py-6">
        <div className="gov-container flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
            <div className="flex items-center gap-3">
              {/* Logo Replica */}
              <div className="w-12 h-12 bg-[#003399] rounded-sm flex items-center justify-center text-white font-serif font-bold text-3xl italic shadow-inner">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-[#003399] leading-none tracking-tight">Agenzia</span>
                <span className="text-2xl font-display font-bold text-[#003399] leading-none tracking-tight">Entrate</span>
              </div>
              <div className="hidden sm:flex items-center justify-center ml-2 px-2 py-0.5 border border-[#003399] text-[#003399] text-xs font-bold whitespace-nowrap">
                25° ANNIVERSARIO
              </div>
            </div>
          </Link>

          <div className="w-full md:w-auto flex items-center">
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Cerca nel sito..." 
                className="w-full border-2 border-gray-300 px-4 py-2.5 pr-12 focus:outline-none focus:border-[#003399] rounded-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-gov-blue">
        <div className="gov-container flex justify-between items-center">
          <nav className="hidden lg:flex text-white font-medium text-sm">
            {['Cittadini', 'Imprese', 'Professionisti', 'Intermediari', 'Enti e PA', 'L\'Agenzia', 'I nostri uffici'].map((item) => (
              <button key={item} className="px-5 py-4 hover:bg-white/10 transition-colors border-r border-white/10 last:border-0 uppercase tracking-wide">
                {item}
              </button>
            ))}
          </nav>
          
          <button className="lg:hidden text-white p-4">
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/dashboard" className="bg-[#FFCC00] text-[#003399] font-bold px-6 py-4 flex items-center gap-2 hover:bg-[#E6B800] transition-colors uppercase text-sm tracking-wide group">
            <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Dashboard / Area Riservata</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
