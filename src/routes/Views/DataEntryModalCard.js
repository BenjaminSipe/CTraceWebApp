import {
  Grid,
  FormField,
  RadioButtonGroup,
  MaskedInput,
  Card,
  Button,
  CardBody,
  Text,
  Box,
  CardFooter,
} from "grommet";

import { nameMask, dateMask, phoneOrEmailMask } from "../../scripts/InputMasks";
import { postCaseMessage } from "../../scripts/API";
import { GrClose, GrPrevious } from "react-icons/gr";
import React from "react";

export default function PatientModalCardBody(props) {
  const data = props.patientData;
  const [type, setType] = React.useState("unknown");
  // let [x, setX] = React.useState(true);
  let [entryData, setEntryData] = React.useState({
    name: "",
    dType: "",
    date: "",
    info: "",
    type: "Phone",
  });
  const info = () => {
    switch (type) {
      case "unknown":
        return (
          <Box
            direction="row"
            style={{
              padding: "8px",
              minHeight: "300px",
              borderRadius: "15px",
            }}
          >
            <Box flex background="rust">
              <Button
                fill
                onClick={() => {
                  setEntryData({ ...entryData, dType: "dot" });
                  setType("PositiveTest");
                }}
              >
                <Box fill justify="center" style={{ padding: "10%" }}>
                  <Text textAlign="center">Covid Test Returned Positive</Text>
                </Box>
              </Button>
            </Box>
            <Box
              style={{ borderRadius: "0% 15px 15px 0%" }}
              background="light-4"
              flex
            >
              <Button
                fill
                onClick={() => {
                  setEntryData({ ...entryData, dType: "doso" });
                  setType("Symptomatic");
                }}
              >
                <Box fill justify="center" style={{ padding: "10%" }}>
                  <Text textAlign="center">
                    Exposed Patient Became Symptomatic
                  </Text>
                </Box>
              </Button>
            </Box>
          </Box>
        );
      default:
        return (
          <Box direction="column" fill>
            <CardBody>
              <Grid
                fill
                rows={["flex", "flex", "flex"]}
                columns={["flex", "xsmall"]}
                justify="start"
                areas={[
                  { name: "first", start: [0, 0], end: [1, 0] },
                  { name: "second", start: [0, 1], end: [0, 1] },
                  { name: "selector", start: [1, 1], end: [1, 1] },
                  { name: "third", start: [0, 2], end: [1, 2] },
                  { name: "close", start: [1, 0], end: [1, 0] },
                ]}
              >
                <FormField
                  gridArea="first"
                  name={"FormName"}
                  htmlFor={"textinput-contacts"}
                  label="Name"
                >
                  <MaskedInput
                    mask={nameMask()}
                    id={"textinput-contacts"}
                    placeholder="Full name"
                    value={entryData.name}
                    onChange={(event) => {
                      setEntryData({
                        ...entryData,
                        name: event.target.value,
                      });
                    }}
                  />
                </FormField>
                <Box gridArea="close" direction="row" fill>
                  <Button
                    alignSelf="start"
                    onClick={() => setType("unknown")}
                    icon={<GrPrevious />}
                  />
                  <Button
                    alignSelf="start"
                    onClick={() => props.callbacks.deleteContact()}
                    icon={<GrClose />}
                  />
                </Box>
                <FormField
                  gridArea="second"
                  name={"Contact-info"}
                  htmlFor={"textinput-contactinfo"}
                  label={entryData.type}
                >
                  <MaskedInput
                    mask={phoneOrEmailMask(entryData.type.toLowerCase())}
                    size="small"
                    id={"textinput-contactinfo"}
                    name="info"
                    value={entryData.info}
                    placeholder={
                      entryData.type === "Phone"
                        ? "(000) 000-0000"
                        : "example@example.com"
                    }
                    onChange={(event) => {
                      setEntryData({ ...entryData, info: event.target.value });
                    }}
                  />
                </FormField>
                <RadioButtonGroup
                  style={{ padding: "10px" }}
                  gridArea="selector"
                  id={"selector"}
                  name={"selector"}
                  options={["Email", "Phone"]}
                  value={entryData.type}
                  onChange={(event) => {
                    setEntryData({
                      ...entryData,
                      info: "",
                      type: event.target.value,
                    });
                  }}
                />
                <FormField
                  gridArea="third"
                  name="contactdoc"
                  htmlFor={"textinput-contactdoc"}
                  label={
                    "Date of " +
                    (type === "Symptomatic" ? "Symptom Onset" : "COVID Test")
                  }
                >
                  <MaskedInput
                    id={"textinput-contactdoc"}
                    name="contactDoc"
                    mask={dateMask(entryData.date)}
                    value={entryData.date}
                    onChange={(event) => {
                      setEntryData({ ...entryData, date: event.target.value });
                    }}
                  />
                </FormField>
              </Grid>
            </CardBody>
            <CardFooter style={{ paddingLeft: "5px", paddingBottom: "5px" }}>
              <Button
                label="Clear"
                onClick={() => {
                  setEntryData({
                    ...entryData,
                    info: "",
                    name: "",
                    date: "",
                  });
                }}
              ></Button>
              <Button
                label="Submit"
                primary
                onClick={() => {
                  postCaseMessage(entryData).then((res) => {
                    props.updateScreen();
                  });
                }}
              ></Button>
            </CardFooter>
          </Box>
        );
    }
  };
  return (
    <Card
      style={{ minHeight: "300px", paddingRight: "10px", borderRadius: "15px" }}
      width="500px"
      background="light-1"
    >
      <Box direction="row" style={{ borderRadius: "15px" }}>
        <Box
          width="100px"
          style={{ minHeight: "300px", borderRadius: 0 }}
          background={data?.cardColor}
        ></Box>
        {info()}
      </Box>
    </Card>
  );
}
