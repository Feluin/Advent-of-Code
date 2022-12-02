"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");
const {log} = require("util");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n"); // change this if necessary

const pStart = performance.now();

const a = {
    "A X": 1 + 3,//Rock = Rock
    "A Y": 2 + 6,//Rock < Paper
    "A Z": 3 + 0,//Rock > Sissors
    "B X": 1 + 0,//Paper > Rock
    "B Y": 2 + 3,//Paper = Paper
    "B Z": 3 + 6,//Paper < Sissors
    "C X": 1 + 6,//Sissors < Rock
    "C Y": 2 + 0,//Sissors > Paper
    "C Z": 3 + 3,//Sissors = Sissors

}

const result2 = INPUT.map(value => a[value])
    .filter(value => !!value).slice(0, 100).forEach(value => console.log(value))
const result = INPUT.map(value => a[value])
    .filter(value => !!value)
    .reduce((previousValue, currentValue) => previousValue + currentValue)
const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
