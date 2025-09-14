import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files first - BEFORE Vite middleware
app.use('/attached_assets', express.static('attached_assets'));
app.use('/export_new', express.static('export_new'));

// Serve public directory for static assets
app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day cache
    }
  }
}));

// Serve root-level images for deployment compatibility  
app.use(express.static('.', {
  setHeaders: (res, path) => {
    if (path.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day cache
    }
  }
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  
  // Use 127.0.0.1 for Windows compatibility, 0.0.0.0 for production/Replit
  const isReplit = !!process.env.REPL_ID;
  const isProd = process.env.NODE_ENV === 'production' || isReplit;
  const host = isProd ? '0.0.0.0' : '127.0.0.1';
  
  // Simple listen call for Windows compatibility (no reusePort, no object options)
  server.listen(port, host, () => {
    log(`serving on http://${host}:${port}`);
  });
})();
