import { Routes, Route } from "react-router-dom";
import WorkspacesPage from "./pages/WorkspacesPage";
import WorkspaceDetailPage from "./pages/WorkspaceDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomeRedirect from "./components/workspace/HomeRedirect";

export default function App() {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route
          path = "/login"
          element={<LoginPage />}
        />        
        
        <Route
          path="/register"
          element={<RegisterPage />}
      />

        <Route
          path = "/"
          element={<HomeRedirect />}
        />

        <Route
          path="/workspaces"
          element={
              <ProtectedRoute>
                  <WorkspacesPage />
              </ProtectedRoute>
          }
      />

      <Route
          path="/workspaces/:id"
          element={
              <ProtectedRoute>
                  <WorkspaceDetailPage />
              </ProtectedRoute>
          }
      />

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Route>

    </Routes>
  );
}