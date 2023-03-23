import "./App.css";
import { QuestionStack } from "./Components/QuestionStack";
import { IQuestionItem } from "./interfaces";
import { QuestionForm } from "./Components/QuestionForm";
import { getQuestionStackFromLocalStorage } from "./Stores/QuestionstackStore";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <QuestionForm />
      <QuestionStack />
    </div>
  );
}

export default App;
