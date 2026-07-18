/**
 * ROLETA VISIT BRAGA - CONFIGURAÇÃO DOS PRÉMIOS
 * ------------------------------------------------
 * Quando tiveres a lista final, edita apenas este ficheiro.
 *
 * id     → identificador único (não repetir!) - é a chave do stock na base de dados
 * nome   → texto na fatia (curto! máx. ~2 palavras por linha)
 * linha2 → (opcional) segunda linha
 * peso   → probabilidade relativa (maior = sai mais vezes)
 * ganha  → false para fatias sem prémio ("Sem sorte desta vez")
 * stock  → unidades disponíveis; null = ilimitado (usa null nas fatias sem prémio)
 *
 * NOTA: o stock aqui é o stock INICIAL. Depois do primeiro arranque,
 * o stock real vive no Firestore e é gerido em tempo real (ou na página /admin).
 * Se mudares os valores iniciais aqui, usa o botão "Repor stock inicial" na
 * página /admin para os aplicar.
 */

export type Premio = {
  id: string;
  nome: string;
  linha2?: string;
  peso: number;
  ganha: boolean;
  stock: number | null;
};

export const PREMIOS: Premio[] = [
  { id: "moleskine",  nome: "BLOCO",     linha2: "MOLESKINE",  peso: 5, ganha: true,  stock: 89 },
  { id: "semsorte1",  nome: "SEM SORTE", linha2: "DESTA VEZ",  peso: 4, ganha: false, stock: null },
  { id: "tshirt_xl",  nome: "T-SHIRT",   linha2: "TAM. XL",    peso: 4, ganha: true,  stock: 57 },
  { id: "blocoa6",    nome: "BLOCO",     linha2: "A6",         peso: 4, ganha: true,  stock: 57 },
  { id: "semsorte2",  nome: "SEM SORTE", linha2: "DESTA VEZ",  peso: 4, ganha: false, stock: null },
  { id: "tshirt_s",   nome: "T-SHIRT",   linha2: "TAM. S",     peso: 4, ganha: true,  stock: 52 },
];

/** mapa { id: stock } com os valores iniciais acima */
export function stockInicial(): Record<string, number | null> {
  const s: Record<string, number | null> = {};
  for (const p of PREMIOS) s[p.id] = p.stock;
  return s;
}

/** Mensagens de festejo (escolhida ao acaso quando alguém ganha) */
export const MENSAGENS_VITORIA = [
  "É GOLO! Ganhaste:",
  "UM CLUBE. UMA CIDADE. UM PRÉMIO:",
  "A pedreira sorriu-te! Levas para casa:",
  "Gverreiro com sorte! O teu prémio:",
];

export const MENSAGEM_DERROTA =
  "Para a próxima terás mais sorte! Obrigado por visitares o posto Visit Braga.";