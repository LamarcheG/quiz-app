import { useEffect, useState } from "react";
import { IQuestionItem } from "../interfaces";
import { parseBruteText } from "../Utility/QuestionParser";

interface QuestionFormProps {
  addQuestions: (questions: IQuestionItem[]) => void;
}

export const QuestionForm = ({ addQuestions }: QuestionFormProps) => {
  const [success, setSuccess] = useState<Boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const bruteText = formData.get("bruteText");
    try {
      const questions = parseBruteText(bruteText as string);
      addQuestions(questions);
      form.reset();
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error.message);
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (success === true || success === false) {
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
  }, [success]);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="bruteText">Enter your question and answer here:</label>
      <textarea
        name="bruteText"
        id="bruteText"
        rows={10}
        className="resize p-3"
        required
      ></textarea>
      {success === true ? (
        <p className="text-3xl text-green-700">Success!</p>
      ) : success === false ? (
        <p className="text-3xl text-red-700">{errorMessage}</p>
      ) : (
        <button type="submit">Submit</button>
      )}
    </form>
  );
};
