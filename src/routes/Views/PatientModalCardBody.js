import {
  Card,
  CardHeader,
  Button,
  CardBody,
  Text,
  Box,
  DataTable,
  CardFooter,
} from "grommet";
import { GrClose } from "react-icons/gr";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  deleteContact,
  deleteCase,
  releasePatient,
  postCaseMessage,
  postContactMessage,
} from "../../scripts/API";

export default function PatientModalCardBody(props) {
  const MySwal = withReactContent(Swal);
  const data = props.patientData;
  const formats = (item) => {
    let formatter = {
      dob: { name: "Date of Birth", val: props.formatDate(new Date(item[1])) },
      quarantineLocation: { name: "Location", val: item[1] },
      doc: { name: "Date Exposed", val: props.formatDate(new Date(item[1])) },
      dot: { name: "Date Tested", val: props.formatDate(new Date(item[1])) },
      doso: {
        name: "Symptom Onset",
        val: props.formatDate(new Date(item[1])),
      },
      symptoms: { name: "Symptoms", val: item[1] },
    };
    // if (item[0] === "symptoms") {
    //   console.log(item[1]);
    // }
    return Object.keys(formatter).includes(item[0])
      ? formatter[item[0]]
      : {
          name: item[0][0].toUpperCase() + item[0].substr(1),
          val: item[1],
        };
  };

  return (
    <Card
      style={{
        minHeight: "300px",
        minWidth: "600px",
        // paddingRight: "10px",
        // borderRadius: "15px",
      }}
      background="light-1"
    >
      <Box direction="row" style={{ borderRadius: "15px" }}>
        <Box
          width="100px"
          style={{ minHeight: "300px", borderRadius: 0 }}
          background={data.cardColor}
        ></Box>
        <Box style={{ minHeight: "300px" }} direction="column" fill>
          <Box direction="row">
            <CardHeader
              style={{ padding: "10px", paddingBottom: 0, fontSize: "35px" }}
            >
              {data.name}
            </CardHeader>
            <Box fill></Box>
            <Button
              style={{ fontSize: "30px" }}
              onClick={props.close}
              icon={<GrClose />}
            />
          </Box>

          <CardBody style={{}}>
            <DataTable
              padding="0px"
              pad={{ vertical: "xxsmall" }}
              margin="xsmall"
              columns={[
                {
                  property: "name",
                  primary: true,
                  render: (datum) => (
                    <Box style={{ fontWeight: "bold" }} align="end">
                      {datum.name}
                    </Box>
                  ),
                },
                { property: "colon", padding: "20px", render: () => ":" },
                {
                  property: "val",
                  render: (datum) => (
                    <Text
                      size="small"
                      style={{
                        height: "18px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {datum.val}
                    </Text>
                  ),
                },
              ]}
              data={Object.entries({
                ...data,
                ...(typeof data.address == "object" && data.address),
              })
                .filter((item) => {
                  if (item[0] === "dob") console.log(item[1]);
                  return (
                    (item[0] === "symptoms" && item[1].length > 0) ||
                    (item[0] === "address" && typeof item[1] !== "object") ||
                    ![
                      "_id",
                      "name",
                      "contacts",
                      "cardColor",
                      "form",
                      "view",
                      "address",
                      "symptoms",
                    ].includes(item[0])
                  );
                })
                .map((item) => {
                  // console.log(item);
                  // This is a weird special case I never figured out why.
                  // Something to do with arrays being passed. I may need to parse the objects I pass around.
                  if (item[0] === "symptoms") {
                    return { name: "Symptoms", val: item[1].join(", ") };
                  }

                  return formats(item);
                })}
            />
          </CardBody>
          <CardFooter
            style={{
              paddingLeft: "35px",
              paddingRight: "35px",
              paddingBottom: "5px",
            }}
          >
            <Button
              primary
              color="rust"
              label="delete"
              onClick={() => {
                props.close();
                MySwal.fire({
                  title: "Delete Patient Info?",
                  showCancelButton: true,
                  confirmButtonText: `Yes`,
                  showLoaderOnConfirm: true,
                  cancelButtonText: `No`,
                  allowOutsideClick: () => !Swal.isLoading(),
                  preConfirm: () => {
                    return (data.view === "Exposed"
                      ? deleteContact(data._id)
                      : deleteCase(data._id)
                    )
                      .then((res) => {
                        if (res.message) {
                          Swal.fire(
                            "Deleted patient data!",
                            "",
                            "success"
                          ).then(() => {
                            props.updateScreen(data.view);
                          });
                        } else if (res.err) {
                          Swal.fire(
                            "Patient data was already deleted.",
                            "We've removed it from this list in the mean time.",
                            "info"
                          ).then(() => {
                            props.updateScreen(data.view);
                          });
                        } else {
                          console.log(res);
                          Swal.fire(
                            "Patient not found",
                            "Could not find patient with given id.",
                            "error"
                          );
                        }
                      })
                      .catch(() => {
                        Swal.fire(
                          "Something went wrong! Please try again.",
                          "",
                          "error"
                        );
                      });
                  },
                });
              }}
            />
            {data.form && (
              <Button
                secondary
                label="message"
                onClick={() => {
                  props.close();
                  Swal.fire({
                    title: "Send exposure form to patient?",
                    showCancelButton: true,
                    confirmButtonText: `Yes`,
                    showLoaderOnConfirm: true,

                    cancelButtonText: `No`,
                    allowOutsideClick: () => !Swal.isLoading(),
                    preConfirm: () => {
                      return postContactMessage({ _id: data._id })
                        .then((res) => {
                          // props.updateScreen();
                          return res;
                        })
                        .catch((res) => {
                          console.log(res);
                        });
                    },
                  }).then((result) => {
                    if (result.isConfirmed) {
                      props.updateScreen(props.patientData.view);
                      Swal.fire("Message Sent Successfully", "", "success");
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      props.reopenModal();
                    }
                  });
                }}
              />
            )}

            {data.view === "Exposed" && !data.form && (
              <Button
                secondary
                color="rust"
                label="Developed Symptoms"
                onClick={() => {
                  props.close();
                  Swal.fire({
                    title: "Update record and send message to patient?",
                    showCancelButton: true,
                    confirmButtonText: `Yes, I'm ready`,
                    showLoaderOnConfirm: true,

                    cancelButtonText: `No, Not yet`,
                    allowOutsideClick: () => !Swal.isLoading(),
                    preConfirm: () => {
                      return postCaseMessage({ _id: data._id })
                        .then((res) => {
                          // props.updateScreen();
                          return res;
                        })
                        .catch((res) => {
                          console.log(res);
                        });
                    },
                  }).then((result) => {
                    if (result.isConfirmed) {
                      props.updateScreen(props.patientData.view);
                      Swal.fire("Message Sent Successfully", "", "success");
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      props.reopenModal();
                    }
                  });
                }}
              />
            )}
            <Button
              primary
              label="release"
              onClick={() => {
                props.close();
                MySwal.fire({
                  title: "Release Patient from Quarantine?",
                  showCancelButton: true,
                  confirmButtonText: `Yes`,
                  showLoaderOnConfirm: true,
                  cancelButtonText: `No`,
                  allowOutsideClick: () => !Swal.isLoading(),
                  preConfirm: () => {
                    return releasePatient(data._id)
                      .then((res) => {
                        if (res.message) {
                          Swal.fire(
                            "Patient has been notified",
                            "",
                            "success"
                          ).then(() => {
                            props.updateScreen(data.view);
                          });
                        } else if (res.err) {
                          Swal.fire(res.err, "", "info").then(() => {
                            props.updateScreen(data.view);
                          });
                        } else {
                          console.log(res);
                          Swal.fire(
                            "Patient not found",
                            "Could not find patient with given id.",
                            "error"
                          );
                        }
                      })
                      .catch(() => {
                        Swal.fire(
                          "Connection error!",
                          "Please make sure you are connected to the internet.",
                          "error"
                        );
                      });
                  },
                });
              }}
            />
          </CardFooter>
        </Box>
      </Box>
    </Card>
  );
}
