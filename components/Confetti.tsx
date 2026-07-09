"use client";

import { useEffect, useRef } from "react";

const CORES = ["#da2028", "#ffffff", "#121212", "#f4ede0"];

type Particula = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  w: number;
  h: number;
  cor: string;
};

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const W = window.innerWidth;
    const H = window.innerHeight;

    const particulas: Particula[] = Array.from({ length: 190 }, () => ({
      x: W / 2 + (Math.random() - 0.5) * W * 0.35,
      y: H * 0.35,
      vx: (Math.random() - 0.5) * 14,
      vy: -6 - Math.random() * 10,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.35,
      w: 6 + Math.random() * 8,
      h: 8 + Math.random() * 10,
      cor: CORES[Math.floor(Math.random() * CORES.length)],
    }));

    let ativo = true;
    const t0 = performance.now();

    const desenhar = (agora: number) => {
      if (!ativo) return;
      const decorrido = agora - t0;
      ctx.clearRect(0, 0, W, H);

      for (const p of particulas) {
        p.vy += 0.32; // gravidade
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.cor;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (decorrido < 4200) {
        requestAnimationFrame(desenhar);
      } else {
        ctx.clearRect(0, 0, W, H);
      }
    };

    requestAnimationFrame(desenhar);
    return () => {
      ativo = false;
    };
  }, []);

  return <canvas ref={canvasRef} className="confetes-canvas" aria-hidden="true" />;
}
