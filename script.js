const operationButtons = document.querySelectorAll("#operationButton");
const numberButtons = document.querySelectorAll("#numberButton");
const calcDisplay = document.querySelector("#calcDisplay");
const resetButton = document.querySelector("#resetButton");

//variables for updating display
let numOne = 0;
let numTwo = 0;

//? operator = add(...args))
let operator;


resetButton.addEventListener("click", reset)

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const operation = button.innerHTML;


  })
})

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.innerHTML;

    if (number === "0") {
      calcDisplay.value += 0
    } else if (number === "1") {
      calcDisplay.value += 1
    } else if (number === "2") {
      calcDisplay.value += 2
    } else if (number === "3") {
      calcDisplay.value += 3
    } else if (number === "4") {
      calcDisplay.value += 4
    } else if (number === "5") {
      calcDisplay.value += 5
    } else if (number === "6") {
      calcDisplay.value += 6
    } else if (number === "7") {
      calcDisplay.value += 7
    } else if (number === "8") {
      calcDisplay.value += 8
    } else if (number === "9") {
      calcDisplay.value += 9
    }

  })
})



// the operator button takes the number value in the display and stores it in a global variable or array
// operate(storedNumA, storedNumB)
// function operate(...args) {arrayFrom(args)}


function add(a, b) {
  return a + b;
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
  calcDisplay.value = ""
}

//do the thing
function operate(a, b) {}

function display() {

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