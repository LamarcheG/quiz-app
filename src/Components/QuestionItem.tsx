import { useState } from "react";
import { IQuestionItem } from "../interfaces";
import { checkAnswer } from "../Utility/AnswerCheck";

interface questionItemProps {
  question: IQuestionItem;
  selectedChoice: string | null;
  children?: React.ReactNode;
  nextQuestion: () => void;
}

export const QuestionItem = ({
  question,
  selectedChoice,
  children,
  nextQuestion,
}: questionItemProps) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedChoice === null) return;

    if (checkAnswer(question.answer, selectedChoice)) {
      setIsCorrect(true);
      nextQuestion();
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={
          " m-5 w-72 rounded-md border-t border-l bg-gray-900 p-5 shadow-lg shadow-neutral-900 xl:w-96" +
          (isCorrect === true
            ? " border border-green-700"
            : isCorrect === false
            ? " border border-red-700"
            : " border-blue-200")
        }
      >
        <h2 className="text-2xl">{question.question}</h2>
        {children}

        {isCorrect === true ? (
          <p className="text-lg text-green-700">Correct!</p>
        ) : isCorrect === false || isCorrect === null ? (
          <button
            type="submit"
            className="border-2 border-blue-200 text-lg hover:border-blue-200 hover:bg-blue-200 hover:text-blue-900"
          >
            Submit
          </button>
        ) : null}
      </form>
    </>
  );
};
