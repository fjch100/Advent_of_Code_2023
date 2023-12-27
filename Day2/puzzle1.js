const { open } = require("node:fs/promises");
const MAXRED = 12;
const MAXGREEN = 13;
const MAXBLUE = 14;

(async () => {
  const file = await open("./input.txt");
  let suma = 0;

  for await (const line of file.readLines()) {
    let game = getIdAndGames(line); //{id, value: true/false}
    if (game.value) {
      suma = suma + game.id;
    }
  }
  console.log("suma: ", suma);
})();

function getIdAndGames(line) {
  let separation = line.split(":");
  let id = Number(separation[0].split(" ")[1]);

  //gamesTxt = [ ' 3 blue, 4 red', ' 1 red, 2 green, 6 blue', ' 2 green' ]
  let gamesTxt = separation[1].split(";");

  for (let index = 0; index < gamesTxt.length; index++) {
    //element = ' 1 red, 2 green, 6 blue'
    const element = gamesTxt[index];

    let rgb = element.split(","); //rgb = [ ' 1 red', ' 2 green', ' 6 blue' ]

    for (let n = 0; n < rgb.length; n++) {
      // loop throug all games
      let value = Number(rgb[n].trim().split(" ")[0]);
      let key = rgb[n].trim().split(" ")[1];
      if (key === "red") {
        if (value > MAXRED) {
          return { id, value: false };
        }
      }
      if (key === "green") {
        if (value > MAXGREEN) {
          return { id, value: false };
        }
      }
      if (key === "blue") {
        if (value > MAXBLUE) {
          return { id, value: false };
        }
      }
      // console.log("key:", key, " value:", value);
    } //END, for (let n = 0; n < rgb.length; n++)
  } //END, for (let index = 0; index < gamesTxt.length; index++)
  return { id, value: true };
}
