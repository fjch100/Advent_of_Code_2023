const { open } = require("node:fs/promises");
const objNumeros = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  0: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  zero: "0",
};

let arrayNumeros = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

let total = 0;

(async () => {
  const file = await open("./input2.txt");

  for await (const line of file.readLines()) {
    let sumaParcial = findNumber(line);
    total = total + sumaParcial;
  }
  console.log("total", total);
})();

function findNumber(line) {
  let restArray = [];
  // console.log("\n" + line);

  for (i = 0; i < arrayNumeros.length; i++) {
    let pattern = new RegExp(arrayNumeros[i], "g");

    //match for each one '1'..'9'.. 'one'..'nine'
    let match = [...line.matchAll(pattern)];

    for (let l = 0; l < match.length; l++) {
      //lookup for all matches and push to resArray (unordered)
      restArray.push([match[l]["index"], match[l][0]]); //[index, value]
    }
  }

  //sort the array by index
  restArray.sort((a, b) => {
    return a[0] - b[0];
  });

  //final array ordered
  // console.log("restArray", restArray);

  //look for the first and last members
  let first = restArray[0][1];
  let last = restArray.pop()[1] ?? restArray[0][1];

  //get the final number
  let final = Number(mapNumber(first) + mapNumber(last));
  return final;
}

function mapNumber(num) {
  return objNumeros[num];
}
