import { Flashcard } from "@/components/flashcards/Flashcard";
import { hiraganaList } from "@/lib/hiragana";

export default function Lesson2() {
  return (
    <>
      <h1>Hiragana Flashcards 1</h1>

      <Flashcard kanas={hiraganaList.slice(0, 5)} />
    </>
  );
}
