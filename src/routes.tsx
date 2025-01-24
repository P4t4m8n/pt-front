import { Route } from "react-router";
import Home from "./pages/Home";
import { RouteConfig } from "./types/app.type";
import AuthIndex from "./pages/AuthIndex";

export const renderRoutes = (routes: RouteConfig[]) => {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};

export const ROUTES: RouteConfig[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <AuthIndex />,
  },
];
