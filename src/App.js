import "./App.css";
import React from "react";
import { Grommet, Box } from "grommet";
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
      control: "#444",

      brand: "#fff",

      "accent-1": "#444",
      "accent-2": "#82594B",
      "neutral-1": "silver",
      "neutral-2": "#9fb8ad",

      "light-1": "#fff",
      "light-2": "#eee",
      "light-3": "#ddd",
      "light-4": "#ccc",
      rust: "#A24B11",
      "color-1": "#132859",
      "color-2": "#A67502",
      "color-3": "#4B5C82",
      "color-4": "#594413",
      "color-5": "#D49C19",

      salmon: "#FFC39C",
      oceanic: "#316D70",
      silver: "#e5e7e7",

      focus: "#fff",

      iconBorder: "#9fb8ad",
    },
  },
};
function App() {
  let query = useQuery();
  return (
    <Grommet theme={customTheme} background="brand">
      <Box style={{ color: "accent-1", minHeight: "100vh" }}>
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
      </Box>
    </Grommet>
  );
}

export default App;
