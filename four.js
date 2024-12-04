let fs = require("fs"),
  readline = require("readline");
let grid = [];
let xLocs = [];
let aLocs = [];

let reader = readline.createInterface({
  input: fs.createReadStream("input_four.txt"),
});

reader.on("line", function (line) {
  let chars = line.split("");
  for (let c = 0; c < chars.length; c++) {
    if (chars[c] === "X") xLocs.push({ x: c, y: grid.length });
    if (chars[c] === "A") aLocs.push({ x: c, y: grid.length });
  }
  grid.push(chars);
});

reader.on("close", function () {
  let count = 0;
  xLocs.forEach((loc) => {
    let tests = Array(9).fill("X");
    for (let n = 1; n <= 3; n++) {
      let i = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          let getX = loc.x + x * n;
          let getY = loc.y + y * n;
          tests[i] += getFromGrid(getX, getY);
          i++;
        }
      }
    }
    count += tests.filter((t) => t === "XMAS").length;
  });

  // One
  console.log(count);

  let masCount = 0;
  aLocs.forEach((loc) => {
    let pass = true;
    for (let i = -1; i <= 1; i += 2) {
      let str =
        getFromGrid(loc.x + i, loc.y - 1) +
        "A" +
        getFromGrid(loc.x - i, loc.y + 1);
      if (!(str === "MAS" || str === "SAM")) {
        pass = false;
      }
    }
    if (pass) masCount++;
  });

  // Two
  console.log(masCount);
});

function getFromGrid(x, y) {
  if (x >= 0 && y >= 0 && x < grid[0].length && y < grid.length) {
    return grid[y][x];
  }
  return "";
}
