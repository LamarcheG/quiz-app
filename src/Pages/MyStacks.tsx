import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
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
  const [isLoaded, setIsLoaded] = useState(false);

  const subscribeToStacks = () => {
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks`
    );
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        const stacksArray = snapshot.docs.map(async (doc) => {
          const stats = await getStats(doc.id);
          return { ...doc.data(), id: doc.id, stats };
        });
        Promise.all(stacksArray).then((values) => {
          setStacks(values);
          setIsLoaded(true);
        });
      },
      (error) => {
        console.log(error);
      }
    );
    return unsubscribe;
  };

  const getStats = async (id: string) => {
    const collectionRef = collection(
      db,
      `/users/${userContext.user.uid}/stacks/${id}/stats`
    );

    const statsList = await getDocs(collectionRef).then((snapshot) => {
      const statsArray = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      return statsArray;
    });
    let processedStats = {};
    if (statsList.length > 0) {
      processedStats = processStats(statsList);
    }
    return processedStats;
  };

  const processStats = (stats: any[]) => {
    let averageTime = 0;
    let averageScore = 0;

    stats.forEach((stat) => {
      averageTime += stat.time;
      averageScore += stat.score;
    });
    averageTime = Math.round((averageTime / stats.length) * 100) / 100;
    averageScore = Math.round((averageScore / stats.length) * 100) / 100;
    return { nbOfStats: stats.length, averageTime, averageScore };
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
        {!isLoaded ? (
          <p>Loading...</p>
        ) : (
          <ul className="grid grid-cols-3 gap-3">
            {stacks.map((stack) => {
              return (
                <li
                  key={stack.id}
                  className=" w-full rounded-md  bg-gray-900 p-5 shadow-md shadow-neutral-900 "
                >
                  <Link
                    to={`/stacks/${stack.id}/quiz`}
                    className="text-white hover:text-white"
                  >
                    <h2 className="mb-1 text-2xl font-bold text-neutral-400">
                      {stack.name}
                    </h2>
                    {Object.keys(stack.stats).length > 0 ? (
                      <div className="flex flex-col">
                        <span>
                          Completed: {stack.stats.nbOfStats}{" "}
                          {stack.stats.nbOfStats > 0 ? "times" : "time"}
                        </span>
                        <span>
                          Average time: {stack.stats.averageTime} seconds
                        </span>
                        <span>Average score: {stack.stats.averageScore}%</span>
                      </div>
                    ) : (
                      <span>Not started yet</span>
                    )}
                  </Link>
                </li>
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
