import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root.layout";
import Auth from "./pages/auth/auth";
import SubLayout from "./layouts/sub.layout";
import Profile from "./pages/profile/profile";
import Unauthorized from "./pages/unauthorized/unauthorized";
import ErrorPage from "./pages/error/error";
import Inspectors from "./pages/inspectors/inspectors";
import NeighborhoodDashboard from "./pages/neighborhood/neighborhood.dashboard";

import TimetablePage from "./pages/timetable/timetable";
import Citizens from "./pages/citizens/citizens";
import AddEditCitizenPage from "./pages/citizens/add-edit-citizen";
import CitizenPage from "./pages/citizens/citizen";
import ReportsPage from "./pages/reports/reports";
import WorkflowsPage from "./pages/workflows/workflows";
import Regions from "./pages/regions/regions";
import DistrictPage from "./pages/district/district.page";
import StatePage from "./pages/state/state.page";
import RegionPage from "./pages/region/region.page";
import CallsPage from "./pages/calls/calls";
import Settings from "./pages/settings/settings";
import ActionsInspector from "./pages/inspectors/actions-inspector";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <SubLayout roles={["state"]}>
            <StatePage />
          </SubLayout>
        ),
      },
      {
        path: "/regions/*",
        element: (
          <SubLayout roles={["state"]}>
            <Regions />
          </SubLayout>
        ),
      },
      {
        path: "/region/*",
        element: (
          <SubLayout roles={["region"]}>
            <RegionPage />
          </SubLayout>
        ),
      },
      {
        path: "/district/*",
        element: (
          <SubLayout roles={["district"]}>
            <DistrictPage />
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
        path: "/neighborhood/calls",
        element: (
          <SubLayout roles={["neighborhood"]}>
            <CallsPage />
          </SubLayout>
        ),
      },
      {
        path: "/neighborhood/reports",
        element: (
          <SubLayout roles={["neighborhood"]}>
            <ReportsPage />
          </SubLayout>
        ),
      },
      {
        path: "/neighborhood/workflows",
        element: (
          <SubLayout roles={["neighborhood"]}>
            <WorkflowsPage />
          </SubLayout>
        ),
      },
      {
        path: "/neighborhood/timetable",
        element: (
          <SubLayout roles={["state", "region", "district", "neighborhood"]}>
            <TimetablePage />
          </SubLayout>
        ),
      },
      {
        path: "/citizens",
        element: (
          <SubLayout roles={["state", "region", "district", "neighborhood"]}>
            <Citizens />
          </SubLayout>
        ),
      },
      {
        path: "/citizens/add",
        element: (
          <SubLayout roles={["state", "region", "district", "neighborhood"]}>
            <AddEditCitizenPage />
          </SubLayout>
        ),
      },
      {
        path: "/citizens/edit/:id",
        element: (
          <SubLayout roles={["state", "region", "district", "neighborhood"]}>
            <AddEditCitizenPage />
          </SubLayout>
        ),
      },
      {
        path: "/citizens/:id",
        element: (
          <SubLayout roles={["state", "region", "district", "neighborhood"]}>
            <CitizenPage />
          </SubLayout>
        ),
      },
      {
        path: "/inspectors",
        element: (
          <SubLayout roles={["state", "region", "district"]}>
            <Inspectors />
          </SubLayout>
        ),
      },
      {
        path: "/inspectors/actions/*",
        element: (
          <SubLayout roles={["state", "region", "district"]}>
            <ActionsInspector />
          </SubLayout>
        ),
      },
      {
        path: "/inspectors/actions/:id",
        element: (
          <SubLayout roles={["state", "region", "district"]}>
            <ActionsInspector />
          </SubLayout>
        ),
      },
      {
        path: "/settings",
        element: (
          <SubLayout roles={["state", "region", "district", "neighborhood"]}>
            <Settings />
          </SubLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <SubLayout roles={["state", "region", "district", "neighborhood"]}>
            <Profile />
          </SubLayout>
        ),
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
