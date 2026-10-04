# Calculator Project README

## How I initially built the calculator

I used GitHub Copilot for some guidance, such as fixing bugs and helping me implement some logic. That's okay as long as I understand what the code does and learn from it.

There are three main concepts I used to create the calculator:

```text
1 - If there is no operator, we store the first number. Once an operator is selected, we store the second number.

2 - When entering multiple digits, we must append the new digit to the existing value instead of replacing it. For example, using `n1 = value` would make `12` become `2`, while `n1 += value` allows us to build `12` one digit at a time.

3 - We need to handle cases such as `undefined` and `''` (empty strings) in our conditions because the variables are initialized with these values.
```

### `data-value`

The buttons use the `data-value` attribute in HTML:

```html
<button data-value="7">7</button>
<button data-value="+">+</button>
```

This allows JavaScript to read the value of the button through:

```js
const value = event.target.dataset.value;
```

This keeps the value used by JavaScript separate from the visible text of the HTML button.

---

## Functions

### `operate()`

The first function is `operate()`, which takes one parameter: the operator.

```js
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
```

`operate()` checks which operator was selected and performs the corresponding calculation using `switch`.

`n1` and `n2` are strings while the user is entering the numbers, so `Number()` converts them to numbers before performing the calculation.

There is also a safeguard against division by zero:

```js
if (Number(n2) === 0) {
    window.alert('You cannot divide by zero. Clear your display and try again.');
    return;
}
```

The function also checks whether `result` is `undefined` before updating the display:

```js
if (result !== undefined) updateDisplay(result);
```

---

### `updateDisplay()`

The second function is `updateDisplay()`. Its purpose is to update the calculator display.

```js
function updateDisplay(param) {
    const display = document.querySelector('#display');

    display.textContent = `Result: ${param}`;
}
```

It selects the `<h1>` element from the HTML and changes its `textContent`.

---

## Arrow functions and event delegation

The calculator uses event delegation for the number and operator buttons.

Instead of adding an event listener to every button individually, we add one listener to the `#calculator` element:

```js
document.querySelector('#calculator').addEventListener('click', (event) => {
    const target = event.target;
    const value = target.dataset.value;
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
```

### How it works

First, we get the element that was clicked:

```js
const target = event.target;
```

Then we get its `data-value`:

```js
const value = target.dataset.value;
```

For example, clicking this button:

```html
<button data-value="7">7</button>
```

gives us:

```js
value === '7';
```

We then use `includes()` to check whether the value is an operator:

```js
if (operators.includes(value)) {
    operator = value;
}
```

If it is not an operator and there is no operator yet, the value is added to `n1`:

```js
else if (!operator) {
    n1 += value;
}
```

If an operator already exists, the value is added to `n2`:

```js
else {
    n2 += value;
}
```

The `+=` operator is important here.

For example:

```js
n1 = '1';
n1 += '2';
```

results in:

```js
n1 === '12';
```

This is effectively the same as:

```js
n1 = n1 + '2';
```

Using `n1 = value` instead would replace the previous value:

```js
n1 = '1';
n1 = '2';
```

which would result in:

```js
n1 === '2';
```

---

## The equals button

The equals button has its own event listener:

```js
document.querySelector('#equals-btn').addEventListener('click', () => {
    if (n1 === '' || n2 === '' || operator === undefined) return;

    operate(operator);
});
```

Before performing the calculation, we check whether the required values exist.

If `n1` is empty, `n2` is empty, or there is no operator, the function returns and stops:

```js
if (n1 === '' || n2 === '' || operator === undefined) return;
```

If everything is valid, we call:

```js
operate(operator);
```

---

## The clear button

The clear button resets the calculator's state:

```js
document.querySelector('#clear-btn').addEventListener('click', () => {
    n1 = '', n2 = '', operator = undefined;

    updateDisplay('');
});
```

The variables are reassigned to their initial values:

```js
n1 = '';
n2 = '';
operator = undefined;
```

The display is then cleared by calling:

```js
updateDisplay('');
```

The comma operator can also be used to make multiple assignments in one statement:

```js
n1 = '', n2 = '', operator = undefined;
```

However, writing the assignments separately can sometimes be easier to read:

```js
n1 = '';
n2 = '';
operator = undefined;
```

Both approaches work.
