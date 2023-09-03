import { shuffle } from "lodash";
import { Text } from "./hiragana";
import { getRandomItemFromArray } from "./utils";

export type FlashcardEntry = {
  entry: string;
  subtitle: string;
  options: { value: string; isCorrect: boolean }[];
};

export const getRandomEntry = (kanas: Text[]): FlashcardEntry => {
  const randomKana = getRandomItemFromArray(kanas);
  const [indexKey, queryKey]: (keyof Text)[] = shuffle(["japanese", "romaji"]);

  const options: { value: string; isCorrect: boolean }[] = [
    { isCorrect: true, value: randomKana[queryKey] },
  ];

  while (options.length < 5) {
    const differentKana = getRandomItemFromArray(kanas);

    if (
      options.map((option) => option.value).includes(differentKana[queryKey])
    ) {
      continue;
    }

    options.push({ value: differentKana[queryKey], isCorrect: false });
  }

  return {
    entry: randomKana[indexKey],
    subtitle: indexKey === "japanese" ? "Hiragana" : "Romaji",
    options: shuffle(options),
  };
};
