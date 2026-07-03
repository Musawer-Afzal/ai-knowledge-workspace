import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkspacesPage from "./pages/WorkspacesPage";
import WorkspaceDetailPage from "./pages/WorkspaceDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./layouts/Layout";

export default function App() {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route
          index
          element={<HomePage />}
        />

        <Route
          path="workspaces"
          element={<WorkspacesPage />}
        />

        <Route
          path="workspaces/:id"
          element={<WorkspaceDetailPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Route>

    </Routes>
  );
}