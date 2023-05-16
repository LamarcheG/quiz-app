import { createContext, useContext, useReducer } from "react";

export const UserContext = createContext(null);
const UserDispatchContext = createContext<React.Dispatch<any> | null>(null);

const initialState = {
  user: {
    name: "Guillaume",
    email: "test@email.com",
    uid: "Hu88lIByGDI2NJtO2eFF",
  },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        user: initialState.user,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
};
