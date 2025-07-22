import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import Main from "./pages/main/main";
import Auth from "./pages/auth/auth";

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
