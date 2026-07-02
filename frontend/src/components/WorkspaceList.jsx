import { useEffect, useMemo, useState } from "react";

import WorkspaceCard from "./WorkspaceCard";
import Spinner from "./Spinner";
import ErrorBox from "./ErrorBox";
import EmptyState from "./EmptyState";
import WorkspaceDetail from "./WorkspaceDetail";

import { fetchWorkspaces } from "../services/workspaceApi";

export default function WorkspaceList() {

const [workspaces, setWorkSpaces] = useState([]);
const [status, setStatus] = useState("loading");
const [retryCount, setRetryCount] = useState(0);
const [selectedId, setSelectedId] = useState(null)

const sortedWorkspaces = useMemo(() => {
    return [...workspaces].sort(
        (a, b) => b.updatedAt - a.updatedAt
    );
}, [workspaces]);

const selectedWorkspace = sortedWorkspaces.find(
    ws => ws.id === selectedId
)

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

    if(selectedWorkspace){
        return (
            <WorkspaceDetail 
            workspace={selectedWorkspace}
            onBack={() => setSelectedId(null)}/>
        )
    }

    return (
        <div className="space-y-4">
            {sortedWorkspaces.map(ws => (
                <WorkspaceCard
                key={ws.id}
                name={ws.name}
                docCount={ws.docCount}
                onClick={() => setSelectedId(ws.id)}
                />
            ))}
        </div>
    )
}