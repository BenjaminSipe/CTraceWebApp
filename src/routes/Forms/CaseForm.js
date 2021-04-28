// import "../../App.css";
import Logo from "../../Logo_V2.svg";
import React, { Component } from "react";
import { GrAdd } from "react-icons/gr";
import Swal from "sweetalert2";
import {
  CheckBoxGroup,
  MaskedInput,
  TextInput,
  Form,
  FormField,
  Box,
  Button,
  Heading,
  CardFooter,
  Image,
  Paragraph,
} from "grommet";
// import { Redirect } from "react-router-dom";
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
  colors(value) {
    return [
      "name",
      "email",
      "phone",
      "address",
      "quarantineLocation",
      "dob",
      "dot",
      "doso",
    ]
      .filter((item) => this.decoder(item))
      .indexOf(value) %
      2 ===
      1
      ? "light-1.5"
      : "light-1";
  }
  decoder(value) {
    if (this.state.code) {
      switch (value) {
        case "email":
          return this.state.code % 2 < 1;
        case "phone":
          // console.log(value + (Math.floor(this.state.code / 2) % 2));
          return this.state.code % 4 < 2;
        case "address":
          // console.log(value + (Math.floor(this.state.code / 4) % 2));
          return this.state.code % 8 < 4;
        case "dob":
          // console.log(value + (Math.floor(this.state.code / 8) % 2));
          return this.state.code < 8;
        default:
          return true;
      }
    } else {
      return true;
    }
  }
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
        </Box>
      );
    });

    contactInputs.push(
      <Button
        primary
        color="light-4"
        hoverIndicator
        alignSelf="center"
        key="addContact"
        // style=
        icon={<GrAdd style={{ fontSize: "35px" }} />}
        label="Identify people you have had close contact recently."
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
      code: props.query.get("code") || 0,
      id: props.query.get("id") || "",
      name: "",
      address: {
        street1: "",
        street2: "",
        city: "",
        state: "",
        zip: "",
      },
      email: "",
      dob: "",
      phone: "",
      quarantineLocation: "",
      contacts: [],
      dot: "",
      doso: "",
      symptoms: [],
    };
  }
  render() {
    return (
      <div>
        <Box background="control" fill>
          <Image
            fit="contain"
            src={Logo}
            style={{ padding: "15px", width: "160px" }}
          ></Image>
        </Box>
        <Box background="light-3">
          <Heading style={{ margin: 0, padding: "10px" }} level={2}>
            Covid Positive Information Form
          </Heading>
          <Paragraph style={{ margin: 0, padding: "10px", paddingTop: 0 }}>
            This form has been custom designed by C-Trace to be used for contact
            tracing purposes only. Required fields are marked with an asterisk*.
            Please fill out the below information promptly and honestly.
          </Paragraph>
        </Box>
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
              address: {
                street1: "",
                street2: "",
                city: "",
                state: "",
                zip: "",
              },
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
            Swal.fire({
              title: "Ready to submit?",
              showCancelButton: true,
              confirmButtonText: `Yes, I'm ready`,
              showLoaderOnConfirm: true,

              cancelButtonText: `No, Not yet`,
              allowOutsideClick: () => !Swal.isLoading(),
              preConfirm: () => {
                const {
                  id,
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
                var query = {
                  id,
                  name,
                  dob,
                  contacts,
                  quarantineLocation,
                  ...(email !== "" && { email: email }),
                  ...(address.street1 !== "" && { address: address }),
                  ...(dot !== "" && { dot: dot }),
                  ...(doso !== "" && { doso: doso }),
                  ...(phone !== "" && { phone: phone }),
                  ...(symptoms !== [] && { symptoms: symptoms }),
                };

                return postCase(query).then((res) => {
                  console.log(res);
                  // this.setState({ result: res });
                  return res;
                });
              },
            }).then((result) => {
              console.log(result);
              if (result.isConfirmed) {
                if (result.value.err) {
                  Swal.fire(
                    "Something went wrong!",
                    "We were unable to submit this information at this time. Please check your internet connection, or try again later.",
                    "error"
                  );
                } else {
                  console.log(this.state.result);
                  const d = new Date(result.value.releaseDate);
                  Swal.fire(
                    "Form Submitted",
                    "Thank you for submitting this form. Your quarantine release date is " +
                      (d.getMonth() + 1) +
                      "/" +
                      (d.getDay() + 2) +
                      "/" +
                      d.getFullYear() +
                      ".",
                    "success"
                  );
                }
                // props.updateScreen(props.patientData.view);
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // props.reopenModal();
              }
            });
          }}
        >
          {this.decoder("name") && (
            <FormField //name
              name="name"
              htmlFor="textinput-name"
              label="Full Name*"
              validate={validationMasks.name}
              required={this.decoder("name")}
              background={this.colors("name")}
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
          )}
          {this.decoder("email") && (
            <FormField
              // required={this.decoder("email")}
              background={this.colors("email")}
              // background="light-1.5" //email
              name="email"
              htmlFor="textinput-email"
              label="Email"
              // required
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
          )}{" "}
          {this.decoder("phone") && (
            <FormField //phone
              // required
              // required={this.decoder("phone")}
              background={this.colors("phone")}
              // validate={validationMasks.phone}
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
          )}{" "}
          {this.decoder("address") && (
            <FormField
              background={this.colors("address")}
              // background="light-1.5" //address
              // required
              name="address"
              // htmlFor="textinput-address"
              label="Address"
            >
              <TextInput
                required
                id="textinput-address-street1"
                name="address-street1"
                placeholder="Street Address*"
                value={this.state.address.street1}
                onChange={(event) =>
                  this.setState({
                    address: {
                      ...this.state.address,
                      street1: event.target.value,
                    },
                  })
                }
              />
              <TextInput
                id="textinput-address-street2"
                name="address-street2"
                placeholder="Apt. Number "
                value={this.state.address.street2}
                onChange={(event) =>
                  this.setState({
                    address: {
                      ...this.state.address,
                      street2: event.target.value,
                    },
                  })
                }
              />
              <TextInput
                required
                id="textinput-address-city"
                name="address-city"
                placeholder="City*"
                value={this.state.address.city}
                onChange={(event) =>
                  this.setState({
                    address: {
                      ...this.state.address,
                      city: event.target.value,
                    },
                  })
                }
              />
              <TextInput
                required
                id="textinput-address-state"
                name="address-state"
                placeholder="State*"
                value={this.state.address.state}
                onChange={(event) =>
                  this.setState({
                    address: {
                      ...this.state.address,
                      state: event.target.value,
                    },
                  })
                }
              />
              <TextInput
                required
                id="textinput-address-zip"
                name="address-zip"
                placeholder="Zip*"
                value={this.state.address.zip}
                onChange={(event) =>
                  this.setState({
                    address: {
                      ...this.state.address,
                      zip: event.target.value,
                    },
                  })
                }
              />
              {/* <TextInput
                id="textinput-address"
                name="address"
                placeholder="1 MyStreet Road, MyTown MO 00000"
                value={this.state.address}
                onChange={(event) => {
                  this.setState({ address: event.target.value });
                }}
              /> */}
            </FormField>
          )}{" "}
          {this.decoder("quarantineLocation") && (
            <FormField // qlocation
              // required
              required={this.decoder("quarantineLocation")}
              background={this.colors("quarantineLocation")}
              name="quarantineLocation"
              htmlFor="textinput-address"
              label="Preferred Quarantine Location*"
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
          )}{" "}
          {this.decoder("dob") && (
            <FormField
              required={this.decoder("dob")}
              background={this.colors("dob")}
              // background="light-1.5" //dob
              name="dob"
              htmlFor="textinput-dob"
              label="Date of Birth*"
              // required
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
          )}
          {this.decoder("dot") && (
            <FormField //dot
              // required={this.decoder("dot")}
              background={this.colors("dot")}
              name="dot"
              htmlFor="textinput-dot"
              label="Date of Covid Test"
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
          )}{" "}
          {this.decoder("doso") && (
            <FormField
              // required={this.decoder("doso")}
              background={this.colors("doso")}
              // background="light-1.5" //doso
              name="doso"
              htmlFor="textinput-doso"
              label="Date of Symptom Onset"
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
          )}
          {this.state.doso.length > 0 && (
            <FormField
              name="symptoms"
              htmlFor="symptoms-input"
              label="Symptoms"
            >
              <CheckBoxGroup
                marginBottom="5px"
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
                  // plain
                  style={{ padding: 0, marginRight: "15px", marginTop: "5px" }}
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
                  icon={<GrAdd style={{ fontSize: "24px" }} />}
                >
                  {/* <Box
                    justify="center"
                    align="center"
                    // width="xxsmall"
                    // height="xxsmall"
                  > */}

                  {/* </Box> */}
                </Button>
                <TextInput
                  plain
                  border="none"
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
            background="light-1.5"
            style={{
              alignSelf: "end",
              padding: "3px",
              // borderRadius: "px",
            }}
          >
            {this.state.contacts?.length == 0 && (
              <Paragraph style={{ margin: 0, padding: "10px", paddingTop: 0 }}>
                Recent close contact is defined as any extended interaction 6
                feet apart or less which lasts for 15 minutes or more. Mask
                wearing is not taken into consideration at this time.
              </Paragraph>
            )}
            {this.state.contactInputs}
          </Box>
          <CardFooter
            direction="row"
            align="start"
            style={{
              minHeight: "100px",
              paddingLeft: "10px",
              paddingRight: "10px",
              paddingBottom: "5px",
            }}
            gap="large"
          >
            <Button type="reset" label="Reset" />
            <Button type="submit" primary label="Submit" />
          </CardFooter>
        </Form>
      </div>
    );
  }
}

export default CaseForm;
