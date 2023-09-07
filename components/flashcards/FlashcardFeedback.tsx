import React from "react";
import { FlashcardFeedbackManager } from "@/lib/flashcards/FlashcardFeedbackManager";
import { ListItemWithVoice } from "../ListItemWithVoice";

type Props = {
  feedback: FlashcardFeedbackManager;
};

export const FlashcardFeedback = ({ feedback }: Props) => {
  return (
    <>
      <h2>Flashcard results:</h2>

      {feedback.isAllPerfect() && (
        <>
          <p>Congratulations, you got all answers correctly!</p>
          <p>When you&apos;re ready, please go to the next lesson.</p>
        </>
      )}

      {!feedback.isAllPerfect() && (
        <>
          {feedback.getBadEntries().length > 0 && (
            <>
              <h3>Low score</h3>
              <p>You got a low score for the following words/kanas:</p>
              <ul>
                {feedback.getBadEntries().map((entry, index) => (
                  <ListItemWithVoice text={entry} key={index} />
                ))}
              </ul>
            </>
          )}

          {feedback.getMediumEntries().length > 0 && (
            <>
              <h3>Medium score</h3>
              <p>You got a medium score for the following words/kanas:</p>
              <ul>
                {feedback.getMediumEntries().map((entry, index) => (
                  <ListItemWithVoice text={entry} key={index} />
                ))}
              </ul>
            </>
          )}

          {feedback.getGoodEntries().length > 0 && (
            <>
              <h3>High score</h3>
              <p>You got a good score for the following words/kanas:</p>
              <ul>
                {feedback.getGoodEntries().map((entry, index) => (
                  <ListItemWithVoice text={entry} key={index} />
                ))}
              </ul>
            </>
          )}

          {feedback.getPerfectEntries().length > 0 && (
            <>
              <h3>Perfect score</h3>
              <p>You got a perfect score for the following words/kanas:</p>
              <ul>
                {feedback.getPerfectEntries().map((entry, index) => (
                  <ListItemWithVoice text={entry} key={index} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
};
