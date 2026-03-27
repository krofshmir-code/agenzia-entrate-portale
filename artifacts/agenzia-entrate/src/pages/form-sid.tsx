import { useState, useEffect } from "react";
import { GovHeader } from "@/components/layout/gov-header";
import { GovFooter } from "@/components/layout/gov-footer";
import { LogoAE } from "@/components/logo-ae";
import { TimbroAE, TimbriSovrapposti } from "@/components/timbro-ae";
import { ChevronRight, Printer, RotateCcw, Download } from "lucide-react";
import { Link } from "wouter";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type FormData = {
  titoloPagina: string; modelloInfo: string;
  denominazione: string; cf: string; forma: string; rea: string;
  indirizzo: string; cap: string; comune: string; provincia: string; paese: string;
  referenteCognome: string; referenteCF: string; referenteEmail: string;
  referenteTel: string; referenteQualifica: string; referenteEntratel: string;
  accreditamento: string; canale: string;
  flussi: { [k: string]: boolean };
  note: string; luogo: string; data: string;
  protocollo: string; dataRic: string;
  euroBollo: string; serieBollo: string; funzionario: string;
};

const EMPTY: FormData = {
  titoloPagina: "Modulo di Registrazione al Sistema di Interscambio Dati (SID)",
  modelloInfo: "Modello SID/REG – Revisione 04/2024",
  denominazione: "", cf: "", forma: "", rea: "",
  indirizzo: "", cap: "", comune: "", provincia: "", paese: "",
  referenteCognome: "", referenteCF: "", referenteEmail: "",
  referenteTel: "", referenteQualifica: "", referenteEntratel: "",
  accreditamento: "", canale: "",
  flussi: { crs: false, fatca: false, saldi: false, precomp: false, iva: false, sost: false, cu: false, dac2: false, altri: false },
  note: "", luogo: "", data: "",
  protocollo: "", dataRic: "",
  euroBollo: "", serieBollo: "", funzionario: "",
};

const DEMO: FormData = {
  titoloPagina: "Modulo di Registrazione al Sistema di Interscambio Dati (SID)",
  modelloInfo: "Modello SID/REG – Revisione 04/2024",
  denominazione: "Banca Commerciale Ligure S.p.A.",
  cf: "00148520109",
  forma: "Società per Azioni (S.p.A.)",
  rea: "GE-123456",
  indirizzo: "Via XX Settembre 14",
  cap: "16121",
  comune: "Genova",
  provincia: "GE",
  paese: "Italia",
  referenteCognome: "Ferraris Giovanna",
  referenteCF: "FRRGNN75M45D969X",
  referenteEmail: "g.ferraris@banca.comm.ligure.it",
  referenteTel: "+39 010 5912301",
  referenteQualifica: "Responsabile Compliance & Reporting Fiscale",
  referenteEntratel: "ENTRATEL-BCL-2024",
  accreditamento: "Nuovo accreditamento",
  canale: "SID – Sistema di Interscambio Dati",
  flussi: { crs: true, fatca: true, saldi: false, precomp: false, iva: false, sost: true, cu: false, dac2: true, altri: false },
  note: "Si richiede accreditamento per trasmissione flussi CRS (DAC2), FATCA e Sostituto d'imposta. Certificato digitale allegato in formato PEM.",
  luogo: "Genova",
  data: "2025-04-28",
  protocollo: "0042",
  dataRic: "2025-04-28",
  euroBollo: "20,00",
  serieBollo: "3",
  funzionario: "Manari Mauro",
};

const fieldCls = "w-full border-b border-gray-500 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-[#003399] print:bg-white";
const inputSm = "border-b border-gray-500 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-[#003399] print:bg-white";

export default function FormSID() {
  const params = new URLSearchParams(window.location.search);
  const [form, setForm] = useState<FormData>(params.get("demo") === "1" ? DEMO : EMPTY);

  const set = (k: keyof FormData, v: string) => setForm(p => ({ ...p, [k]: v }));
  const setFlusso = (k: string, v: boolean) =>
    setForm(p => ({ ...p, flussi: { ...p.flussi, [k]: v } }));

  const handlePrint = () => window.print();
  const handleReset = () => { if (confirm("Vuoi cancellare tutti i dati inseriti?")) setForm(EMPTY); };
  const handleDemo  = () => setForm(DEMO);

  useEffect(() => {
    if (params.get("print") === "1") {
      setTimeout(() => window.print(), 900);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="print:hidden">
        <GovHeader />
        <div className="bg-gray-100 py-3 border-b border-gray-200 text-sm">
          <div className="gov-container flex items-center text-gray-600 gap-2">
            <Link href="/" className="hover:text-[#003399] hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/" className="hover:text-[#003399] hover:underline">SID</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-gray-900">Modulo di Registrazione SID</span>
          </div>
        </div>
        <div className="gov-container py-4 flex gap-3 flex-wrap">
          <button onClick={handlePrint}
            className="flex items-center gap-2 bg-[#003399] text-white font-semibold px-5 py-2.5 text-sm hover:bg-[#002266] transition-colors">
            <Printer className="w-4 h-4" /> Stampa / Salva PDF
          </button>
          <button onClick={handleReset}
            className="flex items-center gap-2 border border-gray-400 text-gray-600 font-semibold px-5 py-2.5 text-sm hover:bg-gray-100 transition-colors">
            <RotateCcw className="w-4 h-4" /> Azzera campi
          </button>
          <button onClick={handleDemo}
            className="flex items-center gap-2 border border-green-600 text-green-700 font-semibold px-5 py-2.5 text-sm hover:bg-green-50 transition-colors">
            📋 Carica esempio compilato
          </button>
          <button onClick={() => window.print()}
            className="flex items-center gap-2 border border-red-600 text-red-700 font-semibold px-5 py-2.5 text-sm hover:bg-red-50 transition-colors">
            <Download className="w-4 h-4" /> Scarica PDF
          </button>
          <Link href="/dashboard"
            className="flex items-center gap-2 border border-[#003399] text-[#003399] font-semibold px-5 py-2.5 text-sm hover:bg-blue-50 transition-colors">
            ← Torna alla Dashboard
          </Link>
          <div className="flex-1" />
          <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2.5 font-medium">
            ✏️ Modulo compilabile — tutti i campi sono editabili
          </span>
        </div>
      </div>

      <div className="gov-container pb-12 print:p-0">
        <div className="bg-white shadow-md print:shadow-none max-w-4xl mx-auto p-10 print:p-8"
          style={{ fontFamily: "'Times New Roman', serif" }}>

          {/* ── LOGO UFFICIALE ── */}
          <div className="border-b-2 border-gray-800 pb-4 mb-4">
            <LogoAE />
          </div>

          {/* ── PROTOCOLLO / DATA (editabili) ── */}
          <div className="flex justify-between items-start mb-4">
            <div className="text-xs text-gray-500 italic">
              Direzione Centrale Servizi ai Contribuenti
            </div>
            <div className="text-right text-xs space-y-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="font-bold text-gray-700">Prot. n.</span>
                <input value={form.protocollo} onChange={e => set("protocollo", e.target.value)}
                  placeholder="_______________" className={`${inputSm} w-36`} />
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-gray-600">Data:</span>
                <input type="date" value={form.data} onChange={e => set("data", e.target.value)}
                  className={`${inputSm} w-36`} />
              </div>
            </div>
          </div>

          {/* ── TITOLO ── */}
          <div className="text-center my-5">
            <h1 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
              <input
                value={form.titoloPagina}
                onChange={e => set("titoloPagina", e.target.value)}
                className="w-full text-center font-bold text-gray-900 bg-transparent border-b border-dashed border-gray-400 focus:outline-none focus:border-[#003399] text-xl uppercase tracking-wide"
              />
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Ai sensi del Provvedimento del Direttore dell'Agenzia delle Entrate del 25 marzo 2013
            </p>
            <div className="mt-2 inline-block border border-gray-400 px-4 py-1 text-xs text-gray-600 w-full max-w-sm">
              <input
                value={form.modelloInfo}
                onChange={e => set("modelloInfo", e.target.value)}
                className="w-full text-center text-xs text-gray-600 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* ── SEZIONE A ── */}
          <section className="mb-5">
            <div className="bg-[#003399] text-white px-4 py-2 text-sm font-bold uppercase tracking-wide mb-3">
              A – Dati identificativi del soggetto richiedente
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Denominazione / Ragione Sociale *</label>
                <input value={form.denominazione} onChange={e => set("denominazione", e.target.value)}
                  placeholder="Es. Banca XYZ S.p.A." className={fieldCls} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Codice Fiscale / P.IVA *</label>
                <input value={form.cf} onChange={e => set("cf", e.target.value.toUpperCase())}
                  placeholder="XXXXXXXXXXXXXXXX" maxLength={16}
                  className={`${fieldCls} font-mono tracking-widest`} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Forma giuridica *</label>
                <select value={form.forma} onChange={e => set("forma", e.target.value)}
                  className={`${fieldCls} cursor-pointer`}>
                  <option value="">— Selezionare —</option>
                  {["Persona fisica", "Società di capitali", "Società di persone", "Ente pubblico", "Associazione", "Altro"].map(v =>
                    <option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">N. REA / Registro imprese</label>
                <input value={form.rea} onChange={e => set("rea", e.target.value)}
                  placeholder="Es. RM-1234567" className={fieldCls} />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Indirizzo sede legale *</label>
                <input value={form.indirizzo} onChange={e => set("indirizzo", e.target.value)}
                  placeholder="Via / Piazza, numero civico" className={fieldCls} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">CAP</label>
                <input value={form.cap} onChange={e => set("cap", e.target.value)}
                  placeholder="00000" maxLength={5} className={fieldCls} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Comune</label>
                <input value={form.comune} onChange={e => set("comune", e.target.value)}
                  placeholder="Città" className={fieldCls} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Provincia</label>
                <input value={form.provincia} onChange={e => set("provincia", e.target.value.toUpperCase())}
                  placeholder="RM" maxLength={2} className={`${fieldCls} uppercase`} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Paese (se estero)</label>
                <input value={form.paese} onChange={e => set("paese", e.target.value)}
                  placeholder="Solo se sede estera" className={fieldCls} />
              </div>
            </div>
          </section>

          {/* ── SEZIONE B ── */}
          <section className="mb-5">
            <div className="bg-[#003399] text-white px-4 py-2 text-sm font-bold uppercase tracking-wide mb-3">
              B – Dati del referente tecnico / responsabile SID
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Cognome e Nome *</label>
                <input value={form.referenteCognome} onChange={e => set("referenteCognome", e.target.value)}
                  placeholder="Cognome Nome" className={fieldCls} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Codice Fiscale *</label>
                <input value={form.referenteCF} onChange={e => set("referenteCF", e.target.value.toUpperCase())}
                  placeholder="XXXXXXXXXXXXXXXX" maxLength={16}
                  className={`${fieldCls} font-mono tracking-widest`} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Indirizzo e-mail (PEC) *</label>
                <input type="email" value={form.referenteEmail} onChange={e => set("referenteEmail", e.target.value)}
                  placeholder="nome@pec.it" className={fieldCls} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Telefono / Cellulare *</label>
                <input type="tel" value={form.referenteTel} onChange={e => set("referenteTel", e.target.value)}
                  placeholder="+39 06 000000" className={fieldCls} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Qualifica / Ruolo *</label>
                <input value={form.referenteQualifica} onChange={e => set("referenteQualifica", e.target.value)}
                  placeholder="Es. Responsabile IT" className={fieldCls} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">N. iscrizione Entratel/Fisconline</label>
                <input value={form.referenteEntratel} onChange={e => set("referenteEntratel", e.target.value)}
                  placeholder="Numero di iscrizione" className={fieldCls} />
              </div>
            </div>
          </section>

          {/* ── SEZIONE C ── */}
          <section className="mb-5">
            <div className="bg-[#003399] text-white px-4 py-2 text-sm font-bold uppercase tracking-wide mb-3">
              C – Tipologia di accreditamento richiesto
            </div>
            <div className="space-y-2 text-sm mb-4">
              {[
                { v: "mittente", label: "Accreditamento come nodo mittente (trasmissione flussi verso l'Agenzia delle Entrate)" },
                { v: "destinatario", label: "Accreditamento come nodo destinatario (ricezione flussi dall'Agenzia delle Entrate)" },
                { v: "bilaterale", label: "Accreditamento bilaterale (mittente e destinatario)" },
                { v: "terzi", label: "Utilizzo nodo già accreditato di terzi" },
              ].map(opt => (
                <label key={opt.v} className="flex items-start gap-3 cursor-pointer group">
                  <input type="radio" name="accreditamento" value={opt.v}
                    checked={form.accreditamento === opt.v}
                    onChange={() => set("accreditamento", opt.v)}
                    className="mt-0.5 accent-[#003399] w-4 h-4 flex-shrink-0" />
                  <span className="text-xs text-gray-800 group-hover:text-[#003399]">{opt.label}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-700 uppercase mb-2">Canale di trasmissione preferito:</p>
              <div className="flex gap-6">
                {["PEC (Posta Elettronica Certificata)", "SFTP (Secure File Transfer Protocol)", "HTTPS"].map(c => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer text-xs">
                    <input type="radio" name="canale" value={c}
                      checked={form.canale === c}
                      onChange={() => set("canale", c)}
                      className="accent-[#003399] w-4 h-4" />
                    {c}
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* ── SEZIONE D ── */}
          <section className="mb-5">
            <div className="bg-[#003399] text-white px-4 py-2 text-sm font-bold uppercase tracking-wide mb-3">
              D – Tipologia di flussi da trasmettere / ricevere
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs mb-3">
              {[
                { k: "crs", label: "CRS (Common Reporting Standard)" },
                { k: "fatca", label: "FATCA (Foreign Account Tax Compliance Act)" },
                { k: "saldi", label: "Saldi e Movimenti bancari" },
                { k: "precomp", label: "730 precompilato – dati da intermediari" },
                { k: "iva", label: "Comunicazioni IVA" },
                { k: "sost", label: "Dichiarazioni sostitutive di intermediari" },
                { k: "cu", label: "Trasmissione certificazioni uniche (CU)" },
                { k: "dac2", label: "Comunicazioni finanziarie DAC2" },
                { k: "altri", label: "Altri flussi (specificare sotto)" },
              ].map(f => (
                <label key={f.k} className="flex items-center gap-2 cursor-pointer py-1 hover:text-[#003399]">
                  <input type="checkbox"
                    checked={form.flussi[f.k] || false}
                    onChange={e => setFlusso(f.k, e.target.checked)}
                    className="accent-[#003399] w-3.5 h-3.5" />
                  {f.label}
                </label>
              ))}
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Note aggiuntive / altri flussi:</label>
              <textarea value={form.note} onChange={e => set("note", e.target.value)}
                placeholder="Inserire ulteriori dettagli se necessario..."
                rows={3} className={`${fieldCls} resize-none border border-gray-300 rounded-none p-2`} />
            </div>
          </section>

          {/* ── SEZIONE E (dichiarazione) ── */}
          <section className="mb-5">
            <div className="bg-gray-700 text-white px-4 py-2 text-sm font-bold uppercase tracking-wide mb-3">
              E – Dichiarazione del richiedente
            </div>
            <div className="text-xs text-gray-700 space-y-2 leading-relaxed border border-gray-200 p-4 bg-gray-50">
              <p>Il/la sottoscritto/a, nella qualità indicata nella sezione B, <strong>dichiara</strong> ai sensi degli artt. 46 e 47 del D.P.R. 28 dicembre 2000, n. 445:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>di essere autorizzato/a a richiedere l'accreditamento al Sistema SID per conto del soggetto indicato nella sezione A;</li>
                <li>che i dati indicati nel presente modulo sono veritieri e aggiornati;</li>
                <li>di impegnarsi a comunicare all'Agenzia delle Entrate qualsiasi variazione dei dati forniti entro 30 giorni dall'evento;</li>
                <li>di aver preso visione dell'Informativa Privacy ai sensi del Regolamento UE 2016/679 (GDPR);</li>
                <li>di essere consapevole delle responsabilità penali in caso di dichiarazioni mendaci (art. 76 D.P.R. 445/2000).</li>
              </ul>
            </div>
          </section>

          {/* ── FIRMA ── */}
          <section className="mb-8">
            <div className="grid grid-cols-2 gap-12 text-sm">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Luogo *</label>
                <input value={form.luogo} onChange={e => set("luogo", e.target.value)}
                  placeholder="Roma" className={`${fieldCls} mb-4`} />
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Data *</label>
                <input type="date" value={form.data} onChange={e => set("data", e.target.value)}
                  className={fieldCls} />
                <p className="text-[11px] font-bold text-gray-700 uppercase mt-4 mb-1">Il/La Richiedente (firma leggibile)</p>
                <div className="border-b border-gray-400 h-16 bg-gray-50 flex items-end px-2 pb-1">
                  <span className="text-xs text-gray-400 italic">{form.referenteCognome ? `— ${form.referenteCognome} —` : "firma autografa"}</span>
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
                  <TimbroAE size={115} rotate={-13} />
                </div>
              </div>
            </div>
          </section>

          {/* ── USO UFFICIO ── layout identico al documento reale AE ── */}
          <section className="border-2 border-gray-400 p-4">
            <p className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wide">
              Riservato all'Ufficio – Agenzia delle Entrate – Sistema SID
            </p>
            <div>
              <TimbriSovrapposti
                numero={form.protocollo}
                data={form.dataRic}
                euro={form.euroBollo}
                serie={form.serieBollo}
                funzionario={form.funzionario}
                onNumeroChange={v => set("protocollo", v)}
                onDataChange={v => set("dataRic", v)}
                onEuroChange={v => set("euroBollo", v)}
                onSerieChange={v => set("serieBollo", v)}
                onFunzionarioChange={v => set("funzionario", v)}
              />
            </div>
          </section>

          {/* ── FOOTER ── */}
          <div className="mt-6 pt-4 border-t border-gray-300 flex justify-between text-[10px] text-gray-400">
            <span>Modello SID/REG – Rev. 04/2024 – Agenzia delle Entrate</span>
            <span>Pagina 1 di 1</span>
            <span>www.agenziaentrate.gov.it</span>
          </div>
        </div>
      </div>

      <div className="print:hidden"><GovFooter /></div>

      <style>{`
        @page {
          size: A4;
          margin: 12mm 15mm;
        }
        @media print {
          body { background: white; }
          .gov-container { max-width: 100% !important; padding: 0 !important; }
          input, select, textarea { border: none !important; border-bottom: 1px solid #aaa !important; background: transparent !important; }
          header, nav, footer { display: none !important; }
          [class*="replit"], [id*="replit"], [data-replit],
          div[style*="position: fixed"], div[style*="position:fixed"],
          iframe:not([src*="localhost"]) { display: none !important; }
        }
      `}</style>
    </div>
  );
}
