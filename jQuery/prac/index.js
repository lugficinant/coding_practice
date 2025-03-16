// check our jquery whether is ready
//actually to check the whether dom is ready
// $(document).ready(function () {
//   $("h1").css("color", "red");
// });

$("h1").css("color", "red");

// addEventListener
$("h1").click(function () {
  $("h1").css("color", "purple");
});

$("button").click(function () {
  $("h1").css("color", "red");
});
//for input
$("input").keypress(function (event) {
  console.log(event.key);
  $("h1").text(event.key);
});

//on, choose the eventtype you need
$("h1").on("mouseover", function () {
  $("h1").css("color", "pink");
});

//create a new element with before method / after can be used too
//if you want to add it inside the selected ele, you can use prepen and append 😎
$("h1").before("<button>New</button>");

//animation 😂
$("h1").on("click", function () {
  //   $("h1").hide();
  //cooler one fadeout
  $("h1").fadeOut();
  setTimeout(() => {
    // $("h1").show();
    $("h1").fadeIn();
  }, 300);
});
