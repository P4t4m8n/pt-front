import { BrowserRouter, Routes } from "react-router";
import { renderRoutes, ROUTES } from "./routes";

import Header from "./components/Header/Header";
import AppNav from "./components/AppNav/AppNav";

import "./index.css";
export default function App() {
  const routes = renderRoutes(ROUTES);
  return (
    <>
      <BrowserRouter>
        <main className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
          <Header />
          <section className="h-[calc(100svh-8rem)] overflow-auto">
            <Routes>{routes}</Routes>
          </section>
          <AppNav />
        </main>
      </BrowserRouter>
    </>
  );
}
