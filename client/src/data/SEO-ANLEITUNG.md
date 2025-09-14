# SEO Meta-Tags bearbeiten - Einfache Anleitung

## Wo finde ich die SEO-Einstellungen?

**Datei:** `client/src/data/content.json`
**Bereich:** Ganz oben im `"seo"` Objekt

## Was kann ich bearbeiten?

### 1. **Grundeinstellungen (für alle Seiten)**
```json
"siteName": "Julius Preu - Jonglissimo",
"defaultTitle": "Julius Preu - Jonglissimo | Weltmeister der Jonglage",
"defaultDescription": "Deine Standard-Beschreibung...",
"defaultKeywords": "Jonglage, Weltmeister, Julius Preu, LED Show...",
"author": "Julius Preu"
```

### 2. **Einzelne Seiten anpassen**
```json
"pages": {
  "home": {
    "title": "Dein SEO-Titel für die Startseite",
    "description": "Deine SEO-Beschreibung für die Startseite",
    "keywords": "Deine Keywords für die Startseite"
  },
  "shows": {
    "title": "Dein SEO-Titel für die Shows-Seite",
    "description": "...",
    "keywords": "..."
  }
}
```

## Wichtige SEO-Tipps:

### **Titel (Title)**
- Maximal 60 Zeichen
- Wichtigste Keywords am Anfang
- Markenname am Ende
- Beispiel: "LED Jonglage Shows | Julius Preu Jonglissimo"

### **Beschreibung (Description)**
- 150-160 Zeichen
- Beschreibt den Seiteninhalt
- Call-to-Action einbauen
- Beispiel: "Spektakuläre LED-Shows von Weltmeister Julius Preu. Buchen Sie jetzt eine unvergessliche Performance für Ihr Event in Deutschland & Österreich."

### **Keywords**
- 5-10 relevante Begriffe
- Durch Kommas getrennt
- Beispiel: "LED Jonglage, Weltmeister, Event Show, Deutschland"

## Schnelle Bearbeitung:

1. Öffne `client/src/data/content.json`
2. Finde den `"seo"` Bereich (ganz oben)
3. Ändere die Texte in den Anführungszeichen
4. Speichere die Datei
5. Die Website aktualisiert sich automatisch

## Welche Seiten gibt es?

- `"home"` = Startseite
- `"shows"` = Shows-Seite  
- `"workshops"` = Workshop-Seite
- `"about"` = Über-mich-Seite
- `"contact"` = Kontakt-Seite

## Beispiel einer Änderung:

**Vorher:**
```json
"title": "Spektakuläre Shows | Julius Preu Jonglissimo"
```

**Nachher:**
```json
"title": "LED Jonglage Shows | Weltmeister Julius Preu"
```

## Was passiert automatisch?

- Google/Facebook/Twitter Vorschau-Bilder
- Suchmaschinen-Optimierung
- Social Media Sharing
- Mobile Darstellung

Die Website ist bereits vollständig SEO-optimiert - du musst nur noch die Texte anpassen!