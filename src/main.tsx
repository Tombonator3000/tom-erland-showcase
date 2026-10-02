import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource-variable/noto-sans/wght.css";
import "@fontsource-variable/noto-sans-mono/wght.css";
import "./index.css";
import "./styles/manual.css";
import "./styles/rig.css";
import "./styles/layout.css";
import "./styles/sections.css";

createRoot(document.getElementById("root")!).render(<App />);
