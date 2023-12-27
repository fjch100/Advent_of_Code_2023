const { open } = require("node:fs/promises");
let pattern = /-?[0-9]+/g;
let lineCounter = 0;
let arrayShifts = [];
let results = [];
(async () => {
    const file = await open("./input.txt");


    for await (const line of file.readLines()) {
        let partials = [];
        let array = line.match(pattern).map(item => parseInt(item));
        partials.push([...array]);
        while (!isArray0(array)) {
            let nArray = createDiffArray(array);
            partials.push(nArray);
            array = nArray;
        }

        let sumArray = partials.map(item => item.shift());
        sumArray.reverse();
        // console.log('sumArray:', sumArray);
        arrayShifts.push(sumArray);
        lineCounter++;
    }
    // console.log('arrayShifts:', arrayShifts);
    for (let k = 0; k < arrayShifts.length; k++) {
        results.push(extraPolateBack(arrayShifts[k]).pop());
    }
    // console.log('results:', results);
    let sumatotal = results.reduce((acc, curr) => acc + curr, 0);
    console.log('sumatotal:', sumatotal);

})();

function createDiffArray(arrayIn) {
    let res = [];
    for (let i = 0; i < arrayIn.length - 1; i++) {
        const item = arrayIn[i];
        const nextItem = arrayIn[i + 1];
        let diff = nextItem - item;
        res.push(diff);
    }
    return res;
}

//return true if all array elements are zero
function isArray0(arrayInt) {
    for (let n = 0; n < arrayInt.length; n++) {
        if (arrayInt[n] !== 0) {
            return false
        }
    }
    return true;
}

function extraPolateBack(arrayIn) {
    let finalArray = [];
    let part = 0;
    for (let k = 0; k < arrayIn.length - 1; k++) {
        part = arrayIn[k + 1] - part;
        finalArray.push(part);
    }
    return finalArray;
}
