import React from "react";
import { render, screen } from "@testing-library/react";
import { FlashcardModal } from "./FlashcardModal";
import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom";

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

    render(
      <FlashcardModal
        entry={entry}
        isActive={false}
        correctOption={option}
        selectedOption={option}
        resume={jest.fn()}
      />
    );

    const positiveMessage = screen.queryByText("Correct answer!");
    const negativeMessage = screen.queryByText("Incorrect answer :(");

    expect(negativeMessage).not.toBeInTheDocument();
    expect(positiveMessage).toBeInTheDocument();
  });

  it("should render only negative message when the answer is incorrect", () => {
    const entry = faker.animal.type();
    const correctOption = faker.animal.cat();
    const selectedOption = faker.animal.snake();

    render(
      <FlashcardModal
        entry={entry}
        isActive={false}
        correctOption={correctOption}
        selectedOption={selectedOption}
        resume={jest.fn()}
      />
    );

    const positiveMessage = screen.queryByText("Correct answer!");
    const negativeMessage = screen.queryByText("Incorrect answer :(");

    expect(negativeMessage).toBeInTheDocument();
    expect(positiveMessage).not.toBeInTheDocument();
  });

  it("should call resume when user click on 'Continue'", () => {
    const entry = faker.animal.type();
    const correctOption = faker.animal.snake();
    const selectedOption = faker.animal.snake();
    const resume = jest.fn();

    render(
      <FlashcardModal
        entry={entry}
        isActive={false}
        correctOption={correctOption}
        selectedOption={selectedOption}
        resume={resume}
      />
    );

    const continueElement = screen.getByText("Continue");

    expect(resume).not.toHaveBeenCalled();
    continueElement.click();
    expect(resume).toHaveBeenCalledTimes(1);
  });

  it("should create audio with correct sound when selected option is correct", () => {
    const entry = faker.animal.type();
    const option = faker.animal.snake();

    render(
      <FlashcardModal
        entry={entry}
        isActive={true}
        correctOption={option}
        selectedOption={option}
        resume={jest.fn()}
      />
    );

    expect(Audio).toHaveBeenCalledTimes(1);
    expect(Audio).toHaveBeenCalledWith("/flashcard_correct.wav");
  });

  it("should create audio with incorrect sound when selected option is incorrect", () => {
    const entry = faker.animal.type();
    const selectedOption = faker.animal.snake();
    const correctOption = faker.animal.bear();

    render(
      <FlashcardModal
        entry={entry}
        isActive={true}
        correctOption={correctOption}
        selectedOption={selectedOption}
        resume={jest.fn()}
      />
    );

    expect(Audio).toHaveBeenCalledTimes(1);
    expect(Audio).toHaveBeenCalledWith("/flashcard_incorrect.wav");
  });

  it("should play audio when modal is active", () => {
    const entry = faker.animal.type();
    const correctOption = faker.animal.snake();
    const selectedOption = faker.animal.snake();

    render(
      <FlashcardModal
        entry={entry}
        isActive={true}
        correctOption={correctOption}
        selectedOption={selectedOption}
        resume={jest.fn()}
      />
    );

    expect(mockedPlay).toHaveBeenCalledTimes(1);
  });

  it("should not play audio when modal is inactive", () => {
    const entry = faker.animal.type();
    const correctOption = faker.animal.snake();
    const selectedOption = faker.animal.snake();

    render(
      <FlashcardModal
        entry={entry}
        isActive={false}
        correctOption={correctOption}
        selectedOption={selectedOption}
        resume={jest.fn()}
      />
    );

    expect(mockedPlay).not.toHaveBeenCalled();
  });
});
