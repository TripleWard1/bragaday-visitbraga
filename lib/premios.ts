/**
 * ROLETA VISIT BRAGA — CONFIGURAÇÃO DOS PRÉMIOS
 * ------------------------------------------------
 * id     → identificador único (não repetir!) — é a chave do stock na base de dados
 * nome   → texto na fatia (curto! máx. ~2 palavras por linha)
 * linha2 → (opcional) segunda linha
 * peso   → probabilidade relativa (maior = sai mais vezes)
 * ganha  → false para fatias sem prémio ("Sem sorte desta vez")
 * stock  → unidades disponíveis; null = ilimitado (usa null nas fatias sem prémio)
 *
 * ODDS ATUAIS: as fatias "sem sorte" têm peso 1 contra 5-6 dos prémios,
 * ou seja, sai prémio em ~91% dos giros (1 em cada ~11 fica sem sorte).
 * Para dar MAIS prémios ainda, baixa o peso das "sem sorte" para 0.5.
 * Para dar menos, sobe para 2 ou 3.
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
  { id: "moleskine",  nome: "BLOCO",     linha2: "MOLESKINE",  peso: 6, ganha: true,  stock: 148 },
  { id: "semsorte1",  nome: "SEM SORTE", linha2: "DESTA VEZ",  peso: 1, ganha: false, stock: null },
  { id: "tshirt_xl",  nome: "T-SHIRT",   linha2: "TAM. XL",    peso: 5, ganha: true,  stock: 94 },
  { id: "blocoa6",    nome: "BLOCO",     linha2: "A6",         peso: 5, ganha: true,  stock: 94 },
  { id: "semsorte2",  nome: "SEM SORTE", linha2: "DESTA VEZ",  peso: 1, ganha: false, stock: null },
  { id: "tshirt_s",   nome: "T-SHIRT",   linha2: "TAM. S",     peso: 5, ganha: true,  stock: 90 },
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