import { addDoc, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { AddQuestionForm } from "../../Components/Questions/AddQuestionForm";
import db from "../../firebaseInit";
import { IQuestionItem, User } from "../../interfaces";
import { useUser } from "../../Stores/UserContext";

export const EditStack = () => {
  const { stackId } = useParams();
  const userContext = useUser() as unknown as User;
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
  return <AddQuestionForm addQuestions={addQuestions} />;
};
