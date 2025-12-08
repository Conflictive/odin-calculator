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

// --- LOGIC ---
function processNumber(number) {
    if (displayReset || display === "0") {
        display = "";
        displayReset = false;
    }

    display += number;
    displayNumber.textContent = display;

}

function processOperator(operator) {
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
    displayNumber.textContent = display;

    firstOperand = displayNumber.textContent;
    displayReset = true;
}

function resetCalculator() {
    // Change variables back to their initial values
    firstOperand = "";
    operation = "";
    displayReset = false;
    display = "0";

    displayNumber.textContent = display;
}

function deleteNumber() {
    if (!displayReset) {
        display = display.slice(0,-1);
    }

    if (display === "") {
        display = "0";
    }

    displayNumber.textContent = display;
}

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