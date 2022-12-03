"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n"); // change this if necessary

const pStart = performance.now();

const result = INPUT.map(value => [value.slice(0, value.length / 2), value.slice(value.length / 2)]).map(value => {
    return new Set(Array.from(value[0]).filter(value1 => value[1].includes(value1)).join(""))
}).flatMap(value => Array.from(value.values())).map(value => value.charCodeAt(0)).map(val => {
    if (val > 96) {
        return val - 96;
    } else {
        return val - 64 + 26
    }
}).reduce((previousValue, currentValue) => previousValue + currentValue)


const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
