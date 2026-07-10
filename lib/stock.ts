/**
 * GESTÃO DE STOCK EM TEMPO REAL (Firestore)
 * -----------------------------------------
 * O stock vive num único documento: roleta/stock  →  { premioId: unidades }
 *
 * - subscreverStock: escuta alterações ao vivo (todos os dispositivos veem
 *   o mesmo stock, atualizado ao segundo)
 * - reservarPremio: desconta 1 unidade DENTRO de uma transação - se dois
 *   dispositivos girarem ao mesmo tempo e só restar 1 unidade, apenas um
 *   ganha; o outro volta a sortear
 * - reporStock: repõe os valores iniciais de lib/premios.ts (página /admin)
 *
 * Sem Firebase configurado (lib/firebase.ts), tudo funciona em modo local.
 */

import {
  doc,
  onSnapshot,
  runTransaction,
  setDoc,
} from "firebase/firestore";
import { db, firebaseAtivo } from "./firebase";
import { stockInicial } from "./premios";

export type Stock = Record<string, number | null>;

// ---- modo local (sem Firebase): stock em memória, só neste dispositivo ----
let stockLocal: Stock = stockInicial();
const ouvintesLocais = new Set<(s: Stock) => void>();

function emitirLocal() {
  // forEach em vez de for...of: o tsconfig do template pode ter target "es5",
  // que não permite iterar Sets diretamente
  ouvintesLocais.forEach((cb) => cb({ ...stockLocal }));
}

/** Escuta o stock em tempo real. Devolve função para cancelar. */
export function subscreverStock(cb: (s: Stock) => void): () => void {
  if (!firebaseAtivo || !db) {
    ouvintesLocais.add(cb);
    cb({ ...stockLocal });
    return () => ouvintesLocais.delete(cb);
  }

  const ref = doc(db, "roleta", "stock");
  return onSnapshot(
    ref,
    (snap) => {
      if (!snap.exists()) {
        // primeiro arranque: semeia o documento com o stock inicial
        setDoc(ref, stockInicial()).catch(() => {});
        cb(stockInicial());
      } else {
        cb(snap.data() as Stock);
      }
    },
    () => cb(stockInicial()) // erro de rede → mostra inicial, roleta continua
  );
}

/**
 * Tenta reservar 1 unidade do prémio. Devolve true se conseguiu.
 * stock null/inexistente = ilimitado (reserva sempre bem-sucedida).
 */
export async function reservarPremio(id: string): Promise<boolean> {
  if (!firebaseAtivo || !db) {
    const atual = stockLocal[id];
    if (atual === null || atual === undefined) return true;
    if (atual <= 0) return false;
    stockLocal[id] = atual - 1;
    emitirLocal();
    return true;
  }

  try {
    await runTransaction(db, async (tx) => {
      const ref = doc(db!, "roleta", "stock");
      const snap = await tx.get(ref);
      const dados = (snap.exists() ? snap.data() : stockInicial()) as Stock;
      const atual = dados[id];
      if (atual === null || atual === undefined) return; // ilimitado
      if (atual <= 0) throw new Error("esgotado");
      tx.set(ref, { ...dados, [id]: atual - 1 });
    });
    return true;
  } catch {
    return false;
  }
}

/** Repõe o stock inicial (usado na página /admin). */
export async function reporStock(): Promise<void> {
  if (!firebaseAtivo || !db) {
    stockLocal = stockInicial();
    emitirLocal();
    return;
  }
  await setDoc(doc(db, "roleta", "stock"), stockInicial());
}

/** Define manualmente o stock de todos os prémios (página /admin). */
export async function guardarStock(novo: Stock): Promise<void> {
  if (!firebaseAtivo || !db) {
    stockLocal = { ...novo };
    emitirLocal();
    return;
  }
  await setDoc(doc(db, "roleta", "stock"), novo);
}
