"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");


const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").map(value => Array.from(value)); // change this if necessary

const pStart = performance.now();


//
// YOUR CODE HERE
//
let matrix = INPUT


const countedTrees = []
getHighestTrees(matrix)

function getHighestTrees(matrix) {

    let highestTreesInRow = []
    //topdown
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            addto(highestTreesInRow, i, j,i)
        }
    }
    highestTreesInRow = []
    for (let i = 0; i < matrix.length; i++) {
        for (let j = matrix[i].length - 1; j >= 0; j--) {
            addto(highestTreesInRow, i, j, j)
        }
    }
    highestTreesInRow = []
    for (let i = matrix.length - 1; i >= 0; i--) {
        for (let j = 0; j < matrix[i].length; j++) {
            addto(highestTreesInRow, i, j, j)
        }
    }
    highestTreesInRow = []
    for (let i = matrix.length - 1; i >= 0; i--) {
        for (let j = matrix[i].length - 1; j >= 0; j--) {
            addto(highestTreesInRow, i, j,i)
        }
    }
}

function addto(highestTreesInRow, i, j, dir) {
    if (highestTreesInRow[dir] === undefined || highestTreesInRow[dir] < matrix[i][j]) {
        highestTreesInRow[dir] = matrix[i][j]
        countedTrees.push([i, j])
    }
}

let set = new Set();

countedTrees.forEach(value => set.add(value.toString()))

let sort = Array.from(new Set(countedTrees)).sort((a, b) => {
        if (a[0] - b[0] !== 0) {
            return a[0] - b[0]
        }
        return a[1] - b[1]
    }
);

const result = set.size

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
