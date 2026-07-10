"use client";

import { useEffect, useState } from "react";

// Hora de abertura do evento (hora de Portugal continental - verão: UTC+1)
const DATA_EVENTO = new Date("2026-07-18T10:00:00+01:00").getTime();

type Tempo = { dias: number; horas: number; minutos: number; segundos: number };

function calcular(): Tempo {
  const diff = Math.max(0, DATA_EVENTO - Date.now());
  return {
    dias: Math.floor(diff / 86_400_000),
    horas: Math.floor((diff / 3_600_000) % 24),
    minutos: Math.floor((diff / 60_000) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [tempo, setTempo] = useState<Tempo | null>(null);

  useEffect(() => {
    setTempo(calcular());
    const id = setInterval(() => setTempo(calcular()), 1000);
    return () => clearInterval(id);
  }, []);

  // evita erro de hidratação: só renderiza no cliente
  if (!tempo) return <div className="contagem" style={{ minHeight: 92 }} />;

  const blocos: Array<[number, string]> = [
    [tempo.dias, "Dias"],
    [tempo.horas, "Horas"],
    [tempo.minutos, "Min"],
    [tempo.segundos, "Seg"],
  ];

  return (
    <div className="contagem" role="timer" aria-label="Contagem para o Braga Day">
      {blocos.map(([num, label]) => (
        <div className="contagem-bloco" key={label}>
          <div className="contagem-num">{String(num).padStart(2, "0")}</div>
          <div className="contagem-label">{label}</div>
        </div>
      ))}
    </div>
  );
}
