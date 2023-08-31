import { ListItemWithVoice } from "@/components/ListItemWithVoice";
import { hiraganaList } from "../../../lib/hiragana";
import { NextOption } from "@/components/NextOption";

export default function Lesson1() {
  return (
    <>
      <h1>Hiragana - Part 1</h1>
      <p>The first content you&apos;ll learn with Japanly is Hiragana.</p>

      <h2>Introduction</h2>
      <p>
        Hiragana is a Japanese syllabary mainly used for{" ("}
        <a href="https://en.wikipedia.org/wiki/Hiragana" target="_blank">
          Wikipedia
        </a>
        ):
      </p>
      <ul>
        <li>Words&apos; suffixes, like inflecting verbs and adjectives</li>
        <li>Japanese particles</li>
        <li>Japanese words</li>
        <li>Furigana (reading aid for kanji)</li>
      </ul>
      <p>
        We&apos;ll see each of those use cases in more detail in the future, but
        the very first step for learning Japanese with Japanly is memorizing all
        the Hiragana.
      </p>
      <p>
        It&apos;s important to notice that hiragana doesn&apos;t have meaning by
        itself like Kanji, but it represents sounds.
      </p>

      <h2>Groups of hiragana</h2>

      <h3>The first group of hiragana</h3>
      <p>
        The first group of hiragana you need to learn is (you can click on the
        icon to play the sound of each hiragana):
      </p>
      <ul>
        {hiraganaList.slice(0, 5).map((hiragana, index) => (
          <ListItemWithVoice kana={hiragana} key={index} />
        ))}
      </ul>
      <p>
        It&apos;s beneficial to practice writing hiragana, not only because it
        aids in memorizing them but also because practicing the act of writing
        Japanese characters is crucial. This is particularly true for kanji,
        which have many strokes, but even with kana, such as hiragana, it&apos;s
        important to get accustomed to their distinct shapes, especially since
        they are vastly different from the letters in the alphabet.
      </p>
      <p>
        To help you memorize kanas, we&apos;ll provide flashcard exercises. To
        start, click on the button below to go to the first flashcard exercise.
      </p>

      <NextOption
        position="next"
        title="Hiragana Flashcards 1"
        url="/lessons/lesson-2"
      />
    </>
  );
}
