import { useState } from "react";
import { IQuestionItem } from "../interfaces";

interface questionItemProps {
  question: IQuestionItem;
}

export const QuestionItem = ({ question }: questionItemProps) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedChoice === question.answer) {
      console.log("Correct!");
    } else {
      console.log("Incorrect!");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChoice(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="m-5  w-72 rounded-md border-t border-l border-blue-200 bg-gray-900 p-5 shadow-lg shadow-neutral-900
        xl:w-96
        "
      >
        <h2 className="text-2xl">{question.question}</h2>
        {question.type === "MultipleChoice" ? (
          <ul className="p-5">
            {question.choices?.map((choice) => (
              <div key={choice} className="flex justify-between">
                <label>{choice}</label>
                <input
                  type="radio"
                  name="choices"
                  value={choice}
                  onChange={handleChange}
                ></input>
              </div>
            ))}
          </ul>
        ) : (
          <p>True or False</p>
        )}
        <button
          type="submit"
          className="border-2 border-blue-200 text-lg hover:border-blue-200 hover:bg-blue-200 hover:text-blue-900"
        >
          Submit
        </button>
      </form>
    </>
  );
};
