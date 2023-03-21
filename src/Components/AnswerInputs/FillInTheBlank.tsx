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
    <ul className="p-5">
      <div className="flex items-center justify-between">
        <label>Answer</label>
        <input
          className="h-6 w-32 rounded-sm px-1 py-3"
          type="text"
          name={question.id.toString()}
          onChange={handleChange}
        ></input>
      </div>
    </ul>
  );
};
