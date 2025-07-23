import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import Main from "./pages/main/main";
import Auth from "./pages/auth/auth";
import Regions from "./pages/regions/regions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>Error loading page</div>,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/super/regions",
        element: <Regions />,
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
