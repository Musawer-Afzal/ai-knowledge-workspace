import WorkspaceList from "../components/workspace/WorkspaceList";

export default function WorkspacesPage() {
    return (
        <>
            <h1 className="text-3xl font-bold mb-6">
                Workspaces
            </h1>

            <WorkspaceList />
        </>
    );
}