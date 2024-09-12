function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Error"; 
    return a / b;
}

const operationMap = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
};

function operate(a, b, operator) {
    let result = operationMap[operator](a, b);
    if (result === "Error") {
        displayValue = "Cannot divide by 0";
        errorFlag = true; 
    } else {
        result = parseFloat(result.toFixed(4));
        displayValue = result;
        numA = result; 
        usedOperator = false; 
        errorFlag = false;
    }
    display();
}

const answer = document.querySelector('.answer');
function display() {
    answer.textContent = displayValue;
}

function handleNumbers(event) {
    if (errorFlag) return; 

    const number = event.target.dataset.value;

    if (startCalculations) {
        startCalculations = false;
        if (number !== '.') {
            displayValue = number;
        } else {
            displayValue = "0" + number;
        }
    } else {
        const operatorRegularExpression = /[+\-/*]/;
        const lastChar = displayValue.slice(-1);

        if (number === '.' && ((usedOperator && decimalB) || (!usedOperator && decimalA))) {
            return; 
        }

        if (operatorRegularExpression.test(lastChar) && number === '.') {
            displayValue += "0" + number;
        } else {
            displayValue += number;
        }
    }

    if (number === '.') {
        if (usedOperator) {
            decimalB = true; 
        } else {
            decimalA = true; 
        }
    }
    display();
}

function handleOperations(event) {
    if (errorFlag) return; 

    const operation = event.target.dataset.value;

    if (!usedOperator) {
        usedOperator = true;
        startCalculations = false;
        numA = parseFloat(displayValue);
        operator = operation;
        displayValue += operation;
    } else {
        const operatorRegularExpression = /[+\-/*=]/;
        if (!operatorRegularExpression.test(displayValue.charAt(displayValue.length-1))) {
            if (numA >= 0) {
                const operatorIndex = displayValue.search(operatorRegularExpression);
                numB = parseFloat(displayValue.slice(operatorIndex + 1));
                operate(numA, numB, operator);
                usedOperator = true;
                numA = parseFloat(displayValue);
                operator = operation;
                displayValue += operation;
            } else {
                const operatorIndex = displayValue.slice(1).search(operatorRegularExpression);
                numB = parseFloat(displayValue.slice(operatorIndex + 2));
                operate(numA, numB, operator);
                usedOperator = true;
                numA = parseFloat(displayValue);
                operator = operation;
                displayValue += operation;
            }
        }   
    }
    decimalB = false;
    display();
}

function handleClear(event) {
    displayValue = '0';
    startCalculations = true;
    numA = null;
    numB = null;
    operator = null;
    usedOperator = false;
    decimalA = false;
    decimalB = false;
    errorFlag = false; 
    display();
}

let numA = null;
let numB = null;
let operator = null;
let displayValue = '0';
let startCalculations = true;
let usedOperator = false;
let decimalA = false;
let decimalB = false;
let errorFlag = false; 

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');

numberButtons.forEach(button => {
    button.addEventListener("click", handleNumbers);
});
operationButtons.forEach(button => {
    button.addEventListener("click", handleOperations);
});
decimalButton.addEventListener("click", (event) => {
    handleNumbers(event); 
});
clearButton.addEventListener("click", (event) => {
    handleClear(event);
});
equalButton.addEventListener("click", () => {
    if (errorFlag) return; 

    const operatorRegularExpression = /[+\-/*]/; 
    let operatorIndex = displayValue.search(operatorRegularExpression);

    if (operatorIndex !== -1 && operatorIndex !== displayValue.length-1) {
        numB = parseFloat(displayValue.slice(operatorIndex + 1));
        operate(numA, numB, operator);
    }
});