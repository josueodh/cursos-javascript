const { sum } = require("./calculator");

it("sum 2 and 2 and the result must be 4", async () => {
  expect(sum(2, 2)).toBe(4);
});
it("shold sum 2 and 2 even if one of them is a string and the result must be 4", async () => {
  expect(sum("2", "2")).toBe(4);
});

it("should  throw an error if what is provided to the method", () => {
  expect(() => {
    sum("", "2");
  }).toThrowError();
  expect(() => {
    sum(["2", "2"]);
  }).toThrowError();
  expect(() => {
    sum({});
  }).toThrowError();
});
