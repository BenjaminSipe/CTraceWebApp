import "./App.css";
import React from "react";
import { Main, Heading } from "grommet";
import CaseForm from "./routes/Forms/CaseForm";
import ContactForm from "./routes/Forms/ContactForm";
import Home from "./routes/Home";
import Header from "./routes/AppHeader";
import { Switch, Route, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  let query = useQuery();
  return (
    // <div>
    // <Main>
    <Switch>
      <Route path="/Header">
        <Header></Header>
      </Route>
      <Route path="/Contact">
        <Heading alignSelf="start">C-Trace</Heading>
        <h2>Close Contact Form</h2>
        <ContactForm query={query} />
      </Route>
      <Route path="/Case">
        <Heading alignSelf="start">C-Trace</Heading>
        <h2>Covid Positive Form</h2>
        <CaseForm />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    // </Main>
    // </div>
  );
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

export default App;
