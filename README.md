# 🔴⚪ SC Braga Day 2026 - Webapp

Webapp imersiva para o **Braga Day 2026** (18.07.2026, Estádio Municipal de Braga), com a **Roleta Gverreira** do posto de turismo Visit Braga.

## Como usar no StackBlitz

1. Cria um novo projeto **Next.js** no StackBlitz (template oficial, App Router).
2. Copia as pastas deste zip por cima do projeto:
   - `app/` → substitui `layout.tsx`, `page.tsx` e `globals.css`
   - `components/` → nova pasta na raiz
   - `lib/` → nova pasta na raiz
   - `public/` → copia as 4 imagens para dentro de `public/`
3. **Apaga** o Tailwind se o template o trouxer (opcional - o projeto não usa Tailwind, todo o estilo está em `globals.css`, por isso também funciona sem apagar nada).
4. Confirma que o `tsconfig.json` tem o alias `@/*` (o template oficial já traz):
   ```json
   "paths": { "@/*": ["./*"] }
   ```

Única dependência extra: **firebase** (para o stock em tempo real):

```bash
npm install firebase
```

Confetes, som e animações continuam feitos à mão, sem mais bibliotecas.

## Deploy na Vercel

Liga o repositório (ou usa `vercel deploy` / botão do StackBlitz) - é um projeto Next.js standard, sem variáveis de ambiente.

## Escudo do Celta de Vigo ✅

O código já está preparado: Já incluído em `public/celta-vigo.png` - aparece automaticamente na secção do jogo.

## Stock em tempo real (Firebase)

O stock dos prémios vive num único documento do Firestore (`roleta/stock`) e sincroniza **ao segundo em todos os dispositivos** - computador, telemóvel, tablet. Quando um prémio esgota, a fatia fica **cinzenta com "- ESGOTADO -"** e a roleta deixa de poder cair lá. A reserva é feita com **transações**: se dois dispositivos girarem em simultâneo e só restar 1 unidade, apenas um a leva.

### Configurar (5 minutos)

1. [console.firebase.google.com](https://console.firebase.google.com) → novo projeto → adiciona uma **app Web**
2. Copia o `firebaseConfig` para **`lib/firebase.ts`**
3. Ativa o **Firestore Database** e aplica estas regras (só permite mexer no documento do stock):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /roleta/stock {
      allow read, write: if true;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

> Nota: escrita aberta nesse documento chega para o dia do evento; se a app ficar online permanentemente, o passo seguinte seria Firebase Auth + regras por utilizador.

**Sem configurar nada**, a app corre em **modo local** - o stock desconta só nesse dispositivo (bom para testares já o visual).

### Página /admin

Em `/admin` (PIN: `braga2026`, muda-o em `app/admin/page.tsx`) a equipa do posto pode ver o stock ao vivo, corrigir valores e **repor o stock inicial** - útil quando meteres a lista definitiva de prémios em `lib/premios.ts`.

## Editar os prémios da roleta

Tudo num único ficheiro: **`lib/premios.ts`**

```ts
{ id: "cachecol", nome: "CACHECOL", linha2: "SC BRAGA", peso: 2, ganha: true, stock: 25 }
```

- `id` - único, é a chave do stock na base de dados
- `stock` - unidades iniciais; `null` = ilimitado (fatias "Tenta outra vez")

- `nome` / `linha2` - texto na fatia (mantém curto)
- `peso` - probabilidade relativa (maior = sai mais vezes)
- `ganha: false` - fatias "Tenta outra vez" (sem confetes)

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
  premios.ts        → ⚙️ CONFIGURAÇÃO DOS PRÉMIOS + STOCK INICIAL (edita aqui!)
  firebase.ts       → ⚙️ credenciais do Firebase
  stock.ts          → sincronização em tempo real + transações anti-corrida
app/admin/page.tsx  → gestão de stock ao vivo (PIN)
public/
  braga-day-logo.png / visit-braga.png / visit-braga-pos.png / sc-braga.png
```
