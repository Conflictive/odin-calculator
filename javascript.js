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



