import { Route } from "react-router";
import Home from "./pages/Home";
import { RouteConfig } from "./types/app.type";
import AuthIndex from "./pages/AuthIndex";
import TrainerIndex from "./pages/TrainerIndex";
import TraineesIndex from "./components/Trainer/Trainnes/TraineesIndex";
import TrainerSearchIndex from "./components/Trainer/Search/TrainerSearchIndex";

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
  {
    path: "/trainer",
    element: <TrainerIndex />,
    children: [
      {
        path: "trainees",
        element: <TraineesIndex />,
      },
      {
        path: "search",
        element: <TrainerSearchIndex />,
      },
    ],
  },
];
