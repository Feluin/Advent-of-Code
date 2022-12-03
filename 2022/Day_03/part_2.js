"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n"); // change this if necessary

const pStart = performance.now();

const badges = INPUT.map(value => new Set(value));
let result = 0;

for (let i = 0; i < badges.length - 1; i += 3) {
    let badges2 = Array.from(badges[i + 2].values())
    let badges1 = Array.from(badges[i + 1].values());
    result += Number(Array.from(badges[i].values()).filter(value => badges1.includes(value) && badges2.includes(value)).map(value => value.charCodeAt(0)).map(val => {
        if (val > 96) {
            return val - 96;
        } else {
            return val - 64 + 26
        }
    }))
}

const pEnd = performance.now();
console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
