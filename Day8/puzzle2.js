const { open } = require("node:fs/promises");
let lineCounter = 0;
let dataPattern2 = /[A-Z]+/g;
let data = {};
let Adata = [];
let Aiterations = [];
let instructions = [];

(async () => {
    const file = await open("./input.txt");
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
        if (array[0][0].endsWith('A')) {
            Adata.push(array[0][0]);
        }
        lineCounter++;
    }
    for (let i = 0; i < Adata.length; i++) {
        let A = Adata[i];
        Aiterations.push(getstepNumberToZ(A, data));
    }
    console.log('Aiterations:', Aiterations);
    const finalResult = Aiterations.reduce((accumulator, currentValue) => calcularMCM(accumulator, currentValue));// Función para calcular el máximo común divisor (MCD)
    console.log('finalResult:', finalResult);
})();

function getstepNumberToZ(start, dataIn) {
    let instruction;
    let currentData = start;
    let counter = 0, steps = 0;
    while (!currentData.endsWith('Z')) {

        instruction = instructions[counter];
        currentData = dataIn[start][instruction];
        //console.log(`counter: ${counter}, step: ${steps}, currentData: ${currentData}, ${instruction}`);
        start = currentData;
        steps++;
        counter++;
        if (counter >= instructions.length) {
            counter = 0;
        }
    }
    return steps;
}

// Función para calcular el máximo común divisor (MCD)
function calcularMCD(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Función para calcular el mínimo común múltiplo (MCM)
function calcularMCM(a, b) {
    return (a * b) / calcularMCD(a, b);
}