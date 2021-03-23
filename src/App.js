import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Main, Heading, Paragraph, TextInput } from "grommet"
import CaseForm from './CaseForm'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Main pad="large">
          <Heading>Something</Heading>
          <Paragraph>Something about something</Paragraph>
          <CaseForm/>

        </Main>
      </header>
    </div>
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
