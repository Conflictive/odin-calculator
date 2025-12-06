// ---VARIABLES---
let equation = "";

// ---DOM ELEMENTS---
const calcBtns = document.querySelectorAll(".calc-button");
const display = document.querySelector("#display");
const clearBtn = document.querySelector("clear");


// ---LOGIC---
const operatorMap = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide"
};

const updateDisplay = () => display.textContent = equation;

const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
};

const operate = (operator, firstNum, secondNum) => calculator[operatorMap[operator]](firstNum, secondNum);

// ---EVENT LISTENERS---
calcBtns.forEach((button) => {
    
    if(button.classList[1] !== "top") {
        button.addEventListener("click", () => {
            equation += button.textContent;
            updateDisplay();
        });
    } else if (button.id === "clear") {
        button.addEventListener("click", () => {
            equation = "";
            updateDisplay();
        }); 
      } else {
            button.addEventListener("click", () => {
                equation = equation.slice(0,-1);
                updateDisplay();
            });
        }
    });




