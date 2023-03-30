import "./App.css";
import { QuestionStack } from "./Components/QuestionStack";
import { IQuestionItem } from "./interfaces";
import { QuestionForm } from "./Components/QuestionForm";
import useLocalStorage from "./Hooks/useLocalStorage";
import { QuestionStackProvider } from "./Stores/QuestionStackContext";
import db from "../src/firebaseInit";
import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

function App() {
  const [questionStack, setQuestionStack] = useState<IQuestionItem[]>();
  const [isLoaded, setIsLoaded] = useState(false);
  let id = 0;

  const subscribeToQuestions = () => {
    const collectionRef = collection(db, "questions");
    onSnapshot(collectionRef, (snapshot) => {
      const questionsArray = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as IQuestionItem;
      });
      setQuestionStack(questionsArray);
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    subscribeToQuestions();
  }, []);

  const addQuestions = (questions: IQuestionItem[]) => {
    const collectionRef = collection(db, "questions");
    questions.forEach((question) => {
      //remove id from question object
      const { id, ...questionWithoutId } = question;
      addDoc(collectionRef, questionWithoutId);
    });
  };

  return (
    <div className="App">
      <QuestionStackProvider>
        <QuestionForm addQuestions={addQuestions} />
        {isLoaded && <QuestionStack questions={questionStack!} />}
      </QuestionStackProvider>
    </div>
  );
}

export default App;
