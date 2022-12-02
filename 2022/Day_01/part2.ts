const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('2022/Day_01/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    const storage = new Map()
    let elfcounter = 0
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        //console.log(line);
        if (line === "") {
            elfcounter++
            continue
        }
        let number = storage.get(elfcounter);
        if (!number) {
            number = 0
        }
        storage.set(elfcounter, parseInt(line) + number)
    }
    console.log(Array.from(storage.values()).sort().reverse().slice(0,3).reduce((previousValue, currentValue) => previousValue+currentValue))
}

processLineByLine();
