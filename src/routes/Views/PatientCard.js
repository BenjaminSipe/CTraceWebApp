import {
  Card,
  // CardHeader,
  CardBody,
  CardFooter,
  Button,
  Avatar,
  // Paragraph,
  Text,
  Box,
} from "grommet";

// import LineItem from "./LineItem";

export default function PatientCard(props) {
  const { name, _id, doc, dot } = props.data;
  var formatName =
    name.split(" ").length > 1
      ? name.split(" ")[name.split(" ").length - 1] + ", " + name.split(" ")[0]
      : name;
  return (
    <Button
      onClick={() => props.openModal(props.data)}
      style={{ borderRadius: "12px" }}
    >
      <Card background="light-2" height="190px" elevation="xlarge">
        {name && _id ? (
          <CardBody style={{ paddingTop: "15px" }} align="center">
            <Box height="80px" width="80px">
              <Avatar fill background={props.data.cardColor}>
                <Text size="xlarge">
                  {name.split(" ").length > 1
                    ? name.split(" ")[0][0] + name.split(" ")[1][0]
                    : name[0]}
                </Text>
              </Avatar>
            </Box>
            <Text
              style={{
                height: "20px",
                paddingTop: "12px",
                paddingBottom: "5px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              textAlign="center"
            >
              {formatName}
            </Text>
            {doc ? (
              <Text color="gray">{props.formatDate(new Date(doc))}</Text>
            ) : (
              ""
            )}
            {dot ? (
              <Text color="gray">{props.formatDate(new Date(dot))}</Text>
            ) : (
              ""
            )}
          </CardBody>
        ) : (
          <CardBody justify="center">
            <Text textAlign="center" color="status-critical">
              error, missing data
            </Text>
          </CardBody>
        )}
        <CardFooter background="accent-2" height="32px" justify="center">
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
