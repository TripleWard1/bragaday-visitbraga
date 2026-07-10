"use client";

/**
 * PÁGINA DE GESTÃO DE STOCK - /admin
 * -----------------------------------
 * Para a equipa no posto: ver e ajustar o stock ao vivo durante o evento.
 * Protegida por um PIN simples (muda-o abaixo). Nota: isto trava curiosos,
 * não é segurança a sério - para o dia do evento chega; se a app ficar
 * online permanentemente, o ideal é acrescentar Firebase Auth.
 */

import { useEffect, useState } from "react";
import { PREMIOS } from "@/lib/premios";
import { subscreverStock, guardarStock, reporStock, type Stock } from "@/lib/stock";
import { firebaseAtivo } from "@/lib/firebase";

const PIN = "braga2026"; // ⚙️ muda o PIN aqui

export default function AdminPage() {
  const [autorizado, setAutorizado] = useState(false);
  const [pin, setPin] = useState("");
  const [stock, setStock] = useState<Stock>({});
  const [edicao, setEdicao] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!autorizado) return;
    return subscreverStock(setStock);
  }, [autorizado]);

  if (!autorizado) {
    return (
      <main className="admin">
        <h1>Gestão de stock</h1>
        <p className="admin-nota">Roleta Gverreira · Posto Visit Braga</p>
        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && pin === PIN && setAutorizado(true)}
        />
        <button onClick={() => pin === PIN && setAutorizado(true)}>Entrar</button>
      </main>
    );
  }

  const premiosComStock = PREMIOS.filter((p) => p.stock !== null);

  const guardar = async () => {
    const novo: Stock = { ...stock };
    for (const [id, v] of Object.entries(edicao)) {
      const n = parseInt(v, 10);
      if (!Number.isNaN(n) && n >= 0) novo[id] = n;
    }
    await guardarStock(novo);
    setEdicao({});
    setMsg("Stock guardado ✔");
    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <main className="admin">
      <h1>Gestão de stock</h1>
      <p className="admin-nota">
        {firebaseAtivo
          ? "Ligado ao Firestore - alterações visíveis em todos os dispositivos ao segundo."
          : "⚠ MODO LOCAL (Firebase por configurar em lib/firebase.ts) - o stock não sincroniza entre dispositivos."}
      </p>

      <table>
        <thead>
          <tr>
            <th>Prémio</th>
            <th>Stock atual</th>
            <th>Novo valor</th>
          </tr>
        </thead>
        <tbody>
          {premiosComStock.map((p) => {
            const atual = stock[p.id];
            const esgotado = typeof atual === "number" && atual <= 0;
            return (
              <tr key={p.id} className={esgotado ? "esgotado" : ""}>
                <td>
                  {p.nome} {p.linha2 ?? ""}
                </td>
                <td>{atual ?? "-"} {esgotado && "· ESGOTADO"}</td>
                <td>
                  <input
                    type="number"
                    min={0}
                    placeholder="-"
                    value={edicao[p.id] ?? ""}
                    onChange={(e) =>
                      setEdicao((s) => ({ ...s, [p.id]: e.target.value }))
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="admin-acoes">
        <button onClick={guardar}>Guardar alterações</button>
        <button
          className="perigo"
          onClick={() => {
            if (confirm("Repor TODOS os prémios ao stock inicial de lib/premios.ts?"))
              reporStock();
          }}
        >
          Repor stock inicial
        </button>
      </div>
      {msg && <p className="admin-msg">{msg}</p>}

      <style jsx>{`
        .admin {
          max-width: 640px;
          margin: 0 auto;
          padding: 3rem 1.25rem 4rem;
          font-family: var(--font-body), system-ui, sans-serif;
        }
        h1 {
          font-family: var(--font-display), sans-serif;
          text-transform: uppercase;
          font-size: 2rem;
        }
        .admin-nota {
          opacity: 0.8;
          margin: 0.5rem 0 1.8rem;
          font-size: 0.9rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 0.8rem;
          overflow: hidden;
        }
        th,
        td {
          padding: 0.7rem 0.9rem;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          font-size: 0.92rem;
        }
        th {
          background: rgba(0, 0, 0, 0.35);
          text-transform: uppercase;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
        }
        tr.esgotado td {
          opacity: 0.55;
        }
        input {
          width: 90px;
          padding: 0.45rem 0.6rem;
          border-radius: 0.5rem;
          border: 2px solid #121212;
          font-size: 1rem;
        }
        button {
          margin-top: 1.4rem;
          margin-right: 0.8rem;
          padding: 0.7rem 1.6rem;
          border-radius: 999px;
          background: #ffffff;
          color: #da2028;
          font-weight: 700;
          border: 3px solid #121212;
          box-shadow: 0 4px 0 #121212;
        }
        button.perigo {
          background: #121212;
          color: #ffffff;
          border-color: #000;
          box-shadow: 0 4px 0 #000;
        }
        .admin-msg {
          margin-top: 1rem;
          font-weight: 700;
        }
      `}</style>
    </main>
  );
}
