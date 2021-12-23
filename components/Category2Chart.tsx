import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { duplicate, descSort } from "../lib/util";

export default function Category2Chart({ data }) {
  // console.log(data);
  const [chartData, setChartData] = useState({});

  // sprintを集める
  let sprints: string[] = [];
  data.map((s) => sprints.push(s.sprint));
  let sprintData = duplicate(sprints)[0];

  const chart = () => {
    let categories: string[] = [];

    data.forEach((d: any) => {
      // カテゴリ枚にストーリーポイントを加算(なので厳密には合計がベロシティと一致しない)
      d.category2.map(function (v) {
        if (d.sprint === sprintData[sprintData.length - 1]) {
          for (let i = 0; i < d.storyPoint; i++) {
            categories.push(v);
          }
        }
      });
    });

    let result = duplicate(categories);
    let result2 = descSort(result[0], result[1]);
    setChartData({
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

  useEffect(() => {
    // fetchData();
    chart();
  }, []);

  return (
    <Doughnut
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "category2",
          },
        },
        maintainAspectRatio: true,
      }}
    />
  );
}
