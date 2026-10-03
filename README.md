# Turing Test

Can you spot the AI? Over 8 rounds you read two answers to the same question, one
written by a person and one by AI, and pick the AI.

Live: https://turing-test.pknspace.com

## Features

- 8 rounds with a shuffled question order, ending with a bonus round about ELIZA.
- After each pick, the answer is revealed with a clue on how to tell them apart.
- A final score screen with confetti.
- Keyboard shortcuts for picking and moving to the next round.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui · Framer Motion · Vitest. No backend.

## Development

Requires Node 22.18+ (`.nvmrc` pins 22).

```bash
npm install
npm run dev
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Typecheck and production build into `dist/` |
| `npm run typecheck` | TypeScript check (`tsc -b`) |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (Vitest): shuffle and question data |
| `npm run check` | Typecheck, lint and tests |
| `npm run deploy` | Checks, builds and uploads to the VPS |
| `npm run deploy:dry` | Same, but only previews the upload |

## Deployment

The site is static: `npm run build` writes `dist/`, which is synced to a VPS where
Caddy serves it directly (no restart needed).

1. One-time setup: copy `.env.example` to `.env.prod.local` (git-ignored) and fill in
   `DEPLOY_HOST`, `DEPLOY_PORT` and `DEPLOY_DIR`. You also need SSH key access to the server.
2. Deploy:
   ```bash
   npm run deploy:dry   # preview what would change
   npm run deploy       # checks, build, upload
   ```

## How it works

- Questions live in `src/data/turing.json`. Each one has a prompt, human answers, AI
  answers and a `clue`. The `type: "eliza"` question is always the last round.
- Each round picks one human and one AI answer and shuffles their order
  (`src/utils/shuffle.ts`).
- The game is a small reducer state machine: start → playing → revealed → … → finished.
- **UI.** shadcn/ui components live in `src/components/ui/` (vendored, added with `npx shadcn add`, not linted). The theme tokens in `src/index.css` give them the indigo look. The answer cards' flip is custom; `src/lib/styles.ts` holds the large classroom button style.
