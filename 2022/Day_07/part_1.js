"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");


const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").slice(1, -1); // change this if necessary

class TreeNode {
    constructor(type, name, parent) {
        this.parent = parent;
        this.type = type;
        this.name = name;
        this.children = {};
        if (parent != null)
            parent.children[name] = this
    }

    getValue() {
        if (!this.isDir()) {
            return Number(this.type)
        } else {
            return Object.values(this.children).map(value => value.getValue()).reduce((previousValue, currentValue) => previousValue + currentValue)
        }
    }

    getSubNodesflat() {
        return Object.values(this.children).filter(value => value.isDir()).concat(Object.values(this.children).map(value => value.getSubNodesflat()).reduce((previousValue, currentValue) => previousValue.concat(currentValue), []))
    }

    isDir() {
        return this.type === "dir"
    }

    printTree(i) {
        console.log(" ".repeat(i) + this.name +" | "+this.getValue())
        Object.values(this.children).forEach(value =>  value.printTree(i+1))
    }
}

const pStart = performance.now();


//
// YOUR CODE HERE
//
const result = "...";
let tree = new TreeNode("dir", "/", null)
const root = tree
let i = 0;
while (i < INPUT.length) {
    console.log(i)
    if (INPUT[i].startsWith("$ cd ")) {
        const dir = INPUT[i].replace("$ cd ", "")
        if (dir === "..") {
            tree = tree.parent
        } else if (dir === "/") {
            tree = root
        } else {
            console.log(INPUT[i] + "   " + Object.keys(tree.children))
            tree = tree.children[dir]
        }
    } else if (INPUT[i].startsWith("$ ls")) {

        do {
            i++
            let a = INPUT[i].split(" ");
            new TreeNode(a[0], a[1], tree)
        } while (i + 1 < INPUT.length && !(INPUT[i + 1].startsWith("$")))
    }
    i++
}


const pEnd = performance.now();
root.printTree(0)
console.log(root.getSubNodesflat().filter(value => value.isDir()).map(node => node.getValue()).filter(value => value < 100000)
    .reduce((previousValue, currentValue) => previousValue + currentValue))
console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);

