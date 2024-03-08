import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RoutesListPage } from "../pages/RoutesList";
import { DefaultLayout } from "../layouts/default";
import RouteCreatePage from "../pages/RouteCreate";
import RouteDetailsPage from "../pages/RouteDetails";
import RouteEditPage from "../pages/RouteEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/routes",
        element: <RoutesListPage />,
      },
      {
        path: "/routes/create",
        element: <RouteCreatePage />,
      },
      {
        path: "/routes/:routeId",
        element: <RouteDetailsPage />,
      },
      {
        path: "/routes/:routeId/edit",
        element: <RouteEditPage />,
      },
    ],
  },
]);

export const Navigation = () => <RouterProvider router={router} />;
