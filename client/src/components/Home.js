import React from "react";
import { Typography, Stack, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();
  // show button to got to "/flpSearch"

  // return Links to other pages
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        flexGrow: 1,
        height: "100vh",
        width: "100vw",
        pb: "10vh",
      }}>
      <Stack spacing={3}>
        <Typography variant="h4">Welcome to JetSearch.info</Typography>
        <Typography variant="caption">
          A faster way to source flights from Avinode and FlightListPro...
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/flpSearch")}>
          FlightListPro (One-Way)
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/flpSearchroundtrip")}>
          FlightListPro (Round-Trip)
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/avinodeSearch")}>
          Avinode (One-Way)
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/avroundtrip")}>
          Avinode (Round-Trip)
        </Button>
      </Stack>
    </Box>
  );
}
export default Home;
