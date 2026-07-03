import { useEffect, useMemo, useState } from "react";

import WorkspaceCard from "./WorkspaceCard";
import Spinner from "./Spinner";
import ErrorBox from "./ErrorBox";
import EmptyState from "./EmptyState";
import NewWorkspaceForm from "./NewWorkspaceForm";

import { fetchWorkspaces } from "../services/workspaceApi";

export default function WorkspaceList() {

const [workspaces, setWorkSpaces] = useState([]);
const [status, setStatus] = useState("loading");
const [retryCount, setRetryCount] = useState(0);

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
            const data = await fetchWorkspaces();
            if(!cancelled){
                setWorkSpaces(data);
                setStatus("done");
            }
        }
        catch(error){
            if(!cancelled){
                setStatus("error");
            }
        }
    }
    load();
    return () => {cancelled = true};
}, [retryCount]);

async function createWorkspace(values) {
    // Temporary workspace shown immediately
    const tempWorkspace = {
        id: `temp-${Date.now()}`,
        docCount: 0,
        updatedAt: Date.now(),
        ...values,
    };

    // Optimistic update
    setWorkSpaces(prev => [...prev, tempWorkspace]);

    try {
        // Simulate server assigning a real ID
        const savedWorkspace = {
            ...tempWorkspace,
            id: crypto.randomUUID(),
        };

        // Replace temp workspace with saved workspace
        setWorkSpaces(prev =>
            prev.map(ws =>
                ws.id === tempWorkspace.id ? savedWorkspace : ws
            )
        );
    } catch {
        // Roll back if something failed
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

    if(workspaces.length === 0){
        return (
            <EmptyState 
            message = "No Workspace yet"/>
        );
    }

    return (
        <div className="space-y-6">
            <NewWorkspaceForm onCreate={createWorkspace} />
            <div className="space-y-4">
                {sortedWorkspaces.map(ws => (
                    <WorkspaceCard
                        key={ws.id}
                        workspace={ws}
                    />
                ))}
            </div>
        </div>
    );
}