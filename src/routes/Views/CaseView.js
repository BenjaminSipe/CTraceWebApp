import React, { Component } from "react";
import { Grid, Box, Layer, Tabs, Tab } from "grommet";
import PatientCard from "./PatientCard";
import {
  getCases,
  getContacts,
  getRecovered,
  getPast,
} from "../../scripts/API";
import PatientModalCardBody from "./PatientModalCardBody";
import DataEntryModalCard from "./DataEntryModalCard";
import ExtraCard from "./ExtraCard";

export default class CaseView extends Component {
  state = {
    view: "Active Cases",
    "Active Cases": null,

    Exposed: null,
    Recovered: null,
    Past: null,
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
  };
  formatDate(d) {
    return "" + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
  }
  getRandomColor(_id) {
    let arr = ["color-1", "color-2", "color-3", "color-4", "control"];
    return arr[parseInt("0x" + _id) % arr.length]; // adjusted to work of id for consistent coloring.
    // return arr[Math.floor(Math.random() * arr.length)];
  }

  loadData = async (data) => {
    let functionArr = {
      "Active Cases": () => getCases(),
      Exposed: () => getContacts(),
      Recovered: () => getRecovered(),
      Past: () => getPast(),
    };
    var values = await (await functionArr[data]()).map((item) => {
      let c = this.getRandomColor(item._id);
      return (
        <PatientCard
          formatDate={this.formatDate}
          openModal={() => {
            this.setState({ showModal: true, showEntryDataModal: false });
            this.setState({ modalData: { ...item, view: data, cardColor: c } });
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
          this.setState({ modalData: { view: data, cardColor: "control" } });
        }}
        data={{ view: data, cardColor: "control" }}
        key="extraCard"
      ></ExtraCard>
    );

    let v = {};
    v[data] = await values;
    this.setState(v);
    return new Promise(() => v);
  };

  componentDidMount() {
    this.state.possibleView.forEach((item) => this.loadData(item));
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
        <Tabs margin="10px">
          {this.state.possibleView.map((item) => (
            <Tab
              key={item}
              title={item}
              onClick={() => {
                this.setState({ view: item });
                this.loadData(item);
              }}
            >
              <Grid
                rows={["190px"]}
                columns="120px"
                gap={{ row: "medium", column: "small" }}
              >
                {this.state[item]?.length > 0
                  ? this.state[item]
                  : "No " + item + " Currently."}
              </Grid>
            </Tab>
          ))}
        </Tabs>

        {!this.state.showEntryDataModal && this.state.showModal && (
          <Layer
            style={{ borderRadius: "15px" }}
            onEsc={() => this.setState({ showModal: false })}
            onClickOutside={() => this.setState({ showModal: false })}
          >
            <PatientModalCardBody
              reopenModal={() => {
                this.setState({ showModal: true });
              }}
              updateScreen={(item) => {
                this.loadData("Exposed");
                this.loadData("Active Cases");
              }}
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
            <DataEntryModalCard
              callbacks={{
                closeModal: () => {
                  this.setState({ showEntryDataModal: false });
                },
                reopenModal: () => {
                  this.setState({ showEntryDataModal: true });
                },
                updateScreen: () => {
                  this.loadData("Past");
                  this.loadData("Recovered");
                  this.loadData("Exposed");
                  this.loadData("Active Cases");
                },
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
