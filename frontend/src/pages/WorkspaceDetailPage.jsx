import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import WorkspaceDetail from "../components/workspace/WorkspaceDetail";
import Spinner from "../components/common/Spinner";
import ErrorBox from "../components/common/ErrorBox";
import EmptyState from "../components/common/EmptyState";

import { fetchWorkspace } from "../api/workspaceApi";
import { useAuth } from "../hooks/useAuth";


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
        console.error(error);
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