import React from "react";
import { Text } from "@/lib/hiragana";
import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { ListItemWithVoice } from "./ListItemWithVoice";
import { mock } from "jest-mock-extended";
import "@testing-library/jest-dom";

describe("List Item With Void Components", () => {
  const utteranceObj = mock<SpeechSynthesisUtterance>();
  const MockedUtterance = jest.fn().mockReturnValue(utteranceObj);
  const mockedSpeak = jest.fn();

  global.SpeechSynthesisUtterance = MockedUtterance;
  global.speechSynthesis = mock<typeof global.speechSynthesis>({
    speak: mockedSpeak,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render japanese text with romaji pronounce", () => {
    const japaneseText: Text = {
      japanese: faker.animal.dog(),
      romaji: faker.animal.dog(),
    };

    render(<ListItemWithVoice text={japaneseText} />);

    const textWithPronouce = screen.queryByText(
      `${japaneseText.japanese} (pronounce: ${japaneseText.romaji})`
    );

    expect(textWithPronouce).toBeInTheDocument();
  });

  it("should speak japanese text when speaker button is clicked", () => {
    const japaneseText: Text = {
      japanese: faker.animal.dog(),
      romaji: faker.animal.dog(),
    };

    render(<ListItemWithVoice text={japaneseText} />);

    const speakerButton = screen.getByTestId("void-speaker");
    speakerButton.click();

    expect(MockedUtterance).toHaveBeenCalledTimes(1);
    expect(MockedUtterance).toHaveBeenCalledWith(japaneseText.japanese);
    expect(mockedSpeak).toHaveBeenCalledTimes(1);
    expect(mockedSpeak).toHaveBeenCalledWith(utteranceObj);
  });

  it("should not speak japanese text when speaker button is not clicked", () => {
    const japaneseText: Text = {
      japanese: faker.animal.dog(),
      romaji: faker.animal.dog(),
    };

    render(<ListItemWithVoice text={japaneseText} />);

    expect(MockedUtterance).not.toHaveBeenCalled();
    expect(mockedSpeak).not.toHaveBeenCalled();
  });
});
