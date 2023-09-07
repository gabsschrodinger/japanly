import { Text } from "../hiragana";

export type FlashcardEntry = {
  entry: string;
  subtitle: string;
  options: { value: string; isCorrect: boolean }[];
};

export type FlashcardHistoryEntry = { values: string[]; isCorrect: boolean };

export type FlashcardFeedbackEntry = { text: Text; percentageCorrect: number };
