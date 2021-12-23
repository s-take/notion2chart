import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { duplicate } from "../lib/util";

export default function VelocityChanges({ data }) {
  // console.log(data);
  const [yAxesMax, setYAxesMax] = useState(0);
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let velocities: number[] = [];
    let sprints: string[] = [];
    // sprintを集める
    data.map((s) => sprints.push(s.sprint));
    let sprintData = duplicate(sprints)[0];
    for (var i = 0; i < sprintData.length; i++) {
      velocities[i] = 0;
    }
    sprintData.map((s, i) => {
      data.map((d) => {
        if (d.sprint === s && d.status === "Done")
          velocities[i] += d.storyPoint;
      });
    });
    // console.log(velocities);

    setChartData({
      labels: sprintData,
      datasets: [
        {
          label: "velocity",
          data: velocities,
          fill: false,
          borderColor: "#EE6868",
          backgroundColor: "#EE6868",
        },
      ],
    });
  };

  useEffect(() => {
    // fetchData();
    chart();
  }, []);

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          title: { display: true, text: "ベロシティの推移" },
        },
        scales: {
          y: {
            // max: Math.round(yAxesMax * 1.1),
            max: 100,
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
  );
}
