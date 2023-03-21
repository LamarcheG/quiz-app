import { useState } from "react";
import { IQuestionItem, MultipleChoiceQuestion } from "../../interfaces";

interface multipleChoiceProps {
  question: MultipleChoiceQuestion;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MultipleChoice = ({
  question,
  handleChange,
}: multipleChoiceProps) => {
  return (
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
  );
};
