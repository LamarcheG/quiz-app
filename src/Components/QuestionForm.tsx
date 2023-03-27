import { IQuestionItem } from "../interfaces";
import { parseBruteText } from "../Utility/QuestionParser";
import { CustomTextarea } from "./CustomTextarea/CustomTextarea";

interface QuestionFormProps {
  addQuestions: (questions: IQuestionItem[]) => void;
}

export const QuestionForm = ({ addQuestions }: QuestionFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const bruteText = formData.get("bruteText");
    var questions = parseBruteText(bruteText as string);
    addQuestions(questions);
  };
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="bruteText">Enter your question and answer here:</label>
      <textarea
        name="bruteText"
        id="bruteText"
        rows={10}
        className="resize p-3"
      ></textarea>
      <CustomTextarea />
      <button type="submit">Submit</button>
    </form>
  );
};
