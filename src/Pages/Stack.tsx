import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import db from "../firebaseInit";
import { User } from "../interfaces";
import { StackProvider } from "../Stores/StackContext";
import { useUser } from "../Stores/UserContext";

//make aggregate type for activeTab
type ActiveTab = "quiz" | "stats" | "edit";

export const Stack = () => {
  const { stackId } = useParams();
  const [stackName, setStackName] = useState("");
  const [activeTab, setActiveTab] = useState("quiz" as ActiveTab);
  const [isLoaded, setIsLoaded] = useState(false);
  const userContext = useUser() as unknown as User;

  const getActiveTabFromUrl = () => {
    const url = window.location.href;
    if (url.includes("quiz")) {
      return "quiz";
    } else if (url.includes("stats")) {
      return "stats";
    } else {
      return "edit";
    }
  };

  const getStackName = () => {
    const stackRef = doc(
      db,
      `/users/${userContext.user.uid}/stacks/${stackId}`
    );
    const unsubscribe = onSnapshot(
      stackRef,
      (snapshot) => {
        setStackName(snapshot.data()?.name);
      },
      (error) => {
        console.log(error);
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getStackName();
    setActiveTab(getActiveTabFromUrl());
    setIsLoaded(true);

    return () => {
      unsubscribe();
    };
  }, []);

  const captitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleTabClick = (tab: ActiveTab) => () => {
    setActiveTab(tab);
  };

  return (
    <>
      {isLoaded && (
        <div className="pt-24 text-center">
          <h1 className="text-text-OverBlue">
            Subject: {captitalize(stackName)}
          </h1>
          <div className="m-auto mt-2 flex w-64 items-center justify-between">
            <Link
              to={`/stacks/${stackId}/quiz`}
              className={
                "inline-block w-16 rounded-full border-2 px-3 py-1 text-text-OverBlue transition-all duration-150 ease-in-out hover:border-primary hover:bg-primary" +
                (activeTab === "quiz"
                  ? " border-primary"
                  : " border-neutral-500")
              }
              onClick={handleTabClick("quiz")}
            >
              Quiz
            </Link>
            <Link
              to={`/stacks/${stackId}/stats`}
              className={
                "inline-block w-16 rounded-full border-2 px-3 py-1 text-text-OverBlue transition-all duration-150 ease-in-out hover:border-primary hover:bg-primary" +
                (activeTab === "stats"
                  ? " border-primary"
                  : " border-neutral-500")
              }
              onClick={handleTabClick("stats")}
            >
              Stats
            </Link>
            <Link
              to={`/stacks/${stackId}/edit`}
              className={
                "inline-block w-16 rounded-full border-2 px-3 py-1 text-text-OverBlue transition-all duration-150 ease-in-out hover:border-primary hover:bg-primary" +
                (activeTab === "edit"
                  ? " border-primary"
                  : " border-neutral-500")
              }
              onClick={handleTabClick("edit")}
            >
              Edit
            </Link>
          </div>
          <div className="mt-3">
            <StackProvider id={stackId}>
              <Outlet />
            </StackProvider>
          </div>
        </div>
      )}
    </>
  );
};
