let fs = require('fs'), readline = require('readline');
let columnOne = [];
let columnTwo = [];

let reader = readline.createInterface({
  input: fs.createReadStream('input_one.txt')
});

reader.on('line', function (line) {
  cols = line.split(/\s+/); 
  columnOne.push(cols[0]);
  columnTwo.push(cols[1]);
});

reader.on('close', function () {
  columnOne.sort();
  columnTwo.sort();

  var counts = [];
  columnTwo.forEach(n => {
    if (counts[n] == undefined) counts[n] = 0;
    counts[n]++;
  });
  
  diffs = [];
  similarities = [];
  columnOne.forEach((n,i) => {
    diffs.push(Math.abs(n - columnTwo[i]));
    if (counts[n]) similarities.push(n * counts[n]);
  });

  // One
  console.log(diffs.reduce((a,c) => a + c, 0));

  // Two
  console.log(similarities.reduce((a,c) => a + c, 0));

});

