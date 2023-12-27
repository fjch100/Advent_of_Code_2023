const { open } = require("node:fs/promises");

let Numberpattern = /[0-9]+/g;
let lineCounter = 0;
let time;
let distance;

(async () => {
  const file = await open("./input.txt");
  for await (const line of file.readLines()) {
    if (lineCounter === 0) {
      let timeArray1 = [...line.matchAll(Numberpattern)];// get the time array numbers
      time = Number(timeArray1.join(''));
    }
    if (lineCounter === 1) {
      let distanceArray1 = [...line.matchAll(Numberpattern)];// get the time array numbers
      distance = Number(distanceArray1.join(''));
    }
    lineCounter++;
  }
  console.log('time:', time);
  console.log('distance:', distance);
  let mintime = getTime(time, distance);
  console.log('min Time', mintime);
  let maxTime = time - mintime;
  console.log('max Time', maxTime);
  let numberOfWays = maxTime - mintime + 1;
  console.log(`numberOfWays = ${numberOfWays}`);
})();

function getTime(timeInt, distanceInt) {
  for (let i = 1; i < Math.floor(timeInt / 2); i++) {
    if (i * (timeInt - i) > distanceInt) {
      return i
    }
  }
}

