const readline = require("readline");

let listOfNumbers = [];
let pivot = "";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const QUESTIONS = {
  q1: ["Please insert a list of numbers separated by comma: "],
  q2: [
    "Please insert the number to find product of the sum of two digits of the previous list: ",
  ],
};

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question(QUESTIONS.q1, (answer) => {
      listOfNumbers = processData(answer);
      resolve();
    });
  });
};

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question(QUESTIONS.q2, (answer) => {
      pivot = answer;
      resolve();
    });
  });
};

/**
 *
 * @param data
 * @returns Array ordered using Quicksort method
 */
function order(data) {
  if (data.length <= 1) {
    return data;
  }

  // Find the middle of the array
  const pivot = data[Math.floor(data.length / 2)];
  const left = [];
  const center = [];
  const right = [];

  for (let element of data) {
    if (element < pivot) {
      left.push(element);
    } else if (element > pivot) {
      right.push(element);
    } else {
      center.push(element);
    }
  }

  return [...order(left), ...center, ...order(right)];
}

/**
 *
 * @param data
 * @param target
 * @returns  elements that satisfy the sum
 */
function getPairs(data, target) {
  const orderedArray = order(data);
  let pairsString = "";
  // Get the first and the last items
  let right = orderedArray.length - 1;
  let left = 0;

  while (left < right) {
    const sumVal = orderedArray[left] + orderedArray[right];

    if (sumVal === target) {
      pairsString += `\n${orderedArray[left]}, ${orderedArray[right]}`;
      left++;
      right--;
    } else if (sumVal < target) {
      left++;
    } else {
      right--;
    }
  }

  return pairsString.length === 0 ? "No Pairs" : pairsString;
}

/**
 *
 * @param data
 * @returns array
 */
function processData(data) {
  const arrayData = data.split(",").map((item) => parseInt(item));
  return arrayData;
}

const main = async () => {
  await question1();
  await question2();
  const result = getPairs(listOfNumbers, parseInt(pivot));
  console.log(`Result: ${result === "" ? "No pairs" : result}`);
  rl.close();
};

exports.main = main;
exports.processData = processData;
exports.getPairs = getPairs;
exports.order = order;
