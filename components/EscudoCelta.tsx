"use client";

import { useState } from "react";

/** Escudo do RC Celta de Vigo (public/celta-vigo.png), com fallback. */
export default function EscudoCelta() {
  const [falhou, setFalhou] = useState(false);

  if (falhou) {
    return (
      <div className="escudo-celta" aria-hidden="true">
        RC
      </div>
    );
  }

  return (
    <img
      src="/celta-vigo.png"
      alt="Emblema do RC Celta de Vigo"
      width={89}
      height={150}
      onError={() => setFalhou(true)}
    />
  );
}
