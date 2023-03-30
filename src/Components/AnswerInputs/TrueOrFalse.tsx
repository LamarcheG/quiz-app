import { IQuestionItem, TrueFalseQuestion } from "../../interfaces";

interface trueOrFalseProps {
  question: TrueFalseQuestion;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TrueOrFalse = ({ question, handleChange }: trueOrFalseProps) => {
  return (
    <ul className="m-auto w-32 p-5">
      <div className="flex items-center justify-between">
        <label>True</label>
        <input
          className="h-5 w-5"
          type="radio"
          name={question.id}
          value="true"
          onChange={handleChange}
        ></input>
      </div>
      <div className="flex items-center justify-between">
        <label>False</label>
        <input
          className="h-5 w-5"
          type="radio"
          name={question.id}
          value="false"
          onChange={handleChange}
        ></input>
      </div>
    </ul>
  );
};
