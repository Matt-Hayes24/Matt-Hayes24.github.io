let currentNumber = "0";
let previousNumber  = "0";
let currentOperator = "";
let expanded = 0;
let isDecimal = false;
const container = document.getElementById('calculator');
const output = document.getElementById('output');
let number1 = 0;
let number2 = 0;

// sets up the default layout of the calculator
const buttons = document.getElementById('buttons').querySelectorAll('button');
buttons.forEach(button => {
    button.style.gridArea = button.id;
    button.style.background = "#bfbfbf";
});


// adds event listener to numbers to add that number to the output
let numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', event => {
        currentNumber = currentNumber + event.target.value;
        if(currentNumber.charAt(0) == "0") {
            currentNumber = currentNumber.substring(1);
        }
        output.textContent = currentNumber;
    });
});

// adds event listener to the decimal
let decimal = document.getElementById('decimal');
decimal.addEventListener('click', event => {
    if(!isDecimal) {
        currentNumber = currentNumber + event.target.value;
        if(currentNumber.charAt(0) == "0") {
            currentNumber = currentNumber.substring(1);
        }
        output.textContent = currentNumber;
        isDecimal = true;
    }
});

// adds event listener to clear the calculator
let clear = document.getElementById('clear');
clear.addEventListener('click', event => {
    currentNumber = "0";
    previousNumber = "0";
    isDecimal = false;
    output.textContent = currentNumber;
});

// adds event listener to delete the last digit entered
let del = document.getElementById('delete');
del.addEventListener('click', event => {
    if(currentNumber != '0') {
        if(currentNumber.charAt(currentNumber.length-1) == '.') {
            isDecimal = false;
        }
        currentNumber = currentNumber.slice(0, -1);
        if(currentNumber.length == 0) {
            currentNumber = '0';
        }
        output.textContent = currentNumber;
    }
})


// adds event listener to operators to perform their operations
let operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('click', event => {
        currentOperator = event.target.value;
        previousNumber = currentNumber;
        currentNumber = "0";
        isDecimal = false;
    });
});

// equals button that calls the operate function when presed
let equals = document.getElementById('equals');
equals.addEventListener('click', event => {
    currentNumber = operate();
    output.textContent = currentNumber;
});

// function that performs the desired operation on the two numbers
function operate() {
    let num1 = parseFloat(currentNumber);
    let num2 = parseFloat(previousNumber);
    switch(currentOperator) {
        case "+":
            return (num1 + num2).toString();
        case "-":
            return (num1 - num2).toString();
        case "*":
            return (num1 * num2).toString();
        case "/":
            return (num1 / num2).toString();

    
    }
}

/* creates the panel of function buttons
 * gives these buttons functionality by adding event listeners
 */
const operations = document.getElementById('extraOperations');
const functions = document.getElementById('function');
functions.addEventListener('click', event => {
    if(expanded == 0) {
        let modulus = document.createElement('button');
        modulus.textContent = '%';
        modulus.classList.add("extraOperation");
        modulus.style.background = "#bfbfbf";

        let squareRoot = document.createElement('button');
        squareRoot.textContent = 'sqrt';
        squareRoot.classList.add("extraOperation");
        squareRoot.style.background = "#bfbfbf";

        let naturalLog = document.createElement('button');
        naturalLog.textContent = 'ln';
        naturalLog.value = "ln";
        naturalLog.classList.add("extraOperation");
        naturalLog.style.background = "#bfbfbf";

        let sin = document.createElement('button');
        sin.textContent = 'sin()';
        sin.classList.add("extraOperation");
        sin.style.background = "#bfbfbf";

        let cos = document.createElement('button');
        cos.textContent = 'cos()';
        cos.classList.add("extraOperation");
        cos.style.background = "#bfbfbf";

        let tan = document.createElement('button');
        tan.textContent = 'tan()';
        tan.classList.add("extraOperation");
        tan.style.background = "#bfbfbf";


        operations.appendChild(modulus);
        operations.appendChild(squareRoot);
        operations.appendChild(naturalLog);
        operations.appendChild(sin);
        operations.appendChild(cos);
        operations.appendChild(tan);
        
        let extraOperators = document.querySelectorAll('.extraOperation');
        extraOperators.forEach(operator => {
            operator.addEventListener('click', event => {
                currentOperator = event.target.value;
                previousNumber = currentNumber;
                currentNumber = "0";
                console.log(currentOperator);
                condense();
            });
        });
        
        //container.prepend(operations);
        expanded = 1;
        buttons.forEach(button => {
            button.style.background = "#e8e8e8";
            button.style.color = "#d2d2d2";
        });
    } else {
        condense();
    }
    
});

//automatically condenses the extra operations when one is pressed
function condense() {
    console.log("hi");
    expanded = 0;
    while(operations.firstChild) {
        operations.removeChild(operations.firstChild);
    }
    buttons.forEach(button => {
        button.style.background = "#bfbfbf";
        button.style.color = "black";
    });
}



