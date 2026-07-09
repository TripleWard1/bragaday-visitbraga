# 🔴⚪ SC Braga Day 2026 -Webapp

Webapp imersiva para o **Braga Day 2026** (18.07.2026, Estádio Municipal de Braga), com a **Roleta Gverreira** do posto de turismo Visit Braga.

## Como usar no StackBlitz

1. Cria um novo projeto **Next.js** no StackBlitz (template oficial, App Router).
2. Copia as pastas deste zip por cima do projeto:
   - `app/` → substitui `layout.tsx`, `page.tsx` e `globals.css`
   - `components/` → nova pasta na raiz
   - `lib/` → nova pasta na raiz
   - `public/` → copia as 4 imagens para dentro de `public/`
3. **Apaga** o Tailwind se o template o trouxer (opcional -o projeto não usa Tailwind, todo o estilo está em `globals.css`, por isso também funciona sem apagar nada).
4. Confirma que o `tsconfig.json` tem o alias `@/*` (o template oficial já traz):
   ```json
   "paths": { "@/*": ["./*"] }
   ```

Não há **nenhuma dependência extra** para instalar -confetes, som e animações são feitos à mão, sem bibliotecas.

## Deploy na Vercel

Liga o repositório (ou usa `vercel deploy` / botão do StackBlitz) -é um projeto Next.js standard, sem variáveis de ambiente.

## Escudo do Celta de Vigo ✅

O código já está preparado: Já incluído em `public/celta-vigo.png` -aparece automaticamente na secção do jogo.

## Editar os prémios da roleta

Tudo num único ficheiro: **`lib/premios.ts`**

```ts
{ nome: "CACHECOL", linha2: "SC BRAGA", peso: 2, ganha: true }
```

- `nome` / `linha2` -texto na fatia (mantém curto)
- `peso` -probabilidade relativa (maior = sai mais vezes)
- `ganha: false` -fatias "Tenta outra vez" (sem confetes)

Podes ter 6, 8, 10 fatias… a roleta adapta-se sozinha. As cores alternam automaticamente vermelho/branco.

## Estrutura

```
app/
  layout.tsx        → fontes (Anton, Permanent Marker, Archivo) + metadados
  page.tsx          → composição das secções
  globals.css       → todo o design system (cores, texturas, animações)
components/
  Hero.tsx          → capa "Save the Date" + contagem decrescente
  Countdown.tsx     → contador até 18.07.2026 (client)
  Ticker.tsx        → faixa "Um clube. Uma cidade."
  JogoSection.tsx   → SC Braga vs Celta de Vigo + posto Visit Braga
  RoletaSection.tsx → secção da roleta (branding Visit Braga)
  Roleta.tsx        → roleta SVG com física, som e sorteio ponderado (client)
  Confetti.tsx      → confetes em canvas, sem dependências (client)
  Rodape.tsx        → logos institucionais
lib/
  premios.ts        → ⚙️ CONFIGURAÇÃO DOS PRÉMIOS (edita aqui!)
public/
  braga-day-logo.png / visit-braga.png / visit-braga-pos.png / sc-braga.png
```
