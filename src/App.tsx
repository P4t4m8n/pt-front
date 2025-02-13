import { BrowserRouter, Routes } from "react-router";
import { renderRoutes, ROUTES } from "./routes";

import Header from "./components/Header/Header";
import AppNav from "./components/AppNav/AppNav";

import "./index.css";
import Toast from "./components/UI/Toast";

export default function App() {
  const routes = renderRoutes(ROUTES);
  return (
    <>
      <Toast />
      <BrowserRouter>
        <main className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-solitreo  ">
          <Header />
          <section className="h-main overflow-auto p-4">
            <Routes>{routes}</Routes>
          </section>
          <AppNav />
        </main>
      </BrowserRouter>
    </>
  );
}
