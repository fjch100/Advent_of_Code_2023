const { open } = require("node:fs/promises");

let pattern = /[0-9]+/g;
let total = 0;
let winingNumbers = [];

(async () => {
  const file = await open("./input.txt");

  for await (const line of file.readLines()) {
    //line = Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    let cardWiningNumbers = [];
    let cardAndNumber = line.split(':')[0];//Card 1
    let allNumbers = line.split(':')[1].trim();// 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    let cardNumber = cardAndNumber.match(pattern)[0];
    let yourNumbers = allNumbers.split('|')[0].trim();//41 48 83 86 17
    let allWiningNumbers = allNumbers.split('|')[1].trim();//83 86  6 31 17  9 48 53
    let yourNumbersArray = yourNumbers.match(pattern);// [ '41', '48', '83', '86', '17' ]
    let allWiningNumbersArray = allWiningNumbers.match(pattern);

    for (let i = 0; i < yourNumbersArray.length; i++) {
      const element = yourNumbersArray[i];
      if (allWiningNumbersArray.includes(element)) {
        cardWiningNumbers.push(Number(element));
      }
    }
    if (cardWiningNumbers.length > 0) {
      winingNumbers.push({ card: Number(cardNumber), cardWiningNumbers: cardWiningNumbers })
    }
  }

  for (let i = 0; i < winingNumbers.length; i++) {
    const numOfElements = winingNumbers[i].cardWiningNumbers.length;
    let points = (numOfElements <= 1) ? 1 : (2 ** (numOfElements - 1));
    total = total + points;
  }
  console.log('total Points:', total);
})();

