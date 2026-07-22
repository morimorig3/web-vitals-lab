import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../../index.css";
import { GoodPage } from "./GoodPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoodPage />
  </StrictMode>,
);
