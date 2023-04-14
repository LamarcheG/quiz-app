import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IQuestionItem, User } from "../../../interfaces";
import { useUser } from "../../../Stores/UserContext";
import { EditQuestionForm } from "./EditQuestionForm";

interface EditQuestionFormListProps {
  currentQuestion: IQuestionItem;
  prevQuestion: () => void;
  nextQuestion: () => void;
  updateQuestion: (question: IQuestionItem) => void;
}

export const EditQuestionFormList = ({
  currentQuestion,
  prevQuestion,
  nextQuestion,
  updateQuestion,
}: EditQuestionFormListProps) => {
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
