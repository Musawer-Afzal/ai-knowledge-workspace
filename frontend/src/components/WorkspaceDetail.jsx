export default function WorkspaceDetail({workspace, onBack}){
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

            <button
            onClick={onBack}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Back
            </button>
        </div>
    );
}