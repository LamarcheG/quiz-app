import { useEffect, useState } from "react";
import {
  IQuestionItem,
  MultipleChoiceQuestion,
  QuestionType,
  TrueFalseQuestion,
  FillInTheBlankQuestion,
  ShortAnswerQuestion,
} from "../interfaces";
import { FillInTheBlank } from "./AnswerInputs/FillInTheBlank";
import { MultipleChoice } from "./AnswerInputs/MultipleChoice";
import { ShortAnswer } from "./AnswerInputs/ShortAnswer";
import { TrueOrFalse } from "./AnswerInputs/TrueOrFalse";
import { QuestionItem } from "./QuestionItem";

interface QuestionStackProps {
  questions: IQuestionItem[];
}

export const QuestionStack = ({ questions }: QuestionStackProps) => {
  const [selectedChoice, setSelectedChoice] = useState<[Number, string][]>([]);
  const [questionStack, setQuestionStack] =
    useState<IQuestionItem[]>(questions);

  const [currentQuestion, setCurrentQuestion] = useState<IQuestionItem>(
    questionStack[0]
  );

  useEffect(() => {
    setQuestionStack(questions);
  }, [questions]);
  useEffect(() => {
    setCurrentQuestion(questionStack[0]);
  }, [questionStack]);

  useEffect(() => {
    //initialize the selectedChoice array with empty strings
    setSelectedChoice(
      questionStack.map((question: IQuestionItem) => [question.id, ""])
    );
  }, [questionStack]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChoice(
      selectedChoice.map((choice) =>
        choice[0] === Number(e.target.name)
          ? [Number(e.target.name), e.target.value]
          : choice
      )
    );
  };

  const getAnswerForQuestion = (id: number) => {
    const answer = selectedChoice.find((choice) => choice[0] === id);
    return answer ? answer[1] : "";
  };

  const prevQuestion = () => {
    //put the previous questions at the top of the stack
    setQuestionStack([...questionStack.slice(1), questionStack[0]]);
  };

  const nextQuestion = () => {
    //put the next questions at the bottom of the stack
    setQuestionStack([...questionStack.slice(1), questionStack[0]]);
  };

  const nextQuestionCorrect = () => {
    //remove the current question from the stack and wait for the transition to finish
    setTimeout(() => {
      setQuestionStack(questionStack.slice(1));
    }, 700);
  };

  return (
    <div className="flex items-center">
      <button type="button" onClick={prevQuestion} className="p-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="h-16 w-16"
        >
          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </button>
      {questionStack.length !== 0 ? (
        <QuestionItem
          question={currentQuestion}
          key={currentQuestion.id}
          selectedChoice={getAnswerForQuestion(currentQuestion.id)}
          nextQuestion={nextQuestionCorrect}
        >
          {currentQuestion.type === QuestionType.MultipleChoice ? (
            <MultipleChoice
              question={currentQuestion as MultipleChoiceQuestion}
              handleChange={handleChange}
            />
          ) : currentQuestion.type === QuestionType.TrueFalse ? (
            <TrueOrFalse
              question={currentQuestion as TrueFalseQuestion}
              handleChange={handleChange}
            />
          ) : currentQuestion.type === QuestionType.FillInTheBlank ? (
            <FillInTheBlank
              question={currentQuestion as FillInTheBlankQuestion}
              handleChange={handleChange}
            />
          ) : currentQuestion.type === QuestionType.ShortAnswer ? (
            <ShortAnswer
              question={currentQuestion as ShortAnswerQuestion}
              handleChange={handleChange}
            />
          ) : (
            <p>Question type not supported</p>
          )}
        </QuestionItem>
      ) : (
        <p className="p-5 text-3xl">Quiz complete!</p>
      )}

      <button type="button" onClick={nextQuestion} className="p-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="h-16 w-16"
        >
          <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
        </svg>
      </button>
    </div>
  );
};
