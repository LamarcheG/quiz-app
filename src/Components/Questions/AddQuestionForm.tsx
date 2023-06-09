import { useEffect, useState } from "react";
import { IQuestionItem } from "../../interfaces";
import { parseBruteText } from "../../Utility/QuestionParser";
import { SubmitButton } from "../Styled/SubmitButton";

interface AddQuestionFormProps {
  addQuestions: (questions: IQuestionItem[]) => void;
  closeForm: () => void;
}

export const AddQuestionForm = ({
  addQuestions,
  closeForm,
}: AddQuestionFormProps) => {
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
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <label htmlFor="bruteText">Enter your question card:</label>
      <textarea
        name="bruteText"
        id="bruteText"
        rows={10}
        className="w-60 resize-y rounded-md border-t border-l border-neutral-600 bg-neutral-800 p-3 shadow-md shadow-black md:w-96"
        required
      ></textarea>
      {success === true ? (
        <p className="text-3xl text-green-700">Success!</p>
      ) : success === false ? (
        <p className="text-3xl text-red-700">{errorMessage}</p>
      ) : (
        <div>
          <SubmitButton className="my-5">Submit</SubmitButton>
          <button type="button" onClick={closeForm} className="underline">
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};
