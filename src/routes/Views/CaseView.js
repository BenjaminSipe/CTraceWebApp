import React, { Component } from "react";
import { Grid, Box, Button, Layer } from "grommet";
import PatientCard from "./PatientCard";
import { getCases, getContacts, getRecovered } from "../../scripts/API";
import PatientModalCardBody from "./PatientModalCardBody";
import DataEntryModalCard from "./DataEntryModalCard";
import ExtraCard from "./ExtraCard";

export default class CaseView extends Component {
  state = {
    view: "Active Cases",
    "Active Cases": null,
    Exposed: null,
    Recovered: null,
    modalData: {},
    addEntryData: {
      formName: "",
      dType: "",
      date: "",
      info: "",
      type: "Phone",
    },
    showEntryDataModal: false,
    showModal: false,
    possibleView: ["Active Cases", "Exposed", "Recovered", "Past"],
  };

  getProp = (name) => {
    return this.state.addEntryData[name];
  };
  setProp = (name, pvalue) => {
    var addEntryData = { ...this.state.addEntryData };
    addEntryData[name] = pvalue;
    this.setState({ addEntryData });
  };
  deleteContact = () => {
    this.setState({ showEntryDataModal: false });

    // var value = { ...this.state.value };
    // value.contacts.splice(index, 1);
    // this.setState({ value });
    // this.getContacts();
  };
  formatDate(d) {
    return "" + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
  }
  getRandomColor() {
    let arr = ["color-1", "color-2", "color-3", "color-4", "control"];
    return arr[Math.floor(Math.random() * arr.length)];
  }

  loadData = async (data) => {
    let functionArr = {
      "Active Cases": () => getCases(),
      Exposed: () => getContacts(),
      Recovered: () => getRecovered(),
      Past: () => getRecovered(),
    };
    if (!this.state[data]) {
      var values = await (await functionArr[data]()).map((item) => {
        let c = this.getRandomColor();
        return (
          <PatientCard
            formatDate={this.formatDate}
            openModal={() => {
              this.setState({ showModal: true, showEntryDataModal: false });
              this.setState({ modalData: { ...item, cardColor: c } });
            }}
            data={{ ...item, cardColor: c }}
            key={item._id}
          ></PatientCard>
        );
      });
      values.unshift(
        <ExtraCard
          formatDate={this.formatDate}
          openModal={() => {
            this.setState({ showModal: false, showEntryDataModal: true });
            this.setState({ modalData: { cardColor: "control" } });
          }}
          data={{ view: this.state.view, cardColor: "control" }}
          key="extraCard"
        ></ExtraCard>
      );
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
              key={item}
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

        {!this.state.showEntryDataModal && this.state.showModal && (
          <Layer
            style={{ borderRadius: "15px" }}
            onEsc={() => this.setState({ showModal: false })}
            onClickOutside={() => this.setState({ showModal: false })}
          >
            {/* THIS IS WHERE MY MODAL GOES */}
            <PatientModalCardBody
              formatDate={this.formatDate}
              patientData={this.state.modalData}
              close={() => this.setState({ showModal: false })}
            />
          </Layer>
        )}
        {this.state.showEntryDataModal && !this.state.showModal && (
          <Layer
            style={{ borderRadius: "15px" }}
            onEsc={() => this.setState({ showEntryDataModal: false })}
            onClickOutside={() => this.setState({ showEntryDataModal: false })}
          >
            {/* THIS IS WHERE MY MODAL GOES */}
            <DataEntryModalCard
              callbacks={{
                deleteContact: () => {
                  this.setState({ showEntryDataModal: false });
                },
              }}
              updateScreen={() => {
                this.loadData("Active Cases");
                this.setState({ showEntryDataModal: false });
              }}
              patientData={this.state.modalData}
              close={() => this.setState({ showEntryDataModal: false })}
            />
          </Layer>
        )}
      </Box>
    );
  }
}
