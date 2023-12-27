//const { open } = require("node:fs/promises");
const texto = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
let lines = texto.split('\n');
console.log('lines:', lines);
let pattern = /[0-9]+/g;
let total = 0;
let winingNumbers = [];
let cards = [];

(async () => {
  // const file = await open("./input.txt");

  for await (const line of lines) {
    //line = Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    let cardWiningNumbers = [];

    let cardAndNumber = line.split(':')[0];//Card 1
    let allNumbers = line.split(':')[1].trim();// 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    console.log('allNumbers:', allNumbers);
    let cardNumber = cardAndNumber.match(pattern)[0];
    cards.push({ card: cardNumber, nItems: 0 });
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
    // console.log('cardwWiningNumbers:', cardWiningNumbers);
    if (cardWiningNumbers.length > 0) {
      winingNumbers.push({ card: Number(cardNumber), cardWiningNumbers: cardWiningNumbers })
    }
  }// end or file readline

  console.log('winingNumbers:', winingNumbers);
  console.log('cards:', cards);

  for (let i = 0; i < winingNumbers.length; i++) {
    const numOfElements = winingNumbers[i].cardWiningNumbers.length;


  }
  //console.log('total Points:', total);
})();

