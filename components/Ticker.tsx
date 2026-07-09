const FRASE = (
  <>
    Um clube. Uma cidade. <em>★</em> SC Braga Day 2026 <em>★</em> 18 julho{" "}
    <em>★</em> Estádio Municipal de Braga <em>★</em> Visit Braga <em>★</em>{" "}
  </>
);

export default function Ticker({ invertido = false }: { invertido?: boolean }) {
  return (
    <div className="ticker" aria-hidden="true">
      <div
        className="ticker-faixa"
        style={invertido ? { animationDirection: "reverse" } : undefined}
      >
        {FRASE}
        {FRASE}
        {FRASE}
        {FRASE}
      </div>
    </div>
  );
}
