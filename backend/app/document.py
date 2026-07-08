from fastapi import UploadFile, APIRouter, File, Depends, HTTPException
from deps import owned_workspace

router = APIRouter()

ALLOWED_TYPES = {
    "application/pdf",
    "text/plain",
    "text/markdown",
}

MAX_SIZE = 10 * 1024 * 1024


@router.post("/workspaces/{workspaces_id}/document", status_code = 201)
async def upload_document(workspace_id: str, 
                          file: UploadFile = File(...), 
                          workspace = Depends(owned_workspace)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code = 400, detail = "Unsupported file type")
    
    if file.size > MAX_SIZE:
        raise HTTPException(status_code = 400, detail = "File too large")
    
    content = await file.read()
    if len(content) > MAX_SIZE:
        raise HTTPException(status_code = 413, detail = "File too large")
    
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(content),
        "workspace": workspace["id"],
    }