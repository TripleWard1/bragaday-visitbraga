import Roleta from "./Roleta";

export default function RoletaSection() {
  return (
    <section className="roleta-sec grain" id="roleta">
      <div className="roleta-inner">
        <img
          src="/visit-braga.png"
          alt="Visit Braga"
          width={420}
          height={68}
          className="roleta-logo-vb"
        />

        <h2 className="roleta-titulo">
          Roleta
          <br />
          Gverreira
        </h2>

        <p className="roleta-sub">
          Passa pelo posto de turismo Visit Braga no Braga Day, gira a roleta e
          habilita-te a prémios com as cores da cidade. Todos jogam, muitos
          ganham -à Gverreiro!
        </p>

        <Roleta />
      </div>
    </section>
  );
}
