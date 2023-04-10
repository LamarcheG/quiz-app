import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import db from "../../firebaseInit";
import { User } from "../../interfaces";
import { useUser } from "../../Stores/UserContext";

export const StackIndex = () => {
  const { stackId } = useParams();
  const [stackName, setStackName] = useState("");
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
  }, []);

  const captitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="pt-12 text-center">
      <h1>Subject: {captitalize(stackName)}</h1>
      <Link
        to={`/stacks/${stackId}/quiz`}
        className="inline-block rounded-md border-2 border-gray-900 px-3 py-2"
      >
        Quiz
      </Link>
      <Link
        to={`/stacks/${stackId}/stats`}
        className="inline-block rounded-md border-2 border-gray-900 px-3 py-2"
      >
        Stats
      </Link>
      <Link
        to={`/stacks/${stackId}/edit`}
        className="inline-block rounded-md border-2 border-gray-900 px-3 py-2"
      >
        Edit
      </Link>
      <Outlet />
    </div>
  );
};
