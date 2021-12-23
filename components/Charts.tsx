import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { getDatabaseData, getBacklogs } from "../lib/notion";

export default function Charts({ data }) {
  // console.log(data);
  const [yAxesMax, setYAxesMax] = useState(0);
  const [chartData, setChartData] = useState({});
  const [pieData, setPieData] = useState({});
  const [pieData2, setPieData2] = useState({});

  const chart = () => {
    let sprintData = ["41"];
    // let burndownData = [200, 160, 160, 140, 90];
    let burndownData = [];
    let storyPoints: number[] = [];
    let categories: string[] = [];
    let categories2: string[] = [];
    let totalPointsInSprint = 0;
    for (var i = 0; i < sprintData.length; i++) {
      storyPoints[i] = 0;
    }
    data.forEach((d: any) => {
      // カテゴリーを重複排除しつつ、カテゴリ枚にストーリーポイントを加算
      d.category.map(function (v) {
        for (let i = 0; i < d.storyPoint; i++) {
          categories.push(v);
        }
      });
      d.category2.map(function (v) {
        for (let i = 0; i < d.storyPoint; i++) {
          categories2.push(v);
        }
      });

      totalPointsInSprint += d.storyPoint;
      sprintData.forEach((s, i) => {
        if (d.sprint === s && d.status === "Done") {
          storyPoints[i + 1] += d.storyPoint;
        }
      });
    });
    // categories = tmpCategories.filter(function (x, i, self) {
    //   return self.indexOf(x) === i;
    // });
    setYAxesMax(totalPointsInSprint);
    let currentPoint = totalPointsInSprint;
    for (var i = 0; i < sprintData.length; i++) {
      if (i != 0 && storyPoints[i] == 0) {
        break;
      }
      currentPoint = currentPoint - storyPoints[i];
      burndownData[i] = currentPoint;
    }
    const idealPointsPerSprint = totalPointsInSprint / (sprintData.length - 1);
    const idealData = sprintData.map((v, i) => {
      return totalPointsInSprint - idealPointsPerSprint * i;
    });
    setChartData({
      labels: sprintData,
      datasets: [
        {
          label: "Burndown",
          data: burndownData,
          fill: false,
          borderColor: "#EE6868",
          backgroundColor: "#EE6868",
        },
        {
          label: "Ideal",
          // data: [33, 25, 35, 51, 54, 76],
          data: idealData,
          borderColor: "#6C8893",
          backgroundColor: "#6C8893",
          lineTension: 0,
          borderDash: [5, 5],
          fill: false,
        },
      ],
    });

    let result = duplicate(categories);
    setPieData({
      labels: result[0],
      datasets: [
        {
          data: result[1],
          // backgroundColor: fillPattern,
          // backgroundColor: ["#B9D8F7", "#FFE5EC", "#DEDFE0"],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
        },
      ],
    });
    let result2 = duplicate(categories2);
    setPieData2({
      labels: result2[0],
      datasets: [
        {
          data: result2[1],
          // backgroundColor: fillPattern,
          // backgroundColor: ["#B9D8F7", "#FFE5EC", "#DEDFE0"],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
        },
      ],
    });
  };
  const duplicate = (arr: any[]) => {
    var a = [],
      b = [],
      prev;

    arr.sort();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== prev) {
        a.push(arr[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = arr[i];
    }

    return [a, b];
  };

  useEffect(() => {
    // fetchData();
    chart();
  }, []);

  return (
    <div className="App">
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: { display: true, text: "Verocity Changes" },
          },
          scales: {
            y: {
              max: Math.round(yAxesMax * 1.1),
              min: 0,
              title: {
                display: true,
                text: "ベロシティ",
              },
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
            x: {
              gridLines: {
                display: false,
              },
            },
          },
        }}
      />
      <Doughnut
        data={pieData}
        options={{
          responsive: true,
          plugins: {
            title: { display: true, text: "Category" },
          },
          maintainAspectRatio: true,
        }}
      />
      <Doughnut
        data={pieData2}
        options={{
          responsive: true,
          plugins: {
            title: { display: true, text: "Category2" },
          },
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
}
