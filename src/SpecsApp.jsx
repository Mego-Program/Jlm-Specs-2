import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {ThemeProvider } from "@mui/material";
import SpecsList from "./pages/SpecsList";
import SpecInput from "./pages/SpecInput";
import SingleSpec from "./pages/SingleSpec";
import theme from "./Theme";

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
