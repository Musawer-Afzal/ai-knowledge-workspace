import { useEffect, useMemo, useState } from "react";

import WorkspaceCard from "./WorkspaceCard";
import Spinner from "../common/Spinner";
import ErrorBox from "../common/ErrorBox";
import EmptyState from "../common/EmptyState";
import NewWorkspaceForm from "./NewWorkspaceForm";
import { useAuth } from "../../contexts/AuthContext";

import { 
    fetchWorkspaces,
    createWorkspace
 } from "../../api/workspaceApi";

export default function WorkspaceList() {

const [workspaces, setWorkSpaces] = useState([]);
const [status, setStatus] = useState("loading");
const [retryCount, setRetryCount] = useState(0);
const { token } = useAuth();

const sortedWorkspaces = useMemo(() => {
    return [...workspaces].sort(
        (a, b) => b.updatedAt - a.updatedAt
    );
}, [workspaces]);

useEffect(() => {
    let cancelled = false;
    async function load(){
        setStatus("loading");
        try{
            const data = await fetchWorkspaces(token);
            if(!cancelled){
                setWorkSpaces(data);
                setStatus("done");
            }
        }
        catch(error){
            if(!cancelled){
                console.error(error);
                setStatus("error");
            }
        }
    }
    load();
    return () => {cancelled = true};
}, [retryCount]);

async function handleCreateWorkspace(values) {

    const tempWorkspace = {
        id: `temp-${Date.now()}`,
        ...values,
        owner_id: "me",
        created_at: new Date().toISOString(),
    };

    setWorkSpaces(prev => [...prev, tempWorkspace]);

    try {

        const saved = await createWorkspace(values, token);

        setWorkSpaces(prev =>
            prev.map(ws =>
                ws.id === tempWorkspace.id
                    ? saved
                    : ws
            )
        );

    } catch {

        setWorkSpaces(prev =>
            prev.filter(ws => ws.id !== tempWorkspace.id)
        );
    }
}

if(status === "loading"){
        return <Spinner />;
    }

if(status === "error"){
    return(
        <ErrorBox
        onRetry={() => setRetryCount(prev => prev + 1)} 
        />
    );
}

    return (
    <div className="space-y-6">

        <NewWorkspaceForm onCreate={handleCreateWorkspace} />

        {workspaces.length === 0 ? (
                <EmptyState message="No Workspace yet" />
            ) : (
                <div className="space-y-4">
                    {sortedWorkspaces.map(ws => (
                        <WorkspaceCard
                            key={ws.id}
                            workspace={ws}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}