import { useState } from "react";
import "./App.css";
import { QuestionStack } from "./Components/QuestionStack";
import { IQuestionItem, QuestionType } from "./interfaces";

function App() {
  const [count, setCount] = useState(0);

  const questionStack: IQuestionItem[] = [
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
      answer: "True",
      isAnswered: false,
    },
  ];

  return (
    <div className="App">
      <QuestionStack questions={questionStack} />
    </div>
  );
}

export default App;
