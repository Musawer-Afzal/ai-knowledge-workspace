export default function ErrorBox({onRetry}){
    return (
        <div className="space-y-4 py-10 text-center">
            <p className="text-red-600">
                Failed to load Workspace
            </p>

            <button
            onClick={onRetry}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                Retry
            </button>
        </div>
    );
}