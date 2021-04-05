import "../../App.css";
import React, { Component } from "react";
import { GrAdd } from "react-icons/gr";
import {
  CheckBoxGroup,
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
  optDateMask,
  dateMask,
  phoneNumberMask,
  nameMask,
  emailMask,
  validationMasks,
} from "../../scripts/InputMasks";
import ContactInput from "./ContactInput";

class CaseForm extends Component {
  getProp = (index, name) => {
    // console.log(index, name);
    return this.state.value.contacts[index][name];
  };
  setProp = (index, name, pvalue) => {
    var value = { ...this.state.value };
    value.contacts[index][name] = pvalue;
    this.setState({ value });
    // console.log(value);
  };
  deleteContact = (index) => {
    console.log(index);
    var value = { ...this.state.value };
    value.contacts.splice(index, 1);
    this.setState({ value });
    this.getContacts();
  };

  getContacts = async () => {
    var contactInputs = await this.state.value.contacts.map((item, index) => {
      return (
        <Box key={"contacts" + index}>
          <ContactInput
            callbacks={{
              deleteContact: this.deleteContact,
              getProp: this.getProp,
              setProp: this.setProp,
            }}
            index={index}
          />
          {index !== this.state.value.contacts.length - 1 ? (
            <Box background="gray" width="100%" height="1px"></Box>
          ) : (
            ""
          )}
        </Box>
      );
    });

    contactInputs.push(
      <Button
        alignSelf="center"
        key="addContact"
        icon={<GrAdd />}
        onClick={() => {
          var value = { ...this.state.value };
          value.contacts.push({ name: "", doc: "", info: "", type: "Phone" });
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
        phone: props.query.get("phone") || "",
        quarantineLocation: "",
        contacts: [{ name: "", doc: "", info: "", type: "Phone" }],
        dot: "",
        doso: "",
        symptoms: [],
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
          onReset={() => {
            this.setState({
              value: {
                name: "",
                address: "",
                email: "",
                dob: "",
                dot: "",
                doso: "",
                phone: "",
                quarantineLocation: "",
                contacts: [
                  {
                    name: "",
                    doc: "",
                    info: "",
                    type: "Phone",
                  },
                ],

                symptoms: [],
              },
            });
          }}
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
              autoFocus
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
            label="Quarentine Location"
          >
            <TextInput
              id="textinput-address"
              name="quarantineLocation"
              placeholder="Campus or Home"
            />
          </FormField>
          <FormField
            name="email"
            htmlFor="textinput-email"
            label="Email"
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
            name="dot"
            htmlFor="textinput-dot"
            label="Date of Covid Test, leave blank for no test."
            validate={validationMasks.optDate}
          >
            <MaskedInput
              id="textinput-dot"
              name="dot"
              mask={optDateMask(value.dot)}
              value={value.dot}
            />
          </FormField>
          <FormField name="symptoms" htmlFor="symptoms-input" label="Symptoms">
            <CheckBoxGroup
              labelKey="item"
              id="symptoms-input"
              name="contacts"
              value={value.symptoms}
              options={[
                { item: "Maui", value: "Maui" },
                { item: "Kauai", value: "Kauai" },
                { item: "Oahu", value: "Oahu" },
                { item: "test", value: "Test" },
              ]}
              onChange={(e) => {
                console.log(e.value);
                var symptoms = e.value;
                var value = { ...this.state.value, symptoms };
                this.setState({ value });
                console.log(this.state.value);
              }}
            />
            <Box direction="row">
              <Button margin="xsmall">
                <GrAdd />
              </Button>
              <TextInput placeholder="other"></TextInput>
            </Box>
          </FormField>
          <FormField
            name="doso"
            htmlFor="textinput-doso"
            label="Date of Symptom Onset."
            validate={validationMasks.optDate}
          >
            <MaskedInput
              id="textinput-doso"
              name="doso"
              mask={optDateMask(value.doso)}
              value={value.doso}
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
            style={{
              alignSelf: "end",
              padding: "15px",
              borderRadius: "10px",
            }}
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
