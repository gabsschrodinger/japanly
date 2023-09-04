import { capitalize, keys, last, sample, shuffle, values } from "lodash";
import { Text } from "../hiragana";
import { FlashcardEntry, FlashcardHistoryEntry } from "./types";

export class FlashcardManager {
  private pool: Text[];
  public history: FlashcardHistoryEntry[];
  public currentEntry: FlashcardEntry;
  public round: number;

  constructor(pool: Text[]) {
    if (pool.length < 1) {
      throw new Error("Flashcard pool must contain at lest one element.");
    }

    this.pool = pool;
    this.round = 0;
    this.history = [];
    this.currentEntry = this.getNewEntry();
  }

  private addIncorrectOptions(
    options: {
      isCorrect: boolean;
      value: string;
    }[],
    queryKey: keyof Text
  ): void {
    while (options.length < 5) {
      const differentText = sample(this.pool) as Text;

      if (
        options.map((option) => option.value).includes(differentText[queryKey])
      ) {
        continue;
      }

      options.push({ value: differentText[queryKey], isCorrect: false });
    }
  }

  private getRandomTextSample(): Text {
    let randomText = sample(this.pool) as Text;

    if (this.history.length > 0) {
      while (values(randomText).includes(this.currentEntry.entry)) {
        randomText = sample(this.pool) as Text;
      }
    }

    return randomText;
  }

  public getNewEntry(): FlashcardEntry {
    const randomText = this.getRandomTextSample();
    const [indexKey, queryKey] = shuffle(keys(this.pool[0]) as (keyof Text)[]);

    const options = [{ isCorrect: true, value: randomText[queryKey] }];
    this.addIncorrectOptions(options, queryKey);

    this.currentEntry = {
      entry: randomText[indexKey],
      subtitle: capitalize(indexKey),
      options: shuffle(options),
    };

    this.round++;

    return this.currentEntry;
  }

  public getCorrectAnswer(): string {
    return this.currentEntry.options.filter((option) => option.isCorrect)[0]
      .value;
  }

  public selectOption(option: string): boolean {
    const isCorrect = option === this.getCorrectAnswer();

    this.history.push({
      isCorrect,
      values: [this.getCorrectAnswer(), this.currentEntry.entry],
    });

    return isCorrect;
  }

  public getLastHistoryEntry(): FlashcardHistoryEntry {
    if (this.history.length < 1) {
      throw new Error("No history entries to get.");
    }

    return last(this.history) as FlashcardHistoryEntry;
  }
}
