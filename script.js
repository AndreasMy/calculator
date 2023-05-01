const numberButtons = document.querySelectorAll("#numberButton");
const addBtn = document.querySelector("#addbtn");
const subtractBtn = document.querySelector("#subtractBtn");
const multiplyBtn = document.querySelector("#multiplyBtn");
const divideBtn = document.querySelector("#divideBtn");
const operateBtn = document.querySelector("#operateBtn");

const resetButton = document.querySelector("#resetButton");
const mainDisplay = document.querySelector("#mainDisplay");

// variables for updating display
//? should these variables be looped over somehow?
let numOne = 0;
let numTwo = 0;
let realNum1 = parseInt(numOne);
let realNum2 = parseInt(numTwo);
let operator = "";
let operationPending = false;

//? let the following function only return a number and hanle the logic elsewhere
function numberBtn() {
  numberButtons.forEach((button) => {
    return button.addEventListener("click", () => {
      const number = button.innerHTML;
      const actualNumber = parseInt(number);

      if (!operationPending) {
        mainDisplay.value += actualNumber;
      } else if (numOne !== 0 && mainDisplay.value !== "") {
        operationPending = false;
        mainDisplay.value = "";
        mainDisplay.value += actualNumber;
      }

      //console.log(mainDisplay.value, numOne, operator, numTwo);
      return actualNumber;
    });
  });
}
numberBtn();

addBtn.addEventListener("click", () => {
  add();
});

operateBtn.addEventListener("click", () => {
  operate();
});

resetButton.addEventListener("click", reset);

function display(actualNumber) {}

// the operator button takes the number value in the display and stores it in a global variable or array
// operate(storedNumA, storedNumB)
// function operate(...args) {arrayFrom(args)}

function add(a, b, actualNumber) {
  operator = "add";
  operationPending = true;

  if (numOne === 0) {
    numOne = mainDisplay.value;
  } else if (numOne !== 0) {
    numTwo = mainDisplay.value;
  }

  console.log(operationPending);
  console.log(numOne, numTwo)
  return (sum = a + b);
}

//subtract
function subtract(a, b) {
  return a - b;
}

//multiply
function multiply(a, b) {
  return a * b;
}

//divide
function divide(a, b) {
  return a / b;
}

function reset() {
  mainDisplay.value = "";
  numOne = 0;
  numTwo = 0;
  operate = "";
  let operationPending = false;
}

//do the thing
function operate() {
  numTwo = mainDisplay.value;

  let realNum1 = parseInt(numOne);
  let realNum2 = parseInt(numTwo);

  let sum = 0;
  operationPending = false;

  if ((operate = "add" && numOne > 0 && numTwo > 0)) {
    sum = add(realNum1, realNum2);
    mainDisplay.value = sum;

    numOne = sum;
    numTwo = 0;

    console.log(`${realNum1} + ${realNum2} = ${sum}`);
    console.log(`numOne set to sum: ${sum}, numTwo set to ${numTwo}`);

    operationPending = false;
    console.log(operationPending);
  }
  return sum;
}

//number buttons are displayed in the input field and stored somewhere (array/variable) when an operator is clicked.

/* addBtn.addEventListener("click", () => {
  add();
});

subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
operateBtn.addEventListener("click", operate);
resetBtn.addEventListener("click", reset); */

//add
