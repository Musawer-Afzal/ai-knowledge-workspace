export default function WorkspaceCard({name, docCount, onClick}){
    return (
        <button
        onClick={onClick} className="w-full rounded-lg border p-4 text-left hover:bg-gray-50 hover:shadow transition"
        >
            <h2 className="text-lg font semi-bold">{name}</h2>
            <p className="text-gray-500">
                {docCount} documents
            </p>
        </button>
    );
}