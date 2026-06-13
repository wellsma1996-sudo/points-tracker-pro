const DAILY_BUDGET = 26;
const WEEKLY_FLEX = 42;
const START_WEIGHT = 260;
const GOAL_WEIGHT = 180;

let foods = JSON.parse(localStorage.getItem("foods")) || [];
let weights = JSON.parse(localStorage.getItem("weights")) || [];

function render() {

  let used = foods.reduce((a,b) => a + b.points, 0);

  document.getElementById("used").innerText = used;
  document.getElementById("remaining").innerText =
    DAILY_BUDGET - used;

  document.getElementById("flex").innerText =
    WEEKLY_FLEX;

  document.getElementById("foodHistory").innerHTML =
    foods.map(f =>
      `<li>${f.name} - ${f.points} pts</li>`
    ).join("");

  document.getElementById("weightHistory").innerHTML =
    weights.map(w =>
      `<li>${w} lbs</li>`
    ).join("");

  if(weights.length > 0){

    let currentWeight =
      parseFloat(weights[0]);

    let lost =
      START_WEIGHT - currentWeight;

    let remaining =
      currentWeight - GOAL_WEIGHT;

    let progress =
      ((lost /
      (START_WEIGHT - GOAL_WEIGHT))
      * 100);

    document.getElementById("currentWeight")
      .innerText = currentWeight;

    document.getElementById("lost")
      .innerText = lost.toFixed(1);

    document.getElementById("remainingWeight")
      .innerText = remaining.toFixed(1);

    document.getElementById("progress")
      .innerText = progress.toFixed(1);
  }
}

function addFood(){

  let name =
    document.getElementById("foodName").value;

  let points =
    Number(
      document.getElementById("foodPoints").value
    );

  foods.push({
    name,
    points
  });

  localStorage.setItem(
    "foods",
    JSON.stringify(foods)
  );

  render();
}

function saveWeight(){

  let weight =
    document.getElementById("weight").value;

  weights.unshift(weight);

  localStorage.setItem(
    "weights",
    JSON.stringify(weights)
  );

  render();
}

render();
