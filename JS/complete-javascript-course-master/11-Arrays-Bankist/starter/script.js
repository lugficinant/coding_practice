'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//____________________________________________________________________ project

//----------------------------------display acc info in movement el
function displayMove(movements, sort = false) {
  //empty og el
  containerMovements.innerHTML = '';
  //sort movements
  const sortMov = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // console.log('666');
  sortMov.forEach(function (mov, i) {
    //create new htemlEl
    const movType = mov > 0 ? 'deposit' : 'withdrawal';
    // console.log(mov);
    const htmlEl = `<div class="movements__row">
          <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType}</div>
          
          <div class="movements__value">${mov}€"</div>
        </div>`;
    //insert to the accordingly el
    //1st argu is position 2nd is content
    containerMovements.insertAdjacentHTML('afterbegin', htmlEl);
  });
}

// displayMove(account1.movements);
//----------------------------------------

//----------------------------------computing usernames
const createUsernames = function (accs) {
  accs.forEach(function (accs) {
    accs.username = accs.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

//--------------------------------------

//********************************************display balance */
function displayBalance(account) {
  //cal balance
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  //display
  labelBalance.textContent = `${account.balance} €`;
}
// displayBalance(account1.movements);
//********************************************

//********************************************display income */
function calcDisplaySummary(account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
}
// calcDisplaySummary(account1.movements);
//********************************************

//******************************************** total deposit */
const euToUsd = 1.1;
function totalDepositUsd(movements) {
  return movements
    .filter(mov => mov < 0)
    .map(mov => mov * euToUsd)
    .reduce((acc, mov) => acc + mov, 0);
}
// console.log(totalDepositUsd(movements));

//******************************************** integrate it to one function of updating UI
function updateUi(acc) {
  displayBalance(acc);
  calcDisplaySummary(acc);
  displayMove(acc.movements);
}

//******************************************** login */
let currentAccount;
btnLogin.addEventListener('click', function (event) {
  //prevent from submitting/refresh page
  event.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  console.log(`LOG IN !!! current acc is ${currentAccount.username}`);
  // console.log(currentAccount);

  //check the pin number
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //if pin is correct show welcome and info
    labelWelcome.textContent = `welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    //clear input field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //show info
    containerApp.style.opacity = 100;
    updateUi(currentAccount);
    // //show movements
    // displayMove(currentAccount.movements);
    // //show balance
    // displayBalance(currentAccount.movements);
    // //show summary
    // calcDisplaySummary(currentAccount);
  }
});
//******************************************************** transfer */
btnTransfer.addEventListener('click', function (event) {
  // //prevent from submitting/refresh page / default behavior
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  //clean the input
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();

  //check transfer
  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //transfer operation
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUi(currentAccount);
  }
});

//******************************************************** */

//******************************************************** delete account */

btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  console.log('it is delete funcition_________________________');
  let testAcc;
  console.log(accounts);
  //check the account and pin
  if (accounts.find(acc => acc.username === inputCloseUsername.value)) {
    testAcc = accounts.find(acc => acc.username === inputCloseUsername.value);
    console.log('lets check your pin');
    if (testAcc.pin === Number(inputClosePin.value)) {
      console.log('lets delete your acc');
      //find the index of account and delete
      accounts.splice(
        accounts.findIndex(acc => acc.username === testAcc.username),
        1
      );
    } else console.log('your pin is incorrect');
  } else {
    console.log('your account doesnt exist');
  }

  console.log(accounts);
});

//******************************************************** loan */
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const loan = Number(inputLoanAmount.value);
  if (loan > 0 && currentAccount.some(mov => mov >= loan * 0.1))
    currentAccount.movements.push(loan);

  updateUi(currentAccount);
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});
//******************************************************** sort movements */
let sorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMove(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//_______________________________________________ out of project
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). 
For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! 
So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)

2. Create an array with both Julia's (corrected) and Kate's data

3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")

4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

//5 dog owners 2 arrays for julia and kate
//whether dog is adult  3 years old

//test data 1
// console.log('--- array ---');
// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 15, 8, 3];

// console.log(julia);
// console.log(julia.splice(2, 0));
// console.log(julia);

// console.log(julia);
// console.log(julia.slice(0, 2));
// console.log(julia);

// function checkDogs(dogsJulia, dogsKate) {
//   //delete cats
//   const newJulia = dogsJulia.slice(1, -2);
//   const totalArr = newJulia.concat(dogsKate);
//   console.log(totalArr);

//   totalArr.forEach(function (dogs, i) {
//     const someWords =
//       dogs < 3
//         ? `Dog number ${i} is still a puppy 🐶`
//         : `Dog number ${i} is an adult, and is ${dogs} years old`;

//     console.log(someWords);
//   });
// }

// checkDogs(julia, kate);

// --- map --- new array
// map will take your 'return' to generate a new array!!!,
//if you dont return anything, new array will be filled with undefined

// const movementsUSD = movements.map(mov => mov * euToUsd);

// const numbers = [1, 2, 3, 4, 5];

// const newNumbers = numbers.map(function (number) {
//   // return (number = number + 1);
//   return ++number;
//   // number = 4;
// });

// console.log(numbers);
// console.log(newNumbers);
//------

// --- filter --- new array
//when receive the ture, will return the element to the new array !!!!!!!!
// const withdrawal = movements.filter(function (mov) {
//   // return true;
//   return mov < 0;
// });
// console.log(withdrawal);

//--- reduce --- new value
// array.reduce(function(accumulator, currentValue, index, array) {
//   // return the updated accumulator
// }, initialValue);

// *********************************find maximum
//reduce just finally return the acc
// function findMax(movements) {
//   return movements.reduce((acc, cur, i) => {
//     console.log(`inde is ${i}`);
//     console.log(`acc is ${acc}`);
//     console.log(`cur is ${cur}`);

//     // if cur is biger then return, otherwise return acc
//     if (acc < cur) {
//       console.log('dayu');
//       return cur;
//     } else {
//       return acc;
//     }
//   }, movements[0]);
// }

// console.log(findMax(movements));
//********************************** */

///////////////////////////////////////
// *****************************************************  Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs.
 This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. 
If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

function calcAverageHumanAge(ages) {
  //convert dog ages to humann ages
  //filter out all dogs that are less than 18 human years old

  const result = ages
    .map(age => {
      if (age <= 2) {
        console.log(`this dog is ${2 * age}`);
        return 2 * age;
      } else {
        console.log(`this dog is ${16 + age * 4}`);
        return 16 + age * 4;
      }
    })
    .filter(age => age >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  console.log(`the average is ${result}`);
  // .reduce((acc,cur)=>acc+cur,0)

  // .filter().reduce()
}

const ages1 = [5, 2, 4, 1, 15, 8, 3];
// const ages2 = [16, 6, 10, 5, 6, 1, 4];

// calcAverageHumanAge(ages1);
// calcAverageHumanAge(ages2);

//******************************** */
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// /___________________________________ my code practice some function

//array prac
// let arr = ['a', 'b', 'c', 'd', 'e'];

// //slice method
// console.log(arr.slice(2));

// console.log(arr.slice(2, 4)); //from 2 to 4, index

// console.log(arr.slice(-2)); //last 2 elements of arr

// // shadow coppy
// console.log(arr.slice());
// console.log([...arr]);

// //splice
// // will change your original array!!!!!!
// console.log('part of splice_________');
// console.log(arr.splice(2)); //extract
// console.log(arr.splice(-1));

// //reverse
// //will change the original one!!!!!!

// //concat
// //connect two array
// const arr2 = ['f', 'g', 'h', 'i', 'j'];
// const arrTotal = arr.concat(arr2);
// console.log(arrTotal);

// //join
// console.log(arrTotal.join(' -6- '));

// splice....something
// const test = [0, 1, 2, 3, 4];
// console.log(test.findIndex(arr => arr === 6));
// test.splice(
//   test.findIndex(arr => arr === 6),
//   1
// );
// console.log(test);

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).


for each
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property.
Do NOT create a new array, simply loop over the array. 
Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too little. 
HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') 
and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., 
like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order
 (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: 
current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//********************************portion */
function addPortion(dogs) {
  dogs.forEach(dog => (dog.portion = dog.weight ** 0.75 * 28));
  console.log(dogs);
}

addPortion(dogs);
//********************************find sarah */
function findSarah(dogs) {
  return dogs.filter(dog => dog.owners.find(owner => owner === 'Sarah'));
}
console.log(findSarah(dogs));
findSarah(dogs).forEach(dog => checkFood(dog));

//********************************check food */
function checkFood(dog) {
  if (dog.curFood > dog.portion * 1.1) {
    // console.log(`${dog.owners} 's dog eat too much`);
    return 1;
  }

  if (dog.curFood < dog.portion * 0.9) {
    // console.log(`${dog.owners} 's dog eat too less`);
    return 2;
  }
  // console.log(`${dog.owners} 's dog eat ok`);
  return 6;
}

//********************************eating amount  */
const ownersEatTooMuch = dogs.filter(dog => {
  if (checkFood(dog) === 1) return true;
});

console.log(`too much__________`);
console.log(ownersEatTooMuch);

console.log(
  `${ownersEatTooMuch
    .reduce((accmu, dog, i, arr) => {
      return i !== arr.length - 1
        ? accmu + dog.owners + ' '
        : accmu + dog.owners;
    }, '')
    .replace(',', ' ')
    .replace(/ /g, ' and ')} 's dogs eat too much!`
);

const ownersEatTooLittle = dogs.filter(dog => {
  if (checkFood(dog) === 2) return true;
});
console.log(`too little__________`);
console.log(ownersEatTooLittle);

console.log(
  `${ownersEatTooLittle
    .reduce((accmu, dog, i, arr) => {
      return i !== arr.length - 1
        ? accmu + dog.owners + ' '
        : accmu + dog.owners;
    }, '')
    .replace(',', ' ')
    .replace(/ /g, ' and ')} 's dogs eat too little!`
);

//*****************************good dog */

console.log(dogs.find(dog => dog.curFood === dog.prtion));

console.log(
  dogs.find(dog => {
    if (checkFood(dog) === 6) {
      return true;
    }
  })
);

const gooDog = dogs.filter(dog => {
  if (checkFood(dog) === 6) {
    return true;
  }
});
console.log(gooDog);

//*****************************sort */
const copyDogs = dogs.slice();
console.log(copyDogs.sort((a, b) => a.portion - b.portion));

//******************************** test argument */
console.log('```````````````````````````');
const arr = [1, 2, 3, 4];

function sayhi(e) {
  console.log(e);
}

// const sayhi = function (e) {
//   console.log(e);
// };

arr.forEach(e => sayhi(e));

arr.forEach(sayhi);
