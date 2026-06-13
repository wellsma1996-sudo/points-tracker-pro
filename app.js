const DAILY_BUDGET = 26;
const WEEKLY_FLEX = 42;
const START_WEIGHT = 260;
const GOAL_WEIGHT = 180;

let foods = JSON.parse(localStorage.getItem("foods")) || [];
let weights = JSON.parse(localStorage.getItem("weights")) || [];

function setText(id, value) {
const el = document.getElementById(id);
if (el) {
el.innerText = value;
}
}

function render() {

```
let used = foods.reduce(
    (total, food) => total + food.points,
    0
);

setText("used", used);
setText("remaining", DAILY_BUDGET - used);
setText("flex", WEEKLY_FLEX);

const foodHistory =
    document.getElementById("foodHistory");

if (foodHistory) {
    foodHistory.innerHTML =
        foods.map(food =>
            `<li>${food.name} - ${food.points} pts</li>`
        ).join("");
}

const weightHistory =
    document.getElementById("weightHistory");

if (weightHistory) {
    weightHistory.innerHTML =
        weights.map(weight =>
            `<li>${weight} lbs</li>`
        ).join("");
}

if (weights.length > 0) {

    let currentWeight =
        parseFloat(weights[0]);

    let lost =
        START_WEIGHT - currentWeight;

    let remaining =
        currentWeight - GOAL_WEIGHT;

    let progress =
        (lost /
        (START_WEIGHT - GOAL_WEIGHT))
        * 100;

    setText(
        "currentWeight",
        currentWeight
    );

    setText(
        "lost",
        lost.toFixed(1)
    );

    setText(
        "remainingWeight",
        remaining.toFixed(1)
    );

    setText(
        "progress",
        progress.toFixed(1)
    );
}
```

}

function addFood() {

```
let name =
    document.getElementById("foodName").value.trim();

let points =
    Number(
        document.getElementById("foodPoints").value
    );

if (!name) {
    alert("Enter a food name.");
    return;
}

foods.unshift({
    name,
    points
});

localStorage.setItem(
    "foods",
    JSON.stringify(foods)
);

render();
```

}

function saveWeight() {

```
let weight =
    Number(
        document.getElementById("weight").value
    );

if (!weight) {
    alert("Enter a weight.");
    return;
}

weights.unshift(weight);

localStorage.setItem(
    "weights",
    JSON.stringify(weights)
);

render();
```

}

function refreshDashboard() {
render();
alert("Dashboard refreshed.");
}

function resetFoodToday() {

```
const typed =
    prompt(
        "Type CLEAR to remove all food entries."
    );

if (typed !== "CLEAR") {
    return;
}

if (
    !confirm(
        "Delete all food entries?"
    )
) {
    return;
}

foods = [];

localStorage.removeItem("foods");

render();
```

}

function clearAllProgress() {

```
const typed =
    prompt(
        "Type RESET to delete everything."
    );

if (typed !== "RESET") {
    return;
}

if (
    !confirm(
        "Delete ALL progress?"
    )
) {
    return;
}

foods = [];
weights = [];

localStorage.removeItem("foods");
localStorage.removeItem("weights");

render();
```

}

render();
