# Julius Preu Professional Juggling Website - Dynamic Version

Ein vollständiges Full-Stack React + TypeScript Projekt mit Content Management System.

## 🚀 Live Demo
https://service-spotlight-julius27jay.replit.app/

## 📋 Übersicht

Dies ist die **dynamische Version** der Julius Preu Website mit vollständigem Backend, Datenbank und CMS-System. Das Projekt umfasst sowohl die öffentliche Website als auch eine komplette Verwaltungsoberfläche für Inhalte.

## 🛠 Tech Stack

### Frontend
- **React 18** mit TypeScript
- **Vite** als Build-Tool
- **TailwindCSS** für Styling
- **shadcn/ui** für UI-Komponenten
- **TanStack Query** für Datenmanagement
- **Wouter** für Routing
- **React Hook Form** mit Zod-Validierung

### Backend  
- **Express.js** mit TypeScript
- **Drizzle ORM** für Datenbankzugriff
- **PostgreSQL** Datenbank
- **Express Sessions** für Authentifizierung
- **REST API** mit vollständiger Validierung

### Entwicklung
- **TypeScript** durchgängig
- **ESBuild** für Backend-Bundling
- **Vite HMR** für Entwicklung
- **Drizzle Kit** für Datenbankmigrationen

## 🗂 Projektstruktur

```
julius-preu-dynamic/
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # UI-Komponenten
│   │   ├── pages/       # Seiten-Komponenten
│   │   ├── hooks/       # Custom React Hooks
│   │   ├── lib/         # Utilities & Konfiguration
│   │   └── data/        # Statische Daten
│   ├── public/          # Statische Assets
│   └── index.html       # HTML Template
├── server/              # Express Backend
│   ├── index.ts         # Server Entry Point
│   ├── routes.ts        # API Routes
│   ├── storage.ts       # Datenbank Interface
│   └── db.ts           # Datenbank-Konfiguration
├── shared/              # Geteilte TypeScript Definitionen
│   └── schema.ts        # Drizzle Schema & Types
└── package.json         # Dependencies & Scripts
```

## 🚦 Erste Schritte

### Voraussetzungen
- **Node.js** 18+ 
- **PostgreSQL** Datenbank
- **npm** oder **yarn**

### Installation

1. **Repository klonen**
```bash
git clone https://github.com/Juliuspreu/julius-preu-dynamic.git
cd julius-preu-dynamic
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Umgebungsvariablen einrichten**
```bash
# Erstelle .env Datei
DATABASE_URL="postgresql://username:password@localhost:5432/julius_preu"
NODE_ENV="development"
```

4. **Datenbank migrieren**
```bash
npm run db:push
```

5. **Entwicklungsserver starten**
```bash
npm run dev
```

Die Anwendung läuft auf `http://localhost:5000`

## 📜 Scripts

```bash
npm run dev      # Entwicklungsserver starten (Frontend + Backend)
npm run build    # Produktions-Build erstellen
npm start        # Produktionsserver starten
npm run check    # TypeScript Type-Checking
npm run db:push  # Datenbank-Schema synchronisieren
```

## 🗄 Datenbank Schema

Das Projekt verwendet Drizzle ORM mit folgenden Haupttabellen:
- **users** - Benutzer & Authentifizierung
- **news** - News-Artikel für CMS
- **acts** - Show-Performances
- **media** - Galerie-Bilder und -Videos
- **achievements** - Erfolge und Auszeichnungen
- **features** - Service-Features
- **testimonials** - Kundenbewertungen

## 🔐 CMS-Zugang

Das Content Management System ist passwort-geschützt erreichbar unter:
- `/news-manager` - News verwalten
- `/acts-manager` - Shows verwalten  
- `/media-manager` - Galerie verwalten
- `/erfolge-manager` - Erfolge verwalten
- `/features-manager` - Features verwalten

**Standard-Passwort**: `jonglissimo2024`

## 🚀 Deployment

### Produktion
```bash
npm run build  # Frontend + Backend bundeln
npm start      # Produktionsserver starten
```

### Replit Deployment
Das Projekt ist für Replit optimiert und läuft automatisch mit:
- Automatisches Package Management
- PostgreSQL Integration
- Umgebungsvariablen-Management
- Hot Reload für Entwicklung

### Alternative Deployment-Optionen
- **Vercel** (Frontend + Serverless Functions)
- **Railway** (Full-Stack Hosting)
- **Render** (Web Services + PostgreSQL)
- **DigitalOcean App Platform**

## 🎨 Styling & Design

- **TailwindCSS** für Utility-First Styling
- **Custom CSS Variables** für Farbthemen
- **Responsive Design** für alle Bildschirmgrößen
- **Professional Design** mit Julius Preu Branding

## 🔧 Entwicklung

### VS Code Setup
Empfohlene Extensions:
- TypeScript Vue Plugin (Volar)
- Tailwind CSS IntelliSense
- Prettier
- ESLint
- Drizzle ORM

### Hot Reload
Beide Frontend und Backend unterstützen Hot Reload während der Entwicklung.

### API-Entwicklung
Alle API-Routen sind in `server/routes.ts` definiert mit vollständiger TypeScript-Typisierung.

## 📝 Content Management

### CMS Features
- ✅ **News-Management** - Artikel erstellen/bearbeiten/löschen
- ✅ **Show-Management** - Performances verwalten
- ✅ **Media-Galerie** - Bilder & Videos hochladen
- ✅ **Erfolge-Verwaltung** - Achievements hinzufügen
- ✅ **Feature-Management** - Service-Features bearbeiten
- ✅ **Export-Funktionen** - Statische Website generieren

### Content-Bearbeitung
Inhalte können sowohl über das CMS als auch direkt im Code bearbeitet werden:
- **CMS**: Web-Interface für einfache Bearbeitung
- **Code**: TypeScript-Dateien für erweiterte Anpassungen

## 🤝 Beitragen

1. Fork das Repository
2. Feature-Branch erstellen (`git checkout -b feature/amazing-feature`)
3. Änderungen committen (`git commit -m 'Add amazing feature'`)
4. Branch pushen (`git push origin feature/amazing-feature`)
5. Pull Request erstellen

## 📧 Kontakt

**Julius Preu** - Professioneller Jongleur & Weltmeister
- Website: [julius-preu.de](https://julius-preu.de)
- Email: info@julius-preu.de

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.