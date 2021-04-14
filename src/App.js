import "./App.css";
import React from "react";
import { ThemeContext, Grommet } from "grommet";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import {
  CaseForm,
  ContactForm,
  PostForm,
  CaseView,
  MessageCases,
  MessageContacts,
  RecoveredView,
  Header,
  Home,

  // Login,
} from "./routes/All";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const customTheme = {
  global: {
    colors: {
      control: "#c5d7bd",
      // Overriding existing grommet colors
      brand: "#c5d7bd",

      "accent-1": "#d5d7bd",
      "accent-2": "#7FFFB0",
      "accent-3": "#8FFFB0",
      "accent-4": "#9FFFB0",
      "neutral-1": "#d5e7cd",
      "neutral-2": "#20873D",
      "neutral-3": "#30873D",
      "neutral-4": "#40873D",
      focus: "#fff",
      // Setting new colors
      blue: "#00C8FF",
      green: "#17EBA0",
      teal: "#82FFF2",
      purple: "#F740FF",
      red: "#FC6161",
      orange: "#FFBC44",
      yellow: "#FFEB59",
      iconBorder: "#9fb8ad",
      // you can also point to existing grommet colors
      brightGreen: "accent-1",
      deepGreen: "neutral-2",
    },
  },
};
function App() {
  let query = useQuery();
  return (
    <Grommet theme={customTheme}>
      <Switch>
        <Route path="/Contact">
          <ContactForm query={query} />
        </Route>
        <Route path="/Case">
          <CaseForm query={query} />
        </Route>
        <Route path="/postForm">
          <PostForm></PostForm>
        </Route>
        <Route path="/">
          <Header theme={customTheme}></Header>
          <Switch>
            <Route path="/Dashboard">
              <CaseView />
            </Route>
            <Route path="/MessageCases">
              <MessageCases />
            </Route>
            <Route path="/MessageContacts">
              <MessageContacts />
            </Route>
            <Route path="/RecoveredView">
              <RecoveredView />
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </Grommet>
  );
}

export default App;
