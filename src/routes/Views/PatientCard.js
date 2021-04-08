import {
  Card,
  // CardHeader,
  CardBody,
  CardFooter,
  Button,
  Avatar,
  // Paragraph,
  Text,
  // Box,
} from "grommet";
// import LineItem from "./LineItem";

export default function PatientCard(props) {
  const { name, _id, dob } = props.data;
  return (
    <Button style={{ borderRadius: "12px" }}>
      <Card background="light-1" height="220px">
        {name && _id ? (
          <CardBody style={{ paddingTop: "6px" }} align="center">
            <Avatar size="xlarge" background="neutral-1">
              {name.split(" ").length > 1
                ? name.split(" ")[0][0] + name.split(" ")[1][0]
                : name[0]}
            </Avatar>
            <Text style={{ paddingTop: "12px" }} textAlign="center">
              <Text>{name}</Text>
              <br />
              {dob ? <Text color="gray">{dob}</Text> : ""}
            </Text>
          </CardBody>
        ) : (
          <CardBody justify="center">
            <Text textAlign="center" color="status-critical">
              error, missing data
            </Text>
          </CardBody>
        )}
        <CardFooter background="brand" height="32px" justify="center">
          Details
        </CardFooter>
      </Card>
    </Button>
  );
}

/*
{
    "_id": "60429b2c6bf78639372b37d0",
    "name": "Benjamin Sipe", --This one
    "address": "3533 Newcastle Ct. Highridge Mo, 63049",
    "dob": "03/15/1999",
    "quatantineLocation": "At Home", --This one
    "email": "209634@student.cofo.edu",
    "phone": "(314) 561-2361",
    "doc": "03/03/2021" --This one
    POSSIBLY Quarentine End?
}
*/
