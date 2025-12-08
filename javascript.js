// --- CONSTANTS ---
const calculator = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "X": (a, b) => a * b,
    "/": (a, b) => b === 0 ? "Cannot divide by zero" : a / b
};

// --- DOM ELEMENTS ---
const numberBtns = document.querySelectorAll(".number-btn");
const operandBtns = document.querySelectorAll(".operand-btn");
const equalsBtn = document.querySelectorAll(".equals-btn");
const clearBtn = document.querySelector(".clear-btn");
const delBtn = document.querySelector(".del-btn");