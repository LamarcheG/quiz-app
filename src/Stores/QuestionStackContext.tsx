import { createContext, useContext, useReducer } from "react";

const QuestionStackContext = createContext(null);
const QuestionStackDispatchContext = createContext<React.Dispatch<any> | null>(
  null
);

const initialState = {
  questionStack: [
    {
      id: 0,
      question: "What is the capital of France?",
      type: "MultipleChoice",
      choices: ["New York", "London", "Paris", "Dublin"],
      answer: "Paris",
      isAnswered: false,
    },
  ],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_QUESTION":
      return {
        ...state,
        questionStack: [...state.questionStack, action.payload],
      };
    case "REMOVE_QUESTION":
      return {
        ...state,
        questionStack: state.questionStack.filter(
          (question: any) => question.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const QuestionStackProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuestionStackContext.Provider value={state}>
      <QuestionStackDispatchContext.Provider value={dispatch}>
        {children}
      </QuestionStackDispatchContext.Provider>
    </QuestionStackContext.Provider>
  );
};

export const useQuestionStack = () => {
  const context = useContext(QuestionStackContext);
  if (context === undefined) {
    throw new Error(
      "useQuestionStack must be used within a QuestionStackProvider"
    );
  }
  return context;
};

export const useQuestionStackDispatch = () => {
  const context = useContext(QuestionStackDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useQuestionStackDispatch must be used within a QuestionStackProvider"
    );
  }
  return context;
};
