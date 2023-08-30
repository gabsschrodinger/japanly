import { faker } from "@faker-js/faker";
import { captalizeWord, getRandomItemFromArray } from "./utils";

describe("Test Utils", () => {
  describe("getRandomItemFromArray", () => {
    it("should return a random item from an array", () => {
      const randomArray = Array.from({ length: 10 }, () => faker.string.uuid());
      const randomItem = getRandomItemFromArray(randomArray);

      expect(randomArray).toContain(randomItem);
    });
  });

  describe("captalizeWord", () => {
    it("should captalize words", () => {
      const expected = faker.person.firstName();

      expect(captalizeWord(expected.toLowerCase())).toEqual(expected);
    });
  });
});
