const { open } = require("node:fs/promises");
let pattern = /-?[0-9]+/g;
let lineCounter = 0;
let results = {};
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
        let sum = partials.map(item => item.pop()).reduce((acc, curr) => curr + acc, 0);
        // console.log('sum:', sum);
        results[lineCounter] = { partials, sum };
        lineCounter++;
    }

    let res = Object.values(results).reduce((acc, curr) => acc + curr.sum, 0);
    console.log('results:', res);
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


