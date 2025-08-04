var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var hasStarted = false;
var level = 0;


$(document).keydown(function() {
  if (!hasStarted) {

    updateLevel();
    nextSequence();
    hasStarted = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  level++;
  updateLevel();

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }

  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  hasStarted = false;
}

function updateLevel() {
  $("#level-title").text("Level " + level);
}
