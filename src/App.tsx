import "./App.css";
import { QuestionStack } from "./Components/QuestionStack";
import { IQuestionItem } from "./interfaces";
import { QuestionForm } from "./Components/QuestionForm";
import useLocalStorage from "./Hooks/useLocalStorage";
import { QuestionStackProvider } from "./Stores/QuestionStackContext";

function App() {
  const [questionStack, setQuestionStack] = useLocalStorage("questionStack", [
    {
      id: 0,
      question: "What is the capital of France?",
      type: "MultipleChoice",
      choices: ["New York", "London", "Paris", "Dublin"],
      answer: "Paris",
      isAnswered: false,
    },
    {
      id: 1,
      question: "London is the capital of England?",
      type: "TrueFalse",
      answer: "true",
      isAnswered: false,
    },
    {
      id: 2,
      question: "____ is the capital of Spain?",
      type: "FillInTheBlank",
      answer: "Madrid",
      isAnswered: false,
    },
    {
      id: 3,
      question: "What is the capital of Italy?",
      type: "ShortAnswer",
      answer: "Rome",
      isAnswered: false,
    },
  ]);

  const addQuestions = (questions: IQuestionItem[]) => {
    setQuestionStack([...questions, ...questionStack]);
  };
  return (
    <div className="App">
      <QuestionStackProvider>
        <QuestionForm addQuestions={addQuestions} />
        <QuestionStack questions={questionStack} />
      </QuestionStackProvider>
    </div>
  );
}

export default App;
