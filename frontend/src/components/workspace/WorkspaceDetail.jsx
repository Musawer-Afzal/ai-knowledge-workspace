export default function WorkspaceDetail({workspace}){
    return (
        <div className="space-y-4 rounded-lg border p-6">
            <h1 className="text-2xl font-bold">
                {workspace.name}
            </h1>
            <p>
                Documents: {workspace.docCount}
            </p>
            <p>
                Updated At: {workspace.updatedAt}
            </p>
        </div>
    );
}