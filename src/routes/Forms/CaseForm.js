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
  Heading,
} from "grommet";
import { Redirect } from "react-router-dom";
// import axios from "axios";
import {
  dateMask,
  phoneNumberMask,
  nameMask,
  emailMask,
  validationMasks,
} from "../../scripts/InputMasks";
import ContactInput from "./ContactInput";

class CaseForm extends Component {
  propertyCallback = (pvalue, index, name) => {
    var value = { ...this.state.value };
    if (name === "email") {
      delete value.contacts[index].phone;
    }
    if (name === "phone") {
      delete value.contacts[index].email;
    }
    value.contacts[index][name] = pvalue;
    this.setState({ value });
  };

  getContacts = async () => {
    var contactInputs = await this.state.value.contacts.map((item, index) => {
      return (
        <ContactInput
          key={"contacts" + index}
          index={index}
          inputCallback={this.propertyCallback}
        />
      );
    });
    contactInputs.push(
      <Button
        key="addContact"
        label="PushMe to add a another contact"
        onClick={() => {
          var value = { ...this.state.value };
          value.contacts.push({ name: "" });
          this.setState({ value });
          this.getContacts();
        }}
      ></Button>
    );
    this.setState({ contactInputs });
  };

  componentDidMount() {
    this.getContacts();
    // console.log(this.state.value.contactInputs);
  }
  constructor(props) {
    super(props);

    // componentDidMount() {
    //   this.contacts();
    // }

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
        contacts: [{ name: "" }],
      },
    };
  }
  render() {
    const { value } = this.state;
    if (this.state.redirect) {
      return <Redirect to="/postform" />;
    }
    return (
      <Grommet>
        <Heading alignSelf="start">C-Trace</Heading>
        <h2>COVID19 Positive Form</h2>
        <Form
          value={value}
          onChange={(nextValue) => {
            this.setState({ value: nextValue });
          }}
          onReset={() =>
            this.setState({
              value: {
                name: "",
                address: "",
                email: "",
                dob: "",
                doc: "",
                phone: "",
                quarantineLocation: "",
                contacts: [{ name: "" }],
              },
            })
          }
          onSubmit={({ value }) => {
            console.log(value);
            // axios
            //   .post("http://localhost:3000/api/case", value)
            //   .then(function (response) {
            //     console.log(response);
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   })
            //   .then(function () {
            //     this.setState({redirect:true});
            //   });
          }}
        >
          <FormField
            name="name"
            htmlFor="textinput-name"
            label="Full Name"
            required
            validate={validationMasks.name}
          >
            <MaskedInput
              id="textinput-name"
              name="name"
              mask={nameMask()}
              value={value.name}
            />
          </FormField>
          <FormField
            required
            name="address"
            htmlFor="textinput-address"
            label="Address"
          >
            <TextInput
              id="textinput-address"
              name="address"
              placeholder="1 MyStreet Road, MyTown MO 00000"
            />
          </FormField>
          <FormField
            required
            name="quarantineLocation"
            htmlFor="textinput-address"
            label="quarantineLocation"
          >
            <TextInput
              id="textinput-address"
              name="quarantineLocation"
              placeholder="1 MyStreet Road, MyTown MO 00000"
            />
          </FormField>
          <FormField
            name="email"
            htmlFor="textinput-email"
            label="email"
            required
            validate={validationMasks.email}
          >
            <MaskedInput
              id="textinput-email"
              name="email"
              placeholder="example@email.com"
              mask={emailMask()}
              value={value.email}
            />
          </FormField>
          <FormField
            name="dob"
            htmlFor="textinput-dob"
            label="Date of Birth"
            required
            validate={validationMasks.date}
          >
            <MaskedInput
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
            required
            validate={validationMasks.date}
          >
            <MaskedInput
              // required
              id="textinput-doc"
              name="doc"
              mask={dateMask(value.doc)}
              value={value.doc}
            />
          </FormField>
          <FormField
            required
            validate={validationMasks.phone}
            name="phone"
            htmlFor="textinput-phone"
            label="Phone Number"
          >
            <MaskedInput
              id="textinput-phone"
              name="phone"
              mask={phoneNumberMask()}
              value={value.phone}
            />
          </FormField>
          <Box
            background="light-1"
            style={{ padding: "15px", borderRadius: "10px" }}
          >
            {this.state.contactInputs}
          </Box>
          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" />
            <Button type="reset" label="Reset" />
          </Box>
        </Form>
      </Grommet>
    );
  }
}

export default CaseForm;
