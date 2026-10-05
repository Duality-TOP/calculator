# Calculator

A simple calculator built with HTML, CSS and JavaScript as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

The main goal of this project was not only to build a working calculator, but also to practice JavaScript fundamentals such as DOM manipulation, event delegation, functions, conditionals, state management and handling user input.

## Features

* Addition, subtraction, multiplication and division
* Multiple-digit numbers
* Chained calculations
* Decimal result rounding to two decimal places
* Division-by-zero protection
* Clear/reset functionality
* Dynamic display updates
* Event delegation for calculator buttons

## How it works

The calculator keeps track of three main pieces of state:

```js
let n1 = '';
let n2 = '';
let operator = '';
```

`n1` stores the first number, `n2` stores the second number, and `operator` stores the selected mathematical operator.

While the user is typing, the numbers are stored as strings. They are converted to numbers when a calculation is performed.

The basic flow is:

```text
First number → Operator → Second number → Calculation
```

For example:

```text
10 → + → 9 → = → 19
```

After the calculation, the result becomes the new first number. This allows calculations to be chained:

```text
10 + 9 = 19
19 - 1 = 18
18 * 2 = 36
```

## Button values with `data-value`

The calculator buttons use the HTML `data-value` attribute:

```html
<button data-value="7">7</button>
<button data-value="+">+</button>
```

JavaScript can then retrieve the value of the clicked button through:

```js
const value = event.target.dataset.value;
```

This separates the value used by JavaScript from the visible content of the button.

## Event delegation

Instead of adding a separate event listener to every number and operator button, the calculator uses event delegation.

A single listener is attached to the `#calculator` element:

```js
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
```

When a button inside the calculator is clicked, `event.target` identifies the element that was clicked and `dataset.value` retrieves its value.

The `operators` string is used with `includes()` to determine whether the clicked button represents an operator:

```js
if (operators.includes(value)) {
    operator = value;
}
```

If the button is a number and no operator has been selected yet, the number is appended to `n1`:

```js
n1 += value;
```

Once an operator has been selected, numbers are appended to `n2` instead:

```js
n2 += value;
```

### Why use `+=`?

Using `+=` is important when entering multiple digits.

For example:

```js
n1 = '1';
n1 += '2';
```

produces:

```js
n1 === '12';
```

This is equivalent to:

```js
n1 = n1 + '2';
```

Using assignment instead would overwrite the previous digit:

```js
n1 = '1';
n1 = '2';
```

which would produce:

```js
n1 === '2';
```

## `operate()`

The `operate()` function performs the calculation based on the selected operator.

```js
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

    n1 = result;
    n2 = '';
    operator = op;
}
```

The operator is handled with a `switch` statement.

Because `n1` and `n2` are stored as strings while the user is entering values, they are converted before calling `operate()`:

```js
operate(operator, Number(n1), Number(n2));
```

The function also protects against division by zero:

```js
if (num2 === 0) {
    window.alert('You cannot divide by zero. Clear your display and try again.');
    return;
}
```

### Rounding the result

The result is rounded to two decimal places:

```js
result = Number(result.toFixed(2));
```

`toFixed(2)` returns a string, so `Number()` is used afterward to convert the result back into a number.

For example:

```js
10 / 3
```

becomes approximately:

```js
3.33
```

instead of displaying a long floating-point result.

## Chained calculations

After a successful calculation, the result is assigned to `n1`:

```js
n1 = result;
```

`n2` is then cleared:

```js
n2 = '';
```

The current operator is kept:

```js
operator = op;
```

This makes it possible to continue calculating with the previous result.

For example:

```text
10 + 9 =
```

produces:

```text
19
```

Internally, the state becomes approximately:

```js
n1 = 19;
n2 = '';
operator = '+';
```

If the user then enters `- 1 =`, the calculator can use `19` as the first number and produce:

```text
18
```

When the user selects another operator, the operator is simply replaced with the new one.

## `updateDisplay()`

The `updateDisplay()` function is responsible for updating the calculator's display:

```js
function updateDisplay(param) {
    document.querySelector('#display').textContent = `Result: ${param}`;
}
```

It selects the display element and changes its `textContent`.

The display is also updated after button clicks so the user can see the current calculator state before pressing `=`.

## The equals button

The equals button has its own event listener:

```js
document.querySelector('#equals-btn').addEventListener('click', () => {
    if (n1 === '' || n2 === '' || operator === '') return;

    operate(operator, Number(n1), Number(n2));
});
```

Before calculating, the function checks whether all required values exist.

If the first number, second number or operator is missing, the function simply returns:

```js
if (n1 === '' || n2 === '' || operator === '') return;
```

Otherwise, `operate()` is called with the current operator and numbers.

## The clear button

The calculator uses a `resetVariables()` function to reset its state:

```js
function resetVariables() {
    n1 = '';
    n2 = '';
    operator = '';
    updateDisplay('');
}
```

The clear button calls this function:

```js
document.querySelector('#clear-btn').addEventListener('click', () => {
    resetVariables();
});
```

This resets all three state variables and clears the display.

Keeping this logic inside a separate function avoids repeating the same reset operations elsewhere in the code.

## Why are the equals and clear buttons outside the calculator event delegation?

The number and operator buttons use event delegation through the `#calculator` element.

The equals and clear buttons have their own event listeners because they perform different actions from the buttons that enter numbers and operators.

This also avoids having their clicks handled by the calculator's number/operator logic.

## Project structure

```text
calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Technologies

* HTML5
* CSS3
* JavaScript
* DOM manipulation
* Event listeners
* Event delegation

## What I learned

This project helped me practice several JavaScript concepts:

* Managing application state with variables
* Working with the DOM
* Using `dataset` to read custom HTML attributes
* Event delegation
* Arrow functions
* `switch` statements
* Conditional logic
* Converting values with `Number()`
* Working with strings and the `+=` operator
* Creating reusable functions
* Handling edge cases such as division by zero
* Resetting application state
* Chaining operations
* Rounding numerical results

The project also went through several iterations while being developed. Bugs and unnecessary code were gradually removed, and the event-handling logic was refactored as the calculator became more complete.