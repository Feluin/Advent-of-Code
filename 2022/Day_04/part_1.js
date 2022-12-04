"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").slice(0, -1); // change this if necessary

const pStart = performance.now();


//
// YOUR CODE HERE
//
const result = INPUT.map(value => value.split(",")).map(value =>
    value.map(value1 => value1.split("-").map(value2 => Number(value2)))
).filter(value => (value[0][0] <= value[1][0] && value[0][1] >= value[1][1]) || (value[0][0] >= value[1][0] && value[0][1] <= value[1][1])).length;

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
