//Core
import { Route } from "react-router";
//Types
import { RouteConfig } from "./types/app.type";
//Pages
import Home from "./pages/Home";
import AuthIndex from "./pages/AuthIndex";
import ProgramsIndex from "./pages/ProgramsIndex";
import ProgramDetailsIndex from "./components/Program/Details/ProgramDetailsIndex";

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
    path: "/programs/",
    element: <ProgramsIndex />,
  },
  {
    path: "/programs/:id",
    element: <ProgramDetailsIndex />,
  },
  // {
  //   path: "/trainer",
  //   element: <TrainerIndex />,
  //   children: [
  //     {
  //       path: "training",
  //       element: <TrainingIndex />,
  //     },
  //     {
  //       path: "trainees",
  //       element: <TraineesIndex />,
  //     },
  //     {
  //       path: "trainee/:id",
  //       element: <TrainerTraineeDetails />,
  //     },
  //     {
  //       path: "search",
  //       element: <TrainerSearchIndex />,
  //     },
  //   ],
  // },
];
