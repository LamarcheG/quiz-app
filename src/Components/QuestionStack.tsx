import { useEffect, useState } from "react";
import {
  IQuestionItem,
  MultipleChoiceQuestion,
  QuestionType,
  TrueFalseQuestion,
} from "../interfaces";
import { MultipleChoice } from "./AnswerInputs/MultipleChoice";
import { TrueOrFalse } from "./AnswerInputs/TrueOrFalse";
import { QuestionItem } from "./QuestionItem";

interface questionStackProps {
  questions: IQuestionItem[];
}

export const QuestionStack = ({ questions }: questionStackProps) => {
  const [selectedChoice, setSelectedChoice] = useState<[Number, string][]>([]);

  useEffect(() => {
    //initialize the selectedChoice array with empty strings
    setSelectedChoice(questions.map((question) => [question.id, ""]));
  }, [questions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //if the question has already been answered, update the answer
    if (selectedChoice.some((choice) => choice[0] === Number(e.target.name))) {
      setSelectedChoice(
        selectedChoice.map((choice) =>
          choice[0] === Number(e.target.name)
            ? [Number(e.target.name), e.target.value]
            : choice
        )
      );
    } else {
      setSelectedChoice([
        ...selectedChoice,
        [Number(e.target.name), e.target.value],
      ]);
    }
  };

  const getAnswerForQuestion = (id: number) => {
    const answer = selectedChoice.find((choice) => choice[0] === id);
    return answer ? answer[1] : "";
  };
  return (
    <>
      {questions.map((question) => (
        <QuestionItem
          question={question}
          key={question.id}
          selectedChoice={getAnswerForQuestion(question.id)}
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
          ) : (
            <p>Question type not supported</p>
          )}
        </QuestionItem>
      ))}
    </>
  );
};
