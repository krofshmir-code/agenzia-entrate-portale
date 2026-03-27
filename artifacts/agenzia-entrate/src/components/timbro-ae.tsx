/**
 * Timbri ufficiali – Agenzia delle Entrate
 * Foto REALI di documenti AE scansionati — non generate
 */
import type { CSSProperties } from "react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Timbro circolare REALE — foto di un timbro AE fisico su documento vero
 * (Agenzia della Entrate, Ufficio Territoriale, TIMBRO UFFICIO)
 */
export function TimbroAE({
  size = 110,
  opacity = 0.92,
  rotate = -14,
}: {
  size?: number;
  sublabel?: string;
  direzione?: string;
  opacity?: number;
  rotate?: number;
}) {
  return (
    <img
      src={`${BASE}/timbro-circolare-reale.png`}
      width={size}
      height={size}
      style={{
        opacity,
        display: "block",
        objectFit: "contain",
        mixBlendMode: "multiply",
        transform: `rotate(${rotate}deg)`,
        transformOrigin: "center center",
      }}
      alt="Timbro ufficiale Agenzia delle Entrate"
    />
  );
}

/**
 * TimbriSovrapposti — foto REALE del documento AE con entrambi i timbri
 * (circolare + rettangolare datario) sovrapposti, firma e funzionario.
 * Input bianchi coprono i valori originali e permettono l'inserimento dati.
 */
export function TimbriSovrapposti({
  numero = "",
  data = "",
  euro = "",
  serie = "",
  funzionario = "",
  onNumeroChange,
  onDataChange,
  onEuroChange,
  onSerieChange,
  onFunzionarioChange,
}: {
  numero?: string;
  data?: string;
  euro?: string;
  serie?: string;
  funzionario?: string;
  onNumeroChange?: (v: string) => void;
  onDataChange?: (v: string) => void;
  onEuroChange?: (v: string) => void;
  onSerieChange?: (v: string) => void;
  onFunzionarioChange?: (v: string) => void;
}) {
  const W = 600;
  const H = 340;

  const fmtDate = (iso: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    const mesi = ["GEN","FEB","MAR","APR","MAG","GIU","LUG","AGO","SET","OTT","NOV","DIC"];
    return `${d} ${mesi[parseInt(m,10)-1] ?? m}. ${y}`;
  };

  /** Campo ink — sovrascrive il valore stampato originale */
  const field = (
    top: string, left: string, width: string,
    value: string, onChange?: (v: string) => void,
    type: "text" | "date" = "text"
  ) => {
    const base: CSSProperties = {
      position: "absolute",
      top, left, width,
      fontFamily: "'Courier New', Courier, monospace",
      fontWeight: "bold",
      color: "#0a0a6e",
      fontSize: 13,
      lineHeight: 1,
      background: "white",
      border: "none",
      outline: "none",
      padding: "1px 2px",
    };
    if (onChange) {
      return (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={base}
        />
      );
    }
    return value ? (
      <span style={{ ...base, display: "inline-block" }}>{type === "date" ? fmtDate(value) : value}</span>
    ) : null;
  };

  return (
    <div style={{ position: "relative", width: W, height: H, display: "inline-block", flexShrink: 0 }}>
      {/* Foto reale del documento AE con timbri autentici */}
      <img
        src={`${BASE}/timbri-reali.png`}
        alt="Documento Agenzia delle Entrate — timbri originali"
        style={{ width: W, height: H, display: "block", objectFit: "fill", mixBlendMode: "multiply" }}
        draggable={false}
      />

      {/* ── Valori editabili sovrapposti sui valori originali ── */}

      {/* Data (copre "28 AGO. 2023") */}
      {field("31%", "28%", "18%", data, onDataChange, "date")}

      {/* N° (copre "2051") */}
      {field("31%", "60%", "12%", numero, onNumeroChange)}

      {/* Serie (copre "3") */}
      {field("43%", "16%", "6%", serie, onSerieChange)}

      {/* Euro (copre "20.00") */}
      {field("43%", "49%", "14%", euro, onEuroChange)}

      {/* Funzionario (copre "Manari Mauro") */}
      {field("76%", "56%", "30%", funzionario, onFunzionarioChange)}
    </div>
  );
}

/** @deprecated usa TimbriSovrapposti */
export function TimbroProtocollo(props: {
  numero?: string; data?: string; euro?: string; serie?: string;
  ufficio?: string; direzione?: string; size?: number;
  onNumeroChange?: (v: string) => void; onDataChange?: (v: string) => void;
  onEuroChange?: (v: string) => void; onSerieChange?: (v: string) => void;
}) {
  return <TimbriSovrapposti {...props} />;
}

/** Sezione firma — fedele alla foto (integrata in TimbriSovrapposti) */
export function SezioneFirema({
  funzionario = "",
  onFunzionarioChange,
}: {
  funzionario?: string;
  onFunzionarioChange?: (v: string) => void;
}) {
  return (
    <div style={{ fontFamily: "'Times New Roman', Times, serif", color: "#0a0a6e", minWidth: 180, paddingTop: 8 }}>
      <div style={{ fontSize: 10, fontStyle: "italic", color: "#444", marginBottom: 36 }}>
        Firma su delega del Direttore Provinciale
      </div>
      <div style={{ borderBottom: "1px solid #0a0a6e", width: "100%", marginBottom: 4 }} />
      <div style={{ fontSize: 11, marginBottom: 2 }}>Il Funzionario</div>
      {onFunzionarioChange ? (
        <input
          value={funzionario}
          onChange={e => onFunzionarioChange(e.target.value)}
          placeholder="Cognome Nome"
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 12,
            color: "#0a0a6e",
            fontWeight: "bold",
            background: "transparent",
            border: "none",
            borderBottom: "1px solid #0a0a6e",
            outline: "none",
            width: "100%",
            padding: "0 2px",
            marginTop: 2,
          }}
        />
      ) : (
        <div style={{
          borderBottom: "1px solid #0a0a6e",
          fontSize: 12,
          fontWeight: "bold",
          fontFamily: "'Courier New', monospace",
          color: "#0a0a6e",
          minHeight: 18,
          padding: "0 2px"
        }}>
          {funzionario}
        </div>
      )}
    </div>
  );
}
