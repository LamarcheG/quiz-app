import { useState } from "react";
import { Link } from "react-router-dom";
import { StackWithStats } from "../../interfaces";

interface myStacksItemProps {
  stack: StackWithStats;
}

export const MyStacksItem = ({ stack }: myStacksItemProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link key={stack.id} to={`/stacks/${stack.id}/quiz`}>
      <li className="relative h-full">
        <div
          className="h-36 w-64 rounded-md border-t border-l border-neutral-600 bg-neutral-800 text-white shadow-md shadow-black hover:text-white"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <h2 className="grid h-1/3 items-center rounded-t-md border-b-2 border-primary">
            <span className="px-5 text-2xl font-bold text-text-OverBlue">
              {stack.name}
            </span>
          </h2>
          {Object.keys(stack.stats).length > 0 ? (
            <div className="flex h-2/3 flex-col justify-center px-5">
              <span>
                Completed: {stack.stats.nbOfStats}{" "}
                {stack.stats.nbOfStats > 1 ? "times" : "time"}
              </span>
              <span>Average time: {stack.stats.averageTime} seconds</span>
              <span>Average score: {stack.stats.averageScore}%</span>
            </div>
          ) : (
            <span className="flex h-2/3 flex-col justify-center px-5">
              Not started yet
            </span>
          )}
        </div>
        <div
          className={
            "absolute top-0 left-0 -z-10 h-36 w-64 rounded-md border-t border-l border-neutral-600 bg-neutral-800 transition-all ease-in-out" +
            (isHovering
              ? " translate-x-8 -translate-y-4 rotate-6 shadow-md shadow-black"
              : "")
          }
        >
          <div className="h-1/3 border-b-2 border-primary"></div>
        </div>
        <div
          className={
            "absolute top-0 left-0 -z-10 h-36 w-64 rounded-md border-t border-l border-neutral-600 bg-neutral-800 transition-all ease-in-out" +
            (isHovering
              ? " translate-x-4 -translate-y-2 rotate-3 rounded-md shadow-md shadow-black"
              : "")
          }
        >
          <div className="h-1/3 border-b-2 border-primary"></div>
        </div>
      </li>
    </Link>
  );
};
