import generateName from "sillyName";
//
import { randomSuperhero } from "superheroes";
// var generateName = require("sillyname");
var sillyName = generateName();

console.log(`My name is ${sillyName} `);

let mySuper = randomSuperhero();

console.log(`My name is ${mySuper} `);
