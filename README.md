# UtechShowcase — Frontend-only

This workspace now contains only the frontend Vite + React app located in the `client/` folder.

Quick commands (macOS / zsh):

Install dependencies in the client and run dev server:

```bash
cd client
npm install
npm run dev
```

Build for production:

```bash
cd client
npm run build
npm run preview
```

Notes about removing backend files:

- I attempted to automatically delete backend files (`server/`, `drizzle.config.ts`, `shared/schema.ts`) and remove server deps from the root `package.json`.
- If some backend files still exist in the repository, you can remove them manually:

```bash
rm -rf server drizzle.config.ts shared
git add -A
git commit -m "Remove backend, keep frontend in client/"
```

If you'd like, I can:
- finish removing the leftover backend files and commit the changes
- move `vite.config.ts`, `postcss.config.js`, and `tailwind.config.ts` into `client/` (optional)
- produce a minimal `.gitignore` and a `client/.gitignore`

Tell me which of these you'd like me to do next.
