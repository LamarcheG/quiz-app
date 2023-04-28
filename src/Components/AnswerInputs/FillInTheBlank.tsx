import { FillInTheBlankQuestion } from "../../interfaces";

interface fillInTheBlankProps {
  question: FillInTheBlankQuestion;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FillInTheBlank = ({
  question,
  handleChange,
}: fillInTheBlankProps) => {
  return (
    <div className="flex items-center justify-between p-5">
      <label className="pr-3">Answer</label>
      <input
        className="h-6 w-32 rounded-md px-1 py-3 text-text-OverBlue"
        type="text"
        name={question.id}
        onChange={handleChange}
      ></input>
    </div>
  );
};
