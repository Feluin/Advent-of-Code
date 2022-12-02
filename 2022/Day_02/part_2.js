"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n"); // change this if necessary

const pStart = performance.now();

const a = {
    "A X": 3 + 0, //Rock > Sissors      //lose
    "A Y": 1 + 3, //Rock = Rock        //draw
    "A Z": 2 + 6, //Rock < Paper           //win
    "B X": 1 + 0, //Paper > Rock            //lose
    "B Y": 2 + 3, //Paper = Paper       //draw
    "B Z": 3 + 6, //Paper < Sissors        //win
    "C X": 2 + 0, //Sissors > Paper      //lose
    "C Y": 3 + 3, //Sissors = Sissors      //draw
    "C Z": 1 + 6, //Sissors < Rock        //win
}
const result = INPUT.map(value => a[value])
    .filter(value => !!value)
    .reduce((previousValue, currentValue) => previousValue + currentValue)
const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
