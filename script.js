const apiUrl = `https://type.fit/api/quotes`;
let quotes = [];

$.ajax({
  type: "GET",
  url: apiUrl,
  success: function (response) {
    quotes = JSON.parse(response);
  },
  error: function (error) {
    console.log(error);
  },
  beforeSend: function () {
    $(".loader").show();
    $(".quote-container").hide();
  },
  complete: function () {
    newQuote();
    $(".loader").hide();
    $(".quote-container").show();
  },
});

function newQuote() {
  const quote = quotes[Math.trunc(Math.random() * quotes.length)];
  if (quote.text.length > 100) {
    $("#quote").addClass("long-quote");
  } else {
    $("#quote").removeClass("long-quote");
  }
  $("#quote").text(quote.text);

  if (quote.author) {
    $(".quote-author").text(quote.author);
  } else {
    $(".quote-author").text("Unknown");
  }
}

$(".newQuoteBtn").click(newQuote);
$(".twitterBtn").click(function () {
  window.open(
    `https://twitter.com/intent/tweet?text=${$("#quote").text()} - ${$(
      ".quote-author"
    ).text()}`,
    "_blank"
  );
});
