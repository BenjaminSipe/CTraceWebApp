import React from "react";
import { Grommet, Grid, Box, Main, Heading } from "grommet";
import PatientCard from "./PatientCard";
export default function CaseView() {
  return (
    <Grommet style={{ margin: "10px" }}>
      <Box
        background="light-1"
        style={{ padding: "15px", borderRadius: "10px" }}
      >
        <Grid
          rows="medium"
          columns="288px"
          gap={{ row: "medium", column: "medium" }}
          justify="center"
        >
          <PatientCard />
          <PatientCard />
          <PatientCard />
          <PatientCard />
          <PatientCard />
          <PatientCard />
          <PatientCard />
          <PatientCard />
        </Grid>
      </Box>
    </Grommet>
  );
}
