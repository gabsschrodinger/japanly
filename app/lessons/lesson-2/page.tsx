"use client";

import React from "react";
import { Flashcard } from "@/components/flashcards/Flashcard";
import { hiraganaList } from "@/lib/hiragana";
import { useState } from "react";
import { NextOption } from "@/components/NextOption";

export default function Lesson2() {
  const [isFlashcardActive, setFlashcardActive] = useState(false);

  return (
    <>
      <h1>Hiragana Flashcards 1</h1>

      {!isFlashcardActive && (
        <>
          <p>
            This first flashcard exercise from Japanly covers the five first
            hiragana seen in the previous lesson:{" "}
            {hiraganaList
              .slice(0, 5)
              .map((hiragana) => hiragana.japanese)
              .join(", ")}
            .
          </p>

          <p>
            Fashcard exercises consist of 15 rounds, where you&apos;ll have to
            select the correct romaji value for a given hiragana, or the other
            way around.
          </p>

          <p>
            At the end of the last round, we&apos;ll give you feedback about
            which hiragana you should review.
          </p>

          <p>When you feel ready to start, click on the button below:</p>

          <div
            className="border rounded p-2 w-fit cursor-pointer"
            onClick={() => setFlashcardActive((prev) => !prev)}
          >
            Start
          </div>
        </>
      )}

      {isFlashcardActive && (
        <Flashcard
          length={15}
          pool={hiraganaList.slice(0, 5)}
          end={() => setFlashcardActive(false)}
        />
      )}

      {!isFlashcardActive && (
        <NextOption
          previous={{
            position: "previous",
            title: "Hiragana - Part 1",
            url: "/lessons/lesson-1",
          }}
        />
      )}
    </>
  );
}
