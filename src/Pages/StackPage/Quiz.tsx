import { QuestionList } from "../../Components/Questions/QuestionList";
import { IQuestionItem } from "../../interfaces";
import { AddQuestionForm } from "../../Components/Questions/AddQuestionForm";
import db from "../../firebaseInit";
import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useUser } from "../../Stores/UserContext";
import { User } from "../../interfaces";

export const Quiz = () => {
  const COUNT_DOWN_TIME = 3;
  const [questionStack, setQuestionStack] = useState<IQuestionItem[]>();
  const [beginTime, setBeginTime] = useState(new Date());
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCountDown, setShowCountDown] = useState(false);
  const [countDown, setCountDown] = useState(COUNT_DOWN_TIME);
  const { stackId } = useParams();
  const userContext = useUser() as unknown as User;

  const subscribeToQuestions = async () => {
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks/${stackId}/questions`
    );
    try {
      onSnapshot(collectionRef, (snapshot) => {
        const questionsArray = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id } as IQuestionItem;
        });
        setQuestionStack(questionsArray);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    subscribeToQuestions();
  }, []);

  const quizBegin = () => {
    setShowCountDown(true);
    //start count down
    const interval = setInterval(() => {
      setCountDown((prevCount) => prevCount - 1);
    }, 1000);
    //start quiz after 3 seconds
    setTimeout(() => {
      clearInterval(interval);
      setBeginTime(new Date());
      setShowQuiz(true);
    }, 3000);
  };

  const quizEnd = () => {
    setShowQuiz(false);
    setShowCountDown(false);
  };

  return (
    <>
      {!showQuiz ? (
        <div>
          {!showCountDown ? (
            <button onClick={quizBegin}>Start Quiz</button>
          ) : (
            <div>
              <h1>{countDown}</h1>
            </div>
          )}
        </div>
      ) : (
        <QuestionList
          questions={questionStack!}
          beginTime={beginTime}
          quizEnd={quizEnd}
        />
      )}
    </>
  );
};
