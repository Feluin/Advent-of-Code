"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");

const heightmap = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").map(value => Array.from(value)); // change this if necessary

heightmap.find2D = (char) => {
    const x = heightmap.findIndex((elem) => elem.includes(char))
    return [x, heightmap[x].indexOf(char)]
}
const start2D = heightmap.find2D("S")
const finish = heightmap.find2D("E")
heightmap[start2D[0]][start2D[1]] = "a"
heightmap[finish[0]][finish[1]] = "z"
heightmap.toFinish = (char) => Math.sqrt(Math.pow(char.y - finish[1],2) + Math.pow(char.x - finish[0],2))
let map = heightmap.map(value => value.map(value1 => value1.charCodeAt(0) - 96));
let nodes = map.map((row, x) => row.map((height, y) => {
    return {
        x: x,
        y: y,
        height: height,
        successors: [[-1, 0], [1, 0], [0, -1], [0, 1]].map(a => [x + a[0], y + a[1]])
            .filter(x => x[0] >= 0 && x[0] < map.length && x[1] >= 0 && x[1] < map[0].length)
            .filter(a => map[a[0]][a[1]] - map[x][y] >= -1)

        ,
        predecessor: undefined,
        f: Infinity,
        dist: Infinity,
        mark:"."
    }
}));

const pStart = performance.now();
let start = nodes[finish[0]][finish[1]];
start.dist = 0;
const openlist = [start]
openlist.getLowest = () => {
    return openlist.sort((a, b) => b.f - a.f).pop()
}
const mark = (nod) => {
    nod.mark="X"
    if(nod.predecessor!==undefined){
        mark(nod.predecessor)
    }
}

const done = new Set()
let current
while (openlist.length !== 0) {
    current = openlist.getLowest();
    done.add(current)
    current.mark="X"
    current.successors.forEach(coords => {
            let successor = nodes[coords[0]][coords[1]];
            if (done.has(successor))
                return
            let tentative_g = current.dist + 1
            if (openlist.includes(successor) && successor.dist <= tentative_g) {
                return
            }
            successor.predecessor = current
            successor.dist = tentative_g
            successor.f = tentative_g
            if (!openlist.includes(successor)) {
                openlist.push(successor)
            }
        }
    )
}

nodes[start2D[0]][start2D[1]].mark="S"
nodes[finish[0]][finish[1]].mark="F"

let allnodes = nodes.reduce((previousValue, currentValue) => previousValue.concat(currentValue), []);

let allstarts = allnodes.filter(value => value.height === 1)

let first = allstarts.sort((a, b) => a.dist-b.dist)[0];

console.log(nodes.map(value => value.map(value1 => value1.mark).join("")).join("\n"))
const result = first.dist;

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
