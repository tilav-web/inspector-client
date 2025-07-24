import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import Main from "./pages/main/main";
import Auth from "./pages/auth/auth";
import Regions from "./pages/super/regions/regions";
import Error from "./pages/error";
import RegionsInspectorsCount from "./pages/regions/regions-inspectors-count";
import DistrictInspectors from "./pages/districts/district-inspectors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/regions/inspectors/count",
        element: <RegionsInspectorsCount />,
      },
      {
        path: "/super/regions",
        element: <Regions />,
      },
      {
        path: "/district/inspectors",
        element: <DistrictInspectors />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Auth />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
