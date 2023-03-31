import "./App.css";
import { QuestionStack } from "./Components/QuestionStack";
import { IQuestionItem } from "./interfaces";
import { QuestionForm } from "./Components/QuestionForm";
import db from "../src/firebaseInit";
import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

function App() {
  const [questionStack, setQuestionStack] = useState<IQuestionItem[]>();
  const [isLoaded, setIsLoaded] = useState(false);

  const subscribeToQuestions = () => {
    const collectionRef = collection(
      db,
      "/users/Hu88lIByGDI2NJtO2eFF/stacks/BRcTRiNyQ6hLmBqLjnzw/questions"
    );
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
    const collectionRef = collection(
      db,
      "/users/Hu88lIByGDI2NJtO2eFF/stacks/BRcTRiNyQ6hLmBqLjnzw/questions"
    );
    questions.forEach((question) => {
      //remove id from question object
      const { id, ...questionWithoutId } = question;
      addDoc(collectionRef, questionWithoutId);
    });
  };

  return (
    <div className="App">
      <QuestionForm addQuestions={addQuestions} />
      {isLoaded && <QuestionStack questions={questionStack!} />}
    </div>
  );
}

export default App;
