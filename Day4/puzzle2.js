const { open } = require("node:fs/promises");

let pattern = /[0-9]+/g;
let total = 0;
let winingNumbers = [];
let cards = [];

(async () => {
  const file = await open("./input.txt");

  for await (const line of file.readLines()) {
    let cardWiningNumbers = [];
    let cardAndNumber = line.split(':')[0];//Card 1
    let allNumbers = line.split(':')[1].trim();// 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    let cardNumber = cardAndNumber.match(pattern)[0];
    cards.push({ card: Number(cardNumber), nItems: 1, nwins: 0 });
    let yourNumbers = allNumbers.split('|')[0].trim();//41 48 83 86 17
    let allWiningNumbers = allNumbers.split('|')[1].trim();//83 86  6 31 17  9 48 53
    let yourNumbersArray = yourNumbers.match(pattern);// [ '41', '48', '83', '86', '17' ]
    let allWiningNumbersArray = allWiningNumbers.match(pattern);

    for (let i = 0; i < yourNumbersArray.length; i++) {
      const element = yourNumbersArray[i];
      if (allWiningNumbersArray.includes(element)) {
        cardWiningNumbers.push(Number(element));
        cards[Number(cardNumber) - 1].nwins++;
      }
    }

    if (cardWiningNumbers.length > 0) {
      winingNumbers.push({ card: Number(cardNumber), cardWiningNumbers: cardWiningNumbers })
    }
  }// end or file readline

  for (let i = 0; i < cards.length; i++) {
    for (let k = 0; k < cards[i].nItems; k++) {
      for (let n = 0; n < cards[i].nwins; n++) {
        cards[cards[i].card + n].nItems++;
      }
    }
  }

  total = cards.reduce((accumulator, currentValue) => accumulator + currentValue.nItems, 0);
  console.log('total scratchcards :', total);
})();
