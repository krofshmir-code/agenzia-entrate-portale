import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { documentsTable, templatesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import PDFDocument from "pdfkit";
import * as XLSX from "xlsx";
import * as path from "path";
import * as fs from "fs";
const LOGO_PATH = path.resolve(process.cwd(), "logo-ae.png");

const router: IRouter = Router();

/* ─────────────────────────────────────────────
   Helper: genera un PDF reale con pdfkit
───────────────────────────────────────────── */
function generatePDF(doc: {
  title: string;
  category: string;
  description: string;
  tags: string[];
  uploadedAt: Date;
}): PDFKit.PDFDocument {
  const pdf = new PDFDocument({
    size: "A4",
    margins: { top: 60, bottom: 60, left: 60, right: 60 },
    info: {
      Title: doc.title,
      Author: "Agenzia delle Entrate",
      Subject: doc.category,
      Creator: "Agenzia delle Entrate – Sistema Informativo",
      Producer: "Agenzia delle Entrate – Portale SID",
      Keywords: doc.category,
    },
  });

  const blue = "#003399";
  const lightBlue = "#e8eef7";
  const gold = "#FFCC00";

  // ── INTESTAZIONE ──────────────────────────
  pdf.rect(0, 0, pdf.page.width, 100).fill(blue);

  // Striscia bianca in alto (intestazione MEF)
  pdf.rect(0, 0, pdf.page.width, 18).fill("white");
  pdf.fillColor("#1a1a6e").fontSize(8).font("Helvetica");
  pdf.text("Ministero dell'Economia e delle Finanze", 60, 5, { width: pdf.page.width - 120 });

  // Logo reale AE (immagine PNG)
  const logoExists = fs.existsSync(LOGO_PATH);
  if (logoExists) {
    pdf.image(LOGO_PATH, 55, 22, { height: 60, fit: [210, 60] });
  } else {
    // Fallback testo se l'immagine non esiste
    pdf.roundedRect(60, 22, 45, 45, 3).fill("white");
    pdf.fillColor(blue).fontSize(28).font("Helvetica-Bold");
    pdf.text("A", 60, 29, { width: 45, align: "center" });
    pdf.fillColor("white").fontSize(15).font("Helvetica-Bold");
    pdf.text("Agenzia delle Entrate", 115, 30);
    pdf.fontSize(8).font("Helvetica");
    pdf.text("www.agenziaentrate.gov.it", 115, 50);
  }

  // Striscia gold in fondo all'header
  pdf.rect(0, 100, pdf.page.width, 4).fill(gold);

  // ── TITOLO DOCUMENTO ──────────────────────
  pdf.rect(60, 120, pdf.page.width - 120, 1).fill("#cccccc");

  pdf.fillColor(blue).fontSize(14).font("Helvetica-Bold");
  pdf.text(doc.title.toUpperCase(), 60, 134, { width: pdf.page.width - 120 });

  pdf.fillColor("#555555").fontSize(9).font("Helvetica");
  pdf.text(`Categoria: ${doc.category}`, 60, pdf.y + 6);
  pdf.text(`Data: ${new Date(doc.uploadedAt).toLocaleDateString("it-IT")}`, 60, pdf.y + 4);

  pdf.rect(60, pdf.y + 8, pdf.page.width - 120, 1).fill("#cccccc");

  // ── DESCRIZIONE ───────────────────────────
  pdf.moveDown(1.5);
  pdf.fillColor("#333333").fontSize(11).font("Helvetica");
  pdf.text(doc.description, 60, pdf.y, {
    width: pdf.page.width - 120,
    align: "justify",
    lineGap: 4,
  });

  // ── SEZIONI DOCUMENTO ─────────────────────
  const sections = buildSections(doc.category, doc.title);
  for (const section of sections) {
    pdf.moveDown(1.5);

    // Titolo sezione
    pdf.rect(60, pdf.y, pdf.page.width - 120, 22).fill(blue);
    pdf.fillColor("white").fontSize(10).font("Helvetica-Bold");
    pdf.text(section.title.toUpperCase(), 68, pdf.y - 17, {
      width: pdf.page.width - 140,
    });

    pdf.moveDown(0.5);

    // Contenuto sezione
    pdf.fillColor("#222222").fontSize(10).font("Helvetica");
    pdf.text(section.body, 60, pdf.y + 6, {
      width: pdf.page.width - 120,
      align: "justify",
      lineGap: 3,
    });
  }

  // ── CAMPI FIRMA ───────────────────────────
  if (pdf.y + 160 > pdf.page.height - 80) pdf.addPage();
  pdf.moveDown(2);

  pdf.rect(60, pdf.y, pdf.page.width - 120, 1).fill("#aaaaaa");
  pdf.moveDown(0.5);

  const signY = pdf.y + 10;
  pdf.fillColor("#555555").fontSize(9).font("Helvetica-Bold");
  pdf.text("Luogo e Data", 60, signY);
  pdf.rect(60, signY + 14, 200, 1).fill("#aaaaaa");

  pdf.text("Firma del Responsabile", pdf.page.width / 2, signY);
  pdf.rect(pdf.page.width / 2, signY + 14, 200, 1).fill("#aaaaaa");

  // ── PIÈ DI PAGINA ─────────────────────────
  pdf.rect(0, pdf.page.height - 42, pdf.page.width, 42).fill(lightBlue);
  pdf.fillColor("#666666").fontSize(8).font("Helvetica");
  pdf.text(
    `Agenzia delle Entrate  ·  ${doc.category}  ·  Documento ufficiale`,
    60,
    pdf.page.height - 28,
    { width: pdf.page.width - 120, align: "center" }
  );

  return pdf;
}

/* ─────────────────────────────────────────────
   Helper: sezioni specifiche per categoria
───────────────────────────────────────────── */
function buildSections(
  category: string,
  title: string
): { title: string; body: string }[] {
  const isCRS =
    category.toUpperCase().includes("CRS") ||
    title.toUpperCase().includes("CRS");
  const isSID = category.toUpperCase().includes("SID");

  if (isCRS) {
    return [
      {
        title: "Riferimenti normativi",
        body: "D.Lgs. 15 marzo 2017, n. 40 – Direttiva 2014/107/UE (DAC2) – Standard OCSE CRS (Common Reporting Standard). Provvedimento del Direttore dell'Agenzia delle Entrate del 28 dicembre 2015.",
      },
      {
        title: "Soggetti obbligati",
        body: "Sono tenute agli obblighi di comunicazione le Istituzioni Finanziarie Italiane Tenute alla Comunicazione (IFTC): banche, istituti di credito, compagnie di assicurazione (contratti con valore monetario misurabile), OICR, fiduciarie e trust companies.",
      },
      {
        title: "Informazioni da comunicare",
        body: "Per ciascun conto finanziario soggetto a comunicazione: nome/denominazione titolare, indirizzo, giurisdizione di residenza fiscale, NIF estero, data e luogo di nascita, numero conto, saldo al 31/12, interessi, dividendi e altri proventi.",
      },
      {
        title: "Modalità di trasmissione",
        body: "Le comunicazioni CRS devono essere trasmesse esclusivamente tramite il Sistema di Interscambio Dati (SID) in formato XML conforme allo schema XSD OCSE. La scadenza annuale è il 30 aprile dell'anno successivo a quello di riferimento.",
      },
      {
        title: "Istruzioni operative",
        body: "1. Accreditarsi al SID con credenziali Entratel/Fisconline o SPID/CIE.\n2. Generare il flusso XML conforme allo schema OCSE disponibile sul sito.\n3. Firmare il file con il certificato SID rilasciato dall'Agenzia.\n4. Trasmettere tramite PEC o SFTP entro il 30 aprile.\n5. Conservare la ricevuta di elaborazione per almeno 10 anni.",
      },
    ];
  }

  if (isSID) {
    return [
      {
        title: "Il sistema SID",
        body: "Il Sistema di Interscambio Dati (SID) è l'infrastruttura realizzata dall'Agenzia delle Entrate per consentire lo scambio automatizzato di flussi informativi tra l'Agenzia stessa e altri Enti, Amministrazioni e operatori finanziari, con elevati standard di sicurezza.",
      },
      {
        title: "Requisiti di accreditamento",
        body: "Per utilizzare il SID è necessario: (1) essere registrati ai servizi telematici (Entratel o Fisconline); (2) registrarsi al SID mediante apposita procedura scegliendo il canale di trasmissione (PEC o SFTP); (3) disporre di un certificato rilasciato dall'Agenzia; (4) munirsi del software SID.",
      },
      {
        title: "Canali di trasmissione",
        body: "PEC (Posta Elettronica Certificata): trasmissione tramite casella PEC istituzionale certificata.\nSFTP (Secure File Transfer Protocol): trasmissione tramite protocollo sicuro di trasferimento file.\nHTTPS: trasmissione tramite web service sicuro.",
      },
    ];
  }

  if (category.toUpperCase().includes("IVA")) {
    return [
      {
        title: "Riferimenti normativi",
        body: "D.P.R. 26 ottobre 1972, n. 633 e successive modificazioni. Circolare dell'Agenzia delle Entrate n. 13/E del 2018. Legge 30 dicembre 2018, n. 145 (Legge di Bilancio 2019).",
      },
      {
        title: "Soggetti obbligati",
        body: "Tutti i soggetti passivi IVA residenti in Italia o con stabile organizzazione nel territorio dello Stato, che effettuano operazioni rilevanti ai fini IVA.",
      },
      {
        title: "Termini di presentazione",
        body: "Liquidazione periodica mensile: entro il 16 del mese successivo. Liquidazione trimestrale: entro il 16 del secondo mese successivo al trimestre. Dichiarazione annuale IVA: entro il 30 aprile dell'anno successivo.",
      },
    ];
  }

  return [
    {
      title: "Finalità del documento",
      body: `Il presente documento è predisposto dall'Agenzia delle Entrate in conformità alla normativa vigente. Contiene le informazioni e le istruzioni operative relative alla categoria: ${category}.`,
    },
    {
      title: "Istruzioni per la compilazione",
      body: "Leggere attentamente le istruzioni prima di compilare il documento. Tutti i campi contrassegnati come obbligatori devono essere compilati in modo completo e leggibile. Il documento deve essere firmato dal rappresentante legale o dal soggetto delegato.",
    },
    {
      title: "Invio e scadenze",
      body: "Il documento compilato deve essere trasmesso all'Agenzia delle Entrate tramite i canali telematici abilitati (Entratel, Fisconline, o tramite intermediario abilitato) entro le scadenze previste dalla normativa di riferimento.",
    },
  ];
}

/* ─────────────────────────────────────────────
   Helper: genera un file Excel reale con xlsx
───────────────────────────────────────────── */
function generateExcel(doc: {
  title: string;
  category: string;
  description: string;
  tags: string[];
  uploadedAt: Date;
}): Buffer {
  const wb = XLSX.utils.book_new();

  const isCRS =
    doc.category.toUpperCase().includes("CRS") ||
    doc.title.toUpperCase().includes("CRS");

  if (isCRS) {
    // ── Foglio ISTRUZIONI ──────────────────
    const wsInfo = XLSX.utils.aoa_to_sheet([
      ["AGENZIA DELLE ENTRATE – CRS (Common Reporting Standard)"],
      [""],
      ["Documento:", doc.title],
      ["Categoria:", doc.category],
      ["Data:", new Date(doc.uploadedAt).toLocaleDateString("it-IT")],
      ["Riferimento normativo:", "D.Lgs. 15 marzo 2017, n. 40 – Direttiva 2014/107/UE (DAC2)"],
      [""],
      ["ISTRUZIONI PER LA COMPILAZIONE"],
      [""],
      ["1. Compilare il foglio 'Dati Istituzione' con i dati dell'istituzione finanziaria comunicante."],
      ["2. Nel foglio 'Conti CRS' inserire un record per ciascun conto finanziario soggetto a comunicazione CRS."],
      ["3. Il foglio 'Riepilogo' si aggiorna automaticamente con le formule già inserite."],
      ["4. Verificare tutti i dati prima della trasmissione tramite SID."],
      ["5. Scadenza annuale: 30 aprile dell'anno successivo a quello di riferimento."],
      [""],
      ["CAMPI OBBLIGATORI"],
      ["Sezione A: Dati dell'istituzione finanziaria (denominazione, CF/PIVA, GIIN)"],
      ["Sezione B: Per ogni conto – titolare, NIF estero, Paese residenza, saldo al 31/12"],
      ["Sezione C: Interessi, dividendi e altri proventi per anno di riferimento"],
      [""],
      ["Per assistenza: sid.assistenza@agenziaentrate.it | 800.90.96.96"],
    ]);
    wsInfo["!cols"] = [{ wch: 85 }];
    XLSX.utils.book_append_sheet(wb, wsInfo, "Istruzioni");

    // ── Foglio DATI ISTITUZIONE ────────────
    const wsIF = XLSX.utils.aoa_to_sheet([
      ["AGENZIA DELLE ENTRATE – CRS – DATI ISTITUZIONE FINANZIARIA"],
      [""],
      ["Anno di riferimento:", ""],
      [""],
      ["SEZIONE A – Identificazione Istituzione Finanziaria"],
      ["Denominazione:", ""],
      ["Codice Fiscale / P.IVA:", ""],
      ["GIIN (Global Intermediary Identification Number):", ""],
      ["Tipologia IF:", ""],
      ["(Banca / Assicurazione / Fondo / Fiduciaria / Altro)", ""],
      ["Indirizzo sede legale:", ""],
      ["CAP:", ""],
      ["Comune:", ""],
      ["Provincia:", ""],
      ["Indirizzo PEC:", ""],
      [""],
      ["SEZIONE B – Referente CRS"],
      ["Cognome e Nome:", ""],
      ["Qualifica:", ""],
      ["Telefono:", ""],
      ["E-mail:", ""],
      [""],
      ["SEZIONE C – Riepilogo quantitativo"],
      ["N° totale conti comunicati:", ""],
      ["N° conti persone fisiche:", ""],
      ["N° conti entità:", ""],
      ["N° giurisdizioni estere:", ""],
      ["Saldo totale aggregato (€):", ""],
      ["Proventi totali aggregati (€):", ""],
      [""],
      ["Firma del Responsabile Compliance:", ""],
      ["Data:", ""],
    ]);
    wsIF["!cols"] = [{ wch: 45 }, { wch: 50 }];
    XLSX.utils.book_append_sheet(wb, wsIF, "Dati Istituzione");

    // ── Foglio CONTI CRS ──────────────────
    const headers = [
      "N°",
      "Numero Conto",
      "Cognome / Denominazione Titolare",
      "Nome (persone fisiche)",
      "Codice Fiscale IT",
      "NIF Estero",
      "Paese Residenza",
      "Codice ISO Paese",
      "Data di Nascita (gg/mm/aaaa)",
      "Tipo Conto (D/C/P/A/R)",
      "Conto Chiuso nell'anno (S/N)",
      "Saldo al 31/12 (€)",
      "Interessi (€)",
      "Dividendi (€)",
      "Proventi da vendita/riscatto (€)",
      "Altri proventi (€)",
      "Totale proventi (€)",
      "Note",
    ];
    const dataRows = Array.from({ length: 30 }, (_, i) => [
      i + 1,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      { f: `M${i + 3}+N${i + 3}+O${i + 3}+P${i + 3}` },
      "",
    ]);
    const totalRow = [
      "TOTALE",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      { f: `SUM(L3:L${dataRows.length + 2})` },
      { f: `SUM(M3:M${dataRows.length + 2})` },
      { f: `SUM(N3:N${dataRows.length + 2})` },
      { f: `SUM(O3:O${dataRows.length + 2})` },
      { f: `SUM(P3:P${dataRows.length + 2})` },
      { f: `SUM(Q3:Q${dataRows.length + 2})` },
      "",
    ];
    const wsConti = XLSX.utils.aoa_to_sheet([headers, ...dataRows, totalRow]);
    wsConti["!cols"] = [
      { wch: 4 }, { wch: 18 }, { wch: 30 }, { wch: 22 }, { wch: 18 },
      { wch: 18 }, { wch: 22 }, { wch: 10 }, { wch: 20 }, { wch: 8 },
      { wch: 8 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 20 },
      { wch: 14 }, { wch: 16 }, { wch: 25 },
    ];
    wsConti["!freeze"] = { xSplit: 0, ySplit: 1 };
    XLSX.utils.book_append_sheet(wb, wsConti, "Conti CRS");

    // ── Foglio GIURISDIZIONI ──────────────
    const wsGiuris = XLSX.utils.aoa_to_sheet([
      ["Giurisdizione (Paese)", "Codice ISO", "N° Conti Comunicati", "Saldo Totale (€)", "Proventi Totali (€)"],
      ...Array.from({ length: 15 }, () => ["", "", "", "", ""]),
      ["TOTALE", "", { f: "SUM(C2:C16)" }, { f: "SUM(D2:D16)" }, { f: "SUM(E2:E16)" }],
    ]);
    wsGiuris["!cols"] = [{ wch: 28 }, { wch: 12 }, { wch: 18 }, { wch: 20 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, wsGiuris, "Giurisdizioni");

  } else if (
    doc.category.toUpperCase().includes("IVA") ||
    doc.title.toUpperCase().includes("IVA")
  ) {
    // ── Excel IVA ────────────────────────
    const wsIva = XLSX.utils.aoa_to_sheet([
      ["AGENZIA DELLE ENTRATE – LIQUIDAZIONE IVA"],
      [""],
      ["Anno:", ""],
      ["Partita IVA:", ""],
      ["Denominazione:", ""],
      [""],
      ["PERIODO", "IVA VENDITE (€)", "IVA ACQUISTI (€)", "IVA DOVUTA (€)", "IVA A CREDITO (€)", "NOTE"],
      ["1° Trimestre", "", "", { f: "B8-C8" }, "", ""],
      ["2° Trimestre", "", "", { f: "B9-C9" }, "", ""],
      ["3° Trimestre", "", "", { f: "B10-C10" }, "", ""],
      ["4° Trimestre", "", "", { f: "B11-C11" }, "", ""],
      ["TOTALE ANNUALE", { f: "SUM(B8:B11)" }, { f: "SUM(C8:C11)" }, { f: "SUM(D8:D11)" }, { f: "SUM(E8:E11)" }, ""],
    ]);
    wsIva["!cols"] = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 25 }];
    XLSX.utils.book_append_sheet(wb, wsIva, "Liquidazione IVA");

  } else {
    // ── Excel generico ────────────────────
    const wsGen = XLSX.utils.aoa_to_sheet([
      ["AGENZIA DELLE ENTRATE – FOGLIO DATI"],
      [""],
      ["Documento:", doc.title],
      ["Categoria:", doc.category],
      ["Data:", new Date(doc.uploadedAt).toLocaleDateString("it-IT")],
      [""],
      ["Descrizione:", doc.description],
      [""],
      ["Codice Fiscale:", ""],
      ["Denominazione:", ""],
      ["Periodo di riferimento:", ""],
      [""],
      ["DATI", "VALORE", "NOTE"],
      ...Array.from({ length: 20 }, (_, i) => [`Campo ${i + 1}`, "", ""]),
      [""],
      ["Firma:", ""],
      ["Data:", ""],
    ]);
    wsGen["!cols"] = [{ wch: 30 }, { wch: 35 }, { wch: 30 }];
    XLSX.utils.book_append_sheet(wb, wsGen, "Dati");
  }

  return XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
}

/* ─────────────────────────────────────────────
   ROUTE: scarica documento
───────────────────────────────────────────── */
router.get("/documents/:id/download", async (req, res) => {
  const id = Number(req.params.id);
  const [doc] = await db.select().from(documentsTable).where(eq(documentsTable.id, id));
  if (!doc) {
    res.status(404).json({ error: "Documento non trovato" });
    return;
  }

  const safeName = Buffer.from(doc.title, "utf8")
    .toString("ascii")
    .replace(/[?]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_\-]/g, "")
    .slice(0, 60) || "documento";

  if (doc.type === "excel") {
    const buffer = generateExcel({
      title: doc.title,
      category: doc.category,
      description: doc.description,
      tags: doc.tags ?? [],
      uploadedAt: doc.uploadedAt,
    });
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename="${safeName}.xlsx"`);
    res.send(buffer);
    return;
  }

  // PDF (default)
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${safeName}.pdf"`);

  const pdfDoc = generatePDF({
    title: doc.title,
    category: doc.category,
    description: doc.description,
    tags: doc.tags ?? [],
    uploadedAt: doc.uploadedAt,
  });
  pdfDoc.pipe(res);
  pdfDoc.end();
});

/* ─────────────────────────────────────────────
   ROUTE: scarica template
───────────────────────────────────────────── */
router.get("/templates/:id/download", async (req, res) => {
  const id = Number(req.params.id);
  const [tmpl] = await db.select().from(templatesTable).where(eq(templatesTable.id, id));
  if (!tmpl) {
    res.status(404).json({ error: "Template non trovato" });
    return;
  }

  const safeName = Buffer.from(tmpl.name, "utf8")
    .toString("ascii")
    .replace(/[?]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_\-]/g, "")
    .slice(0, 60) || "template";
  const isCRS = tmpl.category?.toUpperCase().includes("CRS") || tmpl.name.toUpperCase().includes("CRS");
  const isExcel = tmpl.name.toLowerCase().includes("excel") || tmpl.name.toLowerCase().includes("report");

  if (isExcel || isCRS && tmpl.name.toLowerCase().includes("report")) {
    const buffer = generateExcel({
      title: tmpl.name,
      category: tmpl.category,
      description: tmpl.description,
      tags: [],
      uploadedAt: new Date(),
    });
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename="${safeName}.xlsx"`);
    res.send(buffer);
    return;
  }

  // Template PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${safeName}.pdf"`);

  const pdfDoc = generatePDF({
    title: tmpl.name,
    category: tmpl.category,
    description: tmpl.description,
    tags: [],
    uploadedAt: new Date(),
  });
  pdfDoc.pipe(res);
  pdfDoc.end();
});

export default router;
