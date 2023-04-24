import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddQuestionForm } from "../../Components/Questions/AddQuestionForm";
import { EditQuestionFormList } from "../../Components/Questions/EditQuestion/EditQuestionFormList";
import db from "../../firebaseInit";
import {
  IQuestionItem,
  MultipleChoiceQuestion,
  QuestionType,
  User,
} from "../../interfaces";
import { useStackQuestions } from "../../Stores/StackContext";
import { useUser } from "../../Stores/UserContext";

export const EditStack = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const [questionStack, setQuestionStack] = useState<IQuestionItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestionItem>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastId, setLastId] = useState("");
  const { stackId } = useParams();
  const userContext = useUser() as unknown as User;
  const questions = useStackQuestions() as unknown as IQuestionItem[];

  useEffect(() => {
    if (!questions || questions.length <= 0) {
      setIsLoaded(true);
      return;
    }
    setQuestionStack(sortQuestions(questions));
    setIsLoaded(true);
  }, [questions]);

  useEffect(() => {
    if (questionStack?.length > 0) {
      setCurrentQuestion(questionStack[0]);
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
    if (question.type === QuestionType.MultipleChoice) {
      updateDoc(questionRef, {
        question: question.question,
        answer: question.answer,
        choices: (question as MultipleChoiceQuestion).choices,
      });
      return;
    }
    updateDoc(questionRef, {
      question: question.question,
      answer: question.answer,
    });
  };

  const deleteQuestion = () => {
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks/${stackId}/questions`
    );
    //get question with id
    const questionRef = doc(collectionRef, currentQuestion?.id);
    //delete question
    deleteDoc(questionRef);
  };

  const closeForm = () => {
    setDisplayForm(false);
  };

  const prevQuestion = () => {
    //put the previous questions at the top of the stack
    //remove the last question from the stack and put it at the top
    let prev = questionStack.slice(-1);
    setQuestionStack([...prev, ...questionStack.slice(0, -1)]);
  };

  const nextQuestion = () => {
    //put the next questions at the bottom of the stack
    setQuestionStack([...questionStack.slice(1), questionStack[0]]);
  };
  return (
    <>
      {displayForm ? (
        <AddQuestionForm addQuestions={addQuestions} closeForm={closeForm} />
      ) : (
        <>
          {isLoaded && questionStack && (
            <div className="relative m-auto grid h-fit min-h-[16rem] w-96 items-center justify-center rounded-md border-t border-l border-blue-200 bg-gray-900 p-5 shadow-lg shadow-neutral-900">
              <button
                type="button"
                className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 p-0"
                onClick={() => setDisplayForm(true)}
              >
                +
              </button>
              <EditQuestionFormList
                currentQuestion={currentQuestion!}
                prevQuestion={prevQuestion}
                nextQuestion={nextQuestion}
                updateQuestion={updateQuestion}
              />
              <button
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 p-0"
                onClick={deleteQuestion}
              >
                x
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};
