'use strict';

// const bookings = [];

// //setting default value for parameter
// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = numPassengers * 300
// ) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH666', undefined, 666);

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// console.log(greet('hey'));

// //store the status of fuction with argument 'greeting'
// const greeterHey = greet('hey');
// // supplement a argument 'name'
// greeterHey('lupo');
// //if you want pass 2 arguments at once
// console.log(greet('mu best')('lupo'));

// const greetV2 = greeting => name => console.log(`${greeting} ${name}`);
// greetV2('nice')('lupo');

// function sayHey() {
//   console.log('heyheyhey');
//   console.log(this);
// }
// sayHey();

// const addTax = function (rate) {
//   return function (value) {
//     value + value * rate;
//   };
// };

// const addTaax = rate => value => value + value * rate;

// console.log(addTaax(0.23)(100));

//*********************************************************** */
// Let's build a simple poll app!

// A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

// Here are your tasks:

// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
//   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
//         What is your favourite programming language?
//         0: JavaScript
//         1: Python
//         2: Rust
//         3: C++
//         (Write option number)

//   1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

// HINT: Use many of the tools you learned about in this and the last section 😉

// BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

// GOOD LUCK 😀

// const poll = {
//   question: 'what is your favourite programming language?',
//   options: ['0: JavaScript', '1:Python', '2: Rust', '3: C++'],
//   answers: new Array(4).fill(0),

//   registerNewAnswer() {
//     const answer = prompt(
//       //   `${this.question} \n0: JavaScript\n1:Python\n2: Rust\n3: C++\nWrite option number`
//       // );
//       `${this.question} \n${this.options.join('\n')}\nWrite option number`
//     );
//     console.log(`your input is ${answer}`);
//     if (typeof Number(answer) === 'number' && answer < this.answers.length) {
//       // if (typeof answer === 'number' && answer < this.answers.length)
//       console.log('input is right');
//       this.answers[answer]++;
//     } else {
//       console.log('input is wrong, go again');
//       this.registerNewAnswer();
//       return;
//     }
//     console.log('wancheng la');
//     return this.displayResults();
//   },
//   displayResults(type) {
//     console.log('go display');
//     if (type === 'string') {
//       console.log(
//         `Poll results are ${this.options[0]}, ${this.options[1]}, ${this.options[2]}, ${this.options[3]}`
//       );
//     } else {
//       console.log(this.answers);
//     }
//   },
// };

// poll.registerNewAnswer();

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

//default argument array!!!! if you dont give anything
// function printArray(array = 'array') {}

//IIFE
//can creat a inner scope from global
// (function () {
//   console.log('life only once');
// })();

// (() => console.log('one more life'))();

//---------------------- closure
// let f;
// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//     console.log();
//   };
// };

// g();
// // f();

// practice closure
//Due to this event, the listener is born inside of this IIFE function, so it gains its parental scope
//When a click happens, the function can not find the variable header, and then it goes to the closure immediately.
(function () {
  const hearder = document.querySelector('h1');
  hearder.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    hearder.style.color = 'blue';
  });
})();

//well done mate
