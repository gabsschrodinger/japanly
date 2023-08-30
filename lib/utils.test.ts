import { faker } from "@faker-js/faker";
import { getRandomItemFromArray } from "./utils";

describe("Test Utils", () => {
  it("should return a random item from an array", () => {
    const randomArray = Array.from({ length: 10 }, () => faker.string.uuid());
    const randomItem = getRandomItemFromArray(randomArray);

    expect(randomArray).toContain(randomItem);
  });
});
