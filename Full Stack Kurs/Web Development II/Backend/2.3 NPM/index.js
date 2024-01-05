import generatedName from "sillyname"
import superheroes from "superheroes"
//var generatedName = require('sillyname');
var sillyname = generatedName();
var superHeroName = superheroes.random();

console.log(`I bims, der ${superHeroName}.`);
console.log(`Meine wahre Identität ist ${sillyname}.`);