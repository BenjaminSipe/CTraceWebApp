// import logo from './logo.svg';
import "../../App.css";
import React, { Component } from "react";
import {
  MaskedInput,
  TextInput,
  Form,
  FormField,
  Box,
  Button,
  Heading,
} from "grommet";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  dateMask,
  phoneNumberMask,
  nameMask,
  emailMask,
} from "../../scripts/InputMasks";

import { postContact } from "../../scripts/API";

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      value: {
        name: props.query.get("name") || "",
        address: props.query.get("address") || "",
        email: props.query.get("email") || "",
        dob: props.query.get("dob") || "",
        doc: props.query.get("doc") || "",
        phone: props.query.get("phone") || "",
        quarantineLocation: "",
      },
    };
  }
  // this also works with react-router-native

  render() {
    const { value } = this.state;
    if (this.state.redirect) {
      return <Redirect to="/postform" />;
    } else {
      return (
        <div>
          <Heading alignSelf="start">C-Trace</Heading>
          <h2>Close Contact Form</h2>
          <Form
            value={value}
            onChange={(nextValue) => {
              this.setState({ value: nextValue });
            }}
            onReset={() => {
              this.setState({ value: {} });
            }}
            onSubmit={({ value }) => {
              postContact(value).then(() => {
                this.setState({ redirect: true });
              });
            }}
          >
            <FormField name="name" htmlFor="textinput-name" label="Full Name">
              <MaskedInput
                required
                id="textinput-name"
                name="name"
                mask={nameMask()}
                value={value.name}
              />
            </FormField>
            <FormField
              name="address"
              htmlFor="textinput-address1"
              label="Address"
            >
              <TextInput
                required
                id="textinput-address1"
                name="address"
                placeholder="1 MyStreet Road, MyTown MO 00000"
              />
            </FormField>
            <FormField
              name="quarantineLocation"
              htmlFor="textinput-address2"
              label="quarantineLocation"
            >
              <TextInput
                required
                id="textinput-address2"
                name="quarantineLocation"
                placeholder="Campus or Home"
              />
            </FormField>
            <FormField name="email" htmlFor="textinput-email" label="email">
              <MaskedInput
                required
                id="textinput-email"
                name="email"
                placeholder="example@email.com"
                mask={emailMask()}
                value={value.email}
              />
            </FormField>
            <FormField name="dob" htmlFor="textinput-dob" label="Date of Birth">
              <MaskedInput
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
                mask={phoneNumberMask()}
                value={value.phone}
              />
            </FormField>
            <Box direction="row" gap="medium">
              <Button type="submit" primary label="Submit" />
              <Button type="reset" label="Reset" />
            </Box>
          </Form>
        </div>
      );
    }
  }
}

export default ContactForm;
