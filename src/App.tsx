import "./App.css";
import { QuestionStack } from "./Components/QuestionStack";
import { IQuestionItem } from "./interfaces";
import { QuestionForm } from "./Components/QuestionForm";
import useLocalStorage from "./Hooks/useLocalStorage";
import { QuestionStackProvider } from "./Stores/QuestionStackContext";
import db from "../src/firebaseInit";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

function App() {
  const [questionStack, setQuestionStack] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);

  const subscribeToQuestions = () => {
    const collectionRef = collection(db, "questions");
    onSnapshot(collectionRef, (snapshot) => {
      const questionsArray = snapshot.docs.map((doc) => doc.data());
      setQuestionStack(questionsArray);
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    subscribeToQuestions();
  }, []);

  const addQuestions = (questions: IQuestionItem[]) => {
    setQuestionStack([...questions, ...questionStack]);
  };

  return (
    <div className="App">
      <QuestionStackProvider>
        <QuestionForm addQuestions={addQuestions} />
        {isLoaded && <QuestionStack questions={questionStack} />}
      </QuestionStackProvider>
    </div>
  );
}

export default App;
