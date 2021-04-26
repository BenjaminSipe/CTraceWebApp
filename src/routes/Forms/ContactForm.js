// import "../../App.css";
import Logo from "../../Logo_V2.svg";
import React, { Component } from "react";
import {
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
import { Redirect } from "react-router-dom";
import {
  dateMask,
  phoneNumberMask,
  nameMask,
  emailMask,
} from "../../scripts/InputMasks";

import { postContact } from "../../scripts/API";

class ContactForm extends Component {
  colors(value) {
    return [
      "name",
      "email",
      "phone",
      "address",
      "quarantineLocation",
      "dob",
      "doc",
    ]
      .filter((item) => this.decoder(item))
      .indexOf(value) %
      2 ===
      1
      ? "light-1.5"
      : "light-1";
  }

  decoder(value) {
    // console.log(value);
    if (value == "doc") return false;
    if (this.state.code) {
      switch (value) {
        case "email":
          // console.log(value + (this.state.code % 2));
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
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      value: {
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
        doc: "",
        phone: "",
        quarantineLocation: "",
      },
      code: props.query.get("code") || "",
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
          <Box background="control" fill>
            <Image
              fit="contain"
              src={Logo}
              style={{ padding: "15px", width: "160px" }}
            ></Image>
          </Box>
          <Box color="light-3">
            <Heading style={{ margin: 0, padding: "10px" }} level={2}>
              Close Contact Form
            </Heading>
            <Paragraph style={{ margin: 0, padding: "10px", paddingTop: 0 }}>
              This form has been custom designed by C-Trace to be used for
              contact tracing purposes only. Required fields are marked with an
              asterisk*. Please fill out the below information promptly and
              honestly.
            </Paragraph>
          </Box>
          <Form
            value={value}
            onChange={(nextValue) => {
              this.setState({ value: nextValue });
            }}
            onReset={() => {
              this.setState({ value: {} });
            }}
            onSubmit={({ value }) => {
              const {
                id,
                name,
                address,
                email,
                dob,
                phone,
                quarantineLocation,
              } = this.state.value;
              var query = {
                id,
                name,
                dob,
                quarantineLocation,
                ...(email !== "" && { email: email }),
                ...(address.street1 !== "" && { address: address }),
                ...(phone !== "" && { phone: phone }),
              };

              postContact(query).then(() => {
                this.setState({ redirect: true });
              });
            }}
          >
            {this.decoder("name") && (
              <FormField
                name="name"
                htmlFor="textinput-name"
                label="Full Name*"
                background={this.colors("name")}
              >
                <MaskedInput
                  required={this.decoder("name")}
                  id="textinput-name"
                  name="name"
                  mask={nameMask()}
                  value={value.name}
                />
              </FormField>
            )}
            {this.decoder("email") && (
              <FormField //email
                name="email"
                htmlFor="textinput-email"
                label="email"
                background={this.colors("email")}
              >
                <MaskedInput
                  // required={this.decoder("email")}
                  id="textinput-email"
                  name="email"
                  placeholder="example@email.com"
                  mask={emailMask()}
                  value={value.email}
                />
              </FormField>
            )}
            {this.decoder("phone") && (
              <FormField //phone
                name="phone"
                htmlFor="textinput-phone"
                label="Phone Number"
                background={this.colors("phone")}
              >
                <MaskedInput
                  // required={this.decoder("phone")}
                  id="textinput-phone"
                  name="phone"
                  mask={phoneNumberMask()}
                  value={value.phone}
                />
              </FormField>
            )}
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
                  value={value.address.street1}
                  onChange={(event) =>
                    this.setState({
                      value: {
                        ...value,
                        address: {
                          ...value.address,
                          street1: event.target.value,
                        },
                      },
                    })
                  }
                />
                <TextInput
                  id="textinput-address-street2"
                  name="address-street2"
                  placeholder="Apt. Number "
                  value={value.address.street2}
                  onChange={(event) =>
                    this.setState({
                      value: {
                        ...value,
                        address: {
                          ...value.address,
                          street2: event.target.value,
                        },
                      },
                    })
                  }
                />
                <TextInput
                  required
                  id="textinput-address-city"
                  name="address-city"
                  placeholder="City*"
                  value={value.address.city}
                  onChange={(event) =>
                    this.setState({
                      value: {
                        ...value,
                        address: {
                          ...value.address,
                          city: event.target.value,
                        },
                      },
                    })
                  }
                />
                <TextInput
                  required
                  id="textinput-address-state"
                  name="address-state"
                  placeholder="State*"
                  value={value.address.state}
                  onChange={(event) =>
                    this.setState({
                      value: {
                        ...value,
                        address: {
                          ...value.address,
                          state: event.target.value,
                        },
                      },
                    })
                  }
                />
                <TextInput
                  required
                  id="textinput-address-zip"
                  name="address-zip"
                  placeholder="Zip*"
                  value={value.address.zip}
                  onChange={(event) =>
                    this.setState({
                      value: {
                        ...value,
                        address: {
                          ...value.address,
                          zip: event.target.value,
                        },
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
            )}
            {this.decoder("quarantineLocation") && (
              <FormField //location
                name="quarantineLocation"
                htmlFor="textinput-address2"
                label="Preferred Quarantine Location*"
                background={this.colors("quarantineLocation")}
              >
                <TextInput
                  required={this.decoder("quarantineLocation")}
                  id="textinput-address2"
                  name="quarantineLocation"
                  placeholder="Campus or Home"
                />
              </FormField>
            )}
            {this.decoder("dob") && (
              <FormField
                name="dob"
                htmlFor="textinput-dob"
                label="Date of Birth*"
                background={this.colors("dob")}
              >
                <MaskedInput
                  required={this.decoder("dob")}
                  id="textinput-dob"
                  name="dob"
                  mask={dateMask(value.dob)}
                  value={value.dob}
                />
              </FormField>
            )}
            {this.decoder("doc") && (
              <FormField //doc
                background={this.colors("doc")}
                name="doc"
                htmlFor="textinput-doc"
                label="Date of Close Contact"
              >
                <MaskedInput
                  required={this.decoder("doc")}
                  id="textinput-doc"
                  name="doc"
                  mask={dateMask(value.doc)}
                  value={value.doc}
                />
              </FormField>
            )}
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
}

export default ContactForm;
