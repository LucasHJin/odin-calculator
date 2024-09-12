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
    console.log(operationMap[operator](a, b));
}

const answer = document.querySelector('.answer');
function display() {
    answer.textContent = displayValue;
}

function handleNumbers(event) {
    const number = event.target.dataset.value;
    if (startCalculations) {
        displayValue = number;
        startCalculations = false;
    } else {
        displayValue += number;
    }
    display();
}

function handleOperations(event) {
    const operation = event.target.dataset.value;

}


let numA = 1;
let numB = 1;
let operator = "add";
let displayValue = '0';
let startCalculations = true;


const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const decimalButton = document.querySelector('.decimal');
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