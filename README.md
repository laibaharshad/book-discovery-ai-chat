# Book Discovery

A Next.js application for discovering books using the Open Library API. Search for books, view details, and save favorites.

## Features

- Search books via the Open Library API
- View book details (covers, authors, description, subjects, publication info)
- Add/remove favorites, persisted via browser `localStorage`
- Dedicated Favorites page
- Responsive UI with loading, error, and empty states
- Health-check page for API connectivity

## Tech Stack

Next.js 16 · React 19 · JavaScript · App Router · Tailwind CSS · Open Library API · `localStorage`

## Routes

| Route | Purpose |
|---|---|
| `/` | Search and browse books |
| `/books/[id]` | View book details |
| `/favorites` | View/remove saved favorites |
| `/health` | Check API connectivity |

## Architecture

- **Server Components** — data fetching: `app/page.js`, `app/books/[id]/page.js`, `app/health/page.js`
- **Client Components** — interactivity: `SearchForm.jsx`, `BookCard.jsx`, `FavoriteButton.jsx`, `app/favorites/page.js`
- **Data layer** — `lib/books.js` handles search, normalization, detail fetching, author resolution, and cover URLs

## Project Structure

```text
app/
├── books/[id]/page.js
├── favorites/page.js
├── health/page.js
├── globals.css
├── layout.js
└── page.js

components/
├── BookCard.jsx
├── FavoriteButton.jsx
├── Navbar.jsx
└── SearchForm.jsx

lib/
└── books.js
```

postcss.config.js
tailwind.config.js
package.json

## Design System

**Colors:** `primary` #0F172A · `secondary` #334155 · `background` #F8FAFC · `accent` #06B6D4

**Typography:** Space Grotesk (headings), Source Sans 3 (body)

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
npm run build
npm start
```

## Verification

`npm run build` and `npm run lint` both pass with no errors. Manually tested: search, loading/error/empty states, book details, invalid IDs, favorites add/remove/persistence, navigation, and responsive layouts.

## API

Uses the public Open Library API (Search, Works, Authors, Covers) — no API key required.

## How AI Helped

AI assisted with planning the Vite → Next.js migration, App Router structure, architecture decisions, incremental feature implementation, API integration, responsive design, debugging, and code/build verification. All output was reviewed, tested, and validated before being accepted — AI was used as a coding partner, not a replacement for review.

## Manual Improvements and Corrections

- Reviewed and backed up the original Vite project before migrating
- Migrated to Next.js with the App Router
- Separated API/data logic into `lib/books.js`
- Applied Server/Client Component boundaries appropriately
- Added Tailwind design tokens, responsive layouts, and loading/error/empty states
- Verified real API responses, valid/invalid routes, and `localStorage` persistence
- Ran successful production builds and lint checks

## Project Status

Complete and ready for deployment.

