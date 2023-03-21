import { IQuestionItem, TrueFalseQuestion } from "../../interfaces";

interface trueOrFalseProps {
  question: TrueFalseQuestion;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TrueOrFalse = ({ question, handleChange }: trueOrFalseProps) => {
  return (
    <ul className="p-5">
      <div className="flex justify-between">
        <label>True</label>
        <input
          type="radio"
          name="choices"
          value="true"
          onChange={handleChange}
        ></input>
      </div>
      <div className="flex justify-between">
        <label>False</label>
        <input
          type="radio"
          name="choices"
          value="false"
          onChange={handleChange}
        ></input>
      </div>
    </ul>
  );
};
