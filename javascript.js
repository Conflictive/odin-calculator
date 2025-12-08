// --- CONSTANTS ---
const calculator = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "X": (a, b) => a * b,
    "/": (a, b) => b === 0 ? "Cannot divide by zero" : a / b
};

// --- VARIABLES ---
let firstOperand = "";
let operation = "";
let displayReset = false; // Display needs to be reset when an operand is pressed
let display = "0";

// --- DOM ELEMENTS ---
const displayNumber = document.querySelector("#display-number");
const numberBtns = document.querySelectorAll(".number-btn");
const operationBtns = document.querySelectorAll(".operand-btn");
const equalsBtn = document.querySelectorAll(".equals-btn");
const clearBtn = document.querySelector(".clear-btn");
const delBtn = document.querySelector(".del-btn");

// --- LOGIC ---
function processNumber(number) {

    if (displayReset) {
        displayNumber.textContent = "";
        displayReset = false;
    }

    displayNumber.textContent += number;
}

function processOperator(operator) {

    if (firstOperand === "") {
        firstOperand = displayNumber.textContent;
        operation = operator
        displayReset = true;
    } else {
        evaluate();
        operation = operator
        displayReset = true;
        firstOperand = displayNumber.textContent;
    }
}

function evaluate() {
    displayNumber.textContent = calculator[operation](Number(firstOperand), Number(displayNumber.textContent));   
}

// --- EVENT LISTERNERS ---
numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener("click", () => {
        processNumber(numberBtn.textContent);
    });
});

operationBtns.forEach((operationBtn) => {
    operationBtn.addEventListener("click", () => {
        processOperator(operationBtn.textContent);
    })
})