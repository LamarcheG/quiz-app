import { ShortAnswerQuestion } from "../../interfaces";

interface shortAnswerProps {
  question: ShortAnswerQuestion;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ShortAnswer = ({ question, handleChange }: shortAnswerProps) => {
  return (
    <div className="flex items-center justify-between p-5">
      <label>Answer</label>
      <input
        className="h-6 w-32 rounded-sm px-1 py-3"
        type="text"
        name={question.id}
        onChange={handleChange}
      ></input>
    </div>
  );
};
