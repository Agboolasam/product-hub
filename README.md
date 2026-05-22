# Product Hub

Product Hub is a React + TypeScript dashboard for browsing, filtering, and creating products with DummyJSON.

## Setup

```bash
npm install
```

Create a local `.env` if needed:

```bash
VITE_API_BASE=https://dummyjson.com
```

## Run

```bash
npm run dev
```

## Scripts

```bash
npm run dev      # start the Vite dev server
npm run build    # type-check and build for production
npm run preview  # preview the production build
npm run lint     # run ESLint
npm run add:component -- <component>  # scaffold a shadcn component
```

## Design Decisions

- **React Query for data**: handles caching, loading, retries, and refetch-on-focus across the app.
- **API helpers + hooks**: keeps network logic out of pages and makes queries/mutations reusable.
- **Shared types**: product and form types live in one place to reduce drift between UI and API payloads.
- **Tailwind + shadcn-style UI**: fast layout work with consistent primitives for buttons, inputs, and skeletons.
- **Desktop/table split**: desktop uses table pagination; mobile uses cards and infinite scroll for better touch UX.

## Trade-offs

- **Client-side search under category**: when a category is selected, search filters the loaded results locally instead of making another API call.
- **Server sort vs local sort**: created-at ordering is sent to the API to keep pagination consistent.
- **Simple create form**: the add-product page validates with Yup and submits URLs for images instead of building a full upload flow.
- **DummyJSON constraints**: some fields are required by the app even if the API is flexible, so defaults are used where needed.

## Notes

