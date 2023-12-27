const { open } = require("node:fs/promises");

let Numberpattern = /[0-9]+/g;
let seedsArray;
let lineCounter = 0;
let isProcessingCategory = false;
let categories = {
  "seed-to-soil": [],
  "soil-to-fertilizer": [],
  'fertilizer-to-water': [],
  'water-to-light': [],
  'light-to-temperature': [],
  'temperature-to-humidity': [],
  'humidity-to-location': []
};
let category = '';

(async () => {
  const file = await open("./input.txt");
  for await (const line of file.readLines()) {
    // console.log(line);
    if (lineCounter === 0) {
      seedsArray = getSeeds(line);
      lineCounter++;
      continue;
    }
    if (!isProcessingCategory && category === '') {
      if (!isEmptyLine(line)) {
        category = line.split(' ')[0];
        isProcessingCategory = true;
        lineCounter++;
        continue;
      }
    }
    if (isProcessingCategory) {
      processCategories(line, category);
    }
    lineCounter++;
  }
  // console.log("seedsArray", seedsArray);
  let seedsToSoil = mapArrays(seedsArray, categories["seed-to-soil"]);
  let soilToFertilizer = mapArrays(seedsToSoil, categories["soil-to-fertilizer"]);
  let fertilizerToWater = mapArrays(soilToFertilizer, categories["fertilizer-to-water"]);
  let waterToLight = mapArrays(fertilizerToWater, categories["water-to-light"]);
  let lightToTemperature = mapArrays(waterToLight, categories["light-to-temperature"]);
  let temperatureToHumidity = mapArrays(lightToTemperature, categories["temperature-to-humidity"]);
  let humidityToLocation = mapArrays(temperatureToHumidity, categories["humidity-to-location"]);

  // let finalSort = humidityToLocation.sort()[0];//NEVER USER JS SORT WITHOUT YOUR OWN COMPARE FUNCTION

  let final = minorOfArray(humidityToLocation);
  console.log(`lowest Location = ${final}`);
})();

function getSeeds(line) {
  if (lineCounter === 0 && !isEmptyLine(line)) {// process firts line
    let array2 = [];
    // console.log("Line:", line);
    // get seeds in array of strings and convert to arrays of numbers
    let array1 = [...line.matchAll(Numberpattern)].map(item => Number(item));
    for (let i = 0; i < array1.length; i = i + 2) {
      const start = array1[i];
      const long = array1[i + 1];
      for (let n = 0; n < long; n++) {
        const element = start + n;
        array2.push(element);
      }
    }
    return array2;
  }
}

function isEmptyLine(line) {
  return !line.trim()
}

function processCategories(line, categoryIntern) {
  if (!isEmptyLine(line)) {
    let array = [...line.matchAll(Numberpattern)].map(item => Number(item));
    categories[categoryIntern].push({
      destinationStart: array[0],
      sourceStart: array[1],
      length: array[2]
    });

  } else {
    category = '';
    isProcessingCategory = false;
    return;
  }
}

/*
* categoria = { destinationStart: 0, sourceStart: 15, length: 37 },
*/
function mapCategory(value, categoria) {
  if (value >= categoria.sourceStart && value <= categoria.sourceStart + categoria.length) {//inside the range

    //sourceDestination = m * sourceStart + C ==> C = (SourceDest - SourceStart), m = 1
    let res = value + (categoria.destinationStart - categoria.sourceStart);

    return { isInRange: true, res };
  } else {
    return { isInRange: false, res: value };
  }
}

/*
* categoria = { destinationStart: 0, sourceStart: 15, length: 37 },
*
* seed= value from seedsArray
*/
function mapValue(categorias, seed) {
  for (let i = 0; i < categorias.length; i++) {
    const cat = categorias[i];
    sts = mapCategory(seed, cat);
    if (sts.isInRange) {
      return sts.res;
    } else {
      continue;
    }
  }
  return seed;
}

function mapArrays(seeds, categ) {
  let valmapped = [];
  for (let n = 0; n < seeds.length; n++) {
    const seed = seeds[n];
    mapp = mapValue(categ, seed);
    // console.log(`seed: ${seed}, map:${mapp}`);
    valmapped.push(mapp);
  }
  return valmapped;
}

function minorOfArray(arrayValues) {
  let temp = arrayValues[0];
  for (let i = 0; i < arrayValues.length; i++) {
    const element = arrayValues[i];
    if (element < temp) {
      temp = element;
    }
  }
  return temp;
}