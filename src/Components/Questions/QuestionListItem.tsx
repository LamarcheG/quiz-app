import { useState } from "react";
import { IQuestionItem } from "../../interfaces";
import { checkAnswer } from "../../Utility/AnswerCheck";
import { SubmitButton } from "../Styled/SubmitButton";

interface QuestionListItemProps {
  question: IQuestionItem;
  selectedChoice: string | null;
  children?: React.ReactNode;
  questionAnswered: (isCorrect: boolean) => void;
}

export const QuestionListItem = ({
  question,
  selectedChoice,
  children,
  questionAnswered,
}: QuestionListItemProps) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedChoice === null) return;

    if (checkAnswer(question.answer, selectedChoice)) {
      setIsCorrect(true);
      questionAnswered(true);
    } else {
      setIsCorrect(false);
      questionAnswered(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={
          "m-0 flex w-72 flex-col items-center rounded-md border-t border-l border-neutral-600 bg-neutral-800 shadow-md shadow-black transition-all xl:w-96" +
          (isCorrect === true
            ? " border-2 border-green-700"
            : isCorrect === false
            ? " border-2 border-red-700"
            : " border-blue-200")
        }
      >
        <div className="relative w-full">
          <div className="absolute bottom-0 left-0  h-1 w-full bg-gradient-to-r from-primary via-primary-light to-zinc-200"></div>
          <h2 className="px-5 py-3 text-2xl">{question.question}</h2>
        </div>

        <div className="relative w-full rounded-b-md bg-zinc-100 px-5 text-neutral-800">
          <div className="absolute left-2 top-3 h-2/3 w-[1px] bg-neutral-400"></div>
          <div className="absolute bottom-2 left-2 aspect-square w-1 rounded-full bg-primary"></div>
          <div className="absolute bottom-2 left-4 aspect-square w-1 rounded-full bg-primary-light"></div>
          <div className="absolute bottom-2 left-6 aspect-square w-1 rounded-full bg-blue-300"></div>
          <div className="absolute bottom-2 left-8 aspect-square w-1 rounded-full bg-blue-200"></div>
          <div className="m-auto w-fit">{children}</div>
          {isCorrect === true ? (
            <p className="text-lg text-green-700">Correct!</p>
          ) : isCorrect === false || isCorrect === null ? (
            <SubmitButton className="mb-3">Submit</SubmitButton>
          ) : null}
        </div>
      </form>
    </>
  );
};
