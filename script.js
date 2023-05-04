const numberButtons = document.querySelectorAll("#numberButton");
const operatorButton = document.querySelectorAll(".operator-btn");

const operateBtn = document.querySelector("#operateBtn");
const resetButton = document.querySelector("#resetButton");

const mainDisplay = document.querySelector("#mainDisplay");

//* Buttons
operateBtn.addEventListener("click", operate);
resetButton.addEventListener("click", reset);

//* operations for the reduce() method used in operate()
const addNums = (a, b) => a + b;
const subtractNums = (a, b) => a - b;
const multiplyNums = (a, b) => a * b;
const divideNums = (a, b) => a / b;

//* variables for updating display. Also used in numArr
let numOne = 0;
let numTwo = 0;
let numArr = [];

let operatorState = "";
let operationPending = false;

function init() {
  numberBtn();
  operatorButtons();
  updateArr();
}
init();

function numberBtn() {
  numberButtons.forEach((button) => {
    return button.addEventListener("click", () => {
      const number = button.innerHTML;
      if (operationPending === false && operatorState === "evaluated") {
        resetDisplay();
        operatorState = "";
        numOne = 0;
        output(number);
      } else if (operationPending === false && operatorState !== "") {
        output(number);
      } else {
        output(number);
      }
    });
  });
}

function operatorButtons() {
  operatorButton.forEach((button) => {
    return button.addEventListener("click", () => {
      const operatorBtn = button.innerHTML;

      operatorState = operatorBtn;
      operationPending = true;

      storeNumbers();
      updateArr();
      console.log(operatorState);
    });
  });
}

//* output
function output(number) {
  if (operationPending === false) {
    mainDisplay.value += number;
  } else if (numOne !== 0 && mainDisplay.value !== "") {
    operationPending = false;
    mainDisplay.value = "";
    mainDisplay.value += number;
  }
}

function storeNumbers() {
  const parsedNum = parseInt(mainDisplay.value);
  if (numOne !== 0 && numTwo !== 0) {
    numTwo = 0;
  } else if (numOne === 0) {
    numOne = parsedNum;
    console.log(numOne, typeof numOne);
  } else if (numOne !== 0) {
    numTwo = parsedNum;
    console.log(numTwo, typeof numTwo);
  }
  return parsedNum;
}

//TODO I should be able to enter an operator from default state and operate on it. This might change the code quite a bit.
//? it might be helpful to have the numbers and operations stored in the other display?
//TODO opeation buttons calls the operate function when appropriate
//TODO those other buttons: del, % and .

function updateArr() {
  numArr = [numOne, numTwo];
  console.log({ numOne, numTwo });
}

function resetDisplay() {
  mainDisplay.value = "";
}

function reset() {
  mainDisplay.value = "";
  numOne = 0;
  numTwo = 0;
  updateArr();
  operatorState = "";
  operationPending = false;
  console.table(
    mainDisplay.value,
    numOne,
    numTwo,
    numArr,
    operatorState,
    operationPending
  );
}

//do the thing
function operate() {
  let sum;
  storeNumbers();
  updateArr();

  switch (operatorState) {
    case "+":
      mainDisplay.value = numArr.reduce(addNums);
      break;
    case "-":
      mainDisplay.value = numArr.reduce(subtractNums);
      break;
    case "*":
      mainDisplay.value = numArr.reduce(multiplyNums);
      break;
    case "/":
      mainDisplay.value = numArr.reduce(divideNums);
      break;
  }

  const parsedSum = parseInt(mainDisplay.value);

  switch (parsedSum) {
    case 0:
      resetDisplay();
      break;
  }

  numOne = parsedSum;
  console.log(`numOne changed to sum: ${mainDisplay.value}`);

  operatorState = "evaluated";
  operationPending = false;
  console.log(operatorState);
}
