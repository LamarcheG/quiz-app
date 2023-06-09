import { QuestionList } from "../../Components/Questions/QuestionList";
import { IQuestionItem } from "../../interfaces";
import { useEffect, useState } from "react";
import { useStackQuestions } from "../../Stores/StackContext";

export const Quiz = () => {
  const COUNT_DOWN_TIME = 3;
  const [questionStack, setQuestionStack] = useState<IQuestionItem[]>();
  const [beginTime, setBeginTime] = useState(new Date());
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCountDown, setShowCountDown] = useState(false);
  const [countDown, setCountDown] = useState(COUNT_DOWN_TIME);
  const [isLoaded, setIsLoaded] = useState(false);
  const questions = useStackQuestions() as unknown as IQuestionItem[];

  useEffect(() => {
    if (!questions || questions.length <= 0) {
      setIsLoaded(true);
      return;
    }
    setQuestionStack(questions);
    setIsLoaded(true);
  }, [questions]);

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
                <button
                  onClick={quizBegin}
                  className="rounded-md  bg-primary text-text-OverBlue transition-all duration-150 ease-in-out hover:scale-110"
                >
                  Start Quiz
                </button>
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
