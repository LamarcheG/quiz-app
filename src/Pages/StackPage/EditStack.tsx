import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddQuestionForm } from "../../Components/Questions/AddQuestionForm";
import { EditQuestionFormList } from "../../Components/Questions/EditQuestion/EditQuestionFormList";
import db from "../../firebaseInit";
import { IQuestionItem, User } from "../../interfaces";
import { useUser } from "../../Stores/UserContext";

export const EditStack = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const [questionStack, setQuestionStack] = useState<IQuestionItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastId, setLastId] = useState("");
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

  useEffect(() => {
    if (questionStack.length > 0) {
      setQuestionStack(sortQuestions(questionStack));
    }
  }, [questionStack]);

  const sortQuestions = (questions: IQuestionItem[]) => {
    //put questionStack in the same order as it was before
    if (lastId === "") return questions;
    while (questions[0].id !== lastId) {
      const question = questions.shift();
      questions.push(question!);
    }
    return questions;
  };

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

  const updateQuestion = (question: IQuestionItem) => {
    setLastId(question.id);
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks/${stackId}/questions`
    );
    //get question with id
    const questionRef = doc(collectionRef, question.id);
    //update question
    updateDoc(questionRef, {
      question: question.question,
      answer: question.answer,
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
        <div>
          {isLoaded && questionStack && (
            <div className="relative m-auto h-60 w-96 border">
              <EditQuestionFormList
                questions={questionStack!}
                updateQuestion={updateQuestion}
              />
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
      )}
    </div>
  );
};
