# Webalize Task

Full-stack CMS-powered website built with Payload CMS, Next.js 15 and React 19. Supports Polish and English localization, content management via an admin panel, and a configurable contact form.

## Quick Start

1. Clone the repository
2. `cp .env.example .env` and fill in `DATABASE_URL` (MongoDB) and `PAYLOAD_SECRET`
3. `pnpm install && pnpm dev`
4. Open `http://localhost:3000` (frontend) or `http://localhost:3000/admin` (admin panel)
5. Follow on-screen instructions to create the first admin user

### Docker (Optional)

- Set `MONGODB_URL` in `.env` to `mongodb://127.0.0.1/<dbname>`
- Match it in `docker-compose.yml`
- Run `docker-compose up`

## Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15.4 |
| UI | React 19, Tailwind CSS 4, Radix UI |
| CMS | Payload 3.73 (headless, admin panel at `/admin`) |
| Database | MongoDB (`@payloadcms/db-mongodb`) |
| i18n | next-intl (Polish default, English) |
| Forms | react-hook-form + Zod validation |
| Data fetching | @tanstack/react-query, Axios |
| Testing | Vitest (unit), Playwright (E2E) |

### Project Structure

```
src/
├── app/
│   ├── (frontend)/[locale]/     # Public routes (locale-based)
│   │   ├── page.tsx             # Home
│   │   ├── not-found.tsx        # 404
│   │   ├── news/                # News list + detail ([slug])
│   │   ├── faq/                 # FAQ list
│   │   └── integrations/        # Integrations list
│   └── (payload)/               # Admin panel + API routes
├── collections/                 # Payload CMS collections
├── globals/                     # Payload globals (Navigation, Footer, ContactModal)
├── blocks/                      # Content blocks (Paragraph, Heading, Image, Code)
├── lib/
│   ├── api/                     # Data fetching utilities
│   └── actions/                 # Server actions (contact form)
├── i18n/                        # Internationalization config
└── payload.config.ts            # Payload CMS configuration
messages/
├── en.json                      # English translations
└── pl.json                      # Polish translations
```

## Collections

| Collection | Purpose |
|------------|---------|
| **Users** | Admin authentication |
| **Media** | File/image uploads with Sharp processing |
| **News** | Localized news posts with content blocks, categories (Engineering, Product, Company), and related posts |
| **Faq** | Localized FAQ entries grouped by category |
| **Integrations** | Third-party integrations with status (Available / Coming Soon), categories, and docs links |
| **ContactSubmissions** | Contact form submissions (email, JSON form data, locale) |

## Globals

| Global | Purpose |
|--------|---------|
| **Navigation** | Configurable menu items (label + URL) |
| **Footer** | Footer columns with links |
| **ContactModal** | Dynamic contact form config: field definitions (text, email, textarea, select), buttons, and success messages |

## Localization

- **Locales**: Polish (default), English
- **Routing**: Locale prefix `as-needed` (no `/pl` prefix for default locale)
- **Coverage**: CMS content (collections/globals) + UI translations (`messages/*.json`)

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run all tests (unit + E2E) |
| `pnpm test:int` | Run unit tests (Vitest) |
| `pnpm test:e2e` | Run E2E tests (Playwright) |
| `pnpm generate:types` | Generate Payload TypeScript types |
| `pnpm generate:importmap` | Generate Payload import map |

## Tools and Dependencies

| Category | Package | Purpose | Dev / Prod |
|----------|---------|---------|------------|
| **Payload / CMS** | `payload` | Headless CMS backend | Prod |
|  | `@payloadcms/db-mongodb` | MongoDB adapter for Payload | Prod |
|  | `@payloadcms/next` | Next.js integration for Payload | Prod |
|  | `@payloadcms/richtext-lexical` | Rich text editor for Payload | Prod |
|  | `@payloadcms/ui` | UI components for Payload | Prod |
| **Frontend / React** | `react` / `react-dom` | Core React libraries | Prod |
|  | `next` | Framework for SSR and static sites | Prod |
|  | `next-intl` | Internationalization support | Prod |
|  | `@tanstack/react-query` | Data fetching & caching | Prod |
|  | `@tanstack/react-query-devtools` | Devtools for React Query | Dev |
|  | `react-hook-form` | Forms management in React | Prod |
|  | `@hookform/resolvers` | Schema validation for forms | Prod |
|  | `clsx` | Conditional classNames utility | Prod |
|  | `@radix-ui/react-accordion` / `@radix-ui/react-dialog` | Accessible UI primitives | Prod |
| **Linting / Formatting / Dev Tools** | `eslint` / `eslint-config-next` | Linting and code quality | Dev |
|  | `prettier` | Code formatting | Dev |
|  | `lint-staged` | Linting and formatting on staged files | Dev |
|  | `typescript` | Type safety and modern JS features | Dev |
|  | `vitest` | Unit testing framework | Dev |
|  | `@testing-library/react` | React testing utilities | Dev |
| **Testing / E2E** | `playwright` / `@playwright/test` | End-to-end testing | Dev |
| **Build / Styling** | `tailwindcss` | Utility-first CSS framework | Prod |
|  | `postcss` / `autoprefixer` | CSS tooling | Dev |
|  | `vite-tsconfig-paths` / `@vitejs/plugin-react` | Vite tooling for fast dev builds | Dev |
| **Other Utilities** | `axios` | HTTP client | Prod |
|  | `dotenv` | Load environment variables | Dev |
|  | `graphql` | GraphQL support | Prod |
|  | `sharp` | Image processing | Prod |
|  | `zod` | Schema validation | Prod |

