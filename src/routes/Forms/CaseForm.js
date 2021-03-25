// import logo from './logo.svg';
import "../../App.css";
import React, { Component } from "react";
import {
  Grommet,
  MaskedInput,
  TextInput,
  Form,
  FormField,
  Box,
  Button,
} from "grommet";
import dateMask from "../../scripts/MaskDate";

class CaseForm extends Component {
  state = { dob: "" };
  render() {
    const { dob } = this.state;
    return (
      <Grommet>
        <Form onSubmit={({ name }) => {}}>
          <FormField name="name" htmlFor="textinput-name" label="Name">
            <TextInput id="textinput-name" name="name" />
          </FormField>
          <FormField name="address" htmlFor="textinput-address" label="Address">
            <TextInput id="textinput-address" name="address" />
          </FormField>
          <FormField
            name="quarantineLocation"
            htmlFor="textinput-address"
            label="quarantineLocation"
          >
            <TextInput id="textinput-address" name="quarantineLocation" />
          </FormField>
          <FormField name="email" htmlFor="textinput-email" label="email">
            <TextInput id="textinput-email" name="email" />
          </FormField>
          <FormField name="email" htmlFor="textinput-email" label="email">
            <TextInput id="textinput-email" name="email" />
          </FormField>
          <FormField name="dob" htmlFor="textinput-dob" label="Date of Birth">
            <MaskedInput
              id="textinput-dob"
              name="dob"
              mask={dateMask(dob)}
              value={dob}
              onChange={(event) => this.setState({ dob: event.target.value })}
            />
          </FormField>

          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" />
            <Button type="reset" label="Reset" />
          </Box>
        </Form>
      </Grommet>
    );
  }
}

// {
//   "name": "Eli Tobin",
//   "address": "100 Opportunity Ave. Point Lookout Mo, 65726",
//   "dob": "02/17/1999",
//   "quarantineLocation": "On Campus",
//   "email": "213312@student.cofo.edu",
//   "phone": "(417) 337-2836",
//   "doc": "2/3/2021"
// }

export default CaseForm;
