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

import axios from "axios";
import dateMask from "../../scripts/MaskDate";

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: props.query.get("name") || "",
        address: props.query.get("address") || "",
        email: props.query.get("email") || "",
        dob: props.query.get("dob") || "",
        doc: props.query.get("doc") || "",
        phone: props.query.get("phone") || "",
      },
    };
  }
  render() {
    const { value } = this.state;
    return (
      <Grommet>
        <Form
          value={value}
          onChange={(nextValue) => {
            this.setState({ value: nextValue });
          }}
          onReset={() => this.setState({ value: {} })}
          onSubmit={({ value }) => {
            axios
              .post("http://localhost:3000/api/case", value)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              })
              .then(function () {
                // always executed
              });
          }}
        >
          <FormField name="name" htmlFor="textinput-name" label="Name">
            <TextInput
              id="textinput-name"
              name="name"
              placeholder="John Doe"
              required
            />
          </FormField>
          <FormField name="address" htmlFor="textinput-address" label="Address">
            <TextInput
              required
              id="textinput-address"
              name="address"
              placeholder="1 MyStreet Road, MyTown MO 00000"
            />
          </FormField>
          <FormField
            name="quarantineLocation"
            htmlFor="textinput-address"
            label="quarantineLocation"
          >
            <TextInput
              required
              id="textinput-address"
              name="quarantineLocation"
              placeholder="1 MyStreet Road, MyTown MO 00000"
            />
          </FormField>
          <FormField name="email" htmlFor="textinput-email" label="email">
            <TextInput
              required
              id="textinput-email"
              name="email"
              placeholder="example@email.com"
            />
          </FormField>
          <FormField name="dob" htmlFor="textinput-dob" label="Date of Birth">
            <MaskedInput
              error={true}
              required
              id="textinput-dob"
              name="dob"
              mask={dateMask(value.dob)}
              value={value.dob}
              // onKeyUp={(e) => console.log(e.keyCode)}
            />
          </FormField>
          <FormField
            name="doc"
            htmlFor="textinput-doc"
            label="Date of Close Contact"
          >
            <MaskedInput
              required
              id="textinput-doc"
              name="doc"
              mask={dateMask(value.doc)}
              value={value.doc}
            />
          </FormField>
          <FormField
            name="phone"
            htmlFor="textinput-phone"
            label="Phone Number"
          >
            <MaskedInput
              required
              id="textinput-phone"
              name="phone"
              mask={[
                { fixed: "(" },
                {
                  length: 3,
                  regexp: /^[0-9]{1,3}$/,
                  placeholder: "xxx",
                },
                { fixed: ")" },
                { fixed: " " },
                {
                  length: 3,
                  regexp: /^[0-9]{1,3}$/,
                  placeholder: "xxx",
                },
                { fixed: "-" },
                {
                  length: 4,
                  regexp: /^[0-9]{1,4}$/,
                  placeholder: "xxxx",
                },
              ]}
              value={value.phone}
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

export default ContactForm;
