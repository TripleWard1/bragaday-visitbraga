import Countdown from "./Countdown";

const SILHUETAS = [
  { s: "⚽", top: "6%", left: "4%" },
  { s: "🏀", top: "14%", left: "78%" },
  { s: "🤾", top: "58%", left: "-4%" },
  { s: "🎱", top: "66%", left: "80%" },
  { s: "🏐", top: "84%", left: "12%" },
  { s: "🥅", top: "36%", left: "88%" },
];

export default function Hero() {
  return (
    <header className="hero grain">
      <div className="silhuetas" aria-hidden="true">
        {SILHUETAS.map((el, i) => (
          <span key={i} style={{ top: el.top, left: el.left }}>
            {el.s}
          </span>
        ))}
      </div>

      {/* Barra de marcas - SC Braga e Visit Braga sempre visíveis à cabeça */}
      <div className="barra-marcas">
        <img
          src="/sc-braga.png"
          alt="SC Braga"
          width={84}
          height={100}
          className="barra-escudo"
        />
        <span className="barra-x" aria-hidden="true">
          ×
        </span>
        <img
          src="/visit-braga.png"
          alt="Visit Braga"
          width={360}
          height={58}
          className="barra-vb"
        />
      </div>

      <img
        src="/braga-day-logo.png"
        alt="SC Braga Day 2026"
        className="hero-logo"
        width={306}
        height={169}
      />

      <h1 className="hero-titulo">
        Save
        <br />
        the date
      </h1>
      <p className="hero-data">18.07.2026</p>

      <p className="hero-sub">
        A grande festa dos Gverreiros
        <strong>Estádio Municipal de Braga</strong>
      </p>

      <Countdown />

      <a href="#roleta" className="seta-baixo" aria-label="Ir para a roleta">
        ▼
      </a>
    </header>
  );
}
