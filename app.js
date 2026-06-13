const DAILY_BUDGET = 26;
const WEEKLY_FLEX = 42;
const START_WEIGHT = 260;
const GOAL_WEIGHT = 180;

let foods =
JSON.parse(localStorage.getItem("foods"))
|| [];

let weights =
JSON.parse(localStorage.getItem("weights"))
|| [];

function render() {

```
let used =
    foods.reduce(
        (total, food) =>
            total + food.points,
        0
    );

document.getElementById("used").innerText =
    used;

document.getElementById("remaining").innerText =
    DAILY_BUDGET - used;

document.getElementById("flex").innerText =
    WEEKLY_FLEX;

document.getElementById("foodHistory").innerHTML =
    foods.map(food =>
        `<li>${food.name} - ${food.points} pts</li>`
    ).join("");

document.getElementById("weightHistory").innerHTML =
    weights.map(weight =>
        `<li>${weight} lbs</li>`
    ).join("");

if (weights.length > 0) {

    let currentWeight =
        parseFloat(weights[0]);

    let lost =
        START_WEIGHT - currentWeight;

    let remaining =
        currentWeight - GOAL_WEIGHT;

    let progress =
        (
            lost /
            (START_WEIGHT - GOAL_WEIGHT)
        ) * 100;

    document.getElementById("currentWeight")
        .innerText = currentWeight;

    document.getElementById("lost")
        .innerText =
        lost.toFixed(1);

    document.getElementById("remainingWeight")
        .innerText =
        remaining.toFixed(1);

    document.getElementById("progress")
        .innerText =
        progress.toFixed(1);

} else {

    document.getElementById("currentWeight")
        .innerText = START_WEIGHT;

    document.getElementById("lost")
        .innerText = "0";

    document.getElementById("remainingWeight")
        .innerText =
        START_WEIGHT - GOAL_WEIGHT;

    document.getElementById("progress")
        .innerText = "0";
}
```

}

function addFood() {

```
let name =
    document.getElementById("foodName")
    .value
    .trim();

let points =
    Number(
        document.getElementById("foodPoints")
        .value
    );

if (name === "") {
    alert("Please enter a food name.");
    return;
}

if (
    isNaN(points) ||
    points < 0
) {
    alert("Please enter a valid point value.");
    return;
}

foods.unshift({
    name: name,
    points: points
});

localStorage.setItem(
    "foods",
    JSON.stringify(foods)
);

document.getElementById("foodName")
    .value = "";

document.getElementById("foodPoints")
    .value = "";

render();
```

}

function saveWeight() {

```
let weight =
    Number(
        document.getElementById("weight")
        .value
    );

if (
    isNaN(weight) ||
    weight <= 0
) {
    alert("Please enter a valid weight.");
    return;
}

weights.unshift(weight);

localStorage.setItem(
    "weights",
    JSON.stringify(weights)
);

document.getElementById("weight")
    .value = "";

render();
```

}

function refreshDashboard() {

```
foods =
    JSON.parse(
        localStorage.getItem("foods")
    ) || [];

weights =
    JSON.parse(
        localStorage.getItem("weights")
    ) || [];

render();

alert("Dashboard refreshed.");
```

}

function resetFoodToday() {

```
const typedText =
    prompt(
        "Type CLEAR to remove all food entries."
    );

if (
    typedText === null
) {
    return;
}

if (
    typedText !== "CLEAR"
) {
    alert(
        "Reset cancelled. You must type CLEAR exactly."
    );
    return;
}

const finalCheck =
    confirm(
        "Final confirmation: Delete all food entries?"
    );

if (
    !finalCheck
) {
    return;
}

localStorage.removeItem("foods");

foods = [];

render();

alert(
    "Food entries cleared."
);
```

}

function clearAllProgress() {

```
const typedText =
    prompt(
        "DANGER: This will permanently delete ALL food history, weight history, and progress.\n\nType RESET to continue."
    );

if (
    typedText === null
) {
    return;
}

if (
    typedText !== "RESET"
) {
    alert(
        "Reset cancelled. You must type RESET exactly."
    );
    return;
}

const finalCheck =
    confirm(
        "Final confirmation: Delete ALL progress?"
    );

if (
    !finalCheck
) {
    return;
}

localStorage.removeItem("foods");
localStorage.removeItem("weights");

foods = [];
weights = [];

render();

alert(
    "All progress has been deleted."
);
```

}

render();
