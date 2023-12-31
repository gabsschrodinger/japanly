"use client";

import React from "react";
import { Text } from "@/lib/hiragana";

type Props = {
  text: Text;
};

export const ListItemWithVoice = ({ text }: Props) => {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <li>
      <div className="flex justify-center items-center w-fit">
        {text.japanese} (pronounce: {text.romaji})
        <div
          className="ml-4 cursor-pointer border rounded-full p-1"
          onClick={() => speak(text.japanese)}
          data-testid="void-speaker"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        </div>
      </div>
    </li>
  );
};
