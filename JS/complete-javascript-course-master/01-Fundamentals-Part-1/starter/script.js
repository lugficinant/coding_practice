//tesing comment
/*
let myword = '666';
console.log(myword);
*/

// let myWord = '666';
// outPut = `its just a outpu test for ${myWord}`;
// console.log(outPut);

//****************************** switch **********************************
//remember using break to get out of executed block

//****************************** ternary operator **********************************
// basically its a simple if/else, but can be used to assigning value.

// let age = 23;
// let drink = age >= 18 ? 'you can drink cool thing' : 'you can only drink water';
// console.log(drink);
//-------------------------------

// const bill = 275;

// let tip = 50 <= bill <= 300 ? bill * 0.15 : bill * 0.2;
// console.log(`The bill was ${bill} , the tip was ${tip}, and the total value ${bill + tip}`);

//``````````````````````````
// const lupo = {
//   lastName: "lu",
//   firstName: "huhu",

//   sayTheName: function () {
//     console.log(this.lastName);
//     let self = this;

//     const sayFirstName = function () {
//       console.log(this.firstName);
//     };

//     self.sayFirstName();
//   },
// };

// console.log("hehe");

// lupo.sayTheName();

function bigFunc() {
  console.log("66666");
  smallFunc();
  function smallFunc() {
    console.log("1111");
  }
}

// smallFunc();
bigFunc();
