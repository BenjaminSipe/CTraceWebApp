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
import { postCase } from "../../scripts/API";
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
    return this.state.contacts[index][name];
  };
  setProp = (index, name, pvalue) => {
    const contacts = this.state.contacts;
    contacts[index][name] = pvalue;
    this.setState({ contacts });
  };
  deleteContact = (index) => {
    // var value = { ...this.state.value };
    this.state.contacts.splice(index, 1);
    // this.setState({ value });
    this.getContacts();
  };

  getContacts = async () => {
    var contactInputs = await this.state.contacts.map((item, index) => {
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
          {index !== this.state.contacts.length - 1 ? (
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
        label="Add People you have been exposed to."
        onClick={() => {
          this.state.contacts.push({
            name: "",
            doc: "",
            info: "",
            type: "Phone",
          });
          // this.setState({ value });
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
      name: props.query.get("name") || "",
      address: props.query.get("address") || "",
      email: props.query.get("email") || "",
      dob: props.query.get("dob") || "",
      phone: props.query.get("phone") || "",
      quarantineLocation: "",
      contacts: [],
      dot: props.query.get("dot") || "",
      doso: props.query.get("doso") || "",
      symptoms: [],
    };
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/postform" />;
    }
    return (
      <div>
        <Heading alignSelf="start">C-Trace</Heading>
        <h2>COVID19 Positive Form</h2>
        <Form
          onReset={() => {
            this.setState({
              addSymptom: "",
              symptomOptions: [
                "Congestion or runny nose",
                "Cough",
                "Diarrhea",
                "Fatigue",
                "Fever or chills",
                "Headache",
                "Muscle or body aches",
                "Nausea or vomiting",
                "New loss of taste or smell",
                "Shortness of breath or difficulty breathing",
                "Sore throat",
              ],
              name: "",
              address: "",
              email: "",
              dob: "",
              dot: "",
              doso: "",
              phone: "",
              quarantineLocation: "",
              contacts: [],
              symptoms: [],
            });
          }}
          onSubmit={() => {
            const {
              name,
              address,
              email,
              dob,
              dot,
              doso,
              phone,
              quarantineLocation,
              contacts,
              symptoms,
            } = this.state;
            postCase({
              name,
              address,
              email,
              dob,
              dot,
              doso,
              phone,
              quarantineLocation,
              contacts,
              symptoms,
            }).then(() => {
              this.setState({ redirect: true });
            });
          }}
        >
          <FormField //name
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
              value={this.state.name}
              onChange={(event) => {
                this.setState({ name: event.target.value });
              }}
            />
          </FormField>
          <FormField //email
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
              value={this.state.email}
              onChange={(event) => {
                this.setState({ email: event.target.value });
              }}
            />
          </FormField>
          <FormField //phone
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
              value={this.state.phone}
              onChange={(event) => {
                this.setState({ phone: event.target.value });
              }}
            />
          </FormField>
          <FormField //address
            required
            name="address"
            htmlFor="textinput-address"
            label="Address"
          >
            <TextInput
              id="textinput-address"
              name="address"
              placeholder="1 MyStreet Road, MyTown MO 00000"
              value={this.state.address}
              onChange={(event) => {
                this.setState({ address: event.target.value });
              }}
            />
          </FormField>
          <FormField // qlocation
            required
            name="quarantineLocation"
            htmlFor="textinput-address"
            label="Quarentine Location"
          >
            <TextInput
              id="textinput-address"
              name="quarantineLocation"
              placeholder="Campus or Home"
              value={this.state.quarantineLocation}
              onChange={(event) => {
                this.setState({ quarantineLocation: event.target.value });
              }}
            />
          </FormField>
          <FormField //dob
            name="dob"
            htmlFor="textinput-dob"
            label="Date of Birth"
            required
            validate={validationMasks.date}
          >
            <MaskedInput
              id="textinput-dob"
              name="dob"
              mask={dateMask(this.state.dob)}
              value={this.state.dob}
              onChange={(event) => {
                this.setState({ dob: event.target.value });
              }}
            />
          </FormField>
          <FormField //dot
            name="dot"
            htmlFor="textinput-dot"
            label="Date of Covid Test, leave blank for no test."
            validate={validationMasks.optDate}
          >
            <MaskedInput
              id="textinput-dot"
              name="dot"
              mask={optDateMask(this.state.dot)}
              value={this.state.dot}
              onChange={(event) => {
                this.setState({ dot: event.target.value });
              }}
            />
          </FormField>
          <FormField //doso
            name="doso"
            htmlFor="textinput-doso"
            label="Date of Symptom Onset."
            validate={validationMasks.optDate}
          >
            <MaskedInput
              id="textinput-doso"
              name="doso"
              mask={optDateMask(this.state.doso)}
              value={this.state.doso}
              onChange={(event) => {
                this.setState({ doso: event.target.value });
              }}
            />
          </FormField>
          {this.state.doso.length > 0 && (
            <FormField
              name="symptoms"
              htmlFor="symptoms-input"
              label="Symptoms"
            >
              <CheckBoxGroup
                id="symptoms-input"
                name="contacts"
                value={this.state.symptoms}
                options={this.state.symptomOptions}
                onChange={(e) => {
                  this.setState({ symptoms: e.value });
                }}
              />

              <Box direction="row">
                <Button
                  onClick={() => {
                    if (this.state.addSymptom !== "") {
                      this.state.symptoms.push(this.state.addSymptom);
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
          )}
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
