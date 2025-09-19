// server/index.ts (Quelle für dist/index.js)
import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// __dirname für ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hilfs-Pfade für Production-Build
const distDir = __dirname;                 // .../dist
const publicDir = path.join(distDir, "public"); // .../dist/public
const rootDir = path.resolve(distDir, "..");    // Projektwurzel (optional, falls gebraucht)

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Statische Ordner (mit absoluten Pfaden)
app.use("/attached_assets", express.static(path.join(rootDir, "attached_assets")));
app.use("/export_new", express.static(path.join(rootDir, "export_new")));

// Public Assets aus dem Build (wichtig: absoluter Pfad)
app.use(
  express.static(publicDir, {
    setHeaders: (res, filePath) => {
      if (/\.(jpg|jpeg|png|gif|svg)$/i.test(filePath)) {
        res.setHeader("Cache-Control", "public, max-age=86400");
      }
    },
  })
);

// (Optional) Root-Level-Images aus Projektwurzel
app.use(
  express.static(rootDir, {
    setHeaders: (res, filePath) => {
      if (/\.(jpg|jpeg|png|gif|svg)$/i.test(filePath)) {
        res.setHeader("Cache-Control", "public, max-age=86400");
      }
    },
  })
);

// API-Logging
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json.bind(res);
  (res as any).json = (bodyJson: any, ...args: any[]) => {
    capturedJsonResponse = bodyJson;
    return originalResJson(bodyJson, ...args);
  };

  res.on("finish", () => {
    if (reqPath.startsWith("/api")) {
      const duration = Date.now() - start;
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

(async () => {
  // Registriere API-Routen zuerst
  const server = await registerRoutes(app);

  // DEV vs PROD Umschaltung:
  // - DEV: Vite-Middleware (Hot Reload, /src/*)
  // - PROD: NUR gebaute Dateien aus dist/public serven (KEINE Vite-Middleware)
  const isReplit = !!process.env.REPL_ID;
  const isProd = process.env.NODE_ENV === "production" || isReplit;

  if (!isProd) {
    await setupVite(app, server); // deine bestehende Dev-Integration
  } else {
    // Dein vorhandener Helper – sorgt dafür, dass nur statisch aus dist/public bedient wird
    serveStatic(app);
  }

  // SPA-Fallback: jede nicht-API-Route auf index.html (muss NACH Static & Routen, VOR Error-Handler)
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(publicDir, "index.html"));
  });

  // Error-Handler zuletzt
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    // Optional: log/throw je nach Bedarf
    // throw err;
  });

  // Port/Host
  const port = 5000;
  const host = isProd ? "0.0.0.0" : "127.0.0.1";

  server.listen(port, host, () => {
    log(`serving on http://${host}:${port}`);
  });
})();
