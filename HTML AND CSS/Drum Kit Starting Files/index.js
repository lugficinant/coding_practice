const drumButton = document.querySelectorAll(".drum");

let numberOfDrumButtons = drumButton.length;

//Increment (i++): This happens after each iteration of the loop body, incrementing i by 1.
// IF !!! Pre-increment (++i): The ++i increments i before the next iteration starts.

for (let i = 0; i < numberOfDrumButtons; i++) {
  drumButton[i].addEventListener("click", function () {
    console.log("666");
    let buttonInnerHTML = this.innerHTML;
    let audio;

    switch (buttonInnerHTML) {
      case "w":
        audio = new Audio("./sounds/tom-1.mp3");
        audio.play();
        console.log("666");
        break;

      case "a":
        audio = new Audio("./sounds/tom-1.mp3");
        audio.play();
        console.log("666");
        break;

      case "s":
        audio = new Audio("./sounds/tom-1.mp3");
        audio.play();
        console.log("666");
        break;
    }
  });
}

document.addEventListener("keydown", function (event) {
  const keyPressed = event.key;
  switch (keyPressed) {
    case "w":
      audio = new Audio("./sounds/tom-1.mp3");
      audio.play();
      console.log("666");
      break;

    case "a":
      audio = new Audio("./sounds/tom-1.mp3");
      audio.play();
      console.log("666");
      break;

    case "s":
      audio = new Audio("./sounds/tom-1.mp3");
      audio.play();
      console.log("666");
      break;
  }
});
