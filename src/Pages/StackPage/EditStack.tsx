import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AddQuestionForm } from "../../Components/Questions/AddQuestionForm";
import db from "../../firebaseInit";
import { IQuestionItem, User } from "../../interfaces";
import { useUser } from "../../Stores/UserContext";

export const EditStack = () => {
  const [displayForm, setDisplayForm] = useState(false);
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

  const closeForm = () => {
    setDisplayForm(false);
  };
  return (
    <div>
      {displayForm ? (
        <AddQuestionForm addQuestions={addQuestions} closeForm={closeForm} />
      ) : (
        <div className="relative m-auto h-60 w-96 border">
          Cards edit space
          <button
            type="button"
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 p-0"
            onClick={() => setDisplayForm(true)}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};
