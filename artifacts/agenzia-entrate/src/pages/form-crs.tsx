import { useState, useEffect } from "react";
import { GovHeader } from "@/components/layout/gov-header";
import { GovFooter } from "@/components/layout/gov-footer";
import { LogoAE } from "@/components/logo-ae";
import { TimbroAE, TimbriSovrapposti } from "@/components/timbro-ae";
import { ChevronRight, Printer, RotateCcw, Plus, Trash2, Download } from "lucide-react";
import { Link } from "wouter";

const fieldCls = "w-full border-b border-gray-500 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-[#003399]";
const inputSm = "border-b border-gray-500 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-[#003399]";
const cellCls = "border border-gray-200 px-2 py-1 bg-white focus:outline-none focus:bg-blue-50 text-xs w-full";

type Conto = {
  id: number; numero: string; cognome: string; nome: string; cfIt: string;
  nifEstero: string; paese: string; codiceIso: string; dataNascita: string;
  tipoConto: string; chiuso: string; saldo: string; interessi: string;
  dividendi: string; proventiVendita: string; altriProventi: string; note: string;
};

type Giurisdizione = { paese: string; iso: string; nConti: string; saldo: string; proventi: string };

type Form = {
  titoloPagina: string; modelloInfo: string;
  anno: string; dataCompilazione: string; progressivo: string; codiceIF: string;
  denominazione: string; cf: string; giin: string; tipoIF: string;
  indirizzo: string; pec: string; referente: string;
  nContiTot: string; nContiFis: string; nContiEntita: string; nGiurisdi: string;
  saldoTot: string; proventiTot: string;
  giurisdizioni: Giurisdizione[];
  conti: Conto[];
  dichiarante: string; qualifica: string; luogo: string; data: string;
  allegati: { [k: string]: boolean };
  euroBollo: string; serieBollo: string; funzionario: string;
};

const newConto = (id: number): Conto => ({
  id, numero: "", cognome: "", nome: "", cfIt: "", nifEstero: "",
  paese: "", codiceIso: "", dataNascita: "", tipoConto: "", chiuso: "",
  saldo: "", interessi: "", dividendi: "", proventiVendita: "", altriProventi: "", note: "",
});

const newGiuri = (): Giurisdizione => ({ paese: "", iso: "", nConti: "", saldo: "", proventi: "" });

const EMPTY: Form = {
  titoloPagina: "Foglio di Raccolta Dati per Istituzioni Finanziarie",
  modelloInfo: "Modello CRS/IF-001 – Revisione 2024 – Scadenza: 30 aprile",
  anno: "", dataCompilazione: "", progressivo: "", codiceIF: "",
  denominazione: "", cf: "", giin: "", tipoIF: "",
  indirizzo: "", pec: "", referente: "",
  nContiTot: "", nContiFis: "", nContiEntita: "", nGiurisdi: "",
  saldoTot: "", proventiTot: "",
  giurisdizioni: [newGiuri(), newGiuri(), newGiuri()],
  conti: [1, 2, 3, 4, 5].map(newConto),
  dichiarante: "", qualifica: "", luogo: "", data: "",
  allegati: { xml: false, xlsx: false, cert: false, due: false, var: false, altro: false },
  euroBollo: "", serieBollo: "", funzionario: "",
};

const DEMO: Form = {
  titoloPagina: "Foglio di Raccolta Dati per Istituzioni Finanziarie",
  modelloInfo: "Modello CRS/IF-001 – Revisione 2024 – Scadenza: 30 aprile",
  anno: "2024",
  dataCompilazione: "2025-04-28",
  progressivo: "0042",
  codiceIF: "IT00148520109",
  denominazione: "Banca Commerciale Ligure S.p.A.",
  cf: "00148520109",
  giin: "ABCDE6.99999.SL.380",
  tipoIF: "Banca",
  indirizzo: "Via XX Settembre 14, 16121 Genova (GE)",
  pec: "banca.comm.ligure@pec.it",
  referente: "Ferraris Giovanna",
  nContiTot: "3",
  nContiFis: "2",
  nContiEntita: "1",
  nGiurisdi: "2",
  saldoTot: "142850,00",
  proventiTot: "4210,75",
  giurisdizioni: [
    { paese: "Germania", iso: "DE", nConti: "2", saldo: "118500,00", proventi: "3120,50" },
    { paese: "Francia",  iso: "FR", nConti: "1", saldo: "24350,00",  proventi: "1090,25" },
    { paese: "", iso: "", nConti: "", saldo: "", proventi: "" },
  ],
  conti: [
    { id: 1, numero: "IT60X0148527890000001234567", cognome: "Müller",   nome: "Hans",      cfIt: "",           nifEstero: "DE123456789", paese: "Germania", codiceIso: "DE", dataNascita: "1972-03-15", tipoConto: "D", chiuso: "N", saldo: "45200,00",  interessi: "820,00",  dividendi: "0,00",    proventiVendita: "0,00",    altriProventi: "0,00",   note: "" },
    { id: 2, numero: "IT60X0148527890000009876543", cognome: "Schmidt",  nome: "Erika",     cfIt: "",           nifEstero: "DE987654321", paese: "Germania", codiceIso: "DE", dataNascita: "1985-07-22", tipoConto: "C", chiuso: "N", saldo: "73300,00",  interessi: "1540,50", dividendi: "760,00",  proventiVendita: "0,00",    altriProventi: "0,00",   note: "" },
    { id: 3, numero: "IT60X0148527890000005551122", cognome: "Dupont",   nome: "Pierre",    cfIt: "",           nifEstero: "FR654321098", paese: "Francia",  codiceIso: "FR", dataNascita: "1968-11-04", tipoConto: "P", chiuso: "N", saldo: "24350,00",  interessi: "390,25",  dividendi: "450,00",  proventiVendita: "250,00",  altriProventi: "0,00",   note: "" },
    { id: 4, numero: "", cognome: "", nome: "", cfIt: "", nifEstero: "", paese: "", codiceIso: "", dataNascita: "", tipoConto: "", chiuso: "", saldo: "", interessi: "", dividendi: "", proventiVendita: "", altriProventi: "", note: "" },
    { id: 5, numero: "", cognome: "", nome: "", cfIt: "", nifEstero: "", paese: "", codiceIso: "", dataNascita: "", tipoConto: "", chiuso: "", saldo: "", interessi: "", dividendi: "", proventiVendita: "", altriProventi: "", note: "" },
  ],
  dichiarante: "Ferraris Giovanna",
  qualifica: "Responsabile Compliance",
  luogo: "Genova",
  data: "2025-04-28",
  allegati: { xml: true, xlsx: true, cert: true, due: false, var: false, altro: false },
  euroBollo: "20,00",
  serieBollo: "3",
  funzionario: "Manari Mauro",
};

export default function FormCRS() {
  const params = new URLSearchParams(window.location.search);
  const [form, setForm] = useState<Form>(params.get("demo") === "1" ? DEMO : EMPTY);

  useEffect(() => {
    if (params.get("print") === "1") {
      setTimeout(() => window.print(), 900);
    }
  }, []);

  const set = (k: keyof Form, v: string) => setForm(p => ({ ...p, [k]: v }));

  const updateConto = (idx: number, k: keyof Conto, v: string) =>
    setForm(p => {
      const conti = [...p.conti];
      conti[idx] = { ...conti[idx], [k]: v };
      return { ...p, conti };
    });

  const addConto = () =>
    setForm(p => ({ ...p, conti: [...p.conti, newConto(p.conti.length + 1)] }));

  const delConto = (idx: number) =>
    setForm(p => ({ ...p, conti: p.conti.filter((_, i) => i !== idx) }));

  const updateGiuri = (idx: number, k: keyof Giurisdizione, v: string) =>
    setForm(p => {
      const g = [...p.giurisdizioni];
      g[idx] = { ...g[idx], [k]: v };
      return { ...p, giurisdizioni: g };
    });

  const addGiuri = () =>
    setForm(p => ({ ...p, giurisdizioni: [...p.giurisdizioni, newGiuri()] }));

  const setAllegato = (k: string, v: boolean) =>
    setForm(p => ({ ...p, allegati: { ...p.allegati, [k]: v } }));

  const handleReset = () => { if (confirm("Cancellare tutti i dati inseriti?")) setForm(EMPTY); };
  const handleDemo  = () => setForm(DEMO);

  const totaleSaldo = form.conti.reduce((s, c) => s + (parseFloat(c.saldo) || 0), 0);
  const totaleInteressi = form.conti.reduce((s, c) => s + (parseFloat(c.interessi) || 0), 0);
  const totaleDividendi = form.conti.reduce((s, c) => s + (parseFloat(c.dividendi) || 0), 0);
  const totaleAltri = form.conti.reduce((s, c) => s + (parseFloat(c.altriProventi) || 0), 0);
  const totaleProventi = totaleInteressi + totaleDividendi + totaleAltri;

  const fmtEur = (n: number) => n > 0 ? n.toLocaleString("it-IT", { minimumFractionDigits: 2 }) : "";

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="print:hidden">
        <GovHeader />
        <div className="bg-gray-100 py-3 border-b border-gray-200 text-sm">
          <div className="gov-container flex items-center text-gray-600 gap-2">
            <Link href="/" className="hover:text-[#003399] hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/crs" className="hover:text-[#003399] hover:underline">CRS</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-gray-900">Comunicazione CRS – Foglio di raccolta dati</span>
          </div>
        </div>
        <div className="gov-container py-4 flex gap-3 flex-wrap">
          <button onClick={() => window.print()}
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
            ✏️ Modulo compilabile — tutti i campi e le righe sono editabili
          </span>
        </div>
      </div>

      <div className="gov-container pb-12 print:p-0">
        <div className="bg-white shadow-md print:shadow-none max-w-5xl mx-auto p-10 print:p-8"
          style={{ fontFamily: "'Times New Roman', serif" }}>

          {/* ── LOGO UFFICIALE ── */}
          <div className="border-b-2 border-gray-800 pb-4 mb-4">
            <LogoAE />
          </div>

          {/* ── INTESTAZIONE CON CAMPI EDITABILI ── */}
          <div className="flex justify-between items-start mb-4">
            <div className="text-xs text-gray-500 italic">Settore CRS – Common Reporting Standard</div>
            <div className="text-right text-xs space-y-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="font-bold text-gray-700">Anno rif.:</span>
                <input value={form.anno} onChange={e => set("anno", e.target.value)}
                  placeholder="2024" maxLength={4} className={`${inputSm} w-16 text-center`} />
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-gray-600">Data:</span>
                <input type="date" value={form.dataCompilazione} onChange={e => set("dataCompilazione", e.target.value)}
                  className={`${inputSm} w-36`} />
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-gray-600">Progressivo:</span>
                <input value={form.progressivo} onChange={e => set("progressivo", e.target.value)}
                  placeholder="001" className={`${inputSm} w-20`} />
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-gray-600">Cod. IF:</span>
                <input value={form.codiceIF} onChange={e => set("codiceIF", e.target.value)}
                  placeholder="IT000000000" className={`${inputSm} w-28 font-mono`} />
              </div>
            </div>
          </div>

          {/* ── TITOLO ── */}
          <div className="text-center my-5">
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">
              D.Lgs. 15 marzo 2017, n. 40 – Direttiva UE 2014/107/UE (DAC2)
            </div>
            <h1 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
              Comunicazione CRS – Common Reporting Standard
            </h1>
            <h2 className="text-base font-semibold text-gray-700 mt-1">
              <input
                value={form.titoloPagina}
                onChange={e => set("titoloPagina", e.target.value)}
                className="w-full text-center font-semibold text-gray-700 bg-transparent border-b border-dashed border-gray-400 focus:outline-none focus:border-[#003399] text-base"
              />
            </h2>
            <div className="mt-2 inline-block border border-gray-400 px-4 py-1 text-xs text-gray-600 w-full max-w-md">
              <input
                value={form.modelloInfo}
                onChange={e => set("modelloInfo", e.target.value)}
                className="w-full text-center text-xs text-gray-600 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* ── AVVISO ── */}
          <div className="border-l-4 border-[#003399] bg-blue-50 p-3 mb-5 text-xs text-gray-700">
            <strong>Istruzione:</strong> Compilare un foglio per ciascuna Istituzione Finanziaria comunicante.
            I dati dei conti finanziari vanno riportati nella Sezione D (un rigo per conto).
            Trasmettere tramite SID entro il <strong>30 aprile</strong> dell'anno successivo.
          </div>

          {/* ── SEZIONE A ── */}
          <section className="mb-5">
            <div className="bg-[#003399] text-white px-4 py-2 text-sm font-bold uppercase tracking-wide mb-3">
              A – Istituzione Finanziaria comunicante (IFC)
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Denominazione *</label>
                <input value={form.denominazione} onChange={e => set("denominazione", e.target.value)}
                  placeholder="Es. Banca XYZ S.p.A." className={fieldCls} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Codice Fiscale / P.IVA *</label>
                <input value={form.cf} onChange={e => set("cf", e.target.value.toUpperCase())}
                  placeholder="XXXXXXXXXXX" maxLength={11} className={`${fieldCls} font-mono tracking-widest`} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">GIIN</label>
                <input value={form.giin} onChange={e => set("giin", e.target.value)}
                  placeholder="XXXXXX.XXXXX.XX.XXX" className={`${fieldCls} font-mono`} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Tipologia IF *</label>
                <select value={form.tipoIF} onChange={e => set("tipoIF", e.target.value)} className={`${fieldCls} cursor-pointer`}>
                  <option value="">— Selezionare —</option>
                  {["Banca", "Assicurazione", "Fondo d'investimento", "Fiduciaria", "Altro"].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Sede legale</label>
                <input value={form.indirizzo} onChange={e => set("indirizzo", e.target.value)}
                  placeholder="Via Roma 1, 00100 Roma (RM)" className={fieldCls} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Indirizzo PEC *</label>
                <input type="email" value={form.pec} onChange={e => set("pec", e.target.value)}
                  placeholder="istituzione@pec.it" className={fieldCls} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase">Referente CRS *</label>
                <input value={form.referente} onChange={e => set("referente", e.target.value)}
                  placeholder="Cognome Nome" className={fieldCls} />
              </div>
            </div>
          </section>

          {/* ── SEZIONE B ── */}
          <section className="mb-5">
            <div className="bg-[#003399] text-white px-4 py-2 text-sm font-bold uppercase tracking-wide mb-3">
              B – Riepilogo quantitativo della comunicazione
            </div>
            <div className="grid grid-cols-4 gap-4 mb-3">
              {[
                { k: "nContiTot" as keyof Form, label: "N° conti totali" },
                { k: "nContiFis" as keyof Form, label: "N° conti persone fisiche" },
                { k: "nContiEntita" as keyof Form, label: "N° conti entità" },
                { k: "nGiurisdi" as keyof Form, label: "N° giurisdizioni" },
              ].map(f => (
                <div key={f.k} className="border border-gray-300 p-3 text-center bg-gray-50">
                  <div className="text-[10px] font-bold text-gray-600 uppercase mb-2 leading-tight">{f.label}</div>
                  <input type="number" value={form[f.k] as string} onChange={e => set(f.k, e.target.value)}
                    placeholder="0" className={`${inputSm} w-full text-center text-lg font-bold`} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "saldoTot" as keyof Form, label: "Saldo totale aggregato (€)", hint: "Somma saldi al 31/12" },
                { k: "proventiTot" as keyof Form, label: "Proventi totali aggregati (€)", hint: "Interessi + dividendi + altri" },
              ].map(f => (
                <div key={f.k}>
                  <label className="block text-[11px] font-bold text-gray-700 mb-0.5 uppercase">{f.label}</label>
                  <div className="text-[10px] text-gray-400 italic mb-1">{f.hint}</div>
                  <input type="number" value={form[f.k] as string} onChange={e => set(f.k, e.target.value)}
                    placeholder="0,00" className={`${fieldCls} font-mono`} />
                </div>
              ))}
            </div>
          </section>

          {/* ── SEZIONE C ── */}
          <section className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-[#003399] text-white px-4 py-2 text-sm font-bold uppercase tracking-wide flex-1">
                C – Giurisdizioni estere
              </div>
              <button onClick={addGiuri}
                className="print:hidden ml-2 flex items-center gap-1 text-xs text-[#003399] border border-[#003399] px-3 py-1.5 hover:bg-blue-50">
                <Plus className="w-3.5 h-3.5" /> Aggiungi riga
              </button>
            </div>
            <div className="border border-gray-300 overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-gray-100">
                  <tr>
                    {["N°", "Giurisdizione (Paese)", "Codice ISO", "N° conti", "Saldo totale (€)", ""].map(h => (
                      <th key={h} className="border-b border-r last:border-r-0 border-gray-300 px-2 py-2 text-left font-bold text-gray-700 uppercase text-[10px]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {form.giurisdizioni.map((g, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border-b border-r border-gray-200 px-2 py-1 text-center text-gray-400 text-[10px] w-8">{i + 1}</td>
                      <td className="border-b border-r border-gray-200 p-0 w-40">
                        <input value={g.paese} onChange={e => updateGiuri(i, "paese", e.target.value)}
                          placeholder="Es. Germania" className={cellCls} /></td>
                      <td className="border-b border-r border-gray-200 p-0 w-16">
                        <input value={g.iso} onChange={e => updateGiuri(i, "iso", e.target.value.toUpperCase())}
                          placeholder="DE" maxLength={2} className={`${cellCls} uppercase text-center font-mono`} /></td>
                      <td className="border-b border-r border-gray-200 p-0 w-20">
                        <input type="number" value={g.nConti} onChange={e => updateGiuri(i, "nConti", e.target.value)}
                          placeholder="0" className={`${cellCls} text-right`} /></td>
                      <td className="border-b border-r border-gray-200 p-0">
                        <input type="number" value={g.saldo} onChange={e => updateGiuri(i, "saldo", e.target.value)}
                          placeholder="0,00" className={`${cellCls} text-right font-mono`} /></td>
                      <td className="border-b border-gray-200 p-0 w-8 text-center">
                        {form.giurisdizioni.length > 1 && (
                          <button onClick={() => setForm(p => ({ ...p, giurisdizioni: p.giurisdizioni.filter((_, j) => j !== i) }))}
                            className="print:hidden text-red-400 hover:text-red-600 p-1">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── SEZIONE D ── */}
          <section className="mb-5">
            <div className="flex items-center justify-between mb-1">
              <div className="bg-[#003399] text-white px-4 py-2 text-sm font-bold uppercase tracking-wide flex-1">
                D – Dettaglio conti finanziari comunicati
              </div>
              <button onClick={addConto}
                className="print:hidden ml-2 flex items-center gap-1 text-xs text-[#003399] border border-[#003399] px-3 py-1.5 hover:bg-blue-50">
                <Plus className="w-3.5 h-3.5" /> Aggiungi conto
              </button>
            </div>
            <div className="text-[11px] text-gray-600 italic mb-1">
              Tipo conto: D=Deposito, C=Custodia, P=Partecipazione, A=Assicurativo, R=Rendita
            </div>
            <div className="border border-gray-300 overflow-x-auto">
              <table className="w-full text-[10px]" style={{ minWidth: 1000 }}>
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    {["#", "N. Conto", "Cognome / Denominazione", "Nome", "CF IT", "NIF Estero",
                      "Paese Res.", "ISO", "Data Nasc.", "Tipo", "Chiuso", "Saldo 31/12 (€)",
                      "Interessi (€)", "Dividendi (€)", "Altri proventi (€)", ""].map(h => (
                        <th key={h} className="border-b border-r last:border-r-0 border-gray-300 px-1.5 py-2 text-left font-bold text-gray-700 uppercase whitespace-nowrap text-[9px]">{h}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {form.conti.map((c, i) => (
                    <tr key={c.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border-b border-r border-gray-200 px-1 py-1 text-center text-gray-400 w-6">{i + 1}</td>
                      {(["numero", "cognome", "nome", "cfIt", "nifEstero", "paese", "codiceIso",
                        "dataNascita", "tipoConto", "chiuso", "saldo", "interessi", "dividendi", "altriProventi"] as (keyof Conto)[]).map(k => (
                          <td key={k} className="border-b border-r border-gray-200 p-0">
                            <input
                              value={c[k] as string}
                              onChange={e => updateConto(i, k, k === "codiceIso" || k === "tipoConto" || k === "chiuso" ? e.target.value.toUpperCase() : e.target.value)}
                              placeholder={k === "codiceIso" ? "DE" : k === "tipoConto" ? "D" : k === "chiuso" ? "S/N" : k === "dataNascita" ? "gg/mm/aaaa" : ""}
                              type={["saldo", "interessi", "dividendi", "altriProventi"].includes(k) ? "number" : "text"}
                              maxLength={k === "codiceIso" ? 2 : k === "tipoConto" || k === "chiuso" ? 1 : undefined}
                              className={`${cellCls} ${["saldo", "interessi", "dividendi", "altriProventi"].includes(k) ? "text-right font-mono" : ""} ${k === "codiceIso" ? "uppercase text-center" : ""}`}
                            />
                          </td>
                        ))}
                      <td className="border-b border-gray-200 p-0 w-7 text-center">
                        {form.conti.length > 1 && (
                          <button onClick={() => delConto(i)}
                            className="print:hidden text-red-400 hover:text-red-600 p-1">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* RIGA TOTALE */}
                  <tr className="bg-yellow-50 font-bold">
                    <td className="border-t-2 border-gray-400 px-1 py-1.5 text-[9px] text-gray-600 uppercase text-center" colSpan={11}>
                      TOTALE
                    </td>
                    <td className="border-t-2 border-r border-gray-400 px-1 py-1.5 text-right text-[10px] font-mono">{fmtEur(totaleSaldo)}</td>
                    <td className="border-t-2 border-r border-gray-400 px-1 py-1.5 text-right text-[10px] font-mono">{fmtEur(totaleInteressi)}</td>
                    <td className="border-t-2 border-r border-gray-400 px-1 py-1.5 text-right text-[10px] font-mono">{fmtEur(totaleDividendi)}</td>
                    <td className="border-t-2 border-r border-gray-400 px-1 py-1.5 text-right text-[10px] font-mono">{fmtEur(totaleAltri)}</td>
                    <td className="border-t-2 border-gray-400" />
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-1 text-[10px] text-gray-500 italic">
              Totale proventi: <strong>{fmtEur(totaleProventi)} €</strong> — I totali si aggiornano automaticamente
            </div>
          </section>

          {/* ── SEZIONE E ── */}
          <section className="mb-5">
            <div className="bg-gray-700 text-white px-4 py-2 text-sm font-bold uppercase tracking-wide mb-3">
              E – Dichiarazione del responsabile compliance
            </div>
            <div className="text-xs text-gray-700 leading-relaxed border border-gray-200 p-4 bg-gray-50 mb-3">
              <p>Il/la sottoscritto/a, in qualità di{" "}
                <input value={form.qualifica} onChange={e => set("qualifica", e.target.value)}
                  placeholder="Responsabile Compliance" className={`${inputSm} w-48 mx-1`} />
                {" "}dell'Istituzione Finanziaria indicata nella Sezione A, <strong>attesta</strong> che:
              </p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>i dati contenuti sono stati raccolti e verificati in conformità alle disposizioni del D.Lgs. 40/2017 e dei provvedimenti attuativi;</li>
                <li>le procedure di due diligence applicate sono conformi allo standard CRS OCSE;</li>
                <li>sono state rispettate le disposizioni in materia di protezione dei dati (GDPR – Reg. UE 2016/679);</li>
                <li>la presente comunicazione è completa, veritiera e aggiornata alla data di riferimento.</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Cognome e Nome dichiarante *</label>
                <input value={form.dichiarante} onChange={e => set("dichiarante", e.target.value)}
                  placeholder="Cognome Nome" className={`${fieldCls} mb-3`} />
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Luogo *</label>
                <input value={form.luogo} onChange={e => set("luogo", e.target.value)}
                  placeholder="Roma" className={`${fieldCls} mb-3`} />
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Data *</label>
                <input type="date" value={form.data} onChange={e => set("data", e.target.value)} className={fieldCls} />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
                  <TimbroAE size={115} rotate={-13} />
                </div>
              </div>
            </div>
          </section>

          {/* ── ALLEGATI ── */}
          <section className="mb-6 border border-gray-300 p-4 bg-gray-50">
            <p className="text-[11px] font-bold text-gray-700 uppercase mb-3">Allegati alla comunicazione:</p>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {[
                { k: "xml", label: "File XML – flusso CRS in formato OCSE" },
                { k: "xlsx", label: "File XLSX – prospetto di raccolta dati" },
                { k: "cert", label: "Certificato SID dell'istituzione finanziaria" },
                { k: "due", label: "Documentazione due diligence campione" },
                { k: "var", label: "Elenco variazioni rispetto a comunicazione precedente" },
                { k: "altro", label: "Altro (specificare): ____________________" },
              ].map(a => (
                <label key={a.k} className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.allegati[a.k] || false}
                    onChange={e => setAllegato(a.k, e.target.checked)}
                    className="accent-[#003399] w-3.5 h-3.5 mt-0.5" />
                  <span>{a.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* ── USO UFFICIO ── timbri sovrapposti autentico ── */}
          <section className="border-2 border-gray-400 p-4">
            <p className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wide">
              Riservato all'Ufficio – Agenzia delle Entrate – Settore CRS
            </p>
            <div>
              <TimbriSovrapposti
                numero={form.progressivo}
                data={form.dataCompilazione}
                euro={form.euroBollo}
                serie={form.serieBollo}
                funzionario={form.funzionario}
                onNumeroChange={v => set("progressivo", v)}
                onDataChange={v => set("dataCompilazione", v)}
                onEuroChange={v => set("euroBollo", v)}
                onSerieChange={v => set("serieBollo", v)}
                onFunzionarioChange={v => set("funzionario", v)}
              />
            </div>
          </section>

          {/* ── FOOTER ── */}
          <div className="mt-6 pt-4 border-t border-gray-300 flex justify-between text-[10px] text-gray-400">
            <span>Modello CRS/IF-001 – Rev. 2024 – Agenzia delle Entrate</span>
            <span>Pagina 1 di 1</span>
            <span>D.Lgs. 15 marzo 2017, n. 40 – DAC2/CRS OCSE</span>
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
          button.print\\:hidden { display: none; }
          input, select, textarea { border: none !important; border-bottom: 1px solid #888 !important; background: transparent !important; -webkit-print-color-adjust: exact; }
          header, nav, footer { display: none !important; }
          [class*="replit"], [id*="replit"], [data-replit],
          div[style*="position: fixed"], div[style*="position:fixed"],
          iframe:not([src*="localhost"]) { display: none !important; }
        }
      `}</style>
    </div>
  );
}
