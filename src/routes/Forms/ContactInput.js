import { Grid, FormField, TextInput, RadioButtonGroup } from "grommet";
import React from "react";
// import {
//   phoneNumberMask,
//   nameMask,
//   emailMask,
//   validationMasks,
// } from "../../scripts/InputMasks";
export default function ContactInput(props) {
  let index = props.index;
  const [value, setValue] = React.useState("Phone");
  const [contactName, setName] = React.useState("");
  const [info, setInfo] = React.useState("");
  var len = [0, 0];
  return (
    <Grid
      fill
      rows={["xsmall", "flex"]}
      columns={["small", "xsmall"]}
      gap="small"
      areas={[
        { name: "first", start: [0, 0], end: [1, 0] },
        { name: "second", start: [0, 1], end: [0, 1] },
        { name: "selector", start: [1, 1], end: [1, 1] },
      ]}
    >
      <FormField
        gridArea="first"
        name={"Contact-name-" + index}
        htmlFor={"textinput-contacts-" + index}
        label={"Close Contact Info " + (index + 1)}
      >
        <TextInput
          id={"textinput-contacts-" + index}
          placeholder="Full name"
          name="contactName"
          value={contactName}
          onChange={(event) => {
            setName(event.target.value);
            props.inputCallback(event.target.value, index, "name");
          }}
        />
      </FormField>
      <FormField
        validate={(p, Value) => {
          console.log(Value);
          if (!Value.contacts[index][value.toLowerCase()]) {
            len[0] = 0;
            return true;
          } else {
            len[0] = 1;
            return { message: "Invalid Phone number", status: "error" };
          }
        }}
        gridArea="second"
        name={"Contact-info-" + index}
        htmlFor={"textinput-contactinfo-" + index}
        label={value}
      >
        <TextInput
          size="small"
          id={"textinput-contactinfo-" + index}
          name="info"
          value={info}
          placeholder={
            {
              Phone: "(000) 000-0000",
              Email: "example@example.com",
            }[value]
          }
          onChange={(event) => {
            setInfo(event.target.value);
            props.inputCallback(event.target.value, index, value.toLowerCase());
          }}
        />
      </FormField>
      <RadioButtonGroup
        style={{ padding: "10px" }}
        gridArea="selector"
        name="selector"
        options={["Email", "Phone"]}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </Grid>
  );
}
