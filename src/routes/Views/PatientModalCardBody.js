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

export default function PatientModalCardBody(props) {
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
    if (item[0] === "symptoms") {
      console.log(item[1]);
    }
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
        paddingRight: "10px",
        borderRadius: "15px",
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
              data={Object.entries(data)
                .filter(
                  (item) =>
                    !["_id", "name", "contacts", "cardColor", "form"].includes(
                      item[0]
                    )
                )
                .map((item) => {
                  // This is a weird special case I never figured out why.
                  // Something to do with arrays being passed. I may need to parse the objects I pass around.
                  if (item[0] === "symptoms") {
                    return { name: "Symptoms", val: item[1].join(", ") };
                  }
                  return formats(item);
                })}
            />
          </CardBody>
          <CardFooter justify="end">
            This is where buttons for messaging goes.
          </CardFooter>
        </Box>
      </Box>
    </Card>
  );
}
