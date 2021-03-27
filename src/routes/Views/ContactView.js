import React, { Component } from "react";
import { Grommet, Grid, Box, Main, Heading } from "grommet";
import PatientCard from "./PatientCard";
import { getContacts } from "../../scripts/API";

export default class ContactView extends Component {
  state = {};

  constructor() {
    super();
    const contacts = async () => {
      var cards = await (await getContacts()).map((item) => {
        return <PatientCard data={item} key={item._id}></PatientCard>;
      });
      this.setState({ cards });
    };
    contacts();
  }

  render() {
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
            {this.state.cards}
          </Grid>
        </Box>
      </Grommet>
    );
  }
}
