import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { duplicate } from "../lib/util";

export default function VelocityText({ data }) {
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
      if (d.sprint === s && d.status === "Done") velocities[i] += d.storyPoint;
    });
  });

  let lastVelocity: number = 0;
  if (velocities.length > 1) {
    lastVelocity = velocities[velocities.length - 1];
  }

  return (
    <Box sx={{ alignItems: "center" }}>
      <Typography variant="subtitle2" align="center">
        前スプリントのベロシティ
      </Typography>
      <Typography variant="h1" align="center">
        {lastVelocity}
      </Typography>
    </Box>
  );
}
