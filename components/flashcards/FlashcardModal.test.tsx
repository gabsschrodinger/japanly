import React from "react";
import { render, screen } from "@testing-library/react";
import { FlashcardModal } from "./FlashcardModal";
import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom";
import { FlashcardHistoryEntry } from "@/lib/flashcards/types";

describe("Flashcard Modal", () => {
  const mockedPlay = jest.fn();
  const MockedAudio = jest.fn().mockImplementation(() => ({
    play: mockedPlay,
  }));

  global.Audio = MockedAudio;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render only positive message when the answer is correct", () => {
    const entry = faker.animal.type();
    const option = faker.animal.cat();
    const history: FlashcardHistoryEntry = {
      isCorrect: true,
      values: [entry, option],
    };

    render(
      <FlashcardModal history={history} isActive={false} resume={jest.fn()} />
    );

    const positiveMessage = screen.queryByText("Correct answer!");
    const negativeMessage = screen.queryByText("Incorrect answer :(");

    expect(negativeMessage).not.toBeInTheDocument();
    expect(positiveMessage).toBeInTheDocument();
  });

  it("should render only negative message when the answer is incorrect", () => {
    const entry = faker.animal.type();
    const correctOption = faker.animal.cat();
    const history: FlashcardHistoryEntry = {
      isCorrect: false,
      values: [entry, correctOption],
    };

    render(
      <FlashcardModal history={history} isActive={false} resume={jest.fn()} />
    );

    const positiveMessage = screen.queryByText("Correct answer!");
    const negativeMessage = screen.queryByText("Incorrect answer :(");

    expect(negativeMessage).toBeInTheDocument();
    expect(positiveMessage).not.toBeInTheDocument();
  });

  it.each([[true], [false]])(
    "should call resume when user click on 'Continue'",
    (isCorrect) => {
      const entry = faker.animal.type();
      const correctOption = faker.animal.snake();
      const resume = jest.fn();
      const history: FlashcardHistoryEntry = {
        isCorrect,
        values: [entry, correctOption],
      };

      render(
        <FlashcardModal history={history} isActive={false} resume={resume} />
      );

      const continueElement = screen.getByText("Continue");

      expect(resume).not.toHaveBeenCalled();
      continueElement.click();
      expect(resume).toHaveBeenCalledTimes(1);
    }
  );

  it("should create audio with correct sound when selected option is correct", () => {
    const entry = faker.animal.type();
    const option = faker.animal.snake();
    const history: FlashcardHistoryEntry = {
      isCorrect: true,
      values: [entry, option],
    };

    render(
      <FlashcardModal history={history} isActive={true} resume={jest.fn()} />
    );

    expect(Audio).toHaveBeenCalledTimes(1);
    expect(Audio).toHaveBeenCalledWith("/flashcard_correct.wav");
  });

  it("should create audio with incorrect sound when selected option is incorrect", () => {
    const entry = faker.animal.type();
    const correctOption = faker.animal.bear();
    const history: FlashcardHistoryEntry = {
      isCorrect: false,
      values: [entry, correctOption],
    };

    render(
      <FlashcardModal history={history} isActive={true} resume={jest.fn()} />
    );

    expect(Audio).toHaveBeenCalledTimes(1);
    expect(Audio).toHaveBeenCalledWith("/flashcard_incorrect.wav");
  });

  it.each([[true], [false]])(
    "should play audio when modal is active",
    (isCorrect) => {
      const entry = faker.animal.type();
      const correctOption = faker.animal.snake();
      const history: FlashcardHistoryEntry = {
        isCorrect,
        values: [entry, correctOption],
      };

      render(
        <FlashcardModal history={history} isActive={true} resume={jest.fn()} />
      );

      expect(mockedPlay).toHaveBeenCalledTimes(1);
    }
  );

  it.each([[true], [false]])(
    "should not play audio when modal is inactive",
    (isCorrect) => {
      const entry = faker.animal.type();
      const correctOption = faker.animal.snake();
      const history: FlashcardHistoryEntry = {
        isCorrect,
        values: [entry, correctOption],
      };

      render(
        <FlashcardModal history={history} isActive={false} resume={jest.fn()} />
      );

      expect(mockedPlay).not.toHaveBeenCalled();
    }
  );
});
