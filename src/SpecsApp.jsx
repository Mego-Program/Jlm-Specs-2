import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createMuiTheme , ThemeProvider } from "@mui/material";
import SpecsList from "./pages/SpecsList";
import SpecsKpi from "./pages/SpecKpi";
import SpecInfo from "./pages/SpecInfo";

const theme = createMuiTheme({
    palette: {
    //   primary:{
    //       main:'#fefefe'
    //   }
      y: "#F6C927",
      b1: "#21213E",
      b2: "#121231",
      b3: "#0A0A1B",
    },
  });


function SpecsApp() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SpecsList />} />
          <Route path="/specKpi" element={<SpecsKpi />} />
          <Route path="/specInfo" element={<SpecInfo />} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}
export default SpecsApp;
