import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  CardBody,
  Text,
  Grid,
} from "grommet";

export default function PatientModalCardBody(props) {
  const data = props.patientData;
  return (
    <Card
      style={{ padding: "10px" }}
      width="medium"
      height="300px"
      background="light-1"
    >
      <CardHeader>{data.name}</CardHeader>
      <CardBody style={{ paddingTop: "6px" }} align="center">
        <Grid style={{ count: "fit" }}>
          {Object.keys(data)
            .filter((value) => typeof data[value] !== "object")
            .map((key) => {
              return (
                <Text key={key}>
                  {key}:{data[key]}
                </Text>
              );
            })}
        </Grid>
      </CardBody>

      <CardFooter>
        <Button label="close" onClick={props.close} />
      </CardFooter>
    </Card>
  );
}
