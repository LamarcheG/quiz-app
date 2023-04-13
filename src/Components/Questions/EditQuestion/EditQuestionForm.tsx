import { useEffect, useState } from "react";
import { IQuestionItem } from "../../../interfaces";
import { SubmitButton } from "../../Styled/SubmitButton";

interface EditQuestionFormProps {
  question: IQuestionItem;
  updateQuestion: (question: IQuestionItem) => void;
}

export const EditQuestionForm = ({
  question,
  updateQuestion,
}: EditQuestionFormProps) => {
  const [success, setSuccess] = useState<Boolean | null>(null);
  const [questionInput, setQuestionInput] = useState(question.question);
  const [answerInput, setAnswerInput] = useState(question.answer);

  useEffect(() => {
    setQuestionInput(question.question);
    setAnswerInput(question.answer);
  }, [question]);

  useEffect(() => {
    if (success === true || success === false) {
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
  }, [success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "question") {
      setQuestionInput(value);
    } else if (name === "answer") {
      setAnswerInput(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //build a new question object and pass it to the updateQuestion function
    let newQuestion = {
      ...question,
      question: questionInput as string,
      answer: answerInput as string,
    };
    try {
      updateQuestion(newQuestion);
      setSuccess(true);
    } catch (error: any) {
      setSuccess(false);
    }
  };
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <label htmlFor="question">Question</label>
      <input
        type="text"
        name="question"
        id="question"
        value={questionInput}
        onChange={handleChange}
      />
      <label htmlFor="answer">Answer</label>
      <input
        type="text"
        name="answer"
        id="answer"
        value={answerInput}
        onChange={handleChange}
      />
      {success === true ? (
        <p className="text-3xl text-green-700">Success!</p>
      ) : (
        <div className="flex justify-end">
          <SubmitButton>Update</SubmitButton>
        </div>
      )}
    </form>
  );
};
