# Workspace

## Overview

Portale Agenzia delle Entrate - Replica del sito ufficiale italiano con dashboard amministrativa e gestione template professionali.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui

## Artifacts

### `artifacts/agenzia-entrate` — Main Website + Dashboard
- **Preview path**: `/`
- **Description**: Replica 90% fedele del sito Agenzia delle Entrate con:
  - Pagina Home con SID (Sistema Interscambio flussi Dati)
  - Dashboard amministrativa con documenti PDF/Excel
  - Gestione Template professionali con logo e firma
  - Navigazione istituzionale completa

### `artifacts/api-server` — Backend API
- **Preview path**: `/api`
- **Routes**:
  - `GET /api/documents` — Lista documenti
  - `POST /api/documents` — Crea documento
  - `GET /api/documents/:id` — Dettaglio documento
  - `DELETE /api/documents/:id` — Elimina documento
  - `GET /api/templates` — Lista template
  - `GET /api/stats` — Statistiche dashboard

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── agenzia-entrate/    # React+Vite frontend (main website + dashboard)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
│       └── schema/
│           ├── documents.ts  # Documents table
│           └── templates.ts  # Templates table
├── scripts/
│   └── src/seed.ts         # Database seeder
└── ...
```

## Pages

- `/` — Home page stile Agenzia delle Entrate (SID - Che cos'è)
- `/dashboard` — Dashboard amministrativa documenti
- `/templates` — Gestione template professionali
- `/documents/:id` — Dettaglio documento

## Key Design Decisions

- Colors: Blue #003399 (primary), #0066CC (accent), #FFCC00 (yellow), navy #1a237e (header)
- Institutional Italian government look
- Left sidebar navigation for SID section
- Full breadcrumb navigation
- Bilingual header (ITA/ENG/DEU)
