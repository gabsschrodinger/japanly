import { sample } from "lodash";
import { hiraganaList } from "../hiragana";
import { faker } from "@faker-js/faker";
import { FlashcardFeedbackManager } from "./FlashcardFeedbackManager";
import { FlashcardFeedbackEntry } from "./types";

describe("FlashcardFeedbackManager", () => {
  describe("getBadEntries", () => {
    it("should return empty array when there are no bad entries", () => {
      const feedback = Array.from({ length: 10 }, () => ({
        text: sample(hiraganaList),
        percentageCorrect: faker.number.int({ min: 50, max: 100 }),
      }));

      const manager = new FlashcardFeedbackManager(
        feedback as FlashcardFeedbackEntry[]
      );

      expect(manager.getBadEntries()).toEqual([]);
    });

    it("should return only bad entries when there are bad entries", () => {
      const feedback = Array.from({ length: 100 }, () => ({
        text: sample(hiraganaList),
        percentageCorrect: faker.number.int({ min: 0, max: 100 }),
      }));

      const manager = new FlashcardFeedbackManager(
        feedback as FlashcardFeedbackEntry[]
      );

      expect(manager.getBadEntries()).toEqual(
        feedback
          .filter((entry) => entry.percentageCorrect < 50)
          .map((entry) => entry.text)
      );
    });
  });

  describe("getMediumEntries", () => {
    it("should return empty array when there are no medium entries", () => {
      const feedback = Array.from({ length: 10 }, () => ({
        text: sample(hiraganaList),
        percentageCorrect: faker.number.int({ min: 0, max: 49 }),
      }));

      const manager = new FlashcardFeedbackManager(
        feedback as FlashcardFeedbackEntry[]
      );

      expect(manager.getMediumEntries()).toEqual([]);
    });

    it("should return only medium entries when there are medium entries", () => {
      const feedback = Array.from({ length: 100 }, () => ({
        text: sample(hiraganaList),
        percentageCorrect: faker.number.int({ min: 0, max: 100 }),
      }));

      const manager = new FlashcardFeedbackManager(
        feedback as FlashcardFeedbackEntry[]
      );

      expect(manager.getMediumEntries()).toEqual(
        feedback
          .filter(
            (entry) =>
              entry.percentageCorrect >= 50 && entry.percentageCorrect < 90
          )
          .map((entry) => entry.text)
      );
    });
  });

  describe("getGoodEntries", () => {
    it("should return empty array when there are no good entries", () => {
      const feedback = Array.from({ length: 10 }, () => ({
        text: sample(hiraganaList),
        percentageCorrect: faker.number.int({ min: 0, max: 89 }),
      }));

      const manager = new FlashcardFeedbackManager(
        feedback as FlashcardFeedbackEntry[]
      );

      expect(manager.getGoodEntries()).toEqual([]);
    });

    it("should return only good entries when there are good entries", () => {
      const feedback = Array.from({ length: 100 }, () => ({
        text: sample(hiraganaList),
        percentageCorrect: faker.number.int({ min: 0, max: 100 }),
      }));

      const manager = new FlashcardFeedbackManager(
        feedback as FlashcardFeedbackEntry[]
      );

      expect(manager.getGoodEntries()).toEqual(
        feedback
          .filter(
            (entry) =>
              entry.percentageCorrect >= 90 && entry.percentageCorrect < 100
          )
          .map((entry) => entry.text)
      );
    });
  });

  describe("getPerfectEntries", () => {
    it("should return empty array when there are no perfect entries", () => {
      const feedback = Array.from({ length: 10 }, () => ({
        text: sample(hiraganaList),
        percentageCorrect: faker.number.int({ min: 0, max: 99 }),
      }));

      const manager = new FlashcardFeedbackManager(
        feedback as FlashcardFeedbackEntry[]
      );

      expect(manager.getPerfectEntries()).toEqual([]);
    });

    it("should return only perfect entries when there are perfect entries", () => {
      const feedback = Array.from({ length: 100 }, () => ({
        text: sample(hiraganaList),
        percentageCorrect: faker.number.int({ min: 0, max: 100 }),
      }));

      const manager = new FlashcardFeedbackManager(
        feedback as FlashcardFeedbackEntry[]
      );

      expect(manager.getPerfectEntries()).toEqual(
        feedback
          .filter((entry) => entry.percentageCorrect === 100)
          .map((entry) => entry.text)
      );
    });
  });

  describe("isAllPerfect", () => {
    it("should return false when there are other types of entries", () => {
      const feedback = Array.from({ length: 10 }, () => ({
        text: sample(hiraganaList),
        percentageCorrect: faker.number.int({ min: 0, max: 99 }),
      }));

      const manager = new FlashcardFeedbackManager(
        feedback as FlashcardFeedbackEntry[]
      );

      expect(manager.isAllPerfect()).toBe(false);
    });

    it("should return true when there are only perfect entries", () => {
      const feedback = Array.from({ length: 10 }, () => ({
        text: sample(hiraganaList),
        percentageCorrect: faker.number.int({ min: 100, max: 100 }),
      }));

      const manager = new FlashcardFeedbackManager(
        feedback as FlashcardFeedbackEntry[]
      );

      expect(manager.isAllPerfect()).toBe(true);
    });
  });
});
