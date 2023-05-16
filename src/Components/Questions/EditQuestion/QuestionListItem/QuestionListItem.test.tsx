import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IQuestionItem, QuestionType } from "../../../../interfaces";
import { QuestionListItem } from "./QuestionListItem";

describe("QuestionListItem", () => {
  it("should render the question", async () => {
    const questionProp: IQuestionItem = {
      id: "1",
      question: "What is your name?",
      answer: "My name is John Doe",
      isAnswered: false,
      type: QuestionType.ShortAnswer,
    };

    render(
      <QuestionListItem
        question={questionProp}
        selectedChoice={null}
        questionAnswered={jest.fn()}
      />
    );

    let question = await screen.findByText(questionProp.question);

    expect(question).toBeInTheDocument();
  });
});
