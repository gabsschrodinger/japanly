import { faker } from "@faker-js/faker";
import { hiraganaList } from "../hiragana";
import { FlashcardManager } from "./FlashcardManager";
import { last } from "lodash";

describe("Flashcard Manager", () => {
  describe("constructor", () => {
    it("should create a new Flashcard Manager when constructor receives a valid pool", () => {
      const manager = new FlashcardManager(hiraganaList);

      expect(manager).toBeInstanceOf(FlashcardManager);
    });

    it("should throw an error when constructor receives an invalid pool", () => {
      expect(() => new FlashcardManager([])).toThrowError(
        "Flashcard pool must contain at lest one element."
      );
    });
  });

  describe("get new entry", () => {
    it("should get a random item from array", () => {
      const manager = new FlashcardManager(hiraganaList);

      const randomEntry = manager.getNewEntry();

      expect(
        hiraganaList.flatMap((entry) => [entry.japanese, entry.romaji])
      ).toContain(randomEntry.entry);
    });

    it("should set the correct answer", () => {
      const manager = new FlashcardManager(hiraganaList);

      const randomEntry = manager.getNewEntry();

      const correctOptionFilter = randomEntry.options.filter(
        (option) => option.isCorrect
      );

      expect(correctOptionFilter.length).toBe(1);

      expect(
        hiraganaList
          .filter(
            (hiragana) =>
              hiragana.japanese === correctOptionFilter[0].value ||
              hiragana.romaji === correctOptionFilter[0].value
          )
          .flatMap((element) => [element.japanese, element.romaji])
      ).toContain(correctOptionFilter[0].value);
    });

    it("should not return the same entry twice in a row", () => {
      const manager = new FlashcardManager(hiraganaList.slice(0, 5));

      let prevEntry = manager.getNewEntry();

      for (let _ = 0; _ < 100; _++) {
        manager.selectOption(faker.animal.cat());
        const newEntry = manager.getNewEntry();
        expect([
          prevEntry.entry,
          prevEntry.options.filter((option) => option.isCorrect)[0],
        ]).not.toContain(newEntry.entry);

        prevEntry = newEntry;
      }
    });
  });

  describe("get correct answer", () => {
    it("should get the correct answer of the current entry", () => {
      const manager = new FlashcardManager(hiraganaList);

      const randomEntry = manager.getNewEntry();

      const correctOptionFilter = randomEntry.options.filter(
        (option) => option.isCorrect
      );

      expect(manager.getCorrectAnswer()).toEqual(correctOptionFilter[0].value);
    });
  });

  describe("select option", () => {
    it("should return true if selected option is correct", () => {
      const manager = new FlashcardManager(hiraganaList);
      manager.getNewEntry();

      const result = manager.selectOption(manager.getCorrectAnswer());

      expect(result).toBeTruthy();
    });

    it("should return false if selected option is incorrect", () => {
      const manager = new FlashcardManager(hiraganaList);
      manager.getNewEntry();

      const result = manager.selectOption(faker.animal.cat());

      expect(result).toBeFalsy();
    });

    it("should append new history entry when correct option is selected", () => {
      const manager = new FlashcardManager(hiraganaList);
      manager.getNewEntry();

      expect(manager.history.length).toBe(0);
      manager.selectOption(manager.getCorrectAnswer());

      expect(manager.history.length).toBe(1);
      expect(last(manager.history)).toEqual({
        isCorrect: true,
        values: [manager.getCorrectAnswer(), manager.currentEntry.entry],
      });
    });

    it("should append new history entry when incorrect option is selected", () => {
      const manager = new FlashcardManager(hiraganaList);
      manager.getNewEntry();

      expect(manager.history.length).toBe(0);
      manager.selectOption(faker.animal.cat());

      expect(manager.history.length).toBe(1);
      expect(last(manager.history)).toEqual({
        isCorrect: false,
        values: [manager.getCorrectAnswer(), manager.currentEntry.entry],
      });
    });
  });

  describe("get last history entry", () => {
    it("should return last history entry when there is at least one history entry", () => {
      const manager = new FlashcardManager(hiraganaList);
      manager.getNewEntry();
      manager.selectOption(manager.getCorrectAnswer());

      const firstHistory = manager.getLastHistoryEntry();
      expect(firstHistory).toEqual({
        isCorrect: true,
        values: [manager.getCorrectAnswer(), manager.currentEntry.entry],
      });

      manager.getNewEntry();
      manager.selectOption(faker.animal.cat());

      const secondHistory = manager.getLastHistoryEntry();
      expect(secondHistory).toEqual({
        isCorrect: false,
        values: [manager.getCorrectAnswer(), manager.currentEntry.entry],
      });
    });

    it("should throw an error when there are no entries in history", () => {
      const manager = new FlashcardManager(hiraganaList);

      expect(() => manager.getLastHistoryEntry()).toThrowError(
        "No history entries to get."
      );
    });
  });
});
