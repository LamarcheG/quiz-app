import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import db from "../firebaseInit";
import { User } from "../interfaces";
import { useUser } from "../Stores/UserContext";

export const StackIndex = () => {
  const { stackId } = useParams();
  const [stackName, setStackName] = useState("");
  const [activeTab, setActiveTab] = useState(
    "quiz" as "quiz" | "stats" | "edit"
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const userContext = useUser() as unknown as User;

  useEffect(() => {
    const getStackName = async () => {
      const stackRef = doc(
        db,
        `/users/${userContext.user.uid}/stacks/${stackId}`
      );
      const stackDoc = await getDoc(stackRef);
      if (stackDoc.exists()) {
        setStackName(stackDoc.data().name);
      } else {
        console.log("No such document!");
      }
    };
    getStackName();
    setIsLoaded(true);
  }, []);

  const captitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleTabClick = (tab: "quiz" | "stats" | "edit") => () => {
    setActiveTab(tab);
  };

  return (
    <>
      {isLoaded && (
        <div className="pt-12 text-center">
          <h1>Subject: {captitalize(stackName)}</h1>
          <div className="m-auto mt-2 flex w-4/6 items-center justify-between xl:w-64">
            <Link
              to={`/stacks/${stackId}/quiz`}
              className={
                "inline-block w-16 rounded-full border-2 px-3 py-1 text-white" +
                (activeTab === "quiz"
                  ? " border-gray-900"
                  : " border-neutral-500")
              }
              onClick={handleTabClick("quiz")}
            >
              Quiz
            </Link>
            <Link
              to={`/stacks/${stackId}/stats`}
              className={
                "inline-block w-16 rounded-full border-2 px-3 py-1 text-white" +
                (activeTab === "stats"
                  ? " border-gray-900"
                  : " border-neutral-500")
              }
              onClick={handleTabClick("stats")}
            >
              Stats
            </Link>
            <Link
              to={`/stacks/${stackId}/edit`}
              className={
                "inline-block w-16 rounded-full border-2 px-3 py-1 text-white" +
                (activeTab === "edit"
                  ? " border-gray-900"
                  : " border-neutral-500")
              }
              onClick={handleTabClick("edit")}
            >
              Edit
            </Link>
          </div>
          <div className="mt-3">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};