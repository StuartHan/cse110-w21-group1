const { getByText, getByTestId, fireEvent } = require("@testing-library/dom");

test("simple test", () => {
  expect(1 + 2).toBe(3);
});

const timeToSec = require("../source/Front-end/javascript/main.js")
describe("timeToSec", () => {
  test("should change min:sec into sec", () => {
    expect(timeToSec("02:00")).toBe(120);
  });

  test("should change min:sec into sec", () => {
    expect(timeToSec("00:00")).toBe(0);
  });
});