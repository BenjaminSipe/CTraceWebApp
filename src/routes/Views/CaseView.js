import React, { Component } from "react";
import { Grid, Box, Button, Layer } from "grommet";
import PatientCard from "./PatientCard";
import { getCases, getContacts } from "../../scripts/API";
import PatientModalCardBody from "./PatientModalCardBody";

export default class CaseView extends Component {
  state = {
    view: "Active Cases",
    "Active Cases": null,
    Exposed: null,
    Recovered: null,
    modalData: {},
    showModal: false,
    possibleView: ["Active Cases", "Exposed", "Recovered"],
  };

  // <Button label="show" onClick={() => setShow(true)} />
  getRandomColor() {
    let arr = ["color-1", "color-2", "color-3", "color-4", "control"];
    return arr[Math.floor(Math.random() * arr.length)];
  }

  loadData = async (data) => {
    let functionArr = {
      "Active Cases": () => getCases(),
      Exposed: () => getContacts(),
      Recovered: () => getContacts(),
    };
    if (!this.state[data]) {
      var values = await (await functionArr[data]()).map((item) => {
        return (
          <PatientCard
            openModal={() => {
              this.setState({ showModal: true });
              this.setState({ modalData: item });
            }}
            data={item}
            cardColor={this.getRandomColor()}
            key={item._id}
          ></PatientCard>
        );
      });
      // this.setState({ data : values})/
      let v = {};
      v[data] = values;
      this.setState(v);
    }
  };

  componentDidMount() {
    this.loadData(this.state.view);
  }

  render() {
    return (
      <Box
        background="light-2"
        style={{
          padding: "35px",
          paddingTop: "10px",
          margin: "10px",
          borderRadius: "10px",
        }}
      >
        <Box direction="row" margin="10px">
          {this.state.possibleView.map((item) => (
            <Button
              color="rust"
              style={{
                flexDirection: "row",
                flex: 1,
                borderRadius: 0,
              }}
              label={item}
              onClick={() => {
                this.setState({ view: item });
                this.loadData(item);
              }}
            />
          ))}
        </Box>
        <Grid
          rows={["190px"]}
          columns="120px"
          gap={{ row: "medium", column: "medium" }}
        >
          {this.state[this.state.view]}
        </Grid>

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
      </Box>
    );
  }
}
