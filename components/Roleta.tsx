"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  PREMIOS,
  MENSAGENS_VITORIA,
  MENSAGEM_DERROTA,
  type Premio,
} from "@/lib/premios";
import Confetti from "./Confetti";

const N = PREMIOS.length;
const SEG = 360 / N;
const C = 210; // centro
const R = 150; // raio das fatias
const N_LAMPADAS = 20;

/** ponto na circunferência para um ângulo (0° = topo, sentido horário) */
function ponto(angulo: number, raio: number) {
  const rad = ((angulo - 90) * Math.PI) / 180;
  return [C + raio * Math.cos(rad), C + raio * Math.sin(rad)];
}

function caminhoFatia(i: number) {
  const [x0, y0] = ponto(i * SEG, R);
  const [x1, y1] = ponto((i + 1) * SEG, R);
  return `M ${C} ${C} L ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1} Z`;
}

/** escolhe o índice do prémio de acordo com os pesos */
function sortearPremio(): number {
  const total = PREMIOS.reduce((s, p) => s + p.peso, 0);
  let alvo = Math.random() * total;
  for (let i = 0; i < N; i++) {
    alvo -= PREMIOS[i].peso;
    if (alvo <= 0) return i;
  }
  return N - 1;
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export default function Roleta() {
  const [angulo, setAngulo] = useState(0);
  const [aGirar, setAGirar] = useState(false);
  const [resultado, setResultado] = useState<Premio | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [flash, setFlash] = useState(false);
  const rafRef = useRef<number>(0);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const som = useCallback((freq: number, dur = 0.06, vol = 0.05) => {
    try {
      if (!audioRef.current) {
        const Ctx =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        audioRef.current = new Ctx();
      }
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur + 0.01);
    } catch {
      /* som é opcional */
    }
  }, []);

  const fanfarra = useCallback(() => {
    // pequeno arpejo de vitória
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => som(f, 0.18, 0.06), i * 110)
    );
  }, [som]);

  const girar = useCallback(() => {
    if (aGirar) return;
    setResultado(null);
    setAGirar(true);

    const vencedor = sortearPremio();
    const centroFatia = vencedor * SEG + SEG / 2;
    const jitter = (Math.random() - 0.5) * (SEG - 12);
    const alvoBase = (360 - centroFatia + jitter + 360) % 360;

    const inicio = angulo;
    const atualNorm = ((inicio % 360) + 360) % 360;
    const voltas = 5 + Math.floor(Math.random() * 3);
    const delta = voltas * 360 + ((alvoBase - atualNorm + 360) % 360);
    const duracao = 5200 + Math.random() * 800;

    const t0 = performance.now();
    let ultimaFatia = Math.floor(atualNorm / SEG);

    const passo = (agora: number) => {
      const t = Math.min(1, (agora - t0) / duracao);
      const atual = inicio + delta * easeOutQuart(t);
      setAngulo(atual);

      const fatia = Math.floor((((atual % 360) + 360) % 360) / SEG);
      if (fatia !== ultimaFatia) {
        ultimaFatia = fatia;
        som(700 + Math.random() * 60);
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(passo);
      } else {
        setAGirar(false);
        const premio = PREMIOS[vencedor];
        if (premio.ganha) {
          fanfarra();
          setFlash(true);
          setTimeout(() => setFlash(false), 600);
        }
        setMensagem(
          premio.ganha
            ? MENSAGENS_VITORIA[
                Math.floor(Math.random() * MENSAGENS_VITORIA.length)
              ]
            : MENSAGEM_DERROTA
        );
        setResultado(premio);
      }
    };

    rafRef.current = requestAnimationFrame(passo);
  }, [aGirar, angulo, som, fanfarra]);

  return (
    <>
      <div className={`roleta-palco${aGirar ? " a-girar" : ""}`}>
        <div className="roleta-ponteiro" aria-hidden="true" />
        <svg
          className="roleta-svg"
          viewBox="0 0 420 420"
          role="img"
          aria-label="Roleta de prémios Visit Braga"
        >
          <defs>
            <linearGradient id="fatiaVermelha" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ef3540" />
              <stop offset="100%" stopColor="#a91118" />
            </linearGradient>
            <linearGradient id="fatiaBranca" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e8e0cf" />
            </linearGradient>
            <radialGradient id="aroMetal" cx="0.5" cy="0.35" r="0.9">
              <stop offset="0%" stopColor="#3a3a3a" />
              <stop offset="60%" stopColor="#121212" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
            <radialGradient id="brilho" cx="0.32" cy="0.22" r="0.75">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hubOuro" cx="0.5" cy="0.35" r="0.9">
              <stop offset="0%" stopColor="#ffe9a8" />
              <stop offset="55%" stopColor="#e0b64f" />
              <stop offset="100%" stopColor="#a97c1e" />
            </radialGradient>
          </defs>

          {/* aro exterior metálico com lâmpadas */}
          <circle cx={C} cy={C} r={R + 34} fill="url(#aroMetal)" />
          <circle
            cx={C}
            cy={C}
            r={R + 34}
            fill="none"
            stroke="#000"
            strokeWidth="2"
            opacity="0.6"
          />
          {Array.from({ length: N_LAMPADAS }, (_, i) => {
            const [x, y] = ponto((360 / N_LAMPADAS) * i, R + 22);
            return (
              <circle
                key={i}
                className="lampada"
                cx={x}
                cy={y}
                r="5"
                fill="#ffd66b"
                style={{ animationDelay: `${(i % 4) * 0.22}s` }}
              />
            );
          })}
          <circle cx={C} cy={C} r={R + 8} fill="#f4ede0" />
          <circle
            cx={C}
            cy={C}
            r={R + 8}
            fill="none"
            stroke="#c9bfa8"
            strokeWidth="1.5"
          />

          {/* fatias (rodam) */}
          <g
            style={{
              transform: `rotate(${angulo}deg)`,
              transformOrigin: "210px 210px",
            }}
          >
            {PREMIOS.map((p, i) => {
              const vermelha = i % 2 === 0;
              return (
                <g key={i}>
                  <path
                    d={caminhoFatia(i)}
                    fill={vermelha ? "url(#fatiaVermelha)" : "url(#fatiaBranca)"}
                    stroke="#121212"
                    strokeWidth="2.5"
                  />
                  <g transform={`rotate(${i * SEG + SEG / 2} ${C} ${C})`}>
                    <text
                      x={C}
                      y={92}
                      textAnchor="middle"
                      fontFamily="var(--font-display), sans-serif"
                      fontSize="16"
                      fill={vermelha ? "#ffffff" : "#da2028"}
                      style={{ textTransform: "uppercase" }}
                    >
                      {p.nome}
                      {p.linha2 && (
                        <tspan x={C} dy="18">
                          {p.linha2}
                        </tspan>
                      )}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* pinos dourados entre fatias */}
            {PREMIOS.map((_, i) => {
              const [x, y] = ponto(i * SEG, R - 5);
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r={6} fill="url(#hubOuro)" />
                  <circle cx={x} cy={y} r={6} fill="none" stroke="#7a5a12" strokeWidth="1" />
                </g>
              );
            })}
          </g>

          {/* brilho de vidro por cima das fatias */}
          <circle cx={C} cy={C} r={R} fill="url(#brilho)" pointerEvents="none" />

          {/* cubo central: anel dourado + emblema do SC Braga */}
          <circle cx={C} cy={C} r={52} fill="url(#hubOuro)" />
          <circle cx={C} cy={C} r={46} fill="#ffffff" stroke="#121212" strokeWidth="2" />
          <image
            href="/sc-braga.png"
            x={C - 27}
            y={C - 32}
            width="54"
            height="64"
          />
        </svg>

        {/* base/estande da roleta com o logo Visit Braga */}
        <div className="roleta-base">
          <img src="/visit-braga-rodape.png" alt="Visit Braga" />
        </div>
      </div>

      <button className="btn-girar" onClick={girar} disabled={aGirar}>
        {aGirar ? "Boa sorte…" : "Girar a roleta!"}
      </button>

      {flash && <div className="flash-vitoria" aria-hidden="true" />}

      {resultado && (
        <div
          className="resultado-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Resultado da roleta"
          onClick={() => setResultado(null)}
        >
          {resultado.ganha && <Confetti />}
          <div className="resultado-cartao" onClick={(e) => e.stopPropagation()}>
            <img
              src="/braga-day-logo.png"
              alt=""
              aria-hidden="true"
              className="resultado-logo"
            />
            <p className="resultado-msg">{mensagem}</p>
            <p
              className={`resultado-premio${resultado.ganha ? "" : " sem-sorte"}`}
            >
              {resultado.nome} {resultado.linha2 ?? ""}
            </p>
            <button className="btn-fechar" onClick={() => setResultado(null)}>
              {resultado.ganha ? "Reclamar prémio" : "Fechar"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
