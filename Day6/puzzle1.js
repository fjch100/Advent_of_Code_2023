const { open } = require("node:fs/promises");

let Numberpattern = /[0-9]+/g;
let lineCounter = 0;
let timeArray = [];
let distanceArray = [];

(async () => {
  const file = await open("./test.txt");
  for await (const line of file.readLines()) {
    if (lineCounter === 0) {
      timeArray = [...line.matchAll(Numberpattern)].map(item => Number(item));// get the time array numbers
    }
    if (lineCounter === 1) {
      distanceArray = [...line.matchAll(Numberpattern)].map(item => Number(item));
    }
    lineCounter++;
  }
  console.log('timeArray:', timeArray);
  console.log('distanceArray:', distanceArray);
  let timeOptions = getTimeOptions(timeArray, distanceArray);
  let numberOfBeats = getnumberOfBeats(timeOptions);
  let numberOfWays = getNumberOfWays(numberOfBeats);
  console.log(`numberOfWays = ${numberOfWays}`);
})();

function getTimeOptions(timeArrayint, distanceArray) {
  let arrayf = [];
  let time;
  for (let n = 0; n < timeArrayint.length; n++) {
    let array = [];
    time = timeArrayint[n];
    let distance = distanceArray[n];
    for (let i = 1; i < time; i++) {
      const timeHold = i;
      let travelTime = time - i;
      let res = { timeHold, travelTime, travelDistance: timeHold * travelTime };
      array.push(res);
    }
    arrayf.push({ time, options: array, distance });
  }
  return arrayf;
}


/*
* timeOptions: [
*  {
*    time: 7,
*    options: [ { timeHold: 1, travelTime: 6, travelDistance: 6 }, { timeHold: 2, travelTime: 5, travelDistance: 10 } ],
*    distance: 9,
     beats:[]
*  } ]
*/
function getnumberOfBeats(timeOptions) {
  for (let n = 0; n < timeOptions.length; n++) {
    const time = timeOptions[n];
    let beats = time.options.filter(item => item.travelDistance > time.distance);
    // console.log('beats:', beats);
    time.beats = beats;
  }
  return timeOptions;
}


/*
  beats: [
    { timeHold: 2, travelTime: 5, travelDistance: 10 },
    { timeHold: 3, travelTime: 4, travelDistance: 12 },
    { timeHold: 4, travelTime: 3, travelDistance: 12 },
    { timeHold: 5, travelTime: 2, travelDistance: 10 }
  ]

*/
function getNumberOfWays(numberOfBeatsInt) {
  let ways = 1;
  for (let n = 0; n < numberOfBeatsInt.length; n++) {
    let beats = numberOfBeatsInt[n].beats.length;
    ways = ways * beats;
  }
  return ways;
}