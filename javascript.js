// --- CONSTANTS ---
const calculator = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "×": (a, b) => a * b,
    "*": (a, b) => a * b, // Keyboard support
    "/": (a, b) => b === 0 ? "DivisionError" : a / b
};

// For keyboard support
const ALLOWED_KEYS = [
    "1", "2" , "3", "4", "5", "6", "7", "8", "9", "0", ".", // Numbers
    "+", "-", "*", "/", "=", "Enter", // Operations
    "Backspace", "Delete", "Escape", // Controls
]

const MAX_NUMS = 10;

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

    // Prevent numbers larger than 10 digits
    if (display.length > MAX_NUMS) {
        return;
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

    // Handles the case when the user attempts a second equation before pressing equals (1 + 2 + 3) 
    if (firstOperand === "") {
        firstOperand = display;
        operation = operator
        displayReset = true;
        return;
    } 

    updateDisplay();
    evaluate();   
    operation = operator
}

function evaluate() {
    // Prevent evaluations if no operator has been selected
    if (operation === "") {
        return;
    }

    let result = calculator[operation](Number(firstOperand), Number(display));   
    
    // To prevent the calculator blowing up when someone tries to divide by 0
    if (result === "DivisionError") {
        display = "Cannot divide by zero";
        updateDisplay();
        resetCalculator()
        return;
    }

    display = roundNumber(result);

    updateDisplay()

    operation = "";
    firstOperand = display; // Make the answer of the equation the first number in the next equation
    displayReset = true;
}

function resetCalculator() {
    // Change variables back to their initial values
    firstOperand = "";
    operation = "";
    displayReset = false;
    display = "0";
}

function deleteNumber() {
    // Remove last number
    if (!displayReset) {
        display = display.slice(0,-1);
    }

    // Revert to initial display if every number is deleted
    if (display === "") {
        display = "0";
    }

    updateDisplay();
}

function processDecimal() {
    // Edge case to handle when a decimal is pressed after an equation is completed
    if (displayReset) {
        display = "0.";
        displayReset = false;
        updateDisplay();
        return;
    }

    // Prevent numbers with multiple decimal points
    if (display.includes(".")) {
        return;
    }  

    display += "."
    updateDisplay();
}

// Convert to string with 3 decimals, then convert back to Number
function roundNumber(num) {
    return Number(num.toFixed(3));
}

function updateDisplay() {
    // Prevent large numbers from going off the screen of the calculator
    if (display.toString().length > 15) {
        displayNumber.style.fontSize = "24px"; 
    } else {
        displayNumber.style.fontSize = "30px"; 
    }

    displayNumber.textContent = display;
}

function handleKeyPress(key) {
    console.log(key)
    if (key >= "0" && key <= "9") {
        processNumber(key);
    } else if (key === ".") {
        processDecimal();
    } else if (key === "Backspace" || key === "Delete") {
        deleteNumber();
    } else if (key === "=" || key === "Enter") {
        evaluate();
    } else if (key === "Escape") {
        resetCalculator();
        updateDisplay();
    } else {
        processOperator(key);
    }
}
            
// --- EVENT LISTERNERS ---
numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener("click", () => processNumber(numberBtn.textContent));
});

operationBtns.forEach((operationBtn) => {
    operationBtn.addEventListener("click", () => processOperator(operationBtn.textContent));
})

equalsBtn.addEventListener("click", () => evaluate());

clearBtn.addEventListener("click", () => {
    resetCalculator();
    updateDisplay();
});

delBtn.addEventListener("click", () => deleteNumber());
    
dotBtn.addEventListener("click", () => processDecimal())

document.addEventListener("keydown", (e) => {
    const key = e.key;

    // Prevent unsupported keys from being used
    if (!ALLOWED_KEYS.includes(key)) {
        return;
    }

    handleKeyPress(key);
})