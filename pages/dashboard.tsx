import { Container, Grid, Paper } from "@mui/material";
import React from "react";
// import Charts from "../components/charts";
import CategoryChart from "../components/CategoryChart";
import Category2Chart from "../components/Category2Chart";
import VelocityText from "../components/VelocityText";
import VelocityChanges from "../components/VelocityChanges";
import { getDatabaseData, getBacklogs } from "../lib/notion";

export default function Dashboard({ data }) {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 400,
              }}
            >
              <VelocityText data={data} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 400,
              }}
            >
              <VelocityChanges data={data} />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          {/* Recent Deposits */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CategoryChart data={data} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Category2Chart data={data} />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          {/* <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            </Paper>
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const res = await getDatabaseData();
  // console.log(res.results);
  const backlogs = await getBacklogs(res);
  const data = backlogs.filter((v) => v.status === "Done");
  // console.log(data);

  return {
    props: {
      data,
    },
  };
}
