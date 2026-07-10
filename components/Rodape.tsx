export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape-logos">
        <img src="/sc-braga.png" alt="SC Braga" />
        <img src="/braga-day-logo.png" alt="SC Braga Day 2026" />
        <img
          src="/braga-soa-futuro.png"
          alt="Braga - Soa a Futuro"
          style={{ width: "clamp(150px, 20vw, 205px)", height: "auto" }}
        />
      </div>

      <p className="lema">Um clube. Uma cidade.</p>

      <p>
        SC Braga Day · 18 de julho de 2026 · Estádio Municipal de Braga
        <br />
        Visit Braga - Município de Braga <br />
        Direção Municipal de Desenvolvimento Económico, Turismo e Sustentabilidade <br />
        Divisão de Atividades Económicas e Turismo · Município de Braga
      </p>
    </footer>
  );
}
