import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1d4ed8", // main color
      dark: "#1e3a8a", // darker shade for hover
    },
    secondary: {
      main: "#f3f4f6",
    },
    accent: {
      main: "#ef4444",
    },
    neutral: {
      main: "#374151",
    },
    border: {
      main: "#d1d5db",
    },
  },
});

export default theme;
