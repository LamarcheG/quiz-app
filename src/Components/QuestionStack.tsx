import { IQuestionItem } from "../interfaces";
import { QuestionItem } from "./QuestionItem";

interface questionStackProps {
  questions: IQuestionItem[];
}

export const QuestionStack = ({ questions }: questionStackProps) => {
  return (
    <>
      {questions.map((question) => (
        <QuestionItem question={question} key={question.id} />
      ))}
    </>
  );
};
