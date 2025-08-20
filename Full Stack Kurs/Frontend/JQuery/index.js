$("h1").css("color", "red");

$("h1").addClass("big-title margin-50");

console.log($("h1").css("font-size"));

$("h1").text("Hello jQuery!");

$("h1").click(function () {
    $("h1").css("color", "blue");
});

$("button").click(function () {
    $("h1").css("color", "green");
});

$("input").keypress(function (event) {
    console.log(event.key);
});

$(document).keypress(function (event) {
    $("h1").text(event.key);
});

$("h1").before("<button>Before</button>");
$("h1").after("<button>After</button>");
$("h1").prepend("<button>Prepend</button>");
$("h1").append("<button>Append</button>");

$(".fourth").on("click", function () {
    $("h1").fadeToggle();
});

$(".third").on("click", function () {
    $("h1").animate({ opacity: 0.5 });
});
