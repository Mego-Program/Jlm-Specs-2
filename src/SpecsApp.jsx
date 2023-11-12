import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import SpecsList from "./pages/SpecsList";
import SpecInput from "./pages/SpecInput";
import SingleSpec from "./pages/SingleSpec";

const theme = createTheme({
  
  palette: {
    primary:{
      main:'#f6c927'
    },
    secondary:{
      main:'#121231'
    },
    info:{
      main:'#ffffff'
    },
    background: {
      y: "#F6C927",
      b1: "#21213E",
      b2: "#121231",
      b3: "#0A0A1B",
    },
    text: {
      primary: "#fff",
    }
  },
});

function SpecsApp() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<SpecsList />} />
            <Route path="/SpecsList" element={<SpecsList />} />
            <Route path="/SpecInput" element={<SpecInput />} />
            <Route path="/SingleSpec/:id" element={<SingleSpec />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}
export default SpecsApp;
