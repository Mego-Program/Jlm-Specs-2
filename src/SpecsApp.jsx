import { ThemeProvider } from "@mui/material";
import SpecsList from "./pages/SpecsList";
import SpecInput from "./pages/SpecInput";
import SingleSpec from "./pages/SingleSpec";
import theme from "./Theme";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

function ThemeWrapper() {
  return (
    <ThemeProvider theme={theme}>
      <Outlet/>
    </ThemeProvider>
  );
}

const specsRoutes = (
  <Route element={<ThemeWrapper />}>
    <Route index element={<SpecsList />} />
    <Route path="new-spec" element={<SpecInput />} />
    <Route path="single/:id" element={<SingleSpec />} />
  </Route>
);

export function SpecsApp() {
  return (
    <Router>
      <Routes>
        <Route path="/">{specsRoutes}</Route>
      </Routes>
    </Router>
  );
}
export default specsRoutes;
