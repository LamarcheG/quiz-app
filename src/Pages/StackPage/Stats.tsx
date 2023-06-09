import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { LoadingSpinner } from "../../Components/Styled/LoadingSpinner";
import { useStackStats } from "../../Stores/StackContext";

export const Stats = () => {
  const [statList, setStatList] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nbOfStats, setNbOfStats] = useState(5);
  const [showLatest, setShowLatest] = useState(false);
  const statListContext = useStackStats() as unknown as any[];

  useEffect(() => {
    if (!statListContext || statListContext.length === 0) {
      setIsLoaded(true);
      return;
    }
    sortStats(statListContext);
    setStatList(statListContext);
    setIsLoaded(true);
  }, [statListContext]);

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
      {!isLoaded ? (
        <LoadingSpinner />
      ) : (
        <>
          {statList.length > 1 ? (
            <div className="m-auto mt-3 w-full md:w-4/6">
              <div className="mb-3">
                <p>Number of tests taken: {getNbOfRounds()}</p>
                <p>Average Score: {getAverageScore()}</p>
                <p>Average Time: {getAverageTime()}</p>
              </div>
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
        </>
      )}
    </>
  );
};
