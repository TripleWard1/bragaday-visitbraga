import EscudoCelta from "./EscudoCelta";

export default function JogoSection() {
  return (
    <section className="jogo grain" id="jogo">
      <div className="jogo-inner">
        <span className="eyebrow">Pré-época 2026/27 · Apresentação do plantel</span>

        <h2 className="jogo-titulo">
          SC Braga <span className="vs">vs</span> Celta de Vigo
        </h2>

        <div className="confronto">
          <div className="equipa">
            <div className="escudo-caixa">
              <img
                src="/sc-braga.png"
                alt="Emblema do SC Braga"
                width={127}
                height={150}
              />
            </div>
            SC Braga
          </div>

          <div className="marcador">18.07</div>

          <div className="equipa">
            <div className="escudo-caixa">
              <EscudoCelta />
            </div>
            Celta de Vigo
          </div>
        </div>

        <div className="jogo-cartoes">
          <article className="cartao">
            <span className="icone" aria-hidden="true">
              🏟️
            </span>
            <h3>A Pedreira à tua espera</h3>
            <p>
              O Estádio Municipal de Braga volta a encher-se para receber os
              galegos do Celta de Vigo num particular de luxo que marca o
              arranque da nova temporada.
            </p>
          </article>

          <article className="cartao">
            <span className="icone" aria-hidden="true">
              👕
            </span>
            <h3>Apresentação oficial</h3>
            <p>
              O plantel 2026/27 é apresentado oficialmente aos adeptos. Vem
              conhecer os reforços e sentir de perto a energia dos Gverreiros
              do Minho.
            </p>
          </article>

          <article className="cartao">
            <span className="icone" aria-hidden="true">
              🎡
            </span>
            <h3>Posto Visit Braga</h3>
            <p>
              O Município de Braga marca presença com um posto de turismo
              dedicado - com a Roleta Visit Braga, prémios e muitas surpresas
              para toda a família.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
