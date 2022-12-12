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
            .filter(a => a[0] >= 0 && a[0] < map.length && a[1] >= 0 && a[1] < map[0].length)
            .filter(b => map[b[0]][b[1]] - map[x][y] <= 1)
        ,
        predecessor: undefined,
        f: Infinity,
        dist: Infinity,
        mark:"."
    }
}));

const pStart = performance.now();
let start = nodes[start2D[0]][start2D[1]];
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
while (openlist.length != null) {
    current = openlist.getLowest();
    if (finish[0] === current.x && finish[1] === current.y) {
        mark(current)
        break
    }
    done.add(current)
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
            successor.f = tentative_g + heightmap.toFinish(successor)
            if (!openlist.includes(successor)) {
                openlist.push(successor)
            }
        }
    )
}

nodes[start2D[0]][start2D[1]].mark="S"
nodes[finish[0]][finish[1]].mark="F"
console.log(nodes.map(value => value.map(value1 => value1.mark).join(" ")).join("\n"))


const result =nodes[finish[0]][finish[1]].dist;

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);

