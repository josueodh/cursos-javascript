import { queryString, parse } from "./queryString";
describe("Objeto to query string", () => {
  it("should create a valid query when an object is provided", async () => {
    const obj = {
      name: "Fabio",
      profession: "developer",
    };

    expect(queryString(obj)).toBe("name=Fabio&profession=developer");
  });
  it("should create a valid query string even when an array is passed as value", () => {
    const obj = {
      name: "Fabio",
      abilities: ["JS", "TDD"],
    };

    expect(queryString(obj)).toBe("name=Fabio&abilities=JS,TDD");
  });
  it("shouldthrwo an errro when an object is passed as value ", async () => {
    const obj = {
      name: "Fabio",
      abilities: {
        first: "JS",
        second: "TDD",
      },
    };

    expect(() => queryString(obj)).toThrowError();
  });
});
describe("Query string to object", () => {
  it("should convert a query string to object", async () => {
    const qs = "name=Fabio&profession=developer";
    expect(parse(qs)).toEqual({
      name: "Fabio",
      profession: "developer",
    });
  });

  it("should convert a query string of a single key-value pair to object", async () => {
    const qs = "profession=developer";
    expect(parse(qs)).toEqual({
      profession: "developer",
    });
  });
  it("should convert a query string to an object taking care of comma separeted values", async () => {
    const qs = "name=Fabio&abilities=JS,TDD";

    expect(parse(qs)).toEqual({
      name: "Fabio",
      abilities: ["JS", "TDD"],
    });
  });
});
