"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");


const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").slice(0,-1).map(value => Array.from(value).map(value1 => Number(value1))); // change this if necessary

const pStart = performance.now();


//
// YOUR CODE HERE
//
let matrix = INPUT


const countedTrees = []
let highestscore=0
for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
        let height = Number(matrix[i][j]);
        let score = getcount(matrix.map(value => value[j]).slice(i+1), height) *
            getcount(matrix.map(value => value[j]).slice(0, i).reverse(), height) *
            getcount(matrix[i].slice(0, j).reverse(), height) *
            getcount(matrix[i].slice(j+1), height)
       if (highestscore < score) {
           highestscore = score
       }
    }
}

console.log(highestscore)
function getcount(array, height) {
    let indes = array.findIndex(value => value>=height);
    return indes === -1 ? array.length : indes+1;
}

const pEnd = performance.now();
const result = 0
console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
