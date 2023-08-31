"use client";

import { getRandomItemFromArray } from "@/lib/utils";
import React, { useState } from "react";
import { Kana } from "../../lib/hiragana";
import { shuffle } from "lodash";
import { FlashcardModal } from "./FlashcardModal";
import ClientSideRendering from "./ClientSideRendering";

type Props = {
  kanas: Kana[];
};

type FlashcardEntry = {
  entry: string;
  options: { value: string; isCorrect: boolean }[];
};

const getRandomEntry = (kanas: Kana[]): FlashcardEntry => {
  const randomKana = getRandomItemFromArray(kanas);
  const options: { value: string; isCorrect: boolean }[] = [
    { isCorrect: true, value: randomKana.romaji },
  ];

  while (options.length < 5) {
    const differentKana = getRandomItemFromArray(kanas);

    if (options.map((option) => option.value).includes(differentKana.romaji)) {
      continue;
    }

    options.push({ value: differentKana.romaji, isCorrect: false });
  }

  return {
    entry: randomKana.value,
    options: shuffle(options),
  };
};

export const Flashcard = ({ kanas }: Props) => {
  const [entry, setEntry] = useState(getRandomEntry(kanas));
  const [isModalActive, setModalActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const selectOption = (value: string) => {
    setSelectedOption(value);
    setModalActive(true);
  };

  const resume = () => {
    setModalActive(false);
    setEntry(getRandomEntry(kanas));
  };

  return (
    <ClientSideRendering>
      <div className="text-2xl border p-3 rounded flex items-center justify-center">
        Hiragana: {entry.entry}
      </div>

      <div>
        <p>Select the appropriate answer:</p>

        {entry.options.map((option, index) => (
          <div
            key={index}
            className={
              (index > 0 ? "mt-4 " : "") +
              "text-2xl border p-3 rounded flex items-center justify-center select-none cursor-pointer"
            }
            onClick={() => selectOption(option.value)}
          >
            {option.value}
          </div>
        ))}
      </div>

      {isModalActive && (
        <FlashcardModal
          isActive={isModalActive}
          correctOption={
            entry.options.filter((option) => option.isCorrect)[0].value
          }
          selectedOption={selectedOption}
          entry={entry.entry}
          resume={resume}
        />
      )}
    </ClientSideRendering>
  );
};
