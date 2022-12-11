"use strict";

const fs = require("fs");
const path = require("path");
const {performance} = require("perf_hooks");

const monkeys = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n\n").map(value => value.split("\n")).map(value => {
        return {
            monkey: Number(value[0].replace("Monkey ", "").replace(":", "")),
            startingItems: value[1].replace("Starting items:", "").split(",").map(value1 => Number(value1)),
            operation: value[2].replace("Operation: new =", "").trim(),
            testdivisor: Number(value[3].replace("  Test: divisible by ", "")),
            passToTrue: Number(value[4].replace("If true: throw to monkey", "").trim()),
            passToFalse: Number(value[5].replace("If false: throw to monkey", "").trim()),
            monkeylevel: 0
        }

    }
); // change this if necessary

const pStart = performance.now();

for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
        while (monkey.startingItems.length > 0) {
            let item = monkey.startingItems.shift();
            //todo operation
            const calc = monkey.operation.replaceAll("old", "" + item).split(" ");
            switch (calc[1]) {
                case "*":
                    item = Number(calc[0]) * Number(calc[2])
                    break
                case "+":
                    item = Number(calc[0]) + Number(calc[2])
                    break
                default:
                    console.log("Error")
            }
            monkey.monkeylevel++
            // item.
            //resolve worry Item
            item = Math.floor(item / 3)
            if (item % monkey.testdivisor === 0) {
                monkeys[monkey.passToTrue].startingItems.push(item)
            } else {
                monkeys[monkey.passToFalse].startingItems.push(item)
            }
        }
    }
}
console.log(monkeys.sort((a, b) => b.monkeylevel - a.monkeylevel))
const result = "...";

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
