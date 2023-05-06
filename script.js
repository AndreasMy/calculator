//? what if I can use the value of the upper display to perform the operations? will it simpilify the code by a lot?
//? operate() then stores the values in an array, parseInt() and store their values to their respective variables

//TODO I should be able to enter an operator from default state and operate on it. This might change the code quite a bit.
//? it might be helpful to have the numbers and operations stored in the other display?
//TODO opeation buttons calls the operate function when appropriate
//TODO those other buttons: del, % and .

const numberButtons = document.querySelectorAll("#numberButton");
const operatorButton = document.querySelectorAll(".operator-btn");
const equalButton = document.querySelector("#equalButton");
const resetButton = document.querySelector("#resetButton");
const mainDisplay = document.querySelector("#mainDisplay");
const calcDisplay = document.querySelector("#calcDisplay");

//* Buttons
equalButton.addEventListener("click", operate);
resetButton.addEventListener("click", reset);

//* variables for updating display. Also used in numberArray
let parsedResult = null;
let numOne = null;
let numTwo = null;
let numberArray = [];
let chosenOperator = "";
let displayOperator = "";
let nextOperation = false;
let calculated = false;
let operationPending = false;
let resetByNumKey = false;

let numParsedFromInput = parseInt(mainDisplay.value);

function init() {
  numberButton();
  operatorButtons();
  updateArr();
}
init();

function numberButton() {
  numberButtons.forEach((button) => {
    return button.addEventListener("click", () => {
      const number = button.innerHTML;
      calculated = false;
      //* if a pair of numbers have been calculated, clear the display and reset the first number and operator
      if (operationPending === false && calculated === true) {
        resetDisplay();
        chosenOperator = null;
        numOne = null;
        output(number);
        console.log(`oh no ${number}`);
      } else if (operationPending === false && chosenOperator === "") {
        output(number);
      } else if (nextOperation === true) {
        output(number);
      } else {
        output(number);
        console.log(number);
      }
    });
  });
}

function handleOperation(operatorBtn) {
  chosenOperator = operatorBtn;
  displayOperator = chosenOperator;

  operationPending = true;

  storeNumbers();
  updateArr();
  displayCalculation();
  console.log(chosenOperator);
  console.log(`operation pending: ${operationPending}`);
}

function operatorButtons() {
  operatorButton.forEach((button) => {
    return button.addEventListener("click", () => {
      const operatorBtn = button.innerHTML;

      if (calculated === false && chosenOperator !== "") {
        operate();
        numOne = numParsedFromInput;
        handleOperation(operatorBtn);
        console.log(`calculated: ${calculated}`);
      } else if (chosenOperator === "" && calculated === true) {
        nextOperation = true;
        handleOperation(operatorBtn);
        console.log(`next operation: ${nextOperation}`);
      } else {
        handleOperation(operatorBtn);
      }
    });
  });
}

function displayCalculation() {
  if (operationPending === true) {
    calcDisplay.value = `${numOne} ${displayOperator} `;
  } else if (calculated === true) {
    calcDisplay.value = `${numOne} ${displayOperator} ${numTwo} =`;
    mainDisplay.value = parsedResult;
  } else if (nextOperation === true) {
    calcDisplay.value = `${parsedResult} ${displayOperator} `;
    mainDisplay.value = "";
    console.log(`sum: ${parsedResult}`);
  }
}

//* outputs and updates the numbers while they are being clicked
function output(number) {
  if (operationPending === false) {
    mainDisplay.value += number;

    console.log(`calculated: ${calculated}`);
  } else if (numOne !== null && mainDisplay.value !== "") {
    operationPending = false;
    mainDisplay.value = "";
    mainDisplay.value += number;
  }
}

function storeNumbers() {
  numParsedFromInput = parseInt(mainDisplay.value);

  if (nextOperation === true) {
    numOne = parsedResult;
    numTwo = numParsedFromInput;
    //numTwo = null;
    console.log(parsedResult);
  } else if (numOne !== null && numTwo !== null) {
    numTwo = numParsedFromInput;
  } else if (numOne === null) {
    numOne = numParsedFromInput;
    console.log(numOne, typeof numOne);
  } else if (numOne !== null) {
    numTwo = numParsedFromInput;
    console.log(numTwo, typeof numTwo);
  }
  return numParsedFromInput;
}

function updateArr() {
  numberArray = [numOne, numTwo];
  console.log({ numOne, numTwo });
}

function resetDisplay() {
  mainDisplay.value = "";
  calcDisplay.value = "";
}

function reset() {
  mainDisplay.value = "";
  calcDisplay.value = "";
  numOne = null;
  numTwo = null;
  updateArr();
  chosenOperator = "";
  nextOperation = false;
  operationPending = false;
  calculated = false;
  console.table(
    mainDisplay.value,
    numOne,
    numTwo,
    numberArray,
    chosenOperator,
    operationPending
  );
}

//do the thing
function operate() {
  storeNumbers();
  updateArr();

  switch (chosenOperator) {
    case "+":
      result = numOne + numTwo;
      displayCalculation();
      break;
    case "-":
      result = numOne - numTwo;
      displayCalculation();
      break;
    case "x":
      result = numOne * numTwo;
      displayCalculation();
      break;
    case "/":
      result = numOne / numTwo;
      displayCalculation();
      break;
  }

  parsedResult = parseInt(result);

  switch (parsedResult) {
    case 0:
      resetDisplay();
      break;
  }

  //numOne = parsedResult;
  chosenOperator = "";
  calculated = true;
  displayCalculation();
  operationPending = false;
  resetByNumKey = true;

  console.log(`numOne changed to sum: ${parsedResult}`);
  console.log(`calculated: ${calculated}`);
  console.log(`operation pending: ${operationPending}`);
  return parsedResult;
}
