let readline = require("readline");

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

function getPairs(data, target) {
  const orderedArray = order(data);
  const pairs = [];
  // Get the first and the last items
  let right = orderedArray.length - 1;
  let left = 0;

  while (left < right) {
    const sumVal = orderedArray[left] + orderedArray[right];

    if (sumVal === target) {
      pairs.push([orderedArray[left], orderedArray[right]]);
      left++;
      right--;
    } else if (sumVal < target) {
      left++;
    } else {
      right--;
    }
  }

  return pairs;
}

function processData(data) {
  const arrayData = data.split(",");
  return arrayData;
}

function menu() {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Please insert the numbers separated by comma and press enter: ",
    (data) => {
      if (!data) {
        console.log("Please insert a valid list of numbers. \n");
      } else if (data.toUpperCase() === "Q") {
        console.log("Bye!");
        rl.close();
      } else {
        console.log("\n\n\n");
        const arrayData = processData(data);
        console.log("Numbers", arrayData);
      }

      rl.close();
    }
  );
}

const data = [1, 9, 5, 0, 20, -4, 12, 16, 7, 12];
menu();
