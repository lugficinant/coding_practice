console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

let gamePattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).addClass(".pressed");
  setTimeout(function () {
    $("#" + randomChosenColour).removeClass(".pressed");
  }, 500);
  //
  let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

// function playSound(soundName) {
//   let audio;
//   switch (soundName) {
//     case "blue":
//       audio = new Audio("../sounds/blue.mp3");
//       break;
//     case "green":
//       audio = new Audio("../sounds/green.mp3");
//       break;
//     case "red":
//       audio = new Audio("../sounds/red.mp3");
//       break;
//     case "wrong":
//       audio = new Audio("../sounds/wrong.mp3");
//       break;
//     case "blue":
//       audio = new Audio("../sounds/blue.mp3");
//       break;
//   }
// }
