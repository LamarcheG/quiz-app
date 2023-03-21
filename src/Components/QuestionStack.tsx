import { useState } from "react";
import {
  IQuestionItem,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
} from "../interfaces";
import { MultipleChoice } from "./AnswerInputs/MultipleChoice";
import { TrueOrFalse } from "./AnswerInputs/TrueOrFalse";
import { QuestionItem } from "./QuestionItem";

interface questionStackProps {
  questions: IQuestionItem[];
}

export const QuestionStack = ({ questions }: questionStackProps) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChoice(e.target.value);
  };
  return (
    <>
      {questions.map((question) => (
        <QuestionItem
          question={question}
          key={question.id}
          selectedChoice={selectedChoice}
        >
          {question.type === "MultipleChoice" ? (
            <MultipleChoice
              question={question as MultipleChoiceQuestion}
              handleChange={handleChange}
            />
          ) : question.type === "TrueFalse" ? (
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
