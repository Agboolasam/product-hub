# Product Hub

Product Hub is a React + TypeScript dashboard for browsing, filtering, and creating products with DummyJSON.

## Setup



```bash
npm install
```

## Platform Requirements

- Node.js 18 or newer
- npm 9 or newer
- A modern browser for local development and testing
- Internet access for DummyJSON API requests


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
- **API helpers + hooks**: keeps network logic out of pages and makes queries reusable.
- **Shared types**: product and form types live in one place to reduce drift between UI and API payloads.
- **Tailwind + shadcn-style UI**: fast layout work with consistent primitives for buttons, inputs, and skeletons.
- **Desktop/table split**: desktop uses table pagination; mobile uses cards and infinite scroll for better touch UX.
- **Local auth token**: login persists a token so the route guard can survive refreshes.


## Trade-offs

- **Client-side search under category**: when a category is selected, search filters the loaded results locally instead of making another API call.
- **Server sort vs local sort**: created-at ordering is sent to the API to keep pagination consistent.
- **Simple create form**: the add-product page validates with Yup and submits URLs for images instead of building a full upload flow.
- **DummyJSON constraints**: some fields are required by the app even if the API is flexible, so defaults are used where needed.

## Next Steps

If there is time, the next useful additions would be:

- **Tests**: add component and hook tests for login, protected routing, product listing, and product creation.
- **Dark and light mode**: add a theme toggle and persist the selected theme.
- **Update product flow**: add edit/update screens and wire them to the API.
- **App logo**: add a logo for the app.
- **SEO with React Helmet**: add per-page titles, meta descriptions, and social tags.
- **Token handling**: attach the stored token to protected API requests when a real backend is introduced.


