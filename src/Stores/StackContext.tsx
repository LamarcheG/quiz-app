import { collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import { createContext, useContext, useEffect, useReducer } from "react";
import db from "../firebaseInit";
import { IQuestionItem, User } from "../interfaces";
import { useUser } from "./UserContext";

const StackContext = createContext(null);
const StackDispatchContext = createContext<React.Dispatch<any> | null>(null);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "REPLACE_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
      };
    case "REPLACE_STATS":
      return {
        ...state,
        stats: action.payload,
      };
    default:
      return state;
  }
};

const convertFirebaseDate = (date: any) => {
  const newDate = new Date(date.seconds * 1000);
  return newDate;
};

export const StackProvider = ({ id, children }: any) => {
  const [state, dispatch] = useReducer(reducer, []);

  const userContext = useUser() as unknown as User;

  const subscribeToStackQuestions = (): Unsubscribe => {
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks/${id}/questions`
    );
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        const questionsArray = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        dispatch({ type: "REPLACE_QUESTIONS", payload: questionsArray });
      },
      (error) => {
        console.log(error);
      }
    );
    return unsubscribe;
  };

  const subscribeToStackStats = (): Unsubscribe => {
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks/${id}/stats`
    );
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        const statsArray = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            date: convertFirebaseDate(doc.data().date),
            score: doc.data().score,
            time: doc.data().time,
          };
        });
        dispatch({ type: "REPLACE_STATS", payload: statsArray });
      },
      (error) => {
        console.log(error);
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribeQuestions = subscribeToStackQuestions();
    const unsubscribeStats = subscribeToStackStats();

    return () => {
      unsubscribeQuestions();
      unsubscribeStats();
    };
  }, []);

  return (
    <StackContext.Provider value={state}>
      <StackDispatchContext.Provider value={dispatch}>
        {children}
      </StackDispatchContext.Provider>
    </StackContext.Provider>
  );
};

export const useStack = () => {
  const context = useContext(StackContext);
  if (context === undefined) {
    throw new Error("useStack must be used within a StackProvider");
  }
  return context;
};

export const useStackQuestions = () => {
  const context = useContext(StackContext) as unknown as {
    questions: IQuestionItem[];
  };
  if (context === undefined) {
    throw new Error("useStack must be used within a StackProvider");
  } else if (context === null) {
    return [];
  }
  return context.questions;
};

export const useStackStats = () => {
  const context = useContext(StackContext) as unknown as { stats: any[] };
  if (context === undefined) {
    throw new Error("useStack must be used within a StackProvider");
  } else if (context === null) {
    return [];
  }
  return context.stats;
};

export const useStackDispatch = () => {
  const context = useContext(StackDispatchContext);
  if (context === undefined) {
    throw new Error("useStackDispatch must be used within a StackProvider");
  }
  return context;
};
