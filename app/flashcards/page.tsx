"use client";

import { getRandomItemFromArray } from "@/lib/utils";
import React, { useState } from "react";
import ClientSideRendering from "./ClientSideRendering";
import { hiraganaList } from "./hiragana";

export default function Flashcard() {
  const [hiragana, setHiragana] = useState(
    getRandomItemFromArray(hiraganaList)
  );

  return (
    <ClientSideRendering>
      <main>
        <div className="text-2xl">Hiragana: {hiragana.value}</div>
        <div
          className="mt-5 text-xl cursor-pointer select-none"
          onClick={() => setHiragana(getRandomItemFromArray(hiraganaList))}
        >
          Change Hiragana
        </div>
      </main>
    </ClientSideRendering>
  );
}
