const GOLD_PRICE = 280;

function convert() {
  let g = document.getElementById("grams").value;
  let value = g * GOLD_PRICE;
  document.getElementById("result").innerText =
    "AED " + value;
}

function withdraw() {
  let a = document.getElementById("withdraw").value;
  let g = a / GOLD_PRICE;

  document.getElementById("withdrawResult").innerText =
    "Needs " + g.toFixed(2) + "g gold";
}
