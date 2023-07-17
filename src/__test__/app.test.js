const app = require("../utils");

describe("Test inserted data format", () => {
  test("process data function convert string in an array of integers", () => {
    expect(app.processData("1,2,3,4,5")).toStrictEqual([1, 2, 3, 4, 5]);
  });
});

describe("Test order function", () => {
  test("order array inserted using quicksort", () => {
    const arrayOfNumbers = app.processData("5,3,6,4,1");
    expect(app.order(arrayOfNumbers)).toStrictEqual([1, 3, 4, 5, 6]);
  });
});

describe("Test pairs function", () => {
  test("get pairs from orderded array and number to find", () => {
    const arrayOfNumbers = app.processData("1,9,5,0,20,-4,12,16,7,12");
    const arrayOrdered = app.order(arrayOfNumbers);
    expect(app.getPairs(arrayOrdered, 12)).toStrictEqual(
      "\n-4, 16\n0, 12\n5, 7"
    );
  });

  test("get no pairs from orderded array and a not valid number to find", () => {
    const arrayOfNumbers = app.processData("1,9,5,0,20,-4,12,16,7,12");
    const arrayOrdered = app.order(arrayOfNumbers);
    expect(app.getPairs(arrayOrdered, 95)).toStrictEqual("No Pairs");
  });
});
