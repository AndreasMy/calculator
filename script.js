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

let addOperator = "";
let operationPending = false;
let numArr = [];

addBtn.addEventListener("click", add);

operateBtn.addEventListener("click", operate);

resetButton.addEventListener("click", reset);

//? let the following function only return a number and hanle the logic elsewhere
function numberBtn() {
  numberButtons.forEach((button) => {
    return button.addEventListener("click", () => {
      const number = button.innerHTML;
      display(number);
    });
  });
}
numberBtn();

function updateArr() {
  numArr = [numOne, numTwo];
  console.log(numArr);
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
}

function storeNumbers() {
  const parsedNum = parseInt(mainDisplay.value);
  if (numOne === 0) {
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
  addOperator = "add";
  operationPending = true;

  storeNumbers();
  updateArr();
}

function reset() {
  mainDisplay.value = "";
  numOne = 0;
  numTwo = 0;
  addOperator = "";
  operationPending = false;
}
const addNumbs = (a, b) => a + b;

//do the thing
function operate() {
  let sum;

  if (addOperator === "add") {
    storeNumbers();
    updateArr();
    const sum = numArr.reduce(addNumbs);
    mainDisplay.value = sum;
    const parsedSum = parseInt(mainDisplay.value);
    numOne = parsedSum;
    numTwo = 0;
    console.log(`sum: ${sum}!, ${typeof sum}`);
    console.log(`numOne changed to sum: ${sum}`);
  }
  operationPending = false;
}
