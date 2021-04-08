import React, { Component } from "react";
import { Grommet, Grid, Box, Button } from "grommet";
import PatientCard from "./PatientCard";
import { getCases, getContacts } from "../../scripts/API";

export default class CaseView extends Component {
  state = { view: "cases" };

  cases = async () => {
    var cases = await (await getCases()).map((item) => {
      return <PatientCard data={item} key={item._id}></PatientCard>;
    });
    this.setState({ cases });
  };

  contacts = async () => {
    var contacts = await (await getContacts()).map((item) => {
      return <PatientCard data={item} key={item._id}></PatientCard>;
    });
    this.setState({ contacts });
  };

  componentDidMount() {
    this.cases();
    this.contacts();
  }

  render() {
    return (
      <Grommet style={{ margin: "10px" }}>
        <Box
          background="light-1"
          style={{ padding: "15px", borderRadius: "10px" }}
        >
          <Box direction="row">
            <Button
              label="Cases"
              onClick={() => this.setState({ view: "cases" })}
            ></Button>
            <Button
              label="Contacts"
              onClick={() => this.setState({ view: "contacts" })}
            ></Button>
          </Box>
          <Grid
            rows={["small"]}
            columns="120px"
            gap={{ row: "medium", column: "medium" }}
          >
            {this.state.view === "cases"
              ? this.state.cases
              : this.state.contacts}
          </Grid>
        </Box>
      </Grommet>
    );
  }
}
