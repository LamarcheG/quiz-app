import { MultipleChoiceQuestion } from "../../interfaces";
interface multipleChoiceProps {
  question: MultipleChoiceQuestion;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MultipleChoice = ({
  question,
  handleChange,
}: multipleChoiceProps) => {
  return (
    <div className="p-5">
      {question.choices?.map((choice) => (
        <div key={choice} className="flex items-center justify-between">
          <label className="pr-3">{choice}</label>
          <input
            className="h-5 w-5"
            type="radio"
            name={question.id}
            value={choice}
            onChange={handleChange}
          ></input>
        </div>
      ))}
    </div>
  );
};
