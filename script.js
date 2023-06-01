const numberButtons = document.querySelectorAll("#numberButton");
const operatorButton = document.querySelectorAll(".operator-btn");
const equalButton = document.querySelector("#equalButton");
const resetButton = document.querySelector("#resetButton");
const mainDisplay = document.querySelector("#mainDisplay");
const calcDisplay = document.querySelector("#calcDisplay");
const floatButton = document.querySelector("#floatButton");
const deleteButton = document.querySelector("#deleteButton");

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
}

function reset() {
  num1 = null;
  num2 = null;
  roundedSum = null;
  operateCount = 0;
  currentState = "";
  currentValue = "";
  chosenOperator = "";
  mainDisplay.value = "";
  calcDisplay.value = "";
  floatButtonToggle.toggleOn();
  floatButtonLogic();
}

//TODO keyboard support

//* Buttons
floatButton.addEventListener("click", handleFloatButton);
equalButton.addEventListener("click", verifyEqualButton);
resetButton.addEventListener("click", reset);
deleteButton.addEventListener("click", backspace);

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
  calculate(chosenOperator);
  previousOperator = chosenOperator;
  chosenOperator = equalButton.innerHTML;
  setEvalState();
  floatButtonToggle.toggleOn();
  handleDisplayLogic();
}

function verifyEqualButton() {
  if (isNaN(num1) || isNaN(num2)) {
    return;
  } else if (num2 !== null && chosenOperator !== "") {
    handleEqualButton();
  } else {
    return;
  }
}

//* Number buttons
function handleNumberButton() {
  evaluated = false;
  if (chosenOperator !== "=") {
    currentValue += number;
    handleNumberInput(number);
    handleDisplayLogic();
  } else {
    reset();
    handleDisplayLogic();
    currentValue += number;
    handleNumberInput(number);
  }
}

//* Operator buttons
function handleOperatorButtons() {
  if (num1 === null && num2 === null) {
    return;
  } else if (isNaN(num1) || isNaN(num2)) {
    return;
  } else if (operateCount === 1 && num2 === null) {
    return displayFunctions.displayCalculation();
  }

  operateCount++;
  setOperatorState();
  handleDisplayLogic();
  currentValue = "";
  floatButtonToggle.toggleOn();
  floatButtonLogic();
  console.log(num2, operateCount, currentState);
}

function handleNumberInput() {
  if (num2 === null && operateCount < 1) {
    num1 = parseFloat(currentValue);
  } else if (num1 !== null || operateCount > 0) {
    num2 = parseFloat(currentValue);
  }
}

function backspace() {
  if (mainDisplay.value === "" && calcDisplay.value === "") {
    return;
  } else if (evaluated === true) {
    return;
  }

  let input = mainDisplay.value;
  let modifiedInput = input.slice(0, -1);
  mainDisplay.value = modifiedInput;
  currentValue = mainDisplay.value;
  handleNumberInput();
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
  },

  toggleOn() {
    floatButtonClicked = false;
  },
};

function stateConsecutiveOperations() {
  calculate(previousOperator);
  keepSum();
  // currentValue = 0;
}

function stateOperatedNumbers() {
  keepSum();
  operateCount = 0;
  // currentValue = 0;
}

function setOperatorState() {
  if (operateCount > 1 && chosenOperator !== "=") {
    currentState = "consecutive";
    stateManager();
  }
}

function setEvalState() {
  currentState = "calculated";
  stateManager();
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
    case "%":
      sum = num1 % num2;
      break;
  }
  evaluated = true;
  return (roundedSum = roundNumbers(sum, 3));
}

function roundNumbers(value, decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  return Math.round(value * factor) / factor;
}

//* Display logic
const displayFunctions = {
  inputMainDisplay() {
    mainDisplay.value = `${currentValue}`;
  },

  sumMainDisplay() {
    mainDisplay.value = `${num1}`;
  },

  displayCalculation() {
    calcDisplay.value = `${num1} ${chosenOperator}`;
  },

  displayFullCalculation() {
    calcDisplay.value = `${prevNum1} ${previousOperator} ${prevNum2} =`;
  },

  displayError() {
    calcDisplay.value = "";
    mainDisplay.value = "Ooops!";
  },
};

function handleDisplayLogic() {
  switch (true) {
    case chosenOperator === "=" && sum !== Infinity:
      displayFunctions.sumMainDisplay();
      displayFunctions.displayFullCalculation();
      console.log("case 1");
      break;

    case currentState === "consecutive" && num2 === null:
      displayFunctions.displayCalculation();
      displayFunctions.sumMainDisplay();
      console.log("case 2");
      break;

    case currentState === "consecutive" && num2 !== null:
      displayFunctions.displayCalculation();
      displayFunctions.inputMainDisplay();
      console.log("case 2.5");
      break;

    case currentState === "consecutive" && evaluated === true:
      displayFunctions.displayFullCalculation();
      displayFunctions.sumMainDisplay();
      console.log("case 3");
      break;

    case currentState === "" && num1 !== null && chosenOperator !== "":
      displayFunctions.inputMainDisplay();
      displayFunctions.displayCalculation();
      console.log("case 4");
      break;

    case chosenOperator === "=" && sum === Infinity:
      displayFunctions.displayError();
      console.log("case 5");
      break;

    case currentState === "calculated" && num2 !== null:
      displayFunctions.displayCalculation();
      displayFunctions.inputMainDisplay();
      console.log("case 6");
      break;

    case currentState === "calculated" && chosenOperator !== "":
      displayFunctions.displayCalculation();
      displayFunctions.sumMainDisplay();
      console.log("case 7");
      break;

    default:
      displayFunctions.inputMainDisplay();
      console.log("case default");
      break;
  }
}

function init() {
  numberButton();
  operatorButtons();
}
init();
