# Julius Preu Dynamic Website

🚀 **Full-Stack React + TypeScript + Express + PostgreSQL**

## Quick Start

```bash
# 1. Repository klonen
git clone https://github.com/Juliuspreu/julius-preu-dynamic.git
cd julius-preu-dynamic

# 2. Dependencies installieren  
npm install

# 3. Umgebungsvariablen (.env Datei erstellen)
DATABASE_URL="postgresql://user:pass@localhost:5432/julius_preu"
NODE_ENV="development"

# 4. Datenbank Setup
npm run db:push

# 5. Server starten
npm run dev
# → öffnet http://localhost:5000
```

## Tech Stack
- **Frontend**: React 18, Vite, TailwindCSS, shadcn/ui
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL, Drizzle ORM  
- **CMS**: Content Management System eingebaut

## Scripts
- `npm run dev` - Entwicklung (Frontend + Backend)
- `npm run build` - Produktions-Build
- `npm start` - Produktionsserver

## CMS Zugang
- URLs: `/news-manager`, `/acts-manager`, `/media-manager`
- Passwort: `jonglissimo2024`

## Live Demo
https://service-spotlight-julius27jay.replit.app/