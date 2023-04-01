import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebaseInit";
import { Link } from "react-router-dom";

export const MyStacks = (props: any) => {
  const [stacks, setStacks] = useState<any[]>([]);

  const subscribeToStacks = () => {
    const collectionRef = collection(db, "/users/Hu88lIByGDI2NJtO2eFF/stacks");
    onSnapshot(collectionRef, (snapshot) => {
      const stacksArray = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setStacks(stacksArray);
    });
  };

  useEffect(() => {
    subscribeToStacks();
  }, []);

  return (
    <>
      <h1 className="pb-5">My Stacks</h1>
      <ul className="items-left flex flex-col justify-center ">
        {stacks.map((stack) => {
          return (
            <li key={stack.id} className="w-fit list-inside list-disc p-2">
              <Link to={`/stacks/${stack.id}`}>{stack.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
