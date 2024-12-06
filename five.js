let fs = require("fs"),
  readline = require("readline");
let rules = [];

let rules2 = [];
let printings = [];
let part2 = false;

let reader = readline.createInterface({
  input: fs.createReadStream("input_five.txt"),
});

reader.on("line", function (line) {
  if (line === "") {
    part2 = true;
  } else if (part2) {
    printings.push(line.split(","));
  } else {
    let newRule = line.split("|");
    newRule.forEach((r) => {
      if (!rules.find((p) => p.page === r))
        rules.push({ page: r, subsequent: [], predecessors: [] });
    });
    rules.find((p) => p.page === newRule[0]).subsequent.push(newRule[1]);
    rules.find((p) => p.page === newRule[1]).predecessors.push(newRule[0]);
  }
});

reader.on("close", function () {
  let correct = [];
  let incorrect = [];
  for (let p = 0; p < printings.length; p++) {
    let modRules = rules.filter((r) => printings[p].indexOf(r.page) !== -1);
    modRules.sort((a, b) => (b.subsequent.indexOf(a.page) !== -1 ? 1 : -1));
    if (modRules.every((c, i) => c.page === printings[p][i])) {
      correct.push(printings[p][Math.floor(printings[p].length / 2)]);
    } else {
      incorrect.push(modRules[Math.floor(modRules.length / 2)].page);
    }
  }

  // One
  console.log(correct.reduce((a, c) => a + parseInt(c), 0));

  // Two
  console.log(incorrect.reduce((a, c) => a + parseInt(c), 0));
});
