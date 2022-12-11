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
const mod = monkeys.map(value => value.testdivisor).reduce((previousValue, currentValue) => previousValue * currentValue, 1)
const pStart = performance.now();
for (let i = 0; i < 10000; i++) {
    console.log(i)
    for (const monkey of monkeys) {
        while (monkey.startingItems.length > 0) {
            let item = Number(monkey.startingItems.shift());
            //todo operation
            const calc = monkey.operation.split(" ");
            let operator1 = calc [0] === "old" ? item : Number(calc [0])
            let operator2 = calc [2] === "old" ? item : Number(calc [2])
            switch (calc[1]) {
                case "*":
                    item = operator1 * operator2
                    break
                case "+":
                    item = operator1 + operator2
                    break
                default:
                    console.log("Error")
            }
            monkey.monkeylevel++
            // item.
            //resolve w                                                                                                 orry Item
            item = item % mod
            if (item % monkey.testdivisor === 0) {
                monkeys[monkey.passToTrue].startingItems.push(item)
            } else {
                monkeys[monkey.passToFalse].startingItems.push(item)
            }
        }
    }
}
let numbers = monkeys.sort((a, b) => b.monkeylevel - a.monkeylevel).map(value => value.monkeylevel);
console.log(numbers)
const result = numbers[0] * numbers[1];

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
