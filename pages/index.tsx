import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../components/Link";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Notion2Chart
        </Typography>
        <Typography variant="body1" component="h1" gutterBottom>
          以下をクリックしてください（２、３秒待つかも）
        </Typography>
        {/* <Link href="/charts" color="secondary">
          Go to the charts page
        </Link> */}
        <div></div>
        <Link href="/dashboard" color="secondary">
          ダッシュボード
        </Link>
        <Box m={2} />
      </Box>
    </Container>
  );
}
