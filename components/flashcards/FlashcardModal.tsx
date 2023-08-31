type Props = {
  entry: string;
  selectedOption: string;
  correctOption: string;
  resume: () => void;
  isActive: boolean;
};

export const FlashcardModal = ({
  selectedOption,
  entry,
  correctOption,
  resume,
  isActive,
}: Props) => {
  const playSound = () => {
    const isCorrect = selectedOption === correctOption;
    const audioFile = isCorrect
      ? "/flashcard_correct.wav"
      : "/flashcard_incorrect.wav";

    new Audio(audioFile).play();
  };

  if (isActive) {
    playSound();
  }

  return (
    <div className="fixed w-screen h-screen flex justify-center items-center z-50 top-0 left-0 bg-black bg-opacity-40">
      <div className="bg-zinc-900 w-1/3 h-2/6 flex flex-col justify-start items-center rounded border p-4">
        {selectedOption === correctOption && (
          <div className="flex justify-center items-center">
            <div className="mr-3">
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
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            Correct answer!
          </div>
        )}

        {selectedOption !== correctOption && (
          <div className="flex justify-center items-center">
            <div className="mr-3">
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
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            Incorrect answer :(
          </div>
        )}

        <hr className="w-full !my-0 text-white"></hr>
        <div className="!mt-5">
          {entry} is equivalent to {correctOption}
        </div>
        <div
          className="mt-auto border rounded p-2 cursor-pointer"
          onClick={resume}
        >
          Continue
        </div>
      </div>
    </div>
  );
};
