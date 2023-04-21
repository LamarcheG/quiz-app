import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebaseInit";
import { Link } from "react-router-dom";
import { SubmitButton } from "../Components/Styled/SubmitButton";
import { useUser } from "../Stores/UserContext";
import { StackWithStats, User } from "../interfaces";
import { LoadingSpinner } from "../Components/Styled/LoadingSpinner";
import { useStacks } from "../Stores/StacksContext";

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
        {!isLoaded ? (
          <LoadingSpinner />
        ) : (
          <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-3">
            {stacks.map((stack) => {
              return (
                <Link
                  key={stack.id}
                  to={`/stacks/${stack.id}/quiz`}
                  className="w-full rounded-md bg-gray-900 p-5 shadow-md shadow-neutral-900 "
                >
                  <li className="text-white hover:text-white">
                    <h2 className="mb-1 text-2xl font-bold text-neutral-400">
                      {stack.name}
                    </h2>
                    {Object.keys(stack.stats).length > 0 ? (
                      <div className="flex flex-col">
                        <span>
                          Completed: {stack.stats.nbOfStats}{" "}
                          {stack.stats.nbOfStats > 1 ? "times" : "time"}
                        </span>
                        <span>
                          Average time: {stack.stats.averageTime} seconds
                        </span>
                        <span>Average score: {stack.stats.averageScore}%</span>
                      </div>
                    ) : (
                      <span>Not started yet</span>
                    )}
                  </li>
                </Link>
              );
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
