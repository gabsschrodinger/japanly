import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FlashcardFeedback } from "./FlashcardFeedback";
import { FlashcardFeedbackManager } from "@/lib/flashcards/FlashcardFeedbackManager";
import { sample, sampleSize, shuffle, uniqBy } from "lodash";
import { hiraganaList } from "@/lib/hiragana";
import { faker } from "@faker-js/faker";
import { FlashcardFeedbackEntry } from "@/lib/flashcards/types";

describe("Flashcard Feedback Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the feedback header", () => {
    render(<FlashcardFeedback feedback={new FlashcardFeedbackManager([])} />);

    const header = screen.queryByText("Flashcard results:");

    expect(header).toBeInTheDocument();
  });

  it("should render success message when score is 100%", () => {
    const feedback = Array.from({ length: 10 }, () => ({
      text: sample(hiraganaList),
      percentageCorrect: faker.number.int({ min: 100, max: 100 }),
    }));

    const manager = new FlashcardFeedbackManager(
      feedback as FlashcardFeedbackEntry[]
    );

    render(<FlashcardFeedback feedback={manager} />);

    const firstP = screen.queryByText(
      "Congratulations, you got all answers correctly!"
    );
    const secondP = screen.queryByText(
      "When you're ready, please go to the next lesson."
    );

    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
  });

  it("should not render success message when score is not 100%", () => {
    const feedback = Array.from({ length: 100 }, () => ({
      text: sample(hiraganaList),
      percentageCorrect: faker.number.int({ min: 0, max: 100 }),
    }));

    const manager = new FlashcardFeedbackManager(
      feedback as FlashcardFeedbackEntry[]
    );

    render(<FlashcardFeedback feedback={manager} />);

    const firstP = screen.queryByText(
      "Congratulations, you got all answers correctly!"
    );
    const secondP = screen.queryByText(
      "When you're ready, please go to the next lesson."
    );

    expect(firstP).not.toBeInTheDocument();
    expect(secondP).not.toBeInTheDocument();
  });

  it("should display low score works/kanas when applicable", () => {
    const generalFeedback = Array.from({ length: 10 }, () => ({
      text: sample(hiraganaList),
      percentageCorrect: faker.number.int({ min: 0, max: 100 }),
    }));

    const lowScoreFeedback = Array.from({ length: 10 }, () => ({
      text: sample(hiraganaList),
      percentageCorrect: faker.number.int({ min: 0, max: 49 }),
    }));

    const feedback = uniqBy(
      [...generalFeedback, ...lowScoreFeedback],
      "text.japanese"
    );

    const manager = new FlashcardFeedbackManager(
      feedback as FlashcardFeedbackEntry[]
    );

    render(<FlashcardFeedback feedback={manager} />);

    const lowScoreHeader = screen.queryByText("Low score");
    expect(lowScoreHeader).toBeInTheDocument();

    const lowScoreDescription = screen.queryByText(
      "You got a low score for the following words/kanas:"
    );
    expect(lowScoreDescription).toBeInTheDocument();

    manager.getBadEntries().forEach((entry) => {
      const renderedEntry = screen.queryByText(
        `${entry.japanese} (pronounce: ${entry.romaji})`
      );

      expect(renderedEntry).toBeInTheDocument();
    });
  });

  it("should display medium score works/kanas when applicable", () => {
    const pool = shuffle([...hiraganaList]);

    const generalFeedback = Array.from({ length: 10 }, () => ({
      text: pool.pop(),
      percentageCorrect: faker.number.int({ min: 0, max: 100 }),
    }));

    const mediumScoreFeedback = Array.from({ length: 10 }, () => ({
      text: pool.pop(),
      percentageCorrect: faker.number.int({ min: 50, max: 89 }),
    }));

    const feedback = [...generalFeedback, ...mediumScoreFeedback];

    const manager = new FlashcardFeedbackManager(
      feedback as FlashcardFeedbackEntry[]
    );

    render(<FlashcardFeedback feedback={manager} />);

    const mediumScoreHeader = screen.queryByText("Medium score");
    expect(mediumScoreHeader).toBeInTheDocument();

    const mediumScoreDescription = screen.queryByText(
      "You got a medium score for the following words/kanas:"
    );
    expect(mediumScoreDescription).toBeInTheDocument();

    manager.getMediumEntries().forEach((entry) => {
      const renderedEntry = screen.queryByText(
        `${entry.japanese} (pronounce: ${entry.romaji})`
      );

      expect(renderedEntry).toBeInTheDocument();
    });
  });

  it("should display high score works/kanas when applicable", () => {
    const pool = shuffle([...hiraganaList]);

    const generalFeedback = Array.from({ length: 10 }, () => ({
      text: pool.pop(),
      percentageCorrect: faker.number.int({ min: 0, max: 100 }),
    }));

    const highScoreFeedback = Array.from({ length: 10 }, () => ({
      text: pool.pop(),
      percentageCorrect: faker.number.int({ min: 90, max: 99 }),
    }));

    const feedback = [...generalFeedback, ...highScoreFeedback];

    const manager = new FlashcardFeedbackManager(
      feedback as FlashcardFeedbackEntry[]
    );

    render(<FlashcardFeedback feedback={manager} />);

    const highScoreHeader = screen.queryByText("High score");
    expect(highScoreHeader).toBeInTheDocument();

    const highScoreDescription = screen.queryByText(
      "You got a good score for the following words/kanas:"
    );
    expect(highScoreDescription).toBeInTheDocument();

    manager.getGoodEntries().forEach((entry) => {
      const renderedEntry = screen.queryByText(
        `${entry.japanese} (pronounce: ${entry.romaji})`
      );

      expect(renderedEntry).toBeInTheDocument();
    });
  });

  it("should display perfect score works/kanas when applicable", () => {
    const pool = shuffle([...hiraganaList]);

    const generalFeedback = Array.from({ length: 20 }, () => ({
      text: pool.pop(),
      percentageCorrect: faker.number.int({ min: 0, max: 100 }),
    }));

    const perfectScoreFeedback = Array.from({ length: 10 }, () => ({
      text: pool.pop(),
      percentageCorrect: faker.number.int({ min: 100, max: 100 }),
    }));

    const feedback = [...generalFeedback, ...perfectScoreFeedback];

    const manager = new FlashcardFeedbackManager(
      feedback as FlashcardFeedbackEntry[]
    );

    render(<FlashcardFeedback feedback={manager} />);

    const perfectScoreHeader = screen.queryByText("Perfect score");
    expect(perfectScoreHeader).toBeInTheDocument();

    const perfectScoreDescription = screen.queryByText(
      "You got a perfect score for the following words/kanas:"
    );
    expect(perfectScoreDescription).toBeInTheDocument();

    manager.getPerfectEntries().forEach((entry) => {
      const renderedEntry = screen.queryByText(
        `${entry.japanese} (pronounce: ${entry.romaji})`
      );

      expect(renderedEntry).toBeInTheDocument();
    });
  });
});
