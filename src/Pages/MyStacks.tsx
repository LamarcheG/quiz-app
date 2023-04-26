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
  const [isHovering, setIsHovering] = useState([]) as any[];

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

  const handleHover = (value: boolean, id: string) => {
    const isPresent = isHovering.find((el: any) => el[0] === id);
    //add id and value to isHovering as tuple
    if (!isPresent) {
      setIsHovering([...isHovering, [id, value]]);
    } else {
      const index = isHovering.findIndex((el: any) => el[0] === id);
      isHovering[index][1] = value;
      setIsHovering([...isHovering]);
    }
  };

  const shouldHover = (id: string) => {
    const isPresent = isHovering.find((el: any) => el[0] === id);
    if (isPresent) {
      return isPresent[1];
    } else {
      return false;
    }
  };

  return (
    <div className="grid h-full items-center justify-center">
      <div>
        <div className="mb-5 flex items-center lg:mb-10">
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
          <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-12">
            {stacks.map((stack) => {
              return (
                <Link key={stack.id} to={`/stacks/${stack.id}/quiz`}>
                  <li className="relative h-full">
                    <div
                      className="h-36 w-64 rounded-md border-t border-l border-gray-700 bg-gray-900 p-5 text-white shadow-md shadow-neutral-900 hover:text-white"
                      onMouseEnter={() => handleHover(true, stack.id)}
                      onMouseLeave={() => handleHover(false, stack.id)}
                    >
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
                          <span>
                            Average score: {stack.stats.averageScore}%
                          </span>
                        </div>
                      ) : (
                        <span>Not started yet</span>
                      )}
                    </div>
                    <div
                      className={
                        shouldHover(stack.id)
                          ? "absolute top-0 left-0 -z-10 h-36 w-64 translate-x-8 -translate-y-4 rotate-6 rounded-md border-t border-l border-gray-700 bg-gray-900 shadow-md shadow-neutral-900 transition-all ease-in-out"
                          : "absolute top-0 left-0 -z-10 h-36 w-64 rounded-md border-t border-l border-gray-700 bg-gray-900 transition-all ease-in-out"
                      }
                    ></div>
                    <div
                      className={
                        shouldHover(stack.id)
                          ? "absolute top-0 left-0 -z-10 h-36 w-64 translate-x-4 -translate-y-2 rotate-3 rounded-md border-t border-l border-gray-700 bg-gray-900 shadow-md shadow-neutral-900 transition-all ease-in-out"
                          : "absolute top-0 left-0 -z-10 h-36 w-64 rounded-md border-t border-l border-gray-700 bg-gray-900 transition-all ease-in-out"
                      }
                    ></div>
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
