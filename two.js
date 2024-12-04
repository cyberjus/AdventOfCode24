let fs = require("fs"),
  readline = require("readline");
let safeCount = 0;
let safeTolerance = 0;

let reader = readline.createInterface({
  input: fs.createReadStream("input_two.txt"),
});

reader.on("line", function (line) {
  let levels = line.split(" ");

  safeCount += isSafe(levels);

  for (let i = 0; i < levels.length; i++) {
    let mod = [...levels];
    mod.splice(i, 1);
    if (isSafe(mod)) {
      safeTolerance++;
      break;
    }
  }
});

reader.on("close", function () {
  //One
  console.log(safeCount);

  //Two
  console.log(safeTolerance);
});

function isSafe(levels) {
  if (parseInt(levels[0]) < parseInt(levels[levels.length - 1]))
    levels = levels.reverse();
  return levels.reduce((a, c, i) => {
    if (a !== 0 && i > 0) {
      let diff = levels[i - 1] - levels[i];
      return diff <= 3 && diff > 0 ? 1 : 0;
    }
    return a;
  }, 1);
}
