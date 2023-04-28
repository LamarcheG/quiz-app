import { useState } from "react";
import { Link } from "react-router-dom";
import { StackWithStats } from "../../interfaces";

interface myStacksItemProps {
  stack: StackWithStats;
  isEditing: boolean;
  deleteStack: (id: string) => void;
}

export const MyStacksItem = ({
  stack,
  isEditing,
  deleteStack,
}: myStacksItemProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [displayConfirmDelete, setDisplayConfirmDelete] = useState(false);

  const handleConfirmDelete = (value: boolean) => {
    setDisplayConfirmDelete(value);
  };

  const handleDelete = (value: boolean) => {
    if (value) {
      deleteStack(stack.id);
    }
    setDisplayConfirmDelete(false);
  };

  return (
    <>
      {displayConfirmDelete && (
        <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className="w-fit rounded-md bg-neutral-800 p-5">
            <h2 className="mb-3 text-center text-2xl text-text-OverBlue">
              Are you sure? This cannot be undone
            </h2>
            <div className="flex items-center justify-center gap-3">
              <button
                className="rounded-md bg-neutral-600 px-2 py-1 text-text-OverBlue"
                onClick={() => handleDelete(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-primary px-2 py-1 text-text-OverBlue"
                onClick={() => handleDelete(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditing ? (
        <div key={stack.id}>
          <li className="relative h-full">
            <div className="h-44 w-64 rounded-md border-t border-l border-neutral-600 bg-neutral-800 text-white shadow-md shadow-black">
              <div className="relative flex h-1/3 items-center justify-between pl-5 pr-3">
                <div className="absolute bottom-0 left-0  h-1 w-full bg-gradient-to-r from-primary via-primary-light to-zinc-200"></div>
                <h2 className="text-2xl font-bold text-text-OverBlue">
                  {stack.name}
                </h2>
                <button
                  type="button"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-red-700 p-0 text-text-OverBlue"
                  onClick={() => handleConfirmDelete(true)}
                >
                  -
                </button>
              </div>
              {Object.keys(stack.stats).length > 0 ? (
                <div className="relative flex h-2/3 flex-col justify-center rounded-b-md bg-zinc-100 px-5 text-neutral-800">
                  <div className="absolute left-2 top-3 h-2/3 w-[1px] bg-neutral-400"></div>
                  <div className="absolute bottom-[10px] left-11 h-[1px] w-2/3 bg-neutral-400"></div>
                  <div className="absolute bottom-2 left-2 aspect-square w-1 rounded-full bg-primary"></div>
                  <div className="absolute bottom-2 left-4 aspect-square w-1 rounded-full bg-primary-light"></div>
                  <div className="absolute bottom-2 left-6 aspect-square w-1 rounded-full bg-blue-300"></div>
                  <div className="absolute bottom-2 left-8 aspect-square w-1 rounded-full bg-blue-200"></div>
                  <div></div>
                  <span>
                    Completed: {stack.stats.nbOfStats}{" "}
                    {stack.stats.nbOfStats > 1 ? "times" : "time"}
                  </span>
                  <span>Average time: {stack.stats.averageTime} seconds</span>
                  <span>Average score: {stack.stats.averageScore}%</span>
                </div>
              ) : (
                <div className="relative flex h-2/3 flex-col justify-center rounded-b-md bg-zinc-100 px-5 text-neutral-800">
                  <div className="absolute left-2 top-3 h-2/3 w-[1px] bg-neutral-400"></div>
                  <div className="absolute bottom-[10px] left-11 h-[1px] w-2/3 bg-neutral-400"></div>
                  <div className="absolute bottom-2 left-2 aspect-square w-1 rounded-full bg-primary"></div>
                  <div className="absolute bottom-2 left-4 aspect-square w-1 rounded-full bg-primary-light"></div>
                  <div className="absolute bottom-2 left-6 aspect-square w-1 rounded-full bg-blue-300"></div>
                  <div className="absolute bottom-2 left-8 aspect-square w-1 rounded-full bg-blue-200"></div>
                  <span>Not started yet</span>
                </div>
              )}
            </div>
          </li>
        </div>
      ) : (
        <Link key={stack.id} to={`/stacks/${stack.id}/quiz`}>
          <li className="relative h-full">
            <div
              className="h-44 w-64 rounded-md border-t border-l border-neutral-600 bg-neutral-800 text-white shadow-md shadow-black"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative flex h-1/3 items-center justify-between px-5">
                <div className="absolute bottom-0 left-0  h-1 w-full bg-gradient-to-r from-primary via-primary-light to-zinc-200"></div>
                <h2 className=" text-2xl font-bold text-text-OverBlue">
                  {stack.name}
                </h2>
              </div>
              {Object.keys(stack.stats).length > 0 ? (
                <div className="relative flex h-2/3 flex-col justify-center rounded-b-md bg-zinc-100 px-5 text-neutral-800">
                  <div className="absolute left-2 top-3 h-2/3 w-[1px] bg-neutral-400"></div>
                  <div className="absolute bottom-[10px] left-11 h-[1px] w-2/3 bg-neutral-400"></div>
                  <div className="absolute bottom-2 left-2 aspect-square w-1 rounded-full bg-primary"></div>
                  <div className="absolute bottom-2 left-4 aspect-square w-1 rounded-full bg-primary-light"></div>
                  <div className="absolute bottom-2 left-6 aspect-square w-1 rounded-full bg-blue-300"></div>
                  <div className="absolute bottom-2 left-8 aspect-square w-1 rounded-full bg-blue-200"></div>
                  <span>
                    Completed: {stack.stats.nbOfStats}{" "}
                    {stack.stats.nbOfStats > 1 ? "times" : "time"}
                  </span>
                  <span>Average time: {stack.stats.averageTime} seconds</span>
                  <span>Average score: {stack.stats.averageScore}%</span>
                </div>
              ) : (
                <div className="relative flex h-2/3 flex-col justify-center rounded-b-md bg-zinc-100 px-5 text-neutral-800">
                  <div className="absolute left-2 top-3 h-2/3 w-[1px] bg-neutral-400"></div>
                  <div className="absolute bottom-[10px] left-11 h-[1px] w-2/3 bg-neutral-400"></div>
                  <div className="absolute bottom-2 left-2 aspect-square w-1 rounded-full bg-primary"></div>
                  <div className="absolute bottom-2 left-4 aspect-square w-1 rounded-full bg-primary-light"></div>
                  <div className="absolute bottom-2 left-6 aspect-square w-1 rounded-full bg-blue-300"></div>
                  <div className="absolute bottom-2 left-8 aspect-square w-1 rounded-full bg-blue-200"></div>
                  Not started yet
                </div>
              )}
            </div>
            <div
              className={
                "absolute top-0 left-0 -z-10 h-44 w-64 rounded-md border-t border-l border-neutral-600 bg-neutral-800 transition-all ease-in-out" +
                (isHovering
                  ? " translate-x-8 -translate-y-4 rotate-6 shadow-md shadow-black"
                  : "")
              }
            >
              <div className="relative h-1/3">
                <div className="absolute bottom-0 left-0  h-1 w-full bg-gradient-to-r from-primary via-primary-light to-zinc-200"></div>
              </div>
              <div className="h-2/3 rounded-b-md bg-zinc-100"></div>
            </div>
            <div
              className={
                "absolute top-0 left-0 -z-10 h-44 w-64 rounded-md border-t border-l border-neutral-600 bg-neutral-800 transition-all ease-in-out" +
                (isHovering
                  ? " translate-x-4 -translate-y-2 rotate-3 rounded-md shadow-md shadow-black"
                  : "")
              }
            >
              <div className="relative h-1/3">
                <div className="absolute bottom-0 left-0  h-1 w-full bg-gradient-to-r from-primary via-primary-light to-zinc-200"></div>
              </div>
              <div className="h-2/3 rounded-b-md bg-zinc-100"></div>
            </div>
          </li>
        </Link>
      )}
    </>
  );
};
