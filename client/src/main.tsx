import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./components/TextShadow.css";
import { ThemeProvider } from "./lib/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
