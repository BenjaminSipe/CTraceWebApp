import React, { Component } from "react";
import {
  Grid,
  Box,
  Button,
  Text,
  Layer,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "grommet";
import PatientCard from "./PatientCard";
import { getCases, getContacts } from "../../scripts/API";
import PatientModalCardBody from "./PatientModalCardBody";

export default class CaseView extends Component {
  state = {
    view: "cases",
    cases: null,
    contacts: null,
    modalData: {},
    showModal: false,
  };

  // <Button label="show" onClick={() => setShow(true)} />

  loadData = async (data) => {
    if (!this.state[data]) {
      var values = await (data === "contacts"
        ? await getContacts()
        : await getCases()
      ).map((item) => {
        return (
          <PatientCard
            openModal={() => {
              this.setState({ showModal: true });
              this.setState({ modalData: item });
            }}
            data={item}
            key={item._id}
          ></PatientCard>
        );
      });
      if (data === "contacts") {
        this.setState({ contacts: values });
      } else {
        this.setState({ cases: values });
      }
    }
  };

  componentDidMount() {
    this.loadData(this.state.view);
  }

  render() {
    return (
      <div style={{ margin: "10px" }}>
        <Box
          background="light-1"
          style={{ padding: "15px", borderRadius: "10px" }}
        >
          <Box direction="row" margin="10px">
            <Button
              style={{ flexDirection: "row", flex: 1, borderRadius: 0 }}
              label="Cases"
              onClick={() => {
                this.setState({ view: "cases" });
                this.loadData("cases");
              }}
            ></Button>
            <Button
              style={{ flexDirection: "row", flex: 1, borderRadius: 0 }}
              label="Contacts"
              onClick={() => {
                this.setState({ view: "contacts" });
                this.loadData("contacts");
              }}
            ></Button>
          </Box>
          <Grid
            rows={["200px"]}
            columns="120px"
            gap={{ row: "medium", column: "medium" }}
          >
            {this.state[this.state.view]}
          </Grid>
        </Box>
        {this.state.showModal && (
          <Layer
            onEsc={() => this.setState({ showModal: false })}
            onClickOutside={() => this.setState({ showModal: false })}
          >
            {/* THIS IS WHERE MY MODAL GOES */}
            <PatientModalCardBody
              patientData={this.state.modalData}
              close={() => this.setState({ showModal: false })}
            />
          </Layer>
        )}
      </div>
    );
  }
}
