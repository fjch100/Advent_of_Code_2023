const { open } = require("node:fs/promises");

let numberPattern = /[0-9]+/g;
let simbolPattern = /[^0-9|[.]/g;
let total = 0;
let lineCounter = 0;
let numbersArray = [];
let symbolArray = [];

function pair(xi, yi) {
  return { x: xi, y: yi };
}

(async () => {
  const file = await open("./input.txt");

  for await (const line of file.readLines()) {
    // console.log("\n linea# " + lineCounter + " LINE: " + line);

    //processing numbers
    processNumberArray(line, lineCounter, numbersArray);

    //processing symbols
    processSymbolArray(line, lineCounter, symbolArray);

    lineCounter++; //keep this as last line
  }

  for (let i = 0; i < numbersArray.length; i++) {
    const number = numbersArray[i];
    for (let n = 0; n < symbolArray.length; n++) {
      const symbol = symbolArray[n];
      let col = checkColitions(number, symbol);
      if (col) {
        console.log(`Collision detected between ${number.numero} and ${symbol.symbol}`);
        total = total + number.numero;
      }
    }
  }
  console.log('total= ', total);
})();

function processNumberArray(line, lineNumber, numbersArray) {
  const matchArray = [...line.matchAll(numberPattern)];

  //matchArray = [ '467', index: 0, input: '467..114..', groups: undefined ]
  if (matchArray.length > 0) {
    // console.log("matchArray", matchArray);

    for (let i = 0; i < matchArray.length; i++) {
      let length = matchArray[i][0].length;
      posIni = Number(matchArray[i]["index"]);
      posEnd = posIni + matchArray[i][0].length - 1;
      let result = {
        numero: Number(matchArray[i][0]),
        linea: lineNumber,
        posIni,
        posEnd,
        length,
        colitions: createColitionsArray({
          numero: Number(matchArray[i][0]),
          linea: lineNumber,
          posIni,
          posEnd,
          length,
        }),
        isAdjacent: false,
      };
      // console.log("result:", result);
      numbersArray.push(result); //['numero', linea (Y), PosInicial, PosFinal]
    }
  }
}

function processSymbolArray(line, lineNumber, symbolArray) {
  const matchArray = [...line.matchAll(simbolPattern)];
  if (matchArray.length > 0) {
    // console.log("matchArray", matchArray);
    for (let i = 0; i < matchArray.length; i++) {
      position = Number(matchArray[i]["index"]);

      let result = {
        symbol: matchArray[i][0],
        pos: {
          x: position,
          y: lineNumber
        }
      };
      symbolArray.push(result); //['numero', linea (Y), PosInicial, PosFinal]
    }
  }
}

/*
* arrayToColitions = {
*       numero: Number(matchArray[i][0]),//numero en decimal
*       linea: lineNumber,
*       posIni,
*       posEnd,
*       length, //number length
*    }
*/
function createColitionsArray(arrayToColitions) {
  let long = arrayToColitions.length;
  let colitions = null;
  let yi = arrayToColitions.linea;
  let xi = arrayToColitions.posIni;
  let xf = arrayToColitions.posEnd;
  switch (long) {
    case 1:
      colitions = [
        pair(xi - 1, yi - 1),
        pair(xi, yi - 1),
        pair(xi + 1, yi - 1),
        pair(xi - 1, yi),
        pair(xi + 1, yi),
        pair(xi - 1, yi + 1),
        pair(xi, yi + 1),
        pair(xi + 1, yi + 1),
      ];
      break;

    case 2:
      colitions = [
        pair(xi - 1, yi - 1),
        pair(xi, yi - 1),
        pair(xf, yi - 1),
        pair(xf + 1, yi - 1),
        pair(xi - 1, yi),
        pair(xf + 1, yi),
        pair(xi - 1, yi + 1),
        pair(xi, yi + 1),
        pair(xf, yi + 1),
        pair(xf + 1, yi + 1),
      ];
      break;

    case 3:
      colitions = [
        pair(xi - 1, yi - 1),
        pair(xi, yi - 1),
        pair(xi + 1, yi - 1),
        pair(xf, yi - 1),
        pair(xf + 1, yi - 1),
        pair(xi - 1, yi),
        pair(xf + 1, yi),
        pair(xi - 1, yi + 1),
        pair(xi, yi + 1),
        pair(xi + 1, yi + 1),
        pair(xf, yi + 1),
        pair(xf + 1, yi + 1),
      ];
      break;

    default:
      // throw new Error("Number error, wrong lenght, <0 or >3");
      break;
  }
  // console.log("colitions:", colitions);
  return colitions;
}

function checkMatchPairs(pairNumber, pairSymbol) {
  if ((pairNumber.x === pairSymbol.x) && (pairNumber.y === pairSymbol.y)) {
    return true;
  }
  return false;
}

/*
* symbol =  { symbol: '*', pos: { x: 3, y: 1 } }
*
* symbolPos = { x: position, y: lineNumber }
*
* number = {
*     numero: 467,
*     linea: 0,
*     posIni: 0,
*     posEnd: 2,
*     length: 3,
*     colitions: [
*       [Object], [Object],
*       [Object], [Object],
*       [Object], [Object],
*       [Object], [Object],
*       [Object], [Object],
*       [Object], [Object]
*       ],
*     isAdjacent: false
*  }
*
* numbColitions =  [
*     { x: 0, y: 8 },  { x: 1, y: 8 },
*     { x: 2, y: 8 },  { x: 3, y: 8 },
*     { x: 4, y: 8 },  { x: 0, y: 9 },
*     { x: 4, y: 9 },  { x: 0, y: 10 },
*     { x: 1, y: 10 }, { x: 2, y: 10 },
*     { x: 3, y: 10 }, { x: 4, y: 10 }
*   ]
*
* return = bool, true if find a symbol colition
*/
function checkColitions(number, symbol) {
  let numbColitions = number.colitions;
  let symbolPos = symbol.pos;
  for (let i = 0; i < numbColitions.length; i++) {
    const numElem = numbColitions[i];
    let result = checkMatchPairs(numElem, symbolPos);
    if (result) {
      return true;
    }
  }
  return false;
}