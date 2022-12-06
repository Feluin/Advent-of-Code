"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");

const INPUT = Array.from(String(fs.readFileSync(path.join(__dirname, "input.txt")))); // change this if necessary

const pStart = performance.now();

for (let i = 0; i < INPUT.length; i++) {
    if (new Set(INPUT.slice(i, i +  14)).size ===  14) {
        console.log(i +  14)
        console.log(INPUT.slice(i, i + 14))
        break
    }
}

//
// YOUR CODE HERE
//
const result = "...";

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
