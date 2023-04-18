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
  const [nbOfStats, setNbOfStats] = useState(5);
  const [showLatest, setShowLatest] = useState(false);

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
      onSnapshot(
        stackRef,
        (snapshot) => {
          const stats = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setStatListOriginal(stats);
        },
        (error) => {
          console.log(error);
        }
      );
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

  const formatDateTime = (date: Date, lastDate?: Date) => {
    var hours = date.getHours();
    var minutes = ("0" + date.getMinutes()).slice(-2);
    // determine if it's AM or PM
    var meridiem = hours >= 12 ? "pm" : "am";

    // convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;

    if (lastDate) {
      //if the date is the same as the last date, only show the time
      if (date.toDateString() === lastDate.toDateString()) {
        return hours + ":" + minutes + "" + meridiem;
      }
    }
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return (
      year +
      "/" +
      month +
      "/" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      "" +
      meridiem
    );
  };

  const getNbOfRounds = () => {
    return statList.length;
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

  const getLabelsLatest = () => {
    let labels: string[] = [];
    let lastDate: Date | undefined = undefined;
    statList
      .slice(statList.length - nbOfStats, statList.length)
      .forEach((stat) => {
        labels.push(formatDateTime(stat.date, lastDate));
        lastDate = stat.date;
      });
    return labels;
  };

  const getScoreData = () => {
    let data = statList.map((stat) => stat.score);
    return data;
  };

  const getScoreDataLatest = () => {
    let data = statList
      .slice(statList.length - nbOfStats, statList.length)
      .map((stat) => stat.score);
    return data;
  };

  const getTimeData = () => {
    let data = statList.map((stat) => stat.time);
    return data;
  };

  const getTimeDataLatest = () => {
    let data = statList
      .slice(statList.length - nbOfStats, statList.length)
      .map((stat) => stat.time);
    return data;
  };

  const handleNbStatsChange = (e: any) => {
    setNbOfStats(e.target.value);
  };

  return (
    <>
      {isLoaded ? (
        <div>
          <div>
            <p>Number of tests taken: {getNbOfRounds()}</p>
            <p>Average Score: {getAverageScore()}</p>
            <p>Average Time: {getAverageTime()}</p>
          </div>
          {statList.length > 1 ? (
            <div className="m-auto mt-3 w-full md:w-4/6">
              {statList.length > nbOfStats && (
                <button onClick={() => setShowLatest(!showLatest)}>
                  {showLatest ? "Show all" : "Show latest"}
                </button>
              )}
              {showLatest ? (
                <div>
                  <p>Number of tests to show: {nbOfStats}</p>
                  <input
                    type="range"
                    min="2"
                    max={statList.length - 1}
                    value={nbOfStats}
                    onChange={handleNbStatsChange}
                  />
                  <Line
                    datasetIdKey="id"
                    data={{
                      labels: getLabelsLatest(),
                      datasets: [
                        {
                          label: "Score",
                          data: getScoreDataLatest(),
                          borderColor: "rgb(255, 99, 132)",
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                      ],
                    }}
                  />
                  <Line
                    datasetIdKey="id2"
                    data={{
                      labels: getLabelsLatest(),
                      datasets: [
                        {
                          label: "Time",
                          data: getTimeDataLatest(),
                          borderColor: "rgb(54, 162, 235)",
                          backgroundColor: "rgba(54, 162, 235, 0.5)",
                        },
                      ],
                    }}
                  />
                </div>
              ) : (
                <div>
                  <Line
                    datasetIdKey="id"
                    data={{
                      labels: getLabels(),
                      datasets: [
                        {
                          label: "Score",
                          data: getScoreData(),
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
                          data: getTimeData(),
                          borderColor: "rgb(54, 162, 235)",
                          backgroundColor: "rgba(54, 162, 235, 0.5)",
                        },
                      ],
                    }}
                  />
                </div>
              )}
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
