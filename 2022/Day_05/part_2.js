"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n\n"); // change this if necessary

const pStart = performance.now();
const bottom = INPUT[0].split("\n").slice(-1)[0];
const chestsInput = INPUT[0].split("\n").slice(0, -1);
const indexes = Array.from(INPUT[0].split("\n").slice(-1)[0]).filter((value) => value !== " ").map(value => ({
        stack: value,
        value: bottom.indexOf(value)
    })
)
let sta = {}

indexes.forEach(index1 => sta[index1.stack] = chestsInput.map(value => Array.from(value)[index1.value]).filter(value => value !== " ").reverse())
const moves = INPUT[1].split("\n").map(value => value.split(" ")).map(value => [value[1], value[3], value[5]])

console.log(sta)
moves.forEach(value => {
        const count = Number(value[0])
        let array = []
        for (let i = 0; i < count; i++) {
            array.push(sta[value[1]].pop())
        }
        while (array.length !== 0) {
            sta[value[2]].push(array.pop())
        }
    }
)
const result = Object.keys(sta).map(value => sta[value].pop()).join("");

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
