/**
 * Logo ufficiale Agenzia delle Entrate
 * Usa l'immagine PNG originale con intestazione MEF sopra
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function LogoAE({ className = "" }: { className?: string }) {
  return (
    <div className={`select-none ${className}`}>
      {/* Intestazione Ministero – stile uguale al sito ufficiale */}
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
          color: "#1a1a6e",
          fontWeight: 600,
          letterSpacing: "0.01em",
          marginBottom: "6px",
        }}
      >
        Ministero dell'Economia e delle Finanze
      </div>

      {/* Logo PNG ufficiale */}
      <img
        src={`${BASE}/logo-ae-ufficiale.png`}
        alt="Agenzia delle Entrate – Agenzia della Riscossione"
        style={{ height: "52px", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}
