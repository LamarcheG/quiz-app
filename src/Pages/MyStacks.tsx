import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebaseInit";

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
    <div>
      <h1>My Stacks</h1>
      <ul>
        {stacks.map((stack) => {
          return (
            <li key={stack.id}>
              Name: {stack.name}, Id:{stack.id}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
