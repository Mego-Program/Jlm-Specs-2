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

export const mainRouters = createBrowserRouter([
  {
    path:'/',
    children:[
      {
        path:'',
        element:<SpecsList />
      },
      {
        path:'spec-input',
        element:<SpecInput />
      },
      {
        path:'single-spec/:id',
        element:<SingleSpec />
      }
    ]
  }
])

function SpecsApp() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={mainRouters}/>
        {/* <Routes>
          <Route path="/" element={<SpecsList />} />
          <Route path="spec-input" element={<SpecInput />} />
          <Route path="single-spec/:id" element={<SingleSpec />} />
        </Routes> */}
    </ThemeProvider>
  );
}
export default SpecsApp;
