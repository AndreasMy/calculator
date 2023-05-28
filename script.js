const numberButtons = document.querySelectorAll("#numberButton");
const operatorButton = document.querySelectorAll(".operator-btn");
const equalButton = document.querySelector("#equalButton");
const resetButton = document.querySelector("#resetButton");
const mainDisplay = document.querySelector("#mainDisplay");
const calcDisplay = document.querySelector("#calcDisplay");

let num1 = null;
let num2 = null;
let sum = null;
let operateCount = 0;
let currentState = "";
let currentValue = "";
let chosenOperator = "";
let previousOperator = "";

//* Buttons
equalButton.addEventListener("click", () => {
  operate();
  chosenOperator = equalButton.innerHTML;
  setEvalState();
  console.log(chosenOperator);
});
resetButton.addEventListener("click", reset);

function numberButton() {
  numberButtons.forEach((button) => {
    return button.addEventListener("click", () => {
      number = button.innerHTML;
      if (chosenOperator !== "=") {
        setCurrentValue(number);
        handleNumberInput(number);
      } else {
        numResetAfterEval();
      }
    });
  });
}

function operatorButtons() {
  operatorButton.forEach((button) => {
    return button.addEventListener("click", () => {
      previousOperator = chosenOperator;
      chosenOperator = button.innerHTML;
      operatorCounter();
      setOperatorState();
      currentValue = "";
      console.log(previousOperator, chosenOperator);
    });
  });
}

function setCurrentValue(number) {
  currentValue += number;
  console.log(currentValue);
}

function inputNumOne() {
  num1 = parseInt(currentValue);
  console.log(`num1: ${num1}`, typeof num1);
}

function inputNumTwo() {
  num2 = parseInt(currentValue);
  console.log(`num2: ${num2}`, typeof num2);
}

function handleNumberInput() {
  if (num2 === null && operateCount < 1) {
    inputNumOne(number);
  } else if (num1 !== null || operateCount > 0) {
    inputNumTwo(number);
  }
}

function numResetAfterEval() {
  reset();
  setCurrentValue(number);
  handleNumberInput(number);
}

function calculate(operator) {
  switch (operator) {
    case "+":
      result = num1 + num2;
      sum = result;
      console.log(result);
      break;
    case "-":
      result = num1 - num2;
      sum = result;
      console.log(result);
      break;
    case "x":
      result = num1 * num2;
      sum = result;
      console.log(result);
      break;
    case "/":
      result = num1 / num2;
      sum = result;
      console.log(result);
      break;
  }

  /*   parsedResult = parseInt(result);

  switch (parsedResult) {
    case 0:
      resetDisplay();
      break;
  } */
}

function operate() {
  calculate(chosenOperator);

  console.log(chosenOperator);
}

function stateConsecutiveOperations() {
  calculate(previousOperator);
  keepSum();
}

function stateOperatedNumbers() {
  keepSum();
  operateCount = 0;
  console.log(operateCount);
}

function keepSum() {
  num1 = sum;
  num2 = null;
  sum = null;
}

function reset() {
  num1 = null;
  num2 = null;
  sum = null;
  operateCount = 0;
  currentState = "";
  currentValue = "";
  chosenOperator = "";
}

function operatorCounter() {
  operateCount++;
  console.log(operateCount);
}

//? change to handleOperatorState
//? add setEvalState
function setOperatorState() {
  if (operateCount > 1 && chosenOperator !== "=") {
    currentState = "consecutive";
    stateManager();
    console.log(currentState);
  }
}

function setEvalState() {
  currentState = "claculated";
  stateManager();
  console.log(currentState);
}

function stateManager() {
  if (currentState === "consecutive") {
    stateConsecutiveOperations();
  } else if (currentState === "claculated") {
    stateOperatedNumbers();
  } else {
    // moving along
  }
}

function init() {
  numberButton();
  operatorButtons();
}
init();
