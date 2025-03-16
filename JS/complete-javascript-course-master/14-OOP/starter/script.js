'use strict';

//constructor function/ cant use arrow funciton cuz we need this keyword
const Person = function (firstName, birthyear) {
  this.firstName = firstName;
  this.birthyear = birthyear;
  //never do this
  //   this.calage = function () {
  //     console.log(2077 - birthyear);
  //   };
  console.log(this);
};

//New empty {} is created
//function is called, this = {}
//{} will be linked to prototype
//function return object{}
const lupo = new Person('Lupo', 1991);

//prototypes
//it is a expression, so it can be hoisting, means you cant call ti before declaration.
Person.prototype.calage = function () {
  console.log(2077 - this.birthyear);
};
console.log(lupo.calage());

//__proto__ is property of constructor function
//person.prototype is not prototype of itself, it will be all the object frome its constructor, __proto__
// console.log(lupo.__proto__);
console.log(lupo.__proto__ === Person.prototype);
console.log(Person.__proto__);
//person.prototype is not prototype of itself, it will be all the object frome its constructor, __proto__
console.log(Person.prototype.isPrototypeOf(lupo));
console.log(Person.prototype.isPrototypeOf(Person));

//add property of prototype
Person.prototype.species = 'humen';
console.log(lupo.species);

// console.log(lupo.__proto__);
// console.log(lupo.__proto__.__proto__);
// console.log(lupo);

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(lupo);

const tiancai = new Person('congming', 1991);
console.dir(tiancai);
console.log(tiancai.__proto__ === Person.prototype);
console.log(Object.getPrototypeOf(tiancai));
console.log(Person.__proto__);
console.log(Person.prototype); //you can see how this prototype define the class Person
console.log(Array.prototype); //you can see how this prototype define the class Array
console.log(lupo.prototype); //undefi

const arr = [1, 2, 3, 4];
console.log(arr.__proto__);

//***********************challenge 1 */
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed = this.speed + 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  console.log('lets brake');
  this.speed = this.speed - 5;
  console.log(this.speed);
};
const BMW = new Car(120);
BMW.accelerate();
BMW.brake();

//**********************************************************ES6 CLASSES */
//class expresssion / another type of function
// const PersonCl = class {}
//class declaration
class PersonCl {
  //its a method of this class
  constructor(fullName, birthYear) {
    this.fullName = fullName; //own property for every object
    this.birthYear = birthYear; //own property for every object
  }
  //all method outside of constructor but inside of class, will be in the prototype of objects.
  calcAge() {
    console.log(2077 - this.birthYear);
  }

  get age() {
    return 2077 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else console.log('this is not right name');
  }

  get fullName() {
    return this._fullName;
  }
}

//if you want to add some common properties to prototype
PersonCl.prototype.rich = function () {
  console.log(`${this.firstName} is a rich guy`);
};
const lucan = new PersonCl('can', 1993);
console.log(lucan);
// console.log(lucan.__proto__);
console.log(lucan.age);

//*******************************setter and getter */
const account = {
  owner: 'lucan',
  movements: [200, 300, 400, 666, 111, 555],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
//getter
// console.log(account.latest);
//setter
account.latest = 50;
// console.log(account.movements);

//**********************************object.create */
const PersonProto = {
  calcAge() {
    console.log(2077 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

//test
// console.log(PersonProto.__proto__); //it is just a object....
// const sarah = Object.create(PersonProto);
// PersonProto = Object.create(Person.prototype); //didnt work...
// console.log(sarah.__proto__); //till now sarah is empty object just own PersonProto to be its __proto__

// sarah.init('Sarah', 1990);
// console.log(sarah.__proto__ === PersonProto.prototype); //look down
// console.log(PersonProto.prototype); //it is undefined,  because it is not a constructor function

//**********************************************challenge 2 */
class Car1 {
  constructor(made, speed) {
    this.made = made; //own property for every object
    this.speed = speed; //own property for every object
  }
  //it will be their own property for ervery object created by Car1!!!!!!!
  // accelerate = function () {
  //   this.speed = this.speed + 10;
  //   console.log(this.speed);
  // };
  // brake = function () {
  //   this.speed = this.speed - 5;
  //   console.log(this.speed);
  // };
  accelerate() {
    this.speed = this.speed + 10;
    console.log(this.speed);
  }
  brake() {
    this.speed = this.speed - 5;
    console.log(this.speed);
  }

  get speedUs() {
    return this.speed / 1.6;
  }
  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}
// const redFlag = new Car1('redFlag', 200);
// redFlag.accelerate();
// redFlag.brake();

// console.log(redFlag.speedUs);
// redFlag.speedUs = 30;
// console.log(redFlag);

//************************************************inheritance between the classes */
//constructor inheritance
const Student = function (firstName, birthYear, course) {
  //Person.call(this, firstname, birthYear):
  //Here, the Person constructor is called with this set to the current instance of Student
  Person.call(this, firstName, birthYear); //it is kind like  this.Person / current newly student object
  // this.Person(firstName,birthYear);
  // // Person's `this` will be undefined or refer to the global object
  // Person(firstname, birthYear);
  this.course = course;
};
//so far, we just had students inherit the date structure from the person, we need the prototype too.
//this one has to be first, cuz will override student.prototype
//before we link Person to Student.
console.log('``````````````````````````````````````````````````````````');
console.log(Student.prototype);
console.log(Student.prototype instanceof Object); // it is true....for now, Student.prototype it is just nomall object!!!!
console.log(Student.prototype.__proto__ === Object.prototype); //true
console.log(Student.prototype.__proto__ instanceof Object);
// now we do this!!
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
Student.prototype = Object.create(Person.prototype); // you will assign a brand new object which inherits from Person to Student prototype.
console.log(Student.prototype);
console.log(Student.prototype instanceof Person); // it is true !!!, it become an Person object!!!!!

Student.prototype.introduction = function () {
  console.log(`hi I am a student ${this.firstName}`);
};

const meko = new Student('meko', 1990, 'MBA');
console.log(Student.prototype.constructor);
Student.prototype.constructor = Student; // Fix the constructor property, sometiem is important!!!!
console.log(Student.prototype.constructor);
console.log(meko);
// console.log(meko);
// console.log(Student.prototype);
// console.log(meko.__proto__);
// console.log(meko.__proto__ === Student.prototype);

// const helo = new Person();

//
// Before Fixing the Constructor: When you do Student.prototype = Object.create(Person.prototype),
// Student.prototype is an object whose [[Prototype]] is Person.prototype, but its constructor now points to Person.

// so you can see:
// console.log(Student.prototype.constructor);  // Person

// After Fixing the Constructor: By explicitly setting Student.prototype.constructor = Student,
// you are ensuring that the constructor property points to Student.
// Student.prototype.constructor = Student;
// console.log(Student.prototype.constructor);  // Student

// However, this does not change the fact that Student.prototype still inherits from Person.prototype.
// As a result, when you log Student.prototype, the console might still show something like Person {}.
// This doesn't mean that Student.prototype is a Person object, but rather that it inherits from Person.prototype (via prototypal inheritance).

//****************************summary */
// Student.prototype = Object.create(Person.prototype) establishes the prototype chain, making Student.prototype inherit from Person.prototype.

// Even after fixing Student.prototype.constructor = Student, Student.prototype will still inherit from Person.prototype,
// which is why the console may still display it as Person {}.

// This is normal behavior and doesn’t mean that Student.prototype is a Person object; it simply reflects the inheritance relationship.

//**********************************challenge 3 */
console.log('````````````````````````````````````````````````');
const EV = function (make, speed, charge) {
  this.charge = charge;
  Car.call(this, make, speed);
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`now we charge to ${this.charge}`);
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed}km/h with a charge of ${this.charge}%`
  );
};

const Tesla = new EV('Tesla', 120, 23);

Tesla.accelerate();
Tesla.brake();
Tesla.chargeBattery(90);

//*************************************ES6 CLASS */
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //super is the constructor function of parent class
    //Always needs to be first for creating this keyword
    super(fullName, birthYear);
    this.course = course;
  }
  introduction() {
    console.log(`my name is ${this.fullName} and I study ${this.course}`);
  }
  calcAge() {
    console.log(`I am ${2077 - this.birthYear} I am a new calcAge`);
  }
}

const nate = new StudentCl('nate lu', 1998, 'learner');
console.log(nate);
nate.introduction();
nate.calcAge();

//******************************between class object.create() */
//just make new object by linking prototype chain
console.log('`````````````````````````````````````````````````````````');
const StudentProto = Object.create(PersonProto);
//now you can make new empty student object
const laka = Object.create(StudentProto);
//init funciton
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
  console.log(this);
};
//add method
StudentProto.introduce = function () {
  console.log(`I am a student ${this.firstName} I am learning ${this.course}`);
};
laka.init('laka', 1993, 'science');
// console.log(laka);

// console.log(laka.__proto__ === StudentProto);

// console.log(StudentProto instanceof PersonProto); // didnt work!!!!!! cuz PersonProto is not a constructor, 由此而知, JS判断数据的类型是从他Prototype里面第一个构造函数的类型来判断!!!!
console.log(StudentProto instanceof Object);
// console.log(laka.__proto__.__proto__ === PersonProto);
// console.log(laka.__proto__.__proto__.__proto__ === Object.prototype);

//*********************************************************** */
console.log('`````````````````````````````````````````````');
class Account {
  //public fields /just put it outside
  locale = navigator.language;
  //private fields
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;
    console.log(`open a new account, ${this.owner}~~~`);
  }
  //public method
  getMovements() {
    return this.#movements;
  }
  //API
  deposit(val) {
    this.#movements.push(val);
  }
  withdrawl(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) this.deposit(val);
    console.log('loan approved');
  }
  //private method
  #approveLoan(val) {
    return ture;
  }
}

const luco = new Account('luco', 'RMB', '666');

//****************************************************challenge 4  lets go 😎*/
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed = this.speed + 10;
    console.log(this.speed);
    return this;
  }

  brake() {
    console.log('lets brake');
    this.speed = this.speed - 5;
    console.log(this.speed);
    return this;
  }
  get speedUs() {
    return this.speed / 1.6;
  }
  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}
class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
    console.log(`new car`);
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`now we charge to ${this.#charge}`);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed}km/h with a charge of ${this.charge}%`
    );
    return this;
  }
}

const rivian = new EVCl('rivian', 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(66)
  .accelerate();

console.log('```````````````````````````');
console.log(CarCl.prototype);
console.log(Object.create(CarCl.prototype));
