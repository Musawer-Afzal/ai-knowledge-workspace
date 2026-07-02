import { MOCK_WORKSPACES } from "../data/workspaces";

export const SCENARIO = "data"; // "data" || "empty" || "error" || "slow"

export function fetchWorkspaces(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(SCENARIO === "error"){
                return reject(new Error("boom"));
            }
            if(SCENARIO === "empty"){
                return resolve([]);
            }

            resolve(MOCK_WORKSPACES);
        }, SCENARIO === "slow" ? 2000 : 400);
    })
}