import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../../firebaseInit";
import { SubmitButton } from "../../Components/Styled/SubmitButton";
import { useUser } from "../../Stores/UserContext";
import { StackWithStats, User } from "../../interfaces";
import { LoadingSpinner } from "../../Components/Styled/LoadingSpinner";
import { useStacks } from "../../Stores/StacksContext";
import { MyStacksItem } from "./MyStacksItem";

export const MyStacks = (props: any) => {
  enum SortType {
    Alphabetical = "Alphabetical",
    TimesCompleted = "TimesCompleted",
    AverageScore = "AverageScore",
    AverageTime = "AverageTime",
  }

  const [stacks, setStacks] = useState<StackWithStats[]>([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const userContext = useUser() as unknown as User;
  const [isLoaded, setIsLoaded] = useState(false);
  const stackContext = useStacks() as unknown as { stacks: StackWithStats[] };
  const [sortType, setSortType] = useState(SortType.Alphabetical);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    if (stackContext.stacks) {
      setStacks(sortStacks(stackContext.stacks));
      setIsLoaded(true);
    }
  }, [stackContext.stacks]);

  useEffect(() => {
    if (stacks.length > 0) {
      setStacks(sortStacks(stacks));
    }
  }, [sortType]);

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

  const sortStacks = (stacks: StackWithStats[]) => {
    switch (sortType) {
      case SortType.Alphabetical:
        return [...stacks].sort((a, b) => a.name.localeCompare(b.name));
      case SortType.TimesCompleted:
        return [...stacks].sort(
          (a, b) => a.stats.nbOfStats - b.stats.nbOfStats
        );
      case SortType.AverageScore:
        return [...stacks].sort(
          (a, b) => a.stats.averageScore - b.stats.averageScore
        );
      case SortType.AverageTime:
        return [...stacks].sort(
          (a, b) => a.stats.averageTime - b.stats.averageTime
        );
      default:
        return stacks;
    }
  };

  const handleSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as unknown as SortType);
  };

  const reverse = () => {
    setStacks([...stacks].reverse());
    setIsReversed(!isReversed);
  };

  return (
    <div className="grid h-full items-center justify-center">
      <div>
        <div className="mb-2 flex items-center">
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
        <form className="mb-5 flex items-center justify-center lg:mb-10 lg:justify-start">
          <select
            className="mr-3 rounded-md border border-primary p-1"
            onChange={(e) => handleSortTypeChange(e)}
          >
            <option value={SortType.Alphabetical}>Alphabetical</option>
            <option value={SortType.TimesCompleted}>Times completed</option>
            <option value={SortType.AverageScore}>Average score</option>
            <option value={SortType.AverageTime}>Average time</option>
          </select>
          <button type="button" onClick={() => reverse()} className="p-0">
            {isReversed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="w-6 fill-white"
              >
                <path d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 480h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="w-6 fill-white"
              >
                <path d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z" />
              </svg>
            )}
          </button>
        </form>

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
