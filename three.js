let fs = require('fs');
let input = fs.readFileSync('input_three.txt').toString();
let total = 0;
let totalTwo = 0;

let regex = /mul\(([\d]{1,3}),([\d]{1,3})\)|do\(\)|don't\(\)/gm

let on = true;
[...input.matchAll(regex)].forEach(m => {
  if (m[0].startsWith('mul')) {
    let mul = parseInt(m[1]) * parseInt(m[2]);
    total += mul;
    if (on) totalTwo += mul;
  } else {
    on = !(m[0].startsWith('don'));
  }
});

//One
console.log(total);

// Two
console.log(totalTwo);
