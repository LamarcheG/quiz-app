import { QuestionList } from "../../Components/Questions/QuestionList";
import { IQuestionItem } from "../../interfaces";
import db from "../../firebaseInit";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const { stackId } = useParams();
  const userContext = useUser() as unknown as User;

  const subscribeToQuestions = () => {
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks/${stackId}/questions`
    );
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        const questionsArray = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id } as IQuestionItem;
        });
        setQuestionStack(questionsArray);
        setIsLoaded(true);
      },
      (error) => {
        console.log(error);
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = subscribeToQuestions();
    return () => {
      unsubscribe();
    };
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
      {questionStack?.length === 0 ? (
        <p>No Questions</p>
      ) : (
        <>
          {isLoaded && !showQuiz && (
            <>
              {!showCountDown ? (
                <button onClick={quizBegin}>Start Quiz</button>
              ) : (
                <div>
                  <h1>{countDown}</h1>
                </div>
              )}
            </>
          )}
          {isLoaded && showQuiz && (
            <QuestionList
              questions={questionStack!}
              beginTime={beginTime}
              quizEnd={quizEnd}
            />
          )}
        </>
      )}
    </>
  );
};
