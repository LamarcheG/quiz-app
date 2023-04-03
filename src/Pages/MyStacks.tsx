import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
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
      <button type="button" onClick={() => setDisplayForm((prev) => !prev)}>
        Add a subject
      </button>
      {displayForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addSubject();
            setDisplayForm(false);
          }}
        >
          <input type="text" value={newSubject} onChange={handleFormChange()} />
          <SubmitButton>Add</SubmitButton>
        </form>
      )}
    </>
  );
};
