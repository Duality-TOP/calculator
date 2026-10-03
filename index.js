let n1 = "", n2 = "", operator;

function operate(n1, n2) {
    let result;

    switch (operator) { // here we check which operator was selected and perform the corresponding operation, without the need of functions
        case "+":
            result = parseFloat(n1) + parseFloat(n2);
            break;
        case "-":
            result = parseFloat(n1) - parseFloat(n2);
            break;
        case "*":
            result = parseFloat(n1) * parseFloat(n2);
            break;
        case "/":
            if (parseFloat(n2) === 0) { 
            alert("You cannot divide by zero!");
            return;
        }

            result = parseFloat(n1) / parseFloat(n2);
            break;
    }

    if (result !== undefined) updateDisplay(result);
}

function updateDisplay(value) {
    if (value === undefined || value === null) return; // if the value is undefined or null, we don't want to update the display

    const display = document.getElementById("display");
    display.textContent = "Result: " + value;
}

// event delegation here, we listen for clicks on the calculator container and determine which button was clicked based on the data-value attribute. This way, we don't have to add event listeners to each button individually.
const calculator = document.getElementById("calculator").addEventListener("click", (event) => {
    const target = event.target;
    const value = target.dataset.value;

    if (value === "+" || value === "-" || value === "*" || value === "/") {
        operator = value;
    } else if (!operator) {
        n1 += value;
    } else {
        n2 += value;
    }

    // if theres no operator, store the first number, else store the second number and perform the operation when the equal btn is clicked
});

// event listener for the equal button, when clicked, we check if both numbers and the operator are defined, and if so, we call the operate function to perform the calculation.
const equalBtn = document.getElementById("equals-btn").addEventListener("click", () => {
    if (n1 && n2 && operator) {
        operate(n1, n2);
    }
});

// event listener for the clear button, when clicked, we reset the numbers and operator to their initial state and update the display to be empty.
const clearBtn = document.getElementById("clear-btn").addEventListener("click", () => {
    n1 = "";
    n2 = "";
    operator = undefined;

    updateDisplay("");
});