const { open } = require("node:fs/promises");

let pattern = /[0-9]/g;
let total = 0;
(async () => {
  const file = await open("./input2.txt");

  for await (const line of file.readLines()) {
    const array = [...line.matchAll(pattern)];
    let suma = 0;
    if (array.length == 1) {
      suma = Number(array[0] + array[0]);
    } else if (array.length > 1) {
      suma = Number(array[0] + array[array.length - 1]);
    }
    total = total + suma;
  }
  console.log(total);
})();
