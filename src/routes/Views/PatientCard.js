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
  Tip,
} from "grommet";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Badge from "@material-ui/core/Badge";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00773e",
    },
    secondary: {
      main: "#fcc107",
    },
    error: {
      main: "#cc0000",
    },
  },
});
export default function PatientCard(props) {
  // const classes = useStyles();
  const { name, _id, doc, dot, status, doso, address, form } = props.data;
  const errorType = () => {
    if (status === "Recovered" || status === "Past") return [];
    if (form) {
      return ["error", "Form not sent!"];
    }
    if (hasError() || !address) {
      var d = new Date();

      var x;
      switch (status) {
        case "Exposed":
          x = new Date(doc);
          break;
        case "Positive":
          if (doso) {
            x = new Date(doso);
          } else {
            x = new Date(dot);
          }
          break;
        default:
          break;
      }
      x.setDate(x.getDate() + 14);
      // d = today
      // x == when their quarantine ends.
      // if today is after thier warantine ends
      if (d.getTime() > x.getTime()) {
        return ["error", "Past Release Date!"];
      } else {
        //if today is before their quarantine ends,
        // but they are within 2 days.
        x.setDate(x.getDate() - 2);
        if (d.getTime() > x.getTime()) {
          return ["secondary", "Nearing Release Date"];
        } else {
          return ["primary", "Form Sent"];
        }
      }
    } else {
      return ["primary", "Form Sent"];
    }
  };
  const hasError = () => {
    if (status === "Past" || status === "Recoverd") return false;
    var now = new Date();
    now.setDate(now.getDate() - 12);
    if (address && !form) {
      if (status === "Exposed") {
        return now.getTime() > new Date(doc).getTime();
      } else {
        if (status === "Positive") {
          if (dot) {
            return now.getTime() > new Date(dot).getTime();
          } else {
            if (doso) {
              return now.getTime() > new Date(doso).getTime();
            } else {
              return true;
            }
          }
        }
      }
    } else {
      return true;
    }
  };
  var formatName =
    name.split(" ").length > 1
      ? name.split(" ")[name.split(" ").length - 1] + ", " + name.split(" ")[0]
      : name;
  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={() => props.openModal(props.data)}
        style={{ borderRadius: "12px" }}
      >
        <Card background="light-2" height="190px" elevation="xlarge">
          {name && _id ? (
            <CardBody style={{ paddingTop: "15px" }} align="center">
              <Badge
                overlap="circle"
                badgeContent={
                  <Tip
                    plain
                    content={
                      <Box
                        pad="small"
                        gap="small"
                        // width={{ max: "small" }}
                        round="small"
                        background="background-front"
                        responsive={false}
                      >
                        {errorType()[1]}
                      </Box>
                    }
                    dropProps={{ align: { right: "left", bottom: "top" } }}
                  >
                    &nbsp;!&nbsp;
                  </Tip>
                }
                color={errorType()[0]}
                invisible={!hasError()}
              >
                <Box height="80px" width="80px">
                  <Avatar fill background={props.data.cardColor}>
                    <Text size="xlarge">
                      {name.split(" ").length > 1
                        ? name.split(" ")[0][0] + name.split(" ")[1][0]
                        : name[0]}
                    </Text>
                  </Avatar>
                </Box>
              </Badge>
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
              {dot ? (
                <Text color="gray">{props.formatDate(new Date(dot))}</Text>
              ) : doc ? (
                <Text color="gray">{props.formatDate(new Date(doc))}</Text>
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
    </ThemeProvider>
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
