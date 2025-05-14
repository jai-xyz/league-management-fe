import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppContext from "./provider/appContext.jsx";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./style/theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContext>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AppContext>
  </StrictMode>
);
