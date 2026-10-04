# Calculator Project README

## Here's how I initially finished the calculator:

I used GitHub Copilot for some guidance, such as fixing bugs (that's okay, as long as you learn something from it) or implementing logic.

There are three main things I have used to create the calculator project:

```
1 - If there's no operator, we store the first number. Else, second number;
2 - We must not use the assignment operator on the event delegation that handles numbers, operators etc... Since it would conflict and for example, if you were trying to do 12 + 7, it would return 9, why? Because of this little guy here: ' = '. In other words, using it would reassign values we don't want to;
3 - We should handle cases of undefined or "" (empty string) in the if statements. Since the variables are intialized this way.

Additional: We will use 'data-value' in the HTML (to separate HTML from JS and also control it better).
```


### Functions (normal type)

Now moving onto functions. The first function created is 'operate()', which takes one parameter (operator);

```
JavaScript brief explanation of operate():

function operate() is used to calculate the first and second number, there are some safeguards such as: 

if (result !== undefined) updateDisplay(result)

or by checking if the second number is 0 (which does a window alert).
```

The second function is 'updateDisplay()', self-explanatory. Here's what it does:

function updateDisplay(param) {
    const display = document.querySelector("#display"); // selects the h1 in HTML

    display.textContent = `Result: ${param}`; // updates the h1
}

### Arrow functions and event delegations

Moving onto (arrow) functions and event delegations, let's start with the calculator event delegation.

```
JavaScript SnapShot (event delegation):

const target = event.target;
    const value = target.dataset.value;
    const operators = "+-*/"; // self-explanatory

    if (!value) return; // if there's no value, return and end the program

    if (operators.includes(value)) { // here we use includes() to determine if its an operator or not, reducing the if-statements that were in its early stage
        operator = value;
    } else if (!operator) { // if theres no operator, store in n1, else, n2
        n1 += value;
    } else if (operator !== undefined) {
        n2 += value;
    }

    // as said earlier, the += does fix the reassignment problem since now it doesnt overwrite the last input

    updateDisplay(`Result: ${n1} ${operator} ${n2}`); // here we update the display after each click, but theres no handling for undefined values
```

```
JavaScript SnapShot (arrow functions)

Here we have the equalBtn function:

const equalsBtn = document.querySelector("#equals-btn").addEventListener("click", () => {
    if (n1 === "" || n2 === "" || operator === undefined) return; // self-explanatory, already explained earlier the return, but the || in english is OR

    operate(operator); // if everything is correct, it calls the operate() function
});

Now, we have the clearBtn function, which clears the display and resets the numbers/operator:

const clearBtn = document.querySelector("#clear-btn").addEventListener("click", () => {
    n1 = "", n2 = "", operator = undefined; // here we reassign all values in one line using the comma (which is very useful and saves lines :D)

    updateDisplay(""); // updates the display to an empty string (by default, the function has the string "Result:" before the parameter given.)
});
```