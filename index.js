let n1 = "", n2 = "", operator;

function operate(n1, n2) {
    let result;

    switch (operator) {
        case "+":
            result = Number(n1) + Number(n2);
            break;
        case "-":
            result = Number(n1) - Number(n2);
            break;
        case "*":
            result = Number(n1) * Number(n2);
            break;
        case "/":
            if (Number(n2) === 0) { 
            alert("You cannot divide by zero!");
            return;
        }

            result = Number(n1) / Number(n2);
            break;
    }

    if (result !== undefined) updateDisplay(result);
}

function updateDisplay(value) {
    if (value === undefined || value === null) return;

    const display = document.getElementById("display");
    display.textContent = "Result: " + value;
}

// event delegation here
const calculator = document.getElementById("calculator").addEventListener("click", (event) => {
    const target = event.target;
    const value = target.dataset.value;

    if (value === "+" || value === "-" || value === "*" || value === "/") {
        operator = value;
    } else if (!operator) {
        n1 = value;
    } else {
        n2 = value;
    }

    // if theres no operator, store the first number, else store the second number and perform the operation when the equal btn is clicked
});

const equalBtn = document.getElementById("equal-btn").addEventListener("click", () => {
    if (n1 && n2 && operator) {
        operate(n1, n2);
    }
});

const clearBtn = document.getElementById("clear-btn").addEventListener("click", () => {
    n1 = "";
    n2 = "";
    operator = undefined;
    
    updateDisplay("");
});