const numberButtons = document.querySelectorAll("#numberButton");
const addBtn = document.querySelector("#addbtn");
const subtractBtn = document.querySelector("#subtractBtn");
const multiplyBtn = document.querySelector("#multiplyBtn");
const divideBtn = document.querySelector("#divideBtn");
const operateBtn = document.querySelector("#operateBtn");

const resetButton = document.querySelector("#resetButton");
const mainDisplay = document.querySelector("#mainDisplay");

// variables for updating display
let numOne = 0;
let numTwo = 0;

let operatorState = "";
let operationPending = false;
let numArr = [];

//* Buttons!
addBtn.addEventListener("click", add);
operateBtn.addEventListener("click", operate);
resetButton.addEventListener("click", reset);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);

function init() {
  numberBtn();
  updateArr();
}
init();

function numberBtn() {
  numberButtons.forEach((button) => {
    return button.addEventListener("click", () => {
      const number = button.innerHTML;
      display(number);
    });
  });
}

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
const addNums = (a, b) => a + b;
const subtractNums = (a, b) => a - b;
const multiplyNums = (a, b) => a * b;
const divideNums = (a, b) => a / b;

//do the thing
function operate() {
  let sum;

  if (operatorState === "add") {
    storeNumbers();
    updateArr();

    const sum = numArr.reduce(addNums);

    mainDisplay.value = sum;
    const parsedSum = parseInt(mainDisplay.value);
    numOne = parsedSum;
    console.log(`numOne changed to sum: ${sum}`);
  } else if (operatorState === "subtract") {
    storeNumbers();
    updateArr();

    const sum = numArr.reduce(subtractNums);

    mainDisplay.value = sum;
    const parsedSum = parseInt(mainDisplay.value);
    numOne = parsedSum;
    console.log(`numOne changed to sum: ${sum}`);
  } else if (operatorState === "multiply") {
    storeNumbers();
    updateArr();

    const sum = numArr.reduce(multiplyNums);

    mainDisplay.value = sum;
    const parsedSum = parseInt(mainDisplay.value);
    numOne = parsedSum;
    console.log(`numOne changed to sum: ${sum}`);
  } else if (operatorState === "divide") {
    storeNumbers();
    updateArr();

    const sum = numArr.reduce(divideNums);

    mainDisplay.value = sum;
    const parsedSum = parseInt(mainDisplay.value);
    numOne = parsedSum;
    console.log(`numOne changed to sum: ${sum}`);
  }

  operatorState = "";
  operationPending = false;
  console.log(operatorState);
}
