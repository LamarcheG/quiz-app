import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../firebaseInit";
import {
  IQuestionItem,
  MultipleChoiceQuestion,
  QuestionType,
  TrueFalseQuestion,
  FillInTheBlankQuestion,
  ShortAnswerQuestion,
  User,
} from "../../interfaces";
import { useUser } from "../../Stores/UserContext";
import { FillInTheBlank } from "../AnswerInputs/FillInTheBlank";
import { MultipleChoice } from "../AnswerInputs/MultipleChoice";
import { ShortAnswer } from "../AnswerInputs/ShortAnswer";
import { TrueOrFalse } from "../AnswerInputs/TrueOrFalse";
import { QuestionListItem } from "./EditQuestion/QuestionListItem/QuestionListItem";

interface QuestionListProps {
  questions: IQuestionItem[];
  beginTime: Date;
  quizEnd: () => void;
}

export const QuestionList = ({
  questions,
  beginTime,
  quizEnd,
}: QuestionListProps) => {
  const [selectedChoice, setSelectedChoice] = useState<[string, string][]>([]);
  const [questionStack, setQuestionStack] = useState<IQuestionItem[]>(
    questions ? questions : []
  );
  const [currentQuestion, setCurrentQuestion] = useState<IQuestionItem>(
    questionStack[0]
  );
  const [nbCorrect, setNbCorrect] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const userContext = useUser() as unknown as User;
  const { stackId } = useParams();
  const [endTime, setEndTime] = useState(new Date());

  useEffect(() => {
    setQuestionStack(questions);
    setCurrentQuestion(questions[0]);
  }, [questions]);

  useEffect(() => {
    setCurrentQuestion(questionStack[0]);
    //initialize the selectedChoice array with empty strings
    setSelectedChoice(
      questionStack.map((question: IQuestionItem) => [question.id, ""])
    );
  }, [questionStack]);

  useEffect(() => {
    if (questionStack.length === 0) {
      setIsFinished(true);
      setEndTime(new Date());
    }
  }, [questionStack]);

  useEffect(() => {
    if (isFinished) {
      logStats();
      quizEnd();
    }
  }, [isFinished]);

  const logStats = () => {
    let percentage = calculateScore();
    let time = calculateTime();

    //log the stats in the object in firebase
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks/${stackId}/stats`
    );
    //add a new document to the collection
    addDoc(collectionRef, {
      score: percentage,
      time: time,
      date: new Date(),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChoice(
      selectedChoice.map((choice) =>
        choice[0] === e.target.name ? [e.target.name, e.target.value] : choice
      )
    );
  };

  const getAnswerForQuestion = (id: string) => {
    const answer = selectedChoice.find((choice) => choice[0] === id);
    return answer ? answer[1] : "";
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

  const questionAnswered = (isCorrect: boolean) => {
    //remove the current question from the stack and wait for the transition to finish
    setTimeout(() => {
      setQuestionStack(questionStack.slice(1));
      if (isCorrect) setNbCorrect(nbCorrect + 1);
    }, 700);
  };

  const calculateScore = () => {
    return Math.round((nbCorrect / questions.length) * 100);
  };

  const calculateTime = () => {
    //calculate the time in seconds between the begin and end time
    let time = (endTime.getTime() - beginTime.getTime()) / 1000;
    return time;
  };

  return (
    <div className="m-auto flex w-fit items-center">
      {!isFinished && (
        <button type="button" onClick={prevQuestion} className="p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="h-10 w-10"
          >
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </button>
      )}

      {!isFinished ? (
        <QuestionListItem
          question={currentQuestion}
          key={currentQuestion.id}
          selectedChoice={getAnswerForQuestion(currentQuestion.id)}
          questionAnswered={questionAnswered}
        >
          {currentQuestion.type === QuestionType.MultipleChoice ? (
            <MultipleChoice
              question={currentQuestion as MultipleChoiceQuestion}
              handleChange={handleChange}
            />
          ) : currentQuestion.type === QuestionType.TrueFalse ? (
            <TrueOrFalse
              question={currentQuestion as TrueFalseQuestion}
              handleChange={handleChange}
            />
          ) : currentQuestion.type === QuestionType.FillInTheBlank ? (
            <FillInTheBlank
              question={currentQuestion as FillInTheBlankQuestion}
              handleChange={handleChange}
            />
          ) : currentQuestion.type === QuestionType.ShortAnswer ? (
            <ShortAnswer
              question={currentQuestion as ShortAnswerQuestion}
              handleChange={handleChange}
            />
          ) : (
            <p>Question type not supported</p>
          )}
        </QuestionListItem>
      ) : (
        <p className="p-5 text-3xl">Your score: {calculateScore()}%</p>
      )}
      {!isFinished && (
        <button type="button" onClick={nextQuestion} className="p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="h-10 w-10"
          >
            <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
          </svg>
        </button>
      )}
    </div>
  );
};
