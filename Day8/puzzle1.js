const { open } = require("node:fs/promises");
let lineCounter = 0;
let dataPattern2 = /[A-Z]+/g;
let data = {};
let instructions = [];
let start, end;

(async () => {
    const file = await open("./test.txt");

    for await (const line of file.readLines()) {
        if (lineCounter === 0) {
            instructions = line.split('');
            lineCounter++;
            continue;
        }
        if (line.length === 0) {
            lineCounter++;
            continue;
        }
        let array = [...line.matchAll(dataPattern2)];
        data[array[0][0]] = { L: array[1][0], R: array[2][0] };
        lineCounter++;
    }

    start = 'AAA';
    console.log('instructions:', instructions, 'length:', instructions.length);
    console.log('data:', data, 'length:', Object.keys(data).length);
    let instruction;
    let currentData;
    console.log(`before while,  currentData: ${currentData}, ${instruction}`);
    let counter = 0, steps = 0;

    while (currentData !== 'ZZZ') {
        instruction = instructions[counter];
        currentData = data[start][instruction];
        console.log(`counter: ${counter}, step: ${steps}, currentData: ${currentData}, ${instruction}`);
        start = currentData;
        steps++;
        counter++;
        if (counter >= instructions.length) {
            counter = 0;
        }
    }
    console.log('ZZZ found, final steps:', steps);
})();