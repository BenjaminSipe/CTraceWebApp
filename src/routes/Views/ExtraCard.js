import { Card, CardBody, CardFooter, Button, Avatar, Text, Box } from "grommet";

import { GrAdd } from "react-icons/gr";
// import LineItem from "./LineItem";

export default function ExtraCard(props) {
  switch (props.data?.view) {
    case "Active Cases":
      return (
        <Button
          onClick={() => props.openModal(props.data)}
          style={{ borderRadius: "12px" }}
        >
          <Card
            background="light-2"
            justify="center"
            align="center"
            height="190px"
            elevation="xlarge"
          >
            <GrAdd size="40px" height="100%" />
            Add Positive
          </Card>
        </Button>
      );
    case "Exposed":
      return (
        <Button
          onClick={() => props.openModal(props.data)}
          style={{ borderRadius: "12px" }}
        >
          <Card
            background="light-2"
            justify="center"
            align="center"
            height="190px"
            elevation="xlarge"
          >
            <GrAdd size="40px" height="100%" />
            <Text align="center"> Add Exposure</Text>
          </Card>
        </Button>
      );
    default:
      return "";
  }
}
