const numberButtons = document.querySelectorAll("#numberButton");
const addBtn = document.querySelector("#addbtn");
const subtractBtn = document.querySelector("#subtractBtn");
const multiplyBtn = document.querySelector("#multiplyBtn");
const divideBtn = document.querySelector("#divideBtn");
const operateBtn = document.querySelector("#operateBtn");

const resetButton = document.querySelector("#resetButton");
const mainDisplay = document.querySelector("#mainDisplay");

let numOne = 0;
let numTwo = 0;
let numArr = [];

let operatorState = "";
let operationPending = false;

//* Buttons
addBtn.addEventListener("click", add);
operateBtn.addEventListener("click", operate);
resetButton.addEventListener("click", reset);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);

function numberBtn() {
  numberButtons.forEach((button) => {
    return button.addEventListener("click", () => {
      const number = button.innerHTML;
      if(operationPending === false && operatorState === "evaluated") {
        reset()
        display(number);
      } else {
        display(number);
      } 
    });
  });
}

//* operations for the reduce() method used in operate()
const addNums = (a, b) => a + b;
const subtractNums = (a, b) => a - b;
const multiplyNums = (a, b) => a * b;
const divideNums = (a, b) => a / b;

//* variables for updating display. Also used in numArr

//TODO: Display should have numeric value from the getgo
//TODO opeation buttons calls the operate function when appropriate
//TODO those other buttons: del, % and .
//TODO empty display outputs 0 by default

function init() {
  numberBtn();
  updateArr();
}
init();

function updateArr() {
  numArr = [numOne, numTwo];
  console.log({ numOne, numTwo });
}

//* display
function display(number) {
  if (!operationPending) {
    mainDisplay.value += number;
  } else if (numOne !== 0 && mainDisplay.value !== "") {
    operationPending = false;
    mainDisplay.value = "";
    mainDisplay.value += number;
  }
  console.log(operatorState);
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

//* add
function add() {
  operatorState = "add";
  operationPending = true;

  storeNumbers();
  updateArr();
  console.log(operatorState);
}

function subtract() {
  operatorState = "subtract";
  operationPending = true;

  storeNumbers();
  updateArr();
  console.log(operatorState);
}

function multiply() {
  operatorState = "multiply";
  operationPending = true;

  storeNumbers();
  updateArr();
  console.log(operatorState);
}

function divide() {
  operatorState = "divide";
  operationPending = true;

  storeNumbers();
  updateArr();
  console.log(operatorState);
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
    case "add":
      mainDisplay.value = numArr.reduce(addNums);
      break;
    case "subtract":
      mainDisplay.value = numArr.reduce(subtractNums);
      break;
    case "multiply":
      mainDisplay.value = numArr.reduce(multiplyNums);
      break;
    case "divide":
      mainDisplay.value = numArr.reduce(divideNums);
      break;
  }

  const parsedSum = parseInt(mainDisplay.value);

  switch (parsedSum) {
    case 0:
      reset();
      break;
  }

  numOne = parsedSum;
  console.log(`numOne changed to sum: ${mainDisplay.value}`);

  operatorState = "evaluated";
  operationPending = false;
  console.log(operatorState);
}
