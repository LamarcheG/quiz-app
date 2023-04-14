import { useEffect, useState } from "react";
import {
  IQuestionItem,
  QuestionType,
  MultipleChoiceQuestion,
} from "../../../interfaces";
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
  const [choices, setChoices] = useState<string[]>(
    question.type === QuestionType.MultipleChoice
      ? (question as MultipleChoiceQuestion).choices
      : []
  );

  useEffect(() => {
    setQuestionInput(question.question);
    setAnswerInput(question.answer);
    if (question.type === QuestionType.MultipleChoice) {
      setChoices((question as MultipleChoiceQuestion).choices);
    } else {
      setChoices([]);
    }
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
    if (name === "choice") {
      const choiceIndex = parseInt(e.currentTarget.id.replace("choice", ""));
      let newChoices = [...choices];
      newChoices[choiceIndex] = value;
      setChoices(newChoices);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //build a new question object and pass it to the updateQuestion function
    let newQuestion: IQuestionItem;
    if (question.type === QuestionType.MultipleChoice) {
      newQuestion = {
        ...question,
        question: questionInput as string,
        answer: answerInput as string,
        choices: choices,
      } as MultipleChoiceQuestion;
    } else {
      newQuestion = {
        ...question,
        question: questionInput as string,
        answer: answerInput as string,
      };
    }
    try {
      updateQuestion(newQuestion);
      setSuccess(true);
    } catch (error: any) {
      setSuccess(false);
    }
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="question">Question</label>
        <input
          type="text"
          name="question"
          id="question"
          value={questionInput}
          onChange={handleChange}
          className="rounded-sm px-2"
        />
      </div>
      {choices.length > 0 && (
        <ul>
          Choices
          {choices.map((choice, index) => (
            <li key={index}>
              <input
                type="text"
                name="choice"
                id={`choice${index}`}
                value={choice}
                onChange={handleChange}
                className="rounded-sm px-2"
              />
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-col">
        <label htmlFor="answer">Answer</label>
        <input
          type="text"
          name="answer"
          id="answer"
          value={answerInput}
          onChange={handleChange}
          className="rounded-sm px-2"
        />
      </div>
      {success === true ? (
        <p className="text-3xl text-green-700">Success!</p>
      ) : (
        <div className="flex justify-center">
          <SubmitButton>Update</SubmitButton>
        </div>
      )}
    </form>
  );
};
