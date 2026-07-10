import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import WorkspaceDetail from "../components/WorkspaceDetail";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import EmptyState from "../components/EmptyState";

import { fetchWorkspace } from "../services/workspaceApi";
import { useAuth } from "../contexts/AuthContext";


export default function WorkspaceDetailPage() {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [status, setStatus] = useState("loading");
  const { token } = useAuth();

  useEffect(() => {
    let active = true;
    async function load() {
      setStatus("loading");
      try {
        const data = await fetchWorkspace(id, token);
        if (!active) {
          return;
        }
        setWorkspace(data);
        setStatus(data ? "done" : "missing");
      } catch (error) {
        setStatus("error");
      }
    }
    load();

    return () => {active = false};
  }, [id]);


  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
      return <ErrorBox 
          onRetry={() => setStatus("loading")}/>;
  }

  if (status === "missing") {
      return (
          <EmptyState
              message={`No workspace found with id "${id}".`}
          />
      );
  }
  return (
    <div className="space-y-6">
        <Link
            to="/workspaces"
            className="text-blue-600 hover:underline"
        >
            ← Back to Workspaces
        </Link>
        <WorkspaceDetail
            workspace={workspace}
        />
    </div>
  );
}