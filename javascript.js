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
let displayReset = false; // Flag to determine when display should be reset (after an operation is pressed)
let display = "0";

// --- DOM ELEMENTS ---
const displayNumber = document.querySelector("#display-number");
const numberBtns = document.querySelectorAll(".number-btn");
const operationBtns = document.querySelectorAll(".operand-btn");
const equalsBtn = document.querySelector(".equals-btn");
const clearBtn = document.querySelector(".clear-btn");
const delBtn = document.querySelector(".del-btn");
const dotBtn = document.querySelector(".dot-btn");

// --- LOGIC ---
function processNumber(number) {
    if (displayReset || display === "0") {
        display = "";
        displayReset = false;
    }

    display += number;
    updateDisplay();

}

function processOperator(operator) {

    // If the last thing pressed is an operator change the operation to the new operator
    if (displayReset == true) {
        operation = operator;
        return;
    }

    if (firstOperand === "") {
        firstOperand = displayNumber.textContent;
        operation = operator
        displayReset = true;
        return;
    } 

    evaluate();   
    operation = operator
    
}

function evaluate() {
    display = calculator[operation](Number(firstOperand), Number(display));   
    displayNumber.textContent = roundNumber(display);

    firstOperand = displayNumber.textContent; // Make the answer of the equation the first number in the next equation
    displayReset = true;
}

function resetCalculator() {
    // Change variables back to their initial values
    firstOperand = "";
    operation = "";
    displayReset = false;
    display = "0";

    updateDisplay();
}

function deleteNumber() {
    if (!displayReset) {
        display = display.slice(0,-1);
    }

    if (display === "") {
        display = "0";
    }

    updateDisplay();
}

function processDecimal() {
    if (display.includes(".")) {
        return;
    }

    display += "."
    updateDisplay();
}

function roundNumber(num) {
    // Convert to string with 2 decimals, then convert back to Number
    return Number(num.toFixed(3));
}

const updateDisplay = () => displayNumber.textContent = display;
    
// --- EVENT LISTERNERS ---
numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener("click", () => processNumber(numberBtn.textContent));
});

operationBtns.forEach((operationBtn) => {
    operationBtn.addEventListener("click", () => processOperator(operationBtn.textContent));
})

equalsBtn.addEventListener("click", () => evaluate());

clearBtn.addEventListener("click", () => resetCalculator());

delBtn.addEventListener("click", () => deleteNumber())

dotBtn.addEventListener("click", () => processDecimal())
