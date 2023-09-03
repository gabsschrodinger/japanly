import { hiraganaList } from "./hiragana";

import { toRomaji } from "wanakana";

describe("Hiragana", () => {
  it("Romaji is correct", () => {
    hiraganaList.forEach((hiragana) => {
      expect(hiragana.romaji.toLowerCase()).toEqual(
        toRomaji(hiragana.japanese).toLowerCase()
      );
    });
  });
});
