let n1 = '';
let n2 = '';
let operator = '';

function operate(op, num1, num2) {
    let result;

    switch (op) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                window.alert('You cannot divide by zero. Clear your display and try again.');
                return;
            }

            result = num1 / num2;
            break;
    }

    if (result !== undefined) {
        result = Number(result.toFixed(2));
        updateDisplay(result);
    }

    n1 = result; // n1 is the previous number (so u can do for example: 10 + 9 = 19 - 1 = 18)
    n2 = '';
    operator = op; // the operator stays the same until u change it
}

function updateDisplay(param) {
    document.querySelector('#display').textContent = `Result: ${param}`;
}

document.querySelector('#calculator').addEventListener('click', (event) => {
    const value = event.target.dataset.value;
    const operators = '+-*/';

    if (!value) return;

    if (operators.includes(value)) {
    if (n1 !== '' && n2 !== '' && operator !== '') {
        operate(operator, Number(n1), Number(n2));
    }

    operator = value;

    } else if (!operator) {
        n1 += value;
    } else {
        n2 += value;
    }

    updateDisplay(`${n1} ${operator} ${n2}`);
});

function resetVariables() {
    n1 = '';
    n2 = '';
    operator = '';

    updateDisplay('');
}

document.querySelector('#equals-btn').addEventListener('click', () => {
    if (n1 === '' || n2 === '' || operator === '') return;

    operate(operator, Number(n1), Number(n2));
});

document.querySelector('#clear-btn').addEventListener('click', () => {
    resetVariables();
});