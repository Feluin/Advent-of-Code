"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .split("\n").map(value => value.split(" ")).slice(0, -1).map(value => {
        return {
            dir: value[0],
            dist: Number(value[1])
        }
    }); // change this if necessary

let currentposHead = {x: 0, y: 0}
let currentposTail = {x: 0, y: 0}
const tail=[]
for (let i = 0; i < 9; i++) {
    tail.add({x: 0, y: 0})
}
const hittedpos = new Set()
const pStart = performance.now();
INPUT.forEach(value => {
        for (let i = 0; i < value.dist; i++) {
            hittedpos.add(currentposTail.x + " " + currentposTail.y)
            switch (value.dir) {
                case "U":
                    currentposHead.x = currentposHead.x + 1
                    break
                case "D":
                    currentposHead.x = currentposHead.x - 1
                    break
                case "L":
                    currentposHead.y = currentposHead.y - 1
                    break
                case "R":
                    currentposHead.y = currentposHead.y + 1
                    break
            }
            //calc tail

            //console.log("Head:", currentposHead, "Tail", currentposTail)
            if (currentposHead.y - currentposTail.y > 1 ||
                currentposTail.y - currentposHead.y > 1 ||
                currentposHead.x - currentposTail.x > 1 ||
                currentposTail.x - currentposHead.x > 1) {
                const vector = {x: currentposHead.x - currentposTail.x, y: currentposHead.y - currentposTail.y}
                vector.x = vector.x !== 0 ? vector.x / Math.abs(vector.x) : 0;
                vector.y = vector.y !== 0 ? vector.y / Math.abs(vector.y) : 0;
                currentposTail.x += vector.x
                currentposTail.y += vector.y
            }
        }
    }
)

function calctail(previous, current){
    //console.log("Head:", previous, "Tail", current)
    if (previous.y - current.y > 1 ||
        current.y - previous.y > 1 ||
        previous.x - current.x > 1 ||
        current.x - previous.x > 1) {
        const vector = {x: previous.x - current.x, y: previous.y - current.y}
        vector.x = vector.x !== 0 ? vector.x / Math.abs(vector.x) : 0;
        vector.y = vector.y !== 0 ? vector.y / Math.abs(vector.y) : 0;
        current.x += vector.x
        current.y += vector.y
    }
}
hittedpos.add(currentposTail.x+" "+currentposTail.y)
console.log(hittedpos.size)
const result = "...";

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
