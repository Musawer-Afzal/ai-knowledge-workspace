import { Link } from "react-router-dom";

export default function WorkspaceCard({ workspace, onDelete }) {
    return (
        <Link
            to={`/workspaces/${workspace.id}`}
            className="block rounded-lg border p-4 hover:bg-gray-50 hover:shadow transition"
        >
            <h2 className="text-lg font-semibold">
                {workspace.name}
            </h2>

            <p className="text-gray-500">
                {workspace.docCount} documents
            </p>
            <button
                onClick={() => {
                    if (window.confirm("Delete this workspace?")) {
                        onDelete(workspace.id);
                    }
                }}
                className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
            >
                Delete
            </button>
        </Link>
    );
}