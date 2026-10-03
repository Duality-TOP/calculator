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