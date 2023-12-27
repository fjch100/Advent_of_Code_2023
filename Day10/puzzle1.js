const { open } = require("node:fs/promises");
let pattern = /-?[0-9]+/g;
let lineCounter = 0;
let lineLength = 0;
let rows = [];
let start = { sign: 'S', pos: null };
let currentPos = null;
let SignMap = {
    // Sign: [top, right, bottom, left], 0=not move, 1= can move
    '|': [1, 0, 1, 0],
    '-': [0, 1, 0, 1],
    'L': [1, 1, 0, 0],
    'J': [1, 0, 0, 1],
    '7': [0, 0, 1, 1],
    'F': [0, 1, 1, 0],
    '.': [0, 0, 0, 0],
    'S': [1, 1, 1, 1],

};


(async () => {
    const file = await open("./test.txt");

    for await (const line of file.readLines()) {
        if (lineCounter === 0) {
            lineLength = line.length;
        }
        let lineArray = line.split('').map(createElement);
        // console.log('lineArray:', lineArray);
        if (line.includes('S')) {
            start = { sign: 'S', x: line.indexOf('S'), y: lineCounter };
        }
        rows.push(lineArray);
        lineCounter++;
    }

    console.log('rows:', rows);
    console.log('start', start);

    currentPos = start;
    let nextmove = nextMovem(currentPos.x, currentPos.y)
    console.log('nextmove:', nextmove);
})();

function pos(x, y) {
    return {
        x, y
    }
}

function createElement(item, index) {
    return { sign: item, x: index, y: lineCounter }
}

function nextMovem(x, y) {
    return {
        t: (y >= 1) ? { x, y: y - 1 } : null,
        r: (x < lineLength) ? { x: x + 1, y } : null,
        b: () ? { x, y: y + 1 },
        l: { x: x - 1, y }
    };
}