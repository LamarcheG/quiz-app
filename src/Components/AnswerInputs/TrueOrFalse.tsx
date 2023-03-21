import { IQuestionItem } from "../../interfaces";

interface trueOrFalseProps {
  question: IQuestionItem;
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
          value="True"
          onChange={handleChange}
        ></input>
      </div>
      <div className="flex justify-between">
        <label>False</label>
        <input
          type="radio"
          name="choices"
          value="False"
          onChange={handleChange}
        ></input>
      </div>
    </ul>
  );
};
