import { QuestionList } from "../../Components/Questions/QuestionList";
import { IQuestionItem } from "../../interfaces";
import { AddQuestionForm } from "../../Components/Questions/AddQuestionForm";
import db from "../../firebaseInit";
import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useUser } from "../../Stores/UserContext";
import { User } from "../../interfaces";

export const Stack = () => {
  const [questionStack, setQuestionStack] = useState<IQuestionItem[]>();
  const [isLoaded, setIsLoaded] = useState(false);
  const { stackId } = useParams();
  const userContext = useUser() as unknown as User;

  const subscribeToQuestions = () => {
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks/${stackId}/questions`
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
      `/users/${userContext.user.uid}/stacks/${stackId}/questions`
    );
    questions.forEach((question) => {
      //remove id from question object
      const { id, ...questionWithoutId } = question;
      addDoc(collectionRef, questionWithoutId);
    });
  };

  return (
    <div className="App">
      <AddQuestionForm addQuestions={addQuestions} />
      {isLoaded && <QuestionList questions={questionStack!} />}
    </div>
  );
};
