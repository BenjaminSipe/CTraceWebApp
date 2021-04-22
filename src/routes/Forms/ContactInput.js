import {
  Grid,
  FormField,
  RadioButtonGroup,
  MaskedInput,
  Button,
  Box,
} from "grommet";

import { GrClose } from "react-icons/gr";
import React from "react";
import { nameMask, dateMask, phoneOrEmailMask } from "../../scripts/InputMasks";
export default function ContactInput(props) {
  let [index] = React.useState(props.index);
  let [x, setX] = React.useState(true);

  return (
    <Box
      round="small"
      style={{ marginBottom: "5px" }}
      background={index % 2 === 0 ? "light-1.5" : "light-3.5"}
    >
      <Grid
        fill
        rows={["flex", "flex", "flex"]}
        columns={["flex", "xsmall"]}
        gap={{ row: "small", column: 0 }}
        justify="start"
        areas={[
          { name: "first", start: [0, 0], end: [1, 0] },
          { name: "second", start: [0, 1], end: [0, 1] },
          { name: "selector", start: [1, 1], end: [1, 1] },
          { name: "third", start: [0, 2], end: [1, 2] },
          { name: "close", start: [1, 0], end: [1, 0] },
        ]}
      >
        <FormField
          gridArea="first"
          name={"Contact-name-" + index}
          htmlFor={"textinput-contacts-" + index}
          label={"Close Contact Info " + (index + 1)}
        >
          <MaskedInput
            mask={nameMask()}
            id={"textinput-contacts-" + index}
            placeholder="Full name"
            value={props.callbacks.getProp(index, "name")}
            onChange={(event) => {
              setX(!x);
              props.callbacks.setProp(index, "name", event.target.value);
            }}
          />
        </FormField>
        <Box gridArea="close" fill>
          <Button
            alignSelf="end"
            onClick={() => props.callbacks.deleteContact(index)}
            icon={<GrClose />}
          />
        </Box>
        <FormField
          fill
          background="light-2.5"
          gridArea="second"
          name={"Contact-info-" + index}
          htmlFor={"textinput-contactinfo-" + index}
          label={props.callbacks.getProp(index, "type")}
        >
          <MaskedInput
            mask={phoneOrEmailMask(
              props.callbacks.getProp(index, "type").toLowerCase()
            )}
            size="small"
            id={"textinput-contactinfo-" + index}
            name={"info-" + index}
            value={props.callbacks.getProp(index, "info")}
            placeholder={
              props.callbacks.getProp(index, "type") === "Phone"
                ? "(000) 000-0000"
                : "example@example.com"
            }
            onChange={(event) => {
              props.callbacks.setProp(index, "info", event.target.value);
              setX(!x);
            }}
          />
        </FormField>
        <RadioButtonGroup
          fill
          background="light-2.5"
          style={{ padding: "10px" }}
          gridArea="selector"
          id={"selector-" + index}
          name={"selector-" + index}
          options={["Email", "Phone"]}
          value={props.callbacks.getProp(index, "type")}
          onChange={(event) => {
            props.callbacks.setProp(index, "info", "");
            props.callbacks.setProp(index, "type", event.target.value);
            setX(!x);
          }}
        />
        <FormField
          gridArea="third"
          name={"contactdoc-" + index}
          htmlFor={"textinput-contactdoc-" + index}
          label="Date of Contact"
        >
          <MaskedInput
            id={"textinput-contactdoc-" + index}
            name={"contactDoc-" + index}
            mask={dateMask(props.callbacks.getProp(index, "doc"))}
            value={props.callbacks.getProp(index, "doc")}
            onChange={(event) => {
              props.callbacks.setProp(index, "doc", event.target.value);
              setX(!x);
            }}
          />
        </FormField>
      </Grid>
    </Box>
  );
}
