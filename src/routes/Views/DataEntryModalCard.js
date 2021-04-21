import {
  Grid,
  FormField,
  RadioButtonGroup,
  MaskedInput,
  Card,
  Button,
  CardBody,
  Box,
  CardFooter,
} from "grommet";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { nameMask, dateMask, phoneOrEmailMask } from "../../scripts/InputMasks";
import { postCaseMessage, postContactMessage } from "../../scripts/API";
import { GrClose, GrPrevious } from "react-icons/gr";
import React from "react";

export default function PatientModalCardBody(props) {
  const MySwal = withReactContent(Swal);
  const data = props.patientData;
  const [type, setType] = React.useState("Symptomatic");
  // let [x, setX] = React.useState(true);
  let [entryData, setEntryData] = React.useState({
    name: "",
    dType: props.patientData.view === "Exposed" ? "doc" : "doso",
    date: "",
    info: "",
    type: "Phone",
  });
  const info = () => {
    return (
      <Box direction="column" fill>
        <CardBody>
          <Grid
            fill
            rows={["flex", "flex", "flex"]}
            columns={["flex", "160px"]}
            justify="start"
            areas={[
              { name: "first", start: [0, 0], end: [1, 0] },
              { name: "second", start: [0, 1], end: [0, 1] },
              { name: "selector1", start: [1, 1], end: [1, 1] },
              { name: "selector2", start: [1, 2], end: [1, 2] },
              { name: "third", start: [0, 2], end: [0, 2] },
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
            <Box justify="end" gridArea="close" direction="row" fill>
              {/* <Button
                alignSelf="start"
                onClick={() => setType("unknown")}
                icon={<GrPrevious />}
              /> */}
              <Button
                alignSelf="start"
                onClick={() => props.callbacks.closeModal()}
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
              gridArea="selector1"
              id={"selector1"}
              name={"selector1"}
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
            {props.patientData.view === "Active Cases" && (
              <RadioButtonGroup
                style={{ padding: "10px" }}
                gridArea="selector2"
                id={"selector2"}
                name={"selector2"}
                options={["Symptomatic", "Test Date"]}
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                  setEntryData({
                    ...entryData,
                    dType: { Symptomatic: "doso", "Test Date": "dot" }[
                      event.target.value
                    ],
                  });
                }}
              />
            )}
            <FormField
              gridArea="third"
              name="contactdoc"
              htmlFor={"textinput-contactdoc"}
              label={
                "Date of " +
                (props.patientData.view === "Exposed"
                  ? "Contact"
                  : entryData.dType === "doso"
                  ? "Symptom Onset"
                  : "COVID Test")
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
            label="Cancel"
            secondary
            onClick={() => {
              props.callbacks.closeModal();
            }}
          ></Button>
          <Button
            label="Submit"
            primary
            onClick={() => {
              props.callbacks.closeModal();
              Swal.fire({
                title: "Save info and send message to patient?",
                // showDenyButton: () => !Swal.isLoading(),
                showCancelButton: true,
                confirmButtonText: `Yes, I'm ready`,
                showLoaderOnConfirm: true,

                cancelButtonText: `No, Not yet`,
                allowOutsideClick: () => !Swal.isLoading(),
                preConfirm: (login) => {
                  if (props.patientData.view === "Exposed") {
                    entryData._id = "override";
                    return postContactMessage(entryData)
                      .then((res) => {
                        // props.updateScreen();
                        return res;
                      })
                      .catch((res) => {
                        console.log(res);
                      });
                  } else {
                    return postCaseMessage(entryData)
                      .then((res) => {
                        console.log("test3");
                        // props.updateScreen();
                        return res;
                      })
                      .catch((res) => {
                        console.log(res);
                      });
                  }
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log("test2");
                  props.callbacks.updateScreen(props.patientData.view);
                  Swal.fire("Message Sent Successfully", "", "success");
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  props.callbacks.reopenModal();
                }
              });
            }}
          ></Button>
        </CardFooter>
      </Box>
    );
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
