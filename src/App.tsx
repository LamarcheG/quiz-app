import "./App.css";
import { QuestionStack } from "./Components/QuestionStack";
import {
  FillInTheBlankQuestion,
  MultipleChoiceQuestion,
  QuestionType,
  ShortAnswerQuestion,
  TrueFalseQuestion,
} from "./interfaces";
import { QuestionForm } from "./Components/QuestionForm";

function App() {
  type questionStackType = (
    | MultipleChoiceQuestion
    | TrueFalseQuestion
    | FillInTheBlankQuestion
    | ShortAnswerQuestion
  )[];
  const questionStack: questionStackType = [
    {
      id: 0,
      question: "What is the capital of France?",
      type: QuestionType.MultipleChoice,
      choices: ["New York", "London", "Paris", "Dublin"],
      answer: "Paris",
      isAnswered: false,
    },
    {
      id: 1,
      question: "London is the capital of England?",
      type: QuestionType.TrueFalse,
      answer: "true",
      isAnswered: false,
    },
    {
      id: 2,
      question: "____ is the capital of Spain?",
      type: QuestionType.FillInTheBlank,
      answer: "Madrid",
      isAnswered: false,
    },
    {
      id: 3,
      question: "What is the capital of Italy?",
      type: QuestionType.ShortAnswer,
      answer: "Rome",
      isAnswered: false,
    },
  ];

  return (
    <div className="App">
      <QuestionForm />
      <QuestionStack questions={questionStack} />
    </div>
  );
}

export default App;
