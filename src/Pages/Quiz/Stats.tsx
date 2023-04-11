import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../firebaseInit";
import { User } from "../../interfaces";
import { useUser } from "../../Stores/UserContext";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export const Stats = () => {
  const { stackId } = useParams();
  const [statListOriginal, setStatListOriginal] = useState<any[]>([]);
  const [statList, setStatList] = useState<any[]>([]);
  const userContext = useUser() as unknown as User;
  const [isLoaded, setIsLoaded] = useState(false);

  const convertFirebaseDate = (date: any) => {
    const newDate = new Date(date.seconds * 1000);
    return newDate;
  };

  useEffect(() => {
    const getStackStats = async () => {
      const stackRef = collection(
        db,
        `/users/${userContext.user.uid}/stacks/${stackId}/stats`
      );
      onSnapshot(stackRef, (snapshot) => {
        const stats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStatListOriginal(stats);
      });
    };
    getStackStats();
  }, []);
  useEffect(() => {
    const newStatList = statListOriginal.map((stat) => {
      stat.date = convertFirebaseDate(stat.date);
      return stat;
    });
    sortStats(newStatList);
    setStatList(newStatList);
  }, [statListOriginal]);

  useEffect(() => {
    if (statList.length > 0) {
      setIsLoaded(true);
    }
  }, [statList]);

  const sortStats = (statList: any[]) => {
    statList.sort((a, b) => {
      return a.date - b.date;
    });
  };

  const formatDateTime = (date: Date) => {
    const newDate = new Date(date);
    return (
      newDate.toDateString() +
      " " +
      newDate.getHours() +
      ":" +
      newDate.getMinutes()
    );
  };

  const getAverageScore = () => {
    let total = 0;
    statList.forEach((stat) => {
      total += stat.score;
    });
    let avg = Math.round((total / statList.length) * 100) / 100;
    return avg.toString() + "%";
  };

  const getAverageTime = () => {
    let total = 0;
    statList.forEach((stat) => {
      total += stat.time;
    });
    return (total / statList.length).toFixed(2) + " seconds";
  };

  const getLabels = () => {
    let labels = statList.map((stat) => formatDateTime(stat.date));
    return labels;
  };

  return (
    <>
      {isLoaded ? (
        <div>
          <div>
            <p>Average Score: {getAverageScore()}</p>
            <p>Average Time: {getAverageTime()}</p>
          </div>
          {statList.length > 1 ? (
            <div className="m-auto w-full md:w-4/6">
              <Line
                datasetIdKey="id"
                data={{
                  labels: getLabels(),
                  datasets: [
                    {
                      label: "Score",
                      data: statList.map((stat) => stat.score),
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                }}
              />
              <Line
                datasetIdKey="id2"
                data={{
                  labels: getLabels(),
                  datasets: [
                    {
                      label: "Time",
                      data: statList.map((stat) => stat.time),
                      borderColor: "rgb(54, 162, 235)",
                      backgroundColor: "rgba(54, 162, 235, 0.5)",
                    },
                  ],
                }}
              />
            </div>
          ) : (
            <p className="mt-5 text-xl text-red-500">
              Not enough data to display charts
            </p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
