export type FlashcardEntry = {
  entry: string;
  subtitle: string;
  options: { value: string; isCorrect: boolean }[];
};

export type FlashcardHistoryEntry = { values: string[]; isCorrect: boolean };
