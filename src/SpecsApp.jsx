// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import SpecsList from "./pages/SpecsList";
import SpecInput from "./pages/SpecInput";
import SingleSpec from "./pages/SingleSpec";
import theme from "./Theme";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

export const specsRoutes = createBrowserRouter([
  {
    path:'/specs',
    children:[
      {
        path:'',
        element:<SpecsList />
      },
      {
        path:'new',
        element:<SpecInput />
      },
      {
        path:'single/:id',
        element:<SingleSpec />
      }
    ]
  }
])

function SpecsApp() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={specsRoutes}/>
        {/* <Routes>
          <Route path="/" element={<SpecsList />} />
          <Route path="spec-input" element={<SpecInput />} />
          <Route path="single-spec/:id" element={<SingleSpec />} />
        </Routes> */}
    </ThemeProvider>
  );
}
export default SpecsApp;
