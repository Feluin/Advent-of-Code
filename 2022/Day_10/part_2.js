"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").slice(0, -1).reverse(); // change this if necessary

const pStart = performance.now();

let cycle = 1
let register = 1
let currentinstruction = undefined
let outputsignalstrength = 0
let pxllist = []
do {

    if (currentinstruction !== undefined) {
        register += currentinstruction
        currentinstruction = undefined
    } else {
        let read = INPUT.pop();
        if (read === "noop") {
        } else {
            currentinstruction = Number(read.split(" ")[1])
        }
    }
    //print
    const position = cycle % 40;
//problem with starting counting at 1 first row is missin one
    const pxl = (Math.abs(position - register) <= 1) ? "#" : " ";
    pxllist.push(pxl)
    if (position === 39) {
        console.log(pxllist.join(""))
        pxllist = []
    }
    cycle++
} while (INPUT.length !== 0)
const result = outputsignalstrength;
console.log(cycle)
console.log(register)
const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
