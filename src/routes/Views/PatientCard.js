import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Avatar,
  Paragraph,
} from "grommet";

export default function PatientCard() {
  return (
    <Card background="light-1" fill>
      <CardHeader pad="small" background="light-5">
        Benjamin Sipe
      </CardHeader>
      <CardBody pad="medium">This is where the info goes</CardBody>
      <CardFooter
        justify="start"
        pad={{ vertical: "small", horizontal: "small" }}
        background="light-2"
      >
        <Button hoverIndicator primary color="brand" label="View/Edit"></Button>
      </CardFooter>
    </Card>
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
