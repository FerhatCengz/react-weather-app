import { createRoot } from "react-dom/client";
import { AppRouterProvider } from "./routes/index.tsx";
import "./main.css";
createRoot(document.getElementById("root")!).render(<AppRouterProvider />);
