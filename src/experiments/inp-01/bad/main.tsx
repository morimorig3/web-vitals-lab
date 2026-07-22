import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../../index.css";
import { BadPage } from "./BadPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BadPage />
  </StrictMode>,
);
