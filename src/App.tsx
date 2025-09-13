import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root.layout";
import Auth from "./pages/auth/auth";
import SubLayout from "./layouts/sub.layout";
import Profile from "./pages/profile/profile";
import Unauthorized from "./pages/unauthorized/unauthorized";
import ErrorPage from "./pages/error/error";
import Inspectors from "./pages/inspectors/inspectors";
import NeighborhoodDashboard from "./pages/neighborhood/neighborhood.dashboard";
import Citizens from "./pages/citizens/citizens";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/region/*",
        element: (
          <SubLayout roles={["region"]}>
            <div>Region page</div>
          </SubLayout>
        ),
      },
      {
        path: "/neighborhood/*",
        element: (
          <SubLayout roles={["neighborhood"]}>
            <NeighborhoodDashboard />
          </SubLayout>
        ),
      },
      {
        path: "/citizens/*",
        element: (
          <SubLayout roles={["neighborhood"]}>
            <Citizens />
          </SubLayout>
        ),
      },
      {
        path: "/inspectors",
        element: <Inspectors />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
