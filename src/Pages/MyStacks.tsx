import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebaseInit";
import { Link } from "react-router-dom";
import { SubmitButton } from "../Components/Styled/SubmitButton";
import { useUser } from "../Stores/UserContext";
import { User } from "../interfaces";

export const MyStacks = (props: any) => {
  const [stacks, setStacks] = useState<any[]>([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const userContext = useUser() as unknown as User;

  const subscribeToStacks = () => {
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks`
    );
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        const stacksArray = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setStacks(stacksArray);
      },
      (error) => {
        console.log(error);
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = subscribeToStacks();
    return () => {
      unsubscribe();
    };
  }, []);

  const addSubject = async () => {
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks`
    );
    addDoc(collectionRef, { name: newSubject });
    setNewSubject("");
  };

  const handleFormChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubject(e.target.value);
  };

  return (
    <div className="grid h-full items-center justify-center">
      <div>
        <div className="flex items-center pb-5">
          <h1 className="pr-5">My Stacks</h1>
          {!displayForm && (
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 p-0"
              onClick={() => setDisplayForm(true)}
            >
              +
            </button>
          )}
        </div>
        <ul className="items-left flex flex-col justify-center ">
          {stacks.map((stack) => {
            return (
              <li key={stack.id} className="w-fit list-inside list-disc p-2">
                <Link to={`/stacks/${stack.id}`}>{stack.name}</Link>
              </li>
            );
          })}
        </ul>
        {displayForm && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addSubject();
              setDisplayForm(false);
            }}
            className="flex flex-col items-center"
          >
            <input
              type="text"
              className="mt-2"
              value={newSubject}
              onChange={handleFormChange()}
            />
            <div>
              <SubmitButton className="mt-2">Add</SubmitButton>
              <button
                type="button"
                className="underline"
                onClick={() => setDisplayForm(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
