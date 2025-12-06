// ---VARIABLES---
let equation = 0;

// ---DOM ELEMENTS---
const calcBtns = document.querySelectorAll(".calc-button");
const display = document.querySelector("#display");


// ---LOGIC---
const operatorMap = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide"
};

const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
};

const operate = (operator, firstNum, secondNum) => calculator[operatorMap[operator]](firstNum, secondNum);

// ---EVENT LISTENERS---
calcBtns.forEach((button) => {
    button.addEventListener("click", () => {
        equation += button.textContent;
        display.textContent = equation;
    });
})



