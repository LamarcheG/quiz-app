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

interface questionStackProps {
  questions: IQuestionItem[];
}

export const QuestionStack = ({ questions }: questionStackProps) => {
  const [selectedChoice, setSelectedChoice] = useState<[Number, string][]>([]);
  const [questionStack, setQuestions] = useState<IQuestionItem[]>(questions);

  useEffect(() => {
    //initialize the selectedChoice array with empty strings
    setSelectedChoice(questions.map((question) => [question.id, ""]));
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
    setQuestions([...questionStack.slice(1), questionStack[0]]);
  };

  const nextQuestion = () => {
    //put the next questions at the bottom of the stack
    setQuestions([...questionStack.slice(1), questionStack[0]]);
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={prevQuestion}
        className="h-16 border-2 border-gray-900"
      >
        prev
      </button>
      <ul>
        {questionStack.map((question) => (
          <QuestionItem
            question={question}
            key={question.id}
            selectedChoice={getAnswerForQuestion(question.id)}
            nextQuestion={nextQuestion}
          >
            {question.type === QuestionType.MultipleChoice ? (
              <MultipleChoice
                question={question as MultipleChoiceQuestion}
                handleChange={handleChange}
              />
            ) : question.type === QuestionType.TrueFalse ? (
              <TrueOrFalse
                question={question as TrueFalseQuestion}
                handleChange={handleChange}
              />
            ) : question.type === QuestionType.FillInTheBlank ? (
              <FillInTheBlank
                question={question as FillInTheBlankQuestion}
                handleChange={handleChange}
              />
            ) : question.type === QuestionType.ShortAnswer ? (
              <ShortAnswer
                question={question as ShortAnswerQuestion}
                handleChange={handleChange}
              />
            ) : (
              <p>Question type not supported</p>
            )}
          </QuestionItem>
        ))}
      </ul>
      <button
        type="button"
        onClick={nextQuestion}
        className="h-16 border-2 border-gray-900"
      >
        next
      </button>
    </div>
  );
};
