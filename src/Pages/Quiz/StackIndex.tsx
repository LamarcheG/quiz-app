import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  return (
    <div>
      <h1>Stack Index</h1>
      <p>Stack ID: {stackId}</p>
      <p>Stack Name: {stackName}</p>
      <Link to={`/stacks/${stackId}/quiz`}>Quiz</Link>
      <Link to={`/stacks/${stackId}/stats`}>Stats</Link>
      <Link to={`/stacks/${stackId}/edit`}>Edit</Link>
    </div>
  );
};
