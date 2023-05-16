import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useReducer } from "react";
import db from "../firebaseInit";
import { User } from "../interfaces";
import { useUser } from "./UserContext";

export const StacksContext = createContext(null);
const StacksDispatchContext = createContext<React.Dispatch<any> | null>(null);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "REPLACE_STACK":
      return {
        ...state,
        stacks: action.payload,
      };
    default:
      return state;
  }
};

export const StacksProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, []);

  const userContext = useUser() as unknown as User;

  const subscribeToStacks = () => {
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks`
    );
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const stacksArray = snapshot.docs.map(async (doc) => {
        const stats = await getStats(doc.id);
        return { ...doc.data(), id: doc.id, stats };
      });
      Promise.all(stacksArray).then((values) => {
        dispatch({ type: "REPLACE_STACK", payload: values });
      });
    });
    return unsubscribe;
  };

  const getStats = async (id: string) => {
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks/${id}/stats`
    );

    const statsList = await (
      await getDocs(collectionRef)
    ).docs.map((doc) => {
      return doc.data();
    });

    let processedStats = {};
    if (statsList.length > 0) {
      processedStats = processStats(statsList);
    }
    return processedStats;
  };
  const processStats = (stats: any[]) => {
    let averageTime = 0;
    let averageScore = 0;

    stats.forEach((stat) => {
      averageTime += stat.time;
      averageScore += stat.score;
    });
    averageTime = Math.round((averageTime / stats.length) * 100) / 100;
    averageScore = Math.round((averageScore / stats.length) * 100) / 100;
    return { nbOfStats: stats.length, averageTime, averageScore };
  };

  useEffect(() => {
    const unsubscribe = subscribeToStacks();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <StacksContext.Provider value={state}>
      <StacksDispatchContext.Provider value={dispatch}>
        {children}
      </StacksDispatchContext.Provider>
    </StacksContext.Provider>
  );
};

export const useStacks = () => {
  const context = useContext(StacksContext);
  if (context === undefined) {
    throw new Error("useStacks must be used within a StacksProvider");
  }
  return context;
};

export const useStacksDispatch = () => {
  const context = useContext(StacksDispatchContext);
  if (context === undefined) {
    throw new Error("useStacksDispatch must be used within a StacksProvider");
  }
  return context;
};
