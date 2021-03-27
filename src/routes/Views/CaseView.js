import React from "react";
import { Grommet, Grid, Box, Main, Heading } from "grommet";
import PatientCard from "./PatientCard";

export default function CaseView() {
  const tempData = [
    { name: "Benjamin Sipe", _id: "1234", date: "3/27/2021" },
    { name: "David", _id: "1111" },
    {},
  ];
  const items = [];

  for (var i = 0; i < tempData.length; i++) {
    items.push(PatientCard({ data: tempData[i] }));
  }
  return (
    <Grommet style={{ margin: "10px" }}>
      <Box
        background="light-1"
        style={{ padding: "15px", borderRadius: "10px" }}
      >
        <Grid
          rows={["small"]}
          columns="120px"
          gap={{ row: "medium", column: "medium" }}
        >
          {items}
        </Grid>
      </Box>
    </Grommet>
  );
}
