"use client";

import React, { useState } from "react";
import { Text } from "../../lib/hiragana";
import { FlashcardModal } from "./FlashcardModal";
import ClientSideRendering from "../ClientSideRendering";
import { getRandomEntry } from "@/lib/flashcard.utils";

type Props = {
  kanas: Text[];
  end: () => void;
};

export const Flashcard = ({ kanas, end }: Props) => {
  const [round, setRound] = useState(1);
  const [entry, setEntry] = useState(getRandomEntry(kanas));
  const [isModalActive, setModalActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const selectOption = (value: string) => {
    setSelectedOption(value);
    setModalActive(true);
  };

  const resume = () => {
    if (round >= 15) {
      end();
      return;
    }

    setModalActive(false);
    setRound((prev) => prev + 1);
    setEntry(getRandomEntry(kanas));
  };

  return (
    <ClientSideRendering>
      <div className="select-none mb-10 w-full flex justify-center items-center">
        <div className="border p-3 rounded-full">{round}/15</div>
      </div>

      <div className="text-2xl border p-3 rounded flex items-center justify-center dark:border-gray-200 border-gray-900">
        {entry.subtitle}: {entry.entry}
      </div>

      <div>
        <p>Select the appropriate answer:</p>

        {entry.options.map((option, index) => (
          <div
            key={index}
            className={
              (index > 0 ? "mt-4 " : "") +
              "text-2xl dark:border-gray-200 border-gray-900 border p-3 rounded flex items-center justify-center select-none cursor-pointer"
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
