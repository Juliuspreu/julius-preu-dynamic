# Julius Preu Professional Juggling Website

## Overview

This is a professional website for Julius Preu, a world champion juggler and performer, built as a modern full-stack web application with an integrated Content Management System (CMS). The application serves both as a public showcase website and a private content management platform for maintaining shows, media, achievements, and other dynamic content.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend, backend, and data layers:

- **Frontend**: React-based Single Page Application (SPA) with TypeScript
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Bundling**: Vite for development and production builds
- **Deployment**: Configured for Replit with auto-scaling deployment

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom Tailwind CSS styling
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form with Zod validation

### Main Pages
- **Home**: Hero section with world champion showcase
- **Shows**: Performance offerings and booking information
- **Workshops**: Educational workshops and team building
- **Videokurs**: Online video courses (Basic €19.99, Complete €49.99)
- **About**: Biography and achievements
- **Media**: Press kit and media resources
- **Contact**: Contact form and booking inquiries

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database Layer**: Drizzle ORM with PostgreSQL
- **Session Management**: PostgreSQL-based sessions
- **API Design**: RESTful endpoints with proper error handling
- **File Serving**: Static asset serving for images and media

### Database Schema
The application uses several main entities:
- **Users**: Authentication and authorization
- **Content Tables**: News posts, achievements, features, testimonials
- **Media Management**: Gallery items with categorization
- **Contact**: Form submissions and inquiries
- **CMS Data**: Dynamic content management

### Content Management System
The application includes several CMS interfaces:
- **News Manager** (`/news-manager`): Manage news posts and updates
- **Acts Manager** (`/acts-manager`): Manage show performances and acts
- **Media Manager** (`/media-manager`): Handle gallery images and videos
- **Erfolge Manager** (`/erfolge-manager`): Manage achievements and awards
- **Features Manager** (`/features-manager`): Manage service features
- **Export Manager** (`/export-manager`): Generate static HTML exports

All CMS areas are password-protected with the password: `jonglissimo2024`

## Data Flow

1. **Public Website**: Users access the main website pages (Home, Shows, Workshops, About, Media, Contact)
2. **CMS Access**: Authorized users can access management interfaces to update content
3. **API Integration**: Frontend communicates with backend via REST APIs
4. **Database Operations**: All persistent data is stored in PostgreSQL via Drizzle ORM
5. **Static Export**: Content can be exported as static HTML files for deployment flexibility

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/**: UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **zod**: Schema validation
- **react-hook-form**: Form management

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **@types/***: Type definitions
- **drizzle-kit**: Database migrations

### Replit-Specific Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development tooling

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev`
- **Port**: 5000
- **Hot Reload**: Enabled via Vite
- **Database**: PostgreSQL connection via environment variables

### Production Deployment
- **Build Process**: 
  1. Frontend build: `vite build`
  2. Server bundling: `esbuild` for Node.js optimization
- **Start Command**: `npm start`
- **Environment**: Production-optimized with minification

### Replit Configuration
- **Modules**: nodejs-20, web, postgresql-16
- **Auto-scaling**: Configured for production deployment
- **Port Mapping**: Local 5000 → External 80

### Static Export Option
The application includes an export system that can generate complete static HTML websites:
- Export Manager interface for content export
- Static HTML generation with embedded content
- Deployment-ready package creation
- Support for both dynamic CMS and static hosting

### Database Setup
- **Migration Command**: `npm run db:push`
- **Schema Location**: `shared/schema.ts`
- **Connection**: Environment variable `DATABASE_URL`

## Changelog

- June 17, 2025: Created final_deployment_v2 - 1:1 copy from working preview
- June 16, 2025: Initial setup

## Recent Changes

- **Icon-Pfade in statischer Website behoben (Juli 9, 2025)**: Alle SVG-Icons funktionieren jetzt korrekt:
  - 30 SVG-Icons von external URLs zu lokalen assets/ Pfaden konvertiert
  - Alle Seiten aktualisiert: Home, Shows, About, Kontakt, Media
  - Neue ZIP-Datei mit funktionsfähigen Icons erstellt (julius-preu-final-static-website.zip)
  - Statische Website ist jetzt komplett deployment-ready
- **Komplette statische Website erstellt (Juli 9, 2025)**: Vollständige 1:1 statische HTML/CSS/JavaScript Kopie der Julius Preu Website:
  - Alle 7 Seiten (Home, Shows, Workshops, Videokurs, About, Media, Kontakt) implementiert
  - Responsive Design mit über 1000 Zeilen CSS
  - Vollständige JavaScript-Funktionalität (Shows-Modal, Workshop-Tabs, Navigation)
  - Alle originalen Inhalte und Bilder 1:1 übernommen
  - Keine Replit-Abhängigkeiten - komplett eigenständig
  - ZIP-Download bereit für sofortiges Deployment
  - Alle alten und unnötigen Dateien entfernt
- **Lokale Version Komplett (Juli 4, 2025)**: Vollständig funktionsfähige lokale React-Version erstellt:
  - 1:1 visuelle Übereinstimmung mit Preview-Version
  - Alle Unterseiten funktional (Home, Shows, Workshops, Videokurs, About, Media, Kontakt)
  - Komplette Navigation und SEO-Funktionen
  - Eigenständige Version ohne Datenbank-Abhängigkeiten
  - Inhalt direkt in TypeScript-Dateien editierbar (src/data/content.ts)
  - Node.js-kompatible Version mit fehlenden Dependencies behoben
  - Bereinigte Media-Seite ohne störende Texte
- **Deployment Ready (Juli 4, 2025)**: Website ist vollständig deployment-ready gemacht:
  - Alle technischen Fehler behoben (doppelte IDs, React-Warnings)
  - Neue Show "30 Minuten Best of Gravitos - Showblock" erfolgreich integriert
  - Datenbank-Schema mit PostgreSQL synchronisiert
  - Build-Konfiguration für Replit Deployment optimiert
  - Alle CMS-Funktionen und statische Inhalte funktionsfähig
- **SEO-Optimierung Komplett (Januar 4, 2025)**: Umfassende SEO-Verbesserungen implementiert:
  - Sitemap.xml für alle Seiten erstellt
  - Robots.txt mit CMS-Bereich-Ausschluss
  - Favicon und Apple Touch Icons hinzugefügt
  - Erweiterte Meta-Tags (Theme-Color, Geo-Tags, Robots)
  - Verbesserte strukturierte Daten (JSON-LD Schema.org)
  - SEO-Konfiguration für alle Seiten (Videokurs, Media)
  - Content-Bearbeitungsanleitung erstellt (CONTENT-BEARBEITUNG.md)
  - Optimierte Alt-Tags und Bildoptimierung
- **CMS Manager Navigation (June 28, 2025)**: Implemented comprehensive navigation system for all CMS areas:
  - Added ManagerNavigation component with "Zurück zur Website" button
  - Navigation between all managers: News, Shows, Media, Erfolge, Features, Testimonials, Export
  - Applied to Media Manager, Acts Manager, and News Manager
  - Removes need for manual URL navigation between CMS areas
- **Required Fields Removed (June 28, 2025)**: Eliminated all mandatory form fields across CMS managers:
  - Media Manager: All fields optional with sensible defaults
  - Shows Manager: Titles, descriptions, categories optional with auto-generated values  
  - News Manager: All content fields optional with placeholder text
  - Backend APIs provide smart defaults for empty submissions
- **Upload Functionality Added (June 28, 2025)**: Enhanced file upload capabilities:
  - Media Manager: File upload + URL input options
  - Shows Manager: Image upload for show thumbnails
  - News Manager: Image upload for news articles
  - Mock upload system for demonstration (generates /uploads/ URLs)
- **Media Manager API Fixed (June 28, 2025)**: Completed missing backend routes:
  - Full CRUD operations: Create, Read, Update, Delete
  - Toggle active/inactive status
  - Proper error handling and validation
  - Gallery management for public/private media items
- **Videokurs Icons Updated (June 27, 2025)**: Replaced red circle icons with white checkmarks for better user experience:
  - All skill icons (Teller, Diabolos, Ringe, Keulen) now show white checkmarks in red circles  
  - Consistent design with pricing section checkmarks
  - Improved visual clarity and user-friendly interface
- **Biographie Icon Integration (June 27, 2025)**: Successfully added authentic Biographie.svg icon to Media page:
  - Replaced generic SVG with authentic export/Biographie.svg
  - White coloring consistent with other press kit icons
  - Professional document symbol for biography section
- **Simplified Mobile Header Structure (June 27, 2025)**: Complete redesign of header implementation with clean, simple structure:
  - Removed complex absolute positioning and marginTop calculations
  - Headers now use standard `h-[50vh]` with `relative` positioning
  - Images fill entire area with `object-cover` and `absolute inset-0`
  - Added subtle dark overlay (`bg-black bg-opacity-30`) for better text readability
  - Content flows naturally after header without positioning issues
- **Icon System Completed (June 27, 2025)**: Successfully integrated authentic SVG icons across all pages:
  - Contact page: Replaced Boxicons with authentic Standort.svg, E-Mail.svg, Telefon.svg
  - About page: Added Biographie.svg icon to biography section with proper styling
  - All icons use consistent red primary color styling and centered positioning
- **Auto-Scroll Implementation (June 27, 2025)**: Added automatic scroll-to-top behavior when navigating between pages - eliminates scroll position memory for better user experience
- **Authentic SVG Icon Integration (June 27, 2025)**: Successfully integrated all new SVG icons based on their descriptive names across all pages:
  - Shows: Weltmeister-Qualität, Individuelle Anpassung, Innovation & Technik
  - Workshops: Already complete with Teambuilding, Koordination, etc.
  - About: Jahre Erfahrung, Länder bereist, Shows & Workshops  
  - Media: Pressefotos, Video-Material
- **Header Optimization (June 26, 2025)**: All page headers now use natural image heights on desktop (md:h-auto) while maintaining responsive mobile design
- **Icon System Corrected**: Fixed Shows and Workshops pages to use authentic SVG icons from export folder with white coloring (filter brightness-0 invert)
- **Videokurs Page Simplified**: Removed description text and repositioned title to bottom of header image for cleaner design
- **Workshop Testimonials**: Integrated real API testimonials replacing placeholder content
- **Videokurs Page Added**: New online video course page with two pricing tiers (Basic €19.99, Complete €49.99)
- **Header Images Updated**: All subpages now use new professional header images
- **CMS System**: All manager interfaces functional with password authentication
- **Database Integration**: PostgreSQL setup with Drizzle ORM

## User Preferences

Preferred communication style: Simple, everyday language.
Content management preference: Hybrid approach - wants ability to edit content both through CMS interface and directly via code/VS Code editing of components and HTML files.