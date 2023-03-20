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
        className="m-5 rounded-md border-2 border-blue-800 p-5"
      >
        <h2 className="text-xl">{question.question}</h2>
        {question.type === "MultipleChoice" && (
          <ul>
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
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
