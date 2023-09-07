"use client";

import React, { useState } from "react";
import { Text } from "../../lib/hiragana";
import { FlashcardModal } from "./FlashcardModal";
import ClientSideRendering from "../ClientSideRendering";
import { FlashcardManager } from "@/lib/flashcards/FlashcardManager";
import { FlashcardFeedback } from "./FlashcardFeedback";

type Props = {
  pool: Text[];
  end: () => void;
  length: number;
};

export const Flashcard = ({ pool, end, length }: Props) => {
  const [manager] = useState(new FlashcardManager(pool));
  const [isModalActive, setModalActive] = useState(false);
  const [isGameFinished, setGameFinished] = useState(false);

  const selectOption = (value: string) => {
    manager.selectOption(value);
    setModalActive(true);
  };

  const resume = () => {
    if (manager.round >= length) {
      setGameFinished(true);
      console.log(manager.getFeedback());
      return;
    }

    setModalActive(false);
    manager.getNewEntry();
  };

  return (
    <>
      {!isGameFinished && (
        <ClientSideRendering>
          <div className="select-none mb-10 w-full flex justify-center items-center">
            <div className="border p-3 rounded-full">
              {manager.round}/{length}
            </div>
          </div>

          <div
            data-testid="flashcard-header"
            className="text-2xl border p-3 rounded flex items-center justify-center dark:border-gray-200 border-gray-900"
          >
            {manager.currentEntry.subtitle}: {manager.currentEntry.entry}
          </div>

          <div>
            <p>Select the appropriate answer:</p>

            {manager.currentEntry.options.map((option, index) => (
              <div
                key={index}
                className={
                  (index > 0 ? "mt-4 " : "") +
                  "dark:hover:bg-zinc-800 hover:bg-zinc-400 duration-300 text-2xl dark:border-gray-200 border-gray-900 border p-3 rounded flex items-center justify-center select-none cursor-pointer"
                }
                onClick={() => selectOption(option.value)}
              >
                {option.value}
              </div>
            ))}
          </div>

          {isModalActive && (
            <FlashcardModal
              history={manager.getLastHistoryEntry()}
              isActive={isModalActive}
              resume={resume}
            />
          )}
        </ClientSideRendering>
      )}

      {isGameFinished && <FlashcardFeedback feedback={manager.getFeedback()} />}
    </>
  );
};
