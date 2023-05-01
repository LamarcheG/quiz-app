import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
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
    TimesCompleted = "Times completed",
    AverageScore = "Average score",
    AverageTime = "Average time",
  }

  const [stacks, setStacks] = useState<StackWithStats[]>([]);
  const [displayAddForm, setDisplayForm] = useState(false);
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const userContext = useUser() as unknown as User;
  const [isLoaded, setIsLoaded] = useState(false);
  const stackContext = useStacks() as unknown as { stacks: StackWithStats[] };
  const [sortType, setSortType] = useState(SortType.Alphabetical);
  const [isReversed, setIsReversed] = useState(false);
  const [isEditingClicked, setIsEditingClicked] = useState(false);

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

  const handleEditFromToggle = () => {
    setIsEditingClicked(true);
    setDisplayEditForm(!displayEditForm);
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

  const deleteStack = (stackId: string) => {
    const docRef = doc(db, `/users/${userContext.user.uid}/stacks/${stackId}`);
    deleteDoc(docRef);
  };

  return (
    <div className="grid h-full items-center justify-center">
      <div className="mt-16 md:mt-0">
        <div className="mb-2 flex items-center">
          <h1 className="pr-5 text-text-OverBlue">My Stacks</h1>
          <button
            type="button"
            className={
              "ml-2 flex items-center justify-center rounded-md bg-primary px-2 py-1 text-text-OverBlue" +
              (isEditingClicked ? " animate-buttonClick" : "")
            }
            onClick={() => handleEditFromToggle()}
            onAnimationEnd={() => setIsEditingClicked(false)}
          >
            {!displayEditForm ? "Edit" : "Cancel"}
          </button>
        </div>
        <form className="mb-10 flex items-center justify-center md:justify-start">
          <select
            className="mr-3 rounded-md border border-primary p-1"
            onChange={(e) => handleSortTypeChange(e)}
          >
            <option value={SortType.Alphabetical}>
              {SortType.Alphabetical}
            </option>
            <option value={SortType.TimesCompleted}>
              {SortType.TimesCompleted}
            </option>
            <option value={SortType.AverageScore}>
              {SortType.AverageScore}
            </option>
            <option value={SortType.AverageTime}>{SortType.AverageTime}</option>
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
          <ul className="flex flex-col items-center gap-3 md:grid md:grid-cols-2 md:gap-12 lg:grid lg:grid-cols-3 lg:gap-12">
            {stacks.map((stack) => {
              return (
                <MyStacksItem
                  key={stack.id}
                  stack={stack}
                  isEditing={displayEditForm}
                  deleteStack={deleteStack}
                />
              );
            })}

            {displayEditForm && (
              <>
                {displayAddForm ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addSubject();
                      setDisplayForm(false);
                    }}
                    className="h-44 w-64 rounded-md border-t border-l border-neutral-600 bg-neutral-800 text-white shadow-md shadow-black"
                  >
                    <div className="relative flex h-1/3 w-full items-center justify-start  px-5">
                      <div className="absolute bottom-0 left-0  h-1 w-full bg-gradient-to-r from-primary via-primary-light to-zinc-200"></div>
                      <input
                        type="text"
                        className="h-6 w-full rounded-md placeholder:pl-2"
                        name="newSubject"
                        value={newSubject}
                        placeholder="Name"
                        onChange={handleFormChange()}
                      />
                    </div>
                    <div className="relative flex h-2/3 items-center justify-start rounded-b-md bg-blue-50 px-5 text-neutral-800">
                      <div className="absolute left-2 top-3 h-2/3 w-[1px] bg-neutral-400"></div>
                      <div className="absolute bottom-[10px] left-11 h-[1px] w-2/3 bg-neutral-400"></div>
                      <div className="absolute bottom-2 left-2 aspect-square w-1 rounded-full bg-primary"></div>
                      <div className="absolute bottom-2 left-4 aspect-square w-1 rounded-full bg-primary-light"></div>
                      <div className="absolute bottom-2 left-6 aspect-square w-1 rounded-full bg-blue-300"></div>
                      <div className="absolute bottom-2 left-8 aspect-square w-1 rounded-full bg-blue-200"></div>
                      <SubmitButton>Add</SubmitButton>
                      <button
                        type="button"
                        className="underline"
                        onClick={() => setDisplayForm(false)}
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    {!displayAddForm && (
                      <button
                        type="button"
                        onClick={() => setDisplayForm(true)}
                        className="grid h-44 w-64 items-center justify-center rounded-md border-t border-l border-neutral-600 border-opacity-40 bg-neutral-800 bg-opacity-40 text-white shadow-md shadow-black"
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary p-0">
                          +
                        </span>
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
