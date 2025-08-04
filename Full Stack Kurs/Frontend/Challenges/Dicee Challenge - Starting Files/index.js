 function changeImages() {
  var randomNumber1 = Math.floor(Math.random() * 6) + 1;
  var randomNumber2 = Math.floor(Math.random() * 6) + 1;
  document.querySelector("img.img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");
  document.querySelector("img.img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");
  callTheWinner(randomNumber1, randomNumber2);
}

function callTheWinner(randomNumber1, randomNumber2) {
  if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").textContent = "🚩P1 is the Winner!";
  }
  else if (randomNumber1 < randomNumber2) {
    document.querySelector("h1").textContent = "P2 is the Winner! 🚩";
  } else {
    document.querySelector("h1").textContent = "Draw!";
  }
}

changeImages();
