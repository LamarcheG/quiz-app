import { IQuestionItem } from "../interfaces";

interface questionItemProps {
  question: IQuestionItem;
}

export const QuestionItem = ({ question }: questionItemProps) => {
  return (
    <>
      <h3>{question.question}</h3>
      {question.type === "MultipleChoice" && (
        <ul>
          {question.choices?.map((choice) => (
            <li>{choice}</li>
          ))}
        </ul>
      )}
    </>
  );
};
