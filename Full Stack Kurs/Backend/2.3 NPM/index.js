// var generateName = require("sillyname")

import generateName from "sillyname"
var sillyName = generateName()
import { randomSuperhero } from "superheroes" // Importiert die spezifische Funktion
var heroName = randomSuperhero();

console.log(`My name is ${sillyName}`);
console.log(`My heroname ist ${heroName}`)