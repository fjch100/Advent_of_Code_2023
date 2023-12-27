const { open } = require("node:fs/promises");

let Numberpattern = /[0-9]+/g;
let lineCounter = 0;
let data = [];
let handMap = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'T': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14,
};

let highcard = [], onepair = [], twopair = [], threeofkind = [], fourofkind = [], fiveofkind = [], fullhouse = [];

(async () => {
  const file = await open("./input.txt");

  for await (const line of file.readLines()) {
    let hand = line.split(' ')[0];
    let bid = Number(line.split(' ')[1]);
    let arrayTemp = [];
    let maph = mapHand({ hand, bid });
    data.push({ hand, bid, map: maph, clase: classifyHand({ hand, bid, map: maph }) });

    lineCounter++;
  }
  separate(data);
  // console.log('data:', data);
  // data = null;
  if (highcard.length > 1) {
    highcard.sort(ordenaArray);
  }
  if (onepair.length > 1) {
    onepair.sort(ordenaArray);
  }
  if (twopair.length > 1) {
    twopair.sort(ordenaArray);
  }
  if (threeofkind.length > 1) {
    threeofkind.sort(ordenaArray);
  }
  if (fullhouse.length > 1) {
    fullhouse.sort(ordenaArray);
  }
  if (fourofkind.length > 1) {
    fourofkind.sort(ordenaArray);
  }
  if (fiveofkind.length > 1) {
    fiveofkind.sort(ordenaArray);
  }
  // console.log('highcard:', highcard);
  // console.log('onepair:', onepair);
  // console.log('twopair:', twopair);
  // console.log('threeofkind:', threeofkind);
  // console.log('fullhouse:', fullhouse);
  // console.log('fourofkind:', fourofkind);
  // console.log('fiveofkind:', fiveofkind);

  let rank = 1;
  let totalWins = 0;

  if (highcard.length > 0) {
    for (let n = 0; n < highcard.length; n++) {
      let localwin1 = highcard[n].bid * rank;
      rank++;
      totalWins += localwin1;
    }
  }

  if (onepair.length > 0) {
    for (let n = 0; n < onepair.length; n++) {
      let localwin2 = onepair[n].bid * rank;
      rank++;
      totalWins += localwin2;
    }
  }

  if (twopair.length > 0) {
    for (let n = 0; n < twopair.length; n++) {
      let localwin3 = twopair[n].bid * rank;
      rank++;
      totalWins += localwin3;
    }
  }

  if (threeofkind.length > 0) {
    for (let n = 0; n < threeofkind.length; n++) {
      let localwin4 = threeofkind[n].bid * rank;
      rank++;
      totalWins += localwin4;
    }
  }

  if (fullhouse.length > 0) {
    for (let n = 0; n < fullhouse.length; n++) {
      let localwin5 = fullhouse[n].bid * rank;
      rank++;
      totalWins += localwin5;
    }
  }

  if (fourofkind.length > 0) {
    for (let n = 0; n < fourofkind.length; n++) {
      let localwin6 = fourofkind[n].bid * rank;
      rank++;
      totalWins += localwin6;
    }
  }

  if (fiveofkind.length > 0) {
    for (let n = 0; n < fiveofkind.length; n++) {
      let localwin7 = fiveofkind[n].bid * rank;
      rank++;
      totalWins += localwin7;
    }
  }

  console.log('rank=', rank);
  console.log('totalWins=', totalWins);
  //248104869 ==> too low
})();


/*
* hand = { hand: '32T3K', bid: 765 }
*/
function mapHand(handInt) {
  map1 = new Map();
  let handArray = handInt.hand.split('');//['3','2','T', '3', ''K]
  // console.log('handArray:', handArray);
  for (let i = 0; i < handArray.length; i++) {
    const element = handArray[i];
    if (map1.has(element)) {
      map1.set(element, map1.get(element) + 1);
    } else {
      map1.set(element, 1)
    }
  }
  // console.log('map1:', map1);
  return map1;
}

/*
*    dataIn =  hand: '32T3K', bid: 765, map: Map(4) { '3' => 2, '2' => 1, 'T' => 1, 'K' => 1 }
*              hand: 'QQJJQ', bid: 892, map: Map(2) { 'Q' => 3, 'J' => 2 }, clase: 'fullhouse'
*/
function classifyHand(dataIn) {
  dataLong = dataIn.map.size;
  // console.log('dataLong:', dataLong);
  let classe = null;
  switch (dataLong) {
    case 1:// AAAAA = five of a kind 
      classe = 'fiveofkind';
      break;

    case 2://AAAAQ=four of a kind , AAAQQ= fullhouse
      classe = 'fullhouse';
      for (const [key, value] of dataIn.map) {
        if (value > 3) {
          classe = 'fourofkind'
        }
      }
      break;

    case 3://AAAQK=three of kind , AAQQK=two pair ,   
      classe = 'twopair';
      for (const [key, value] of dataIn.map) {
        if (value > 2) {
          classe = 'threeofkind'
        }
      }
      break;

    case 4://AQKJJ=one pair ,
      classe = 'onepair';
      break;

    case 5: //23456 = High Card    
      classe = 'highcard';
      break;

    // default:
    //   break;
  }
  return classe;
}

/*
* data: [
  {
    hand: '32T3K',
    bid: 765,
    map: Map(4) { '3' => 2, '2' => 1, 'T' => 1, 'K' => 1 },
    clase: 'onepair'
  },
  {
    hand: 'T55J5',
    bid: 684,
    map: Map(3) { 'T' => 1, '5' => 3, 'J' => 1 },
    clase: 'threeofkind'
  },
*
* clase = 'onepair'
*/
function separate(dataIn) {
  for (let n = 0; n < dataIn.length; n++) {
    const element = dataIn[n];
    if (element.clase === 'highcard') {
      highcard.push(element);
    } else if (element.clase === 'onepair') {
      onepair.push(element);
    } else if (element.clase === 'twopair') {
      twopair.push(element);
    } else if (element.clase === 'threeofkind') {
      threeofkind.push(element);
    } else if (element.clase === 'fullhouse') {
      fullhouse.push(element);
    } else if (element.clase === 'fourofkind') {
      fourofkind.push(element);
    } else if (element.clase === 'fiveofkind') {
      fiveofkind.push(element);
    }
  }
}


function ordenaArray(a, b) {
  let arrayA = a.hand
    .split('')
    .map(item => handMap[item]);
  // console.log('arrayA:', arrayA);
  let arrayB = b.hand
    .split('')
    .map(item => handMap[item]);
  // console.log('arrayB:', arrayB);
  for (let n = 0; n < arrayA.length; n++) {
    if (arrayA[n] > arrayB[n]) {
      return 1;
    } else if (arrayA[n] < arrayB[n]) {
      return -1;
    } else {
      continue;
    }
  }
  return 0;
}