"use client";

export default function Lesson01() {
  const speak = (kana: string) => {
    var utterance = new SpeechSynthesisUtterance(kana);
    utterance.lang = "ja-JP";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="mx-20">
      <article className="mt-10 prose lg:prose-xl dark:prose-invert">
        <h1>Hiragana</h1>
        <p>The first content you&apos;ll learn with Japanly is Hiragana.</p>

        <h2>Introduction</h2>
        <p>
          Hiragana is a Japanese syllabary mainly used for{" "}
          <a href="https://en.wikipedia.org/wiki/Hiragana" target="_blank">
            Wikipedia
          </a>
          :
        </p>
        <ul>
          <li>Words&apos; suffixes, like inflecting verbs and adjectives</li>
          <li>Japanese particles</li>
          <li>Japanese words</li>
          <li>Furigana</li>
        </ul>
        <p>
          We&apos;ll see each of those use cases in more detail in the future,
          but the very first step for learning Japanese with Japanly is
          memorizing all the Hiragana.
        </p>
        <p>
          It&apos;s important to notice that hiragana doesn&apos;t have meaning
          by itself like Kanji, but they represent sounds.
        </p>

        <h2>Groups of hiragana</h2>

        <h3>First group of hiragana</h3>
        <p>
          The first group of hiragana you need to learn is (you can click on the
          icon to play the sound of each hiragana):
        </p>
        <ul>
          <li>
            <div
              className="flex justify-center items-center w-fit"
              onClick={() => speak("あ")}
            >
              あ (pronounce: A)
              <div className="ml-4">
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
          <li>
            <div
              className="flex justify-center items-center w-fit"
              onClick={() => speak("い")}
            >
              い (pronounce: I)
              <div className="ml-4">
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
          <li>う (pronounce: U)</li>
          <li>え (pronounce: E)</li>
          <li>お (pronounce: O)</li>
        </ul>
      </article>
    </main>
  );
}
