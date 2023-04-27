import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../firebaseInit";
import { Link } from "react-router-dom";
import { SubmitButton } from "../../Components/Styled/SubmitButton";
import { useUser } from "../../Stores/UserContext";
import { StackWithStats, User } from "../../interfaces";
import { LoadingSpinner } from "../../Components/Styled/LoadingSpinner";
import { useStacks } from "../../Stores/StacksContext";
import { MyStacksItem } from "./MyStacksItem";

export const MyStacks = (props: any) => {
  const [stacks, setStacks] = useState<StackWithStats[]>([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const userContext = useUser() as unknown as User;
  const [isLoaded, setIsLoaded] = useState(false);
  const stackContext = useStacks() as unknown as { stacks: StackWithStats[] };

  useEffect(() => {
    if (stackContext.stacks) {
      setStacks(stackContext.stacks);
      setIsLoaded(true);
    }
  }, [stackContext.stacks]);

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
        <div className="mb-5 flex items-center lg:mb-10">
          <h1 className="pr-5 text-text-OverBlue">My Stacks</h1>
          {!displayForm && (
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary p-0"
              onClick={() => setDisplayForm(true)}
            >
              +
            </button>
          )}
        </div>

        {!isLoaded ? (
          <LoadingSpinner />
        ) : (
          <ul className="flex flex-col items-center gap-3 lg:grid lg:grid-cols-3 lg:gap-12">
            {stacks.map((stack) => {
              return <MyStacksItem key={stack.id} stack={stack} />;
            })}
          </ul>
        )}

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
