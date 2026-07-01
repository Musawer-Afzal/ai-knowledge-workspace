import assert from "node:assert"

import {
    formatWorkSpace,
    totalWords,
    rankByLength
} from "./workspaces.js";

const doc = [
    {id: 1, title: "Spec", words: 800},
    {id: 2, title: "Notes", words: 0},
    {id: 3, title: "Plan", words: 1200},
];

assert.equal(totalWords(doc), 2000);
assert.equal(rankByLength(doc)[0].title, "Plan");
assert.equal(rankByLength(doc).length, 2);
assert.equal(
    formatWorkSpace({
        name: "Research",
        docCount: 3,
    }),
    "Research - 3 docs (active)"
);

console.log("All checks Passed");