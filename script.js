const numberButtons = document.querySelectorAll("#numberButton");
const operatorButton = document.querySelectorAll(".operator-btn");
const equalButton = document.querySelector("#equalButton");
const resetButton = document.querySelector("#resetButton");
const mainDisplay = document.querySelector("#mainDisplay");
const calcDisplay = document.querySelector("#calcDisplay");
const floatButton = document.querySelector("#floatButton");

let num1 = null;
let num2 = null;
let sum = null;
let prevNum1 = null;
let prevNum2 = null;
let prevSum = null;
let roundedSum = null;
let evaluated = false;
let operateCount = 0;
let currentState = "";
let currentValue = "";
let chosenOperator = "";
let previousOperator = "";
let floatButtonClicked = false;
let oprateButtonClicked = false;

function keepSum() {
  prevNum1 = num1;
  prevNum2 = num2;
  prevSum = roundedSum;
  num1 = roundedSum;
  num2 = null;
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
  floatButtonToggle.toggleOn();
  floatButtonLogic();
}

//TODO add backspace functionality
//TODO round long decimals
//TODO keyboard support

//* Buttons
floatButton.addEventListener("click", handleFloatButton);
equalButton.addEventListener("click", verifyEqualButton);
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
  floatButtonToggle.toggleOn();
  handleDisplayLogic();
  console.log(chosenOperator);
}

function verifyEqualButton() {
  if (num2 !== null && chosenOperator !== "") {
    equalButton.disabled = false;
    handleEqualButton();
    console.log("calc 1");
  } else {
    equalButton.disabled = false;
    console.log("calc 2");
  }
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
  floatButtonToggle.toggleOn();
  floatButtonLogic();

  console.log(previousOperator, chosenOperator);
}

function setCurrentValue(number) {
  currentValue += number;
  console.log(currentValue);
}

function handleNumberInput() {
  if (num2 === null && operateCount < 1) {
    num1 = parseFloat(currentValue);
  } else if (num1 !== null || operateCount > 0) {
    num2 = parseFloat(currentValue);
  }
}

//* Float button logic
function handleFloatButton() {
  currentValue += floatButton.innerHTML;
  floatButtonToggle.toggleOff();
  handleDisplayLogic();
  floatButtonLogic();
}

function floatButtonLogic() {
  if (floatButtonClicked === true) {
    floatButton.disabled = true;
  } else if (floatButtonClicked === false) {
    floatButton.disabled = false;
  }
}

const floatButtonToggle = {
  toggleOff() {
    floatButtonClicked = true;
    console.log(`clicked: ${floatButtonClicked}`);
  },

  toggleOn() {
    floatButtonClicked = false;
    console.log(`clicked: ${floatButtonClicked}`);
  },
};

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
  currentValue = 0;
}

function stateOperatedNumbers() {
  keepSum();
  operateCount = 0;
  currentValue = 0;
  console.log(operateCount);
}

function operatorCounter() {
  operateCount++;
  console.log(operateCount);
}

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
    // move along
  }
}

function calculate(operator) {
  let sum;
  switch (operator) {
    case "+":
      sum = num1 + num2;
      break;
    case "-":
      sum = num1 - num2;
      break;
    case "x":
      sum = num1 * num2;
      break;
    case "/":
      sum = num1 / num2;
      break;
  }
  evaluated = true;
  console.log(`evaluated: ${evaluated}`);

  return roundedSum = roundNumbers(sum, 4);
}

function roundNumbers(value, decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  return Math.round(value * factor) / factor;
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

function init() {
  numberButton();
  operatorButtons();
}
init();
