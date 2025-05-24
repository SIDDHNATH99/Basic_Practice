function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = simpleGenerator();

let result = gen.next();

// console.log("result" , result); // 1

while (!result.done) {
    console.log(result);
    result = gen.next()    
}

// function* lettersGenerator() {
//   yield "a";
//   yield "b";
//   yield "c";
// }

// const gen2 = lettersGenerator();
// console.log(gen2.next().value); // 1
// console.log(gen2.next().value); // 2
// console.log(gen2.next().value); // 3


// hard code 

function* numberGenerator() {
    let gen2 = 10
    yield gen2;
}

const gen2 = numberGenerator();
for (let num of gen2) {
    console.log(num); // Should print numbers 1 to 10
}
