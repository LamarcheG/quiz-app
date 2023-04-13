import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IQuestionItem, User } from "../../../interfaces";
import { useUser } from "../../../Stores/UserContext";
import { EditQuestionForm } from "./EditQuestionForm";

interface EditQuestionFormListProps {
  questions: IQuestionItem[];
  updateQuestion: (question: IQuestionItem) => void;
}

export const EditQuestionFormList = ({
  questions,
  updateQuestion,
}: EditQuestionFormListProps) => {
  const [questionStack, setQuestionStack] = useState<IQuestionItem[]>(
    questions ? questions : []
  );
  const [currentQuestion, setCurrentQuestion] = useState<IQuestionItem>(
    questionStack[0]
  );

  useEffect(() => {
    setQuestionStack(questions);
    setCurrentQuestion(questions[0]);
  }, [questions]);

  useEffect(() => {
    setCurrentQuestion(questionStack[0]);
  }, [questionStack]);

  const prevQuestion = () => {
    //put the previous questions at the top of the stack
    //remove the last question from the stack and put it at the top
    let prev = questionStack.slice(-1);
    setQuestionStack([...prev, ...questionStack.slice(0, -1)]);
  };

  const nextQuestion = () => {
    //put the next questions at the bottom of the stack
    setQuestionStack([...questionStack.slice(1), questionStack[0]]);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button type="button" onClick={prevQuestion} className="p-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="h-10 w-10"
        >
          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </button>
      <EditQuestionForm
        question={currentQuestion}
        updateQuestion={updateQuestion}
      />
      <button type="button" onClick={nextQuestion} className="p-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="h-10 w-10"
        >
          <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
        </svg>
      </button>
    </div>
  );
};
