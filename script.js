function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

const operationMap = {
    add,
    subtract,
    multiply,
    divide,
  };

function operate(a, b, operator) {
    usedOperator = false;
    displayValue = operationMap[operator](a, b);
    display();
}

const answer = document.querySelector('.answer');
function display() {
    answer.textContent = displayValue;
}

function handleNumbers(event) {
    const number = event.target.dataset.value;
    if (startCalculations) {
        startCalculations = false;
        if (number!=='.') {
            displayValue = number;
        } else {
            displayValue += number;
        }
    } else {
        displayValue += number;
    }
    display();
}

function handleOperations(event) {
    const operation = event.target.dataset.value;
    if (!usedOperator) {
        usedOperator = true;
        numA = parseFloat(displayValue);
        operator = operation;
    } else {
        operate(numA, numB, operator);
        usedOperator = true;
        numA = displayValue;
        operator = operation;
        displayValue += operator;
    }
    display();
}

function handleClear(event) {
    displayValue = '0';
    startCalculations = true;
    numA = null;
    numB = null;
    operator = null;
    usedOperator = false;
    display();
}

let numA = null;
let numB = null;
let operator = null;
let displayValue = '0';
let startCalculations = true;
let usedOperator = false;


const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
numberButtons.forEach(button => {
    button.addEventListener("click", handleNumbers);
    console.log("AAA");
});
operationButtons.forEach(button => {
    button.addEventListener("click", handleOperations);
});
decimalButton.addEventListener("click", (event) => {
    if (!displayValue.includes('.')) {
        handleNumbers(event);
    }
});
clearButton.addEventListener("click", (event) => {
    handleClear(event);
})
equalButton.addEventListener("click", () => {
    operate(numA, numB, operator);
})