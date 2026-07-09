/**
 * ROLETA VISIT BRAGA -CONFIGURAÇÃO DOS PRÉMIOS
 * ------------------------------------------------
 * Edita apenas este ficheiro quando os prémios estiverem definidos.
 *
 * nome  → texto que aparece na fatia da roleta (curto! máx. ~2 palavras por linha)
 * linha2 → (opcional) segunda linha do texto na fatia
 * peso  → probabilidade relativa de sair (maior = mais provável).
 *         Ex.: um prémio com peso 1 sai 6x menos que um com peso 6.
 * ganha → false para fatias "Tenta outra vez" (não mostra festejo de vitória)
 */

export type Premio = {
  nome: string;
  linha2?: string;
  peso: number;
  ganha: boolean;
};

export const PREMIOS: Premio[] = [
  { nome: "PRÉMIO", linha2: "SURPRESA", peso: 2, ganha: true },
  { nome: "BRINDE", linha2: "VISIT BRAGA", peso: 5, ganha: true },
  { nome: "TENTA", linha2: "OUTRA VEZ", peso: 4, ganha: false },
  { nome: "MAPA &", linha2: "GUIA", peso: 5, ganha: true },
  { nome: "PIN", linha2: "GVERREIRO", peso: 4, ganha: true },
  { nome: "TENTA", linha2: "OUTRA VEZ", peso: 4, ganha: false },
  { nome: "OFERTA", linha2: "ESPECIAL", peso: 3, ganha: true },
  { nome: "STICKER", linha2: "BRAGA DAY", peso: 5, ganha: true },
];

/** Mensagens de festejo (escolhida ao acaso quando alguém ganha) */
export const MENSAGENS_VITORIA = [
  "É GOLO! Ganhaste:",
  "UM CLUBE. UMA CIDADE. UM PRÉMIO:",
  "A pedra sorriu-te! Levas para casa:",
  "Gverreiro com sorte! O teu prémio:",
];

export const MENSAGEM_DERROTA =
  "Desta vez não foi… mas em Braga ninguém desiste à primeira!";
