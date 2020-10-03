const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const equalDiv = document.querySelector("[data-equal]");
const deleteDiv = document.querySelector("[data-delete]");
const clearAllDiv = document.querySelector("[data-clear-all]");
const negDiv = document.querySelector("[data-negation]");
const prevOperand = document.querySelector("[data-prev-operand]");
const currOperand = document.querySelector("[data-curr-operand]");

let curr = "";
let prev = "";
let operation = undefined;
let resetResult = false;

const deleteNumber = function () {
  curr = curr.toString().slice(0, -1);
  if (curr.toString().includes("-") && curr.toString().length === 1) {
    curr = "";
  }
};

const doNegation = function () {
  if (currOperand.innerText === "") return;
  let floatStr = parseFloat(currOperand.innerText);
  floatStr = -floatStr;
  currOperand.innerText = floatStr;
  curr = floatStr;
};

const addNumber = function (currNumber) {
  if (currNumber === "." && curr.toString().includes(".")) return;
  curr = curr + currNumber;
};

const selectOperation = function (op) {
  //when you do more operations
  if (curr === "") return;
  if (prev !== "") {
    calculate();
  }
  operation = op;
  prev = curr;
  curr = "";
};

const calculate = function () {
  let finalResult;
  const prevFloat = parseFloat(prev);
  const currFloat = parseFloat(curr);
  if (isNaN(prevFloat) || isNaN(currFloat)) return;
  switch (operation) {
    case "+":
      finalResult = prevFloat + currFloat;
      break;
    case "-":
      finalResult = prevFloat - currFloat;
      break;
    case "*":
      finalResult = prevFloat * currFloat;
      break;
    case "/":
      finalResult = prevFloat / currFloat;
      break;
    default:
      return;
  }
  curr = finalResult;
  prev = "";
  operation = undefined;
  resetResult = true;
};

const showNumberWithCommas = function (currNumber) {
  let commaNumber;
  const strNumber = currNumber.toString();
  const beforeNumbers = parseFloat(strNumber.split(".")[0]);
  const afterNumbers = strNumber.split(".")[1];

  if (isNaN(beforeNumbers)) {
    commaNumber = "";
  } else {
    commaNumber = beforeNumbers.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }
  if (afterNumbers != null) {
    return `${commaNumber}.${afterNumbers}`;
  } else {
    return commaNumber;
  }
};

const updateResult = function () {
  currOperand.innerText = showNumberWithCommas(curr);
  if (operation != null) {
    prevOperand.innerText = `${showNumberWithCommas(prev)} ${operation}`;
  } else {
    prevOperand.innerText = showNumberWithCommas(prev);
  }
};

const clearAll = function () {
  curr = "";
  prev = "";
  operation = undefined;
  resetResult = false;
};

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (prev === "" && curr !== "" && resetResult) {
      curr = "";
      resetResult = false;
    }
    addNumber(number.innerHTML);
    updateResult();
  });
});

operations.forEach((op) => {
  op.addEventListener("click", () => {
    selectOperation(op.innerHTML);
    updateResult();
  });
});

equalDiv.addEventListener("click", () => {
  calculate();
  updateResult();
});

clearAllDiv.addEventListener("click", () => {
  clearAll();
  updateResult();
});

deleteDiv.addEventListener("click", () => {
  deleteNumber();
  updateResult();
});

negDiv.addEventListener("click", () => {
  doNegation();
});
