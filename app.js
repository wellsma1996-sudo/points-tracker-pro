const DAILY_BUDGET = 26;

let foods = JSON.parse(localStorage.getItem("foods")) || [];
let weights = JSON.parse(localStorage.getItem("weights")) || [];

function render() {
  let used = foods.reduce((a,b) => a + b.points, 0);

  document.getElementById("used").innerText = used;
  document.getElementById("remaining").innerText = DAILY_BUDGET - used;

  document.getElementById("foodHistory").innerHTML =
    foods.map(f => `<li>${f.name} - ${f.points} pts</li>`).join("");

  document.getElementById("weightHistory").innerHTML =
    weights.map(w => `<li>${w} lbs</li>`).join("");
}

function addFood() {
  let name = document.getElementById("foodName").value;
  let points = Number(document.getElementById("foodPoints").value);

  foods.push({name, points});

  localStorage.setItem("foods", JSON.stringify(foods));

  render();
}

function saveWeight() {
  let weight = document.getElementById("weight").value;

  weights.unshift(weight);

  localStorage.setItem("weights", JSON.stringify(weights));

  render();
}

render();
