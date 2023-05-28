const numberButtons = document.querySelectorAll("#numberButton");
const operatorButton = document.querySelectorAll(".operator-btn");
const equalButton = document.querySelector("#equalButton");
const resetButton = document.querySelector("#resetButton");
const mainDisplay = document.querySelector("#mainDisplay");
const calcDisplay = document.querySelector("#calcDisplay");

let num1 = null;
let num2 = null;
let sum = null;
let prevNum1 = null;
let prevNum2 = null;
let prevSum = null;
let evaluated = false;
let operateCount = 0;
let currentState = "";
let currentValue = "";
let chosenOperator = "";
let previousOperator = "";

//* Buttons
equalButton.addEventListener("click", handleEqualButton);
resetButton.addEventListener("click", reset);

function numberButton() {
  numberButtons.forEach((button) => {
    return button.addEventListener("click", () => {
      number = button.innerHTML;
      handleNumberButton();
    });
  });
}

function operatorButtons() {
  operatorButton.forEach((button) => {
    return button.addEventListener("click", () => {
      previousOperator = chosenOperator;
      chosenOperator = button.innerHTML;
      handleOperatorButtons();
    });
  });
}

//* Eval button
function handleEqualButton() {
  operate();
  previousOperator = chosenOperator;
  chosenOperator = equalButton.innerHTML;
  setEvalState();
  handleDisplayLogic();
  console.log(chosenOperator);
}

//* Number buttons
function handleNumberButton() {
  evaluated = false;
  console.log(`evaluated: ${evaluated}`);
  if (chosenOperator !== "=") {
    setCurrentValue(number);
    handleNumberInput(number);
    handleDisplayLogic();
  } else {
    numResetAfterEval();
  }
}

//* Operator buttons
function handleOperatorButtons() {
  operatorCounter();
  setOperatorState();
  handleDisplayLogic();
  currentValue = "";

  console.log(previousOperator, chosenOperator);
}

const displayFunctions = {
  inputMainDisplay() {
    mainDisplay.value = `${currentValue}`;
  },

  sumMainDisplay() {
    mainDisplay.value = `${prevSum}`;
    
  },

  displayCalculation() {
    calcDisplay.value = `${num1} ${chosenOperator}`;
  },

  displayFullCalculation() {
    calcDisplay.value = `${prevNum1} ${previousOperator} ${prevNum2} =`;
  },
};

function handleDisplayLogic() {
  if (chosenOperator === "=") {
    displayFunctions.sumMainDisplay();
    displayFunctions.displayFullCalculation();
    console.log("case 1");
  } else if (currentState === "consecutive" && num2 === null) {
    displayFunctions.inputMainDisplay();
    displayFunctions.displayCalculation();
    console.log("case 2");
  } else if (currentState === "consecutive" && evaluated === true) {
    displayFunctions.sumMainDisplay();
    displayFunctions.displayFullCalculation();
    console.log("case 3");
  } else if (currentState === "" && num1 !== null && chosenOperator !== "") {
    displayFunctions.inputMainDisplay();
    displayFunctions.displayCalculation();
    console.log("case 4");
  } else if (currentState === "calculated" && chosenOperator !== "") {
    displayFunctions.displayCalculation();
    displayFunctions.inputMainDisplay();
    console.log("case 5");
  } else {
    displayFunctions.inputMainDisplay();
    console.log("case default");
  }
}

function setCurrentValue(number) {
  currentValue += number;
  console.log(currentValue);
}

function handleNumberInput() {
  if (num2 === null && operateCount < 1) {
    num1 = parseInt(currentValue);
  } else if (num1 !== null || operateCount > 0) {
    num2 = parseInt(currentValue);
  }
}

function numResetAfterEval() {
  reset();
  setCurrentValue(number);
  handleNumberInput(number);
  handleDisplayLogic();
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
  currentValue = 0;
  console.log(operateCount);
}

function keepSum() {
  prevNum1 = num1;
  prevNum2 = num2;
  prevSum = sum;
  num1 = sum;
  num2 = null;
  sum = null;
  console.log(num2);
}

function reset() {
  num1 = null;
  num2 = null;
  sum = null;
  operateCount = 0;
  currentState = "";
  currentValue = "";
  chosenOperator = "";
  mainDisplay.value = "";
  calcDisplay.value = "";
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
  currentState = "calculated";
  stateManager();
  console.log(currentState);
}

function stateManager() {
  if (currentState === "consecutive") {
    stateConsecutiveOperations();
  } else if (currentState === "calculated") {
    stateOperatedNumbers();
  } else {
    // moving along
  }
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
  evaluated = true;
  console.log(`evaluated: ${evaluated}`);

  /*   parsedResult = parseInt(result);

  switch (parsedResult) {
    case 0:
      resetDisplay();
      break;
  } */
}

function init() {
  numberButton();
  operatorButtons();
}
init();
