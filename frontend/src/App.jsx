/**
 * Simple landing page for AI Knowledge Workspace.
 * Centers content vertically and horizontally using Tailwind CSS.
 */

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">AI Knowledge Workspace</h1>
        <p className="text-lg text-gray-600">
          A workspace for AI-powered knowledge management.
        </p>
        <button
          type="button"
          disabled
          className="mt-2 rounded bg-blue-500 px-4 py-2 text-white opacity-50 cursor-not-allowed"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default App;