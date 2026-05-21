# Product Hub

Minimal Vite + React + TypeScript starter used for the Product Hub UI.

**Tech stack**
- React 19
- Vite
- TypeScript 6 (project configured for TS6 compatibility)
- Tailwind CSS (v4) with `@tailwind` layers
- shadcn UI (expects `@` alias for `src`)
- react-query and lucide-react

**Quick start**

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

**Scripts**

Run these from the project root.

```bash
# start Vite dev server (development)
npm run dev

# compile TypeScript and build for production
npm run build

# preview the production build locally
npm run preview

# scaffold a shadcn component via the helper script
npm run add:component -- <component>
```

Examples

- Add a `button` component using the script (shadcn will prompt for options):

```bash
npm run add:component -- button
```

- Specify an explicit path for generated components:

```bash
npm run add:component -- button --path src/components
```

Notes

- The `add:component` script calls `npx shadcn@latest add` and will prompt for any required choices; follow the CLI instructions and install any peer deps it recommends.
- You can also run the shadcn command directly if you prefer:

```bash
npx shadcn@latest add button --path src/components
```
