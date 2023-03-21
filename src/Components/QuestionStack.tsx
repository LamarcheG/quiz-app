import { useState } from "react";
import { IQuestionItem } from "../interfaces";
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
            <MultipleChoice question={question} handleChange={handleChange} />
          ) : (
            <TrueOrFalse question={question} handleChange={handleChange} />
          )}
        </QuestionItem>
      ))}
    </>
  );
};
