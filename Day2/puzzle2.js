const { open } = require("node:fs/promises");
const MAXRED = 12;
const MAXGREEN = 13;
const MAXBLUE = 14;

(async () => {
  const file = await open("./input.txt");
  let suma = 0;

  for await (const line of file.readLines()) {
    let game = getIdAndGames(line); //{id, value: power}
    suma = suma + game.power;
  }
  console.log("suma: ", suma);
})();

function getIdAndGames(line) {
  let red = 0,
    green = 0,
    blue = 0;
  let separation = line.split(":");
S
  let gamesTxt = separation[1].split(";");

  for (let index = 0; index < gamesTxt.length; index++) {
    const element = gamesTxt[index];

    let rgb = element.split(","); //rgb = [ ' 1 red', ' 2 green', ' 6 blue' ]

    for (let n = 0; n < rgb.length; n++) {
      // loop throug all games
      let value = Number(rgb[n].trim().split(" ")[0]);
      let key = rgb[n].trim().split(" ")[1];
      if (key === "red") {
        if (value > red) {
          red = value;
        }
      }
      if (key === "green") {
        if (value > green) {
          green = value;
        }
      }
      if (key === "blue") {
        if (value > blue) {
          blue = value;
        }
      }
    } //END, for (let n = 0; n < rgb.length; n++)
  } //END, for (let index = 0; index < gamesTxt.length; index++)
  return { power: red * green * blue };
}
