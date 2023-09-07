import { Text } from "../hiragana";
import { FlashcardFeedbackEntry } from "./types";

export class FlashcardFeedbackManager {
  public feedback: FlashcardFeedbackEntry[];

  constructor(feedback: FlashcardFeedbackEntry[]) {
    this.feedback = feedback;
  }

  public isAllPerfect(): boolean {
    const perfectEntries = this.getPerfectEntries();

    return perfectEntries.length === this.feedback.length;
  }

  public getBadEntries(): Text[] {
    return this.feedback
      .filter((entry) => entry.percentageCorrect < 50)
      .map((entry) => entry.text);
  }

  public getMediumEntries(): Text[] {
    return this.feedback
      .filter(
        (entry) => entry.percentageCorrect >= 50 && entry.percentageCorrect < 90
      )
      .map((entry) => entry.text);
  }

  public getGoodEntries(): Text[] {
    return this.feedback
      .filter(
        (entry) =>
          entry.percentageCorrect >= 90 && entry.percentageCorrect < 100
      )
      .map((entry) => entry.text);
  }

  public getPerfectEntries(): Text[] {
    return this.feedback
      .filter((entry) => entry.percentageCorrect === 100)
      .map((entry) => entry.text);
  }
}
