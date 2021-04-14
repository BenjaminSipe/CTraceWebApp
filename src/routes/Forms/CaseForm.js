import "../../App.css";
import React, { Component } from "react";
import { GrAdd } from "react-icons/gr";
import {
  CheckBoxGroup,
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
    return this.state.value.contacts[index][name];
  };
  setProp = (index, name, pvalue) => {
    var value = { ...this.state.value };
    value.contacts[index][name] = pvalue;
    this.setState({ value });
  };
  deleteContact = (index) => {
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
  }
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      addSymptom: "",
      symptomOptions: [
        "Fever or chills",
        "Cough",
        "Shortness of breath or difficulty breathing",
        "Fatigue",
        "Muscle or body aches",
        "Headache",
        "New loss of taste or smell",
        "Sore throat",
        "Congestion or runny nose",
        "Nausea or vomiting",
        "Diarrhea",
      ],
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
      <div>
        <Heading alignSelf="start">C-Trace</Heading>
        <h2>COVID19 Positive Form</h2>
        <Form
          value={value}
          onChange={(nextValue) => {
            this.setState({ value: nextValue });
          }}
          onReset={() => {
            this.setState({
              addSymptom: "",
              symptomOptions: [
                "Fever or chills",
                "Cough",
                "Shortness of breath or difficulty breathing",
                "Fatigue",
                "Muscle or body aches",
                "Headache",
                "New loss of taste or smell",
                "Sore throat",
                "Congestion or runny nose",
                "Nausea or vomiting",
                "Diarrhea",
              ],
              value: {
                name: "Ben Sipe",
                address: "3533 Newcastle Ct.",
                email: "benjaminSipe@cofo.edu",
                dob: "03/15/1999",
                phone: "(111) 111-1111",
                quarantineLocation: "Campus",
                contacts: [
                  {
                    name: "Benjamin Sipe",
                    doc: "03/15/1999",
                    info: "(222) 222-2222",
                    type: "Phone",
                  },
                ],
                dot: "03/15/1999",
                doso: "03/15/1999",
                symptoms: [
                  "Cough",
                  "Muscle or body aches",
                  "Nausea or vomiting",
                ],
              },
              // value: {
              //   name: "",
              //   address: "",
              //   email: "",
              //   dob: "",
              //   dot: "",
              //   doso: "",
              //   phone: "",
              //   quarantineLocation: "",
              //   contacts: [
              //     {
              //       name: "",
              //       doc: "",
              //       info: "",
              //       type: "Phone",
              //     },
              //   ],
              //   symptoms: [],
              // },
            });
          }}
          onSubmit={({ value }) => {
            console.log(value);
            axios
              .post("http://localhost:3000/api/case", value)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              })
              .then(() => {
                this.setState({ redirect: true });
              });
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
              id="symptoms-input"
              name="contacts"
              value={value.symptoms}
              options={this.state.symptomOptions}
              onChange={(e) => {
                var symptoms = e.value;
                var value = { ...this.state.value, symptoms };
                this.setState({ value });
              }}
            />

            <Box direction="row">
              <Button
                onClick={() => {
                  if (this.state.addSymptom !== "") {
                    this.state.value.symptoms.push(this.state.addSymptom);
                    this.setState({
                      symptomOptions: [
                        ...this.state.symptomOptions,
                        this.state.addSymptom,
                      ],
                    });

                    this.setState({ addSymptom: "" });
                  }
                }}
              >
                <Box
                  justify="center"
                  align="center"
                  width="xxsmall"
                  height="xxsmall"
                >
                  <GrAdd />
                </Box>
              </Button>
              <TextInput
                value={this.state.addSymptom}
                placeholder="other"
                onChange={(event) =>
                  this.setState({
                    addSymptom: event.target.value,
                  })
                }
              ></TextInput>
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
      </div>
    );
  }
}

export default CaseForm;
