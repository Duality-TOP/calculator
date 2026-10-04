let n1 = '', n2 = '', operator;

function operate(op) {
    let result;

    switch (op) {
        case '+':
            result = Number(n1) + Number(n2);
            break;
        case '-':
            result = Number(n1) - Number(n2);
            break;
        case '*':
            result = Number(n1) * Number(n2);
            break;
        case '/':
            if (Number(n2) === 0) {
                window.alert('You cannot divide by zero. Clear your display and try again.');
                return;
            }

            result = Number(n1) / Number(n2);
            break;
    }

    if (result !== undefined) updateDisplay(result);
}

function updateDisplay(param) {
    const display = document.querySelector('#display');

    display.textContent = `Result: ${param}`;
}

document.querySelector('#calculator').addEventListener('click', (event) => {
    const value = event.target.dataset.value;
    const operators = '+-*/';

    if (!value) return;

    if (operators.includes(value)) {
        operator = value;
    } else if (!operator) {
        n1 += value;
    } else {
        n2 += value;
    }

    updateDisplay(`${n1} ${operator} ${n2}`);
});

document.querySelector('#equals-btn').addEventListener('click', () => {
    if (n1 === '' || n2 === '' || operator === undefined) return;

    operate(operator);
});

document.querySelector('#clear-btn').addEventListener('click', () => {
    n1 = '', n2 = '', operator = undefined;

    updateDisplay('');
});