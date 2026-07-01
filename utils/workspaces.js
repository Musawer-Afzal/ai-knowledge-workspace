export function formatWorkSpace(ws){
    const {name, docCount = 0, archived = false} = ws;
    const status = archived ? "archived" : "active";
    return `${name ?? "Untitled"} - ${docCount} docs (${status})`;
}

export function totalWords(docs){
    return docs.reduce((sum, d) => sum + (d.words ?? 0), 0);
}

// Return documents sorted by length(descending) excluding documents with 0 words
export function rankByLength(docs){
    return [...docs]
    .filter(d => (d.words ?? 0) > 0)
    .sort((a, b) => b.words - a.words)
    .map(d => ({
        id: d.id,
        title: d.title
    }));
}

export async function loadWorkSpace(userId){
    try{
        const res = await fetch(`/api/workspaces?user=${userId}`);

        if(!res.ok){
            throw new Error(`Request Failed: ${res.status}`);
        }
        return await res.json();
    }
    catch(err){
        console.error("Failed to load workspace", err);
        return [];
    }
}

// Group documents by their workspaceId without mutating the input array.
// Returns an object where each key is a workspaceId and the value is an array of documents.
export function groupByWorkspace(docs) {
    return docs.reduce((acc, doc) => {
        const wsId = doc.workspaceId;
        if (!wsId) return acc; // skip if no workspaceId
        // Ensure we don't mutate existing arrays
        const existing = acc[wsId] ? [...acc[wsId]] : [];
        existing.push(doc);
        return { ...acc, [wsId]: existing };
    }, {});
}