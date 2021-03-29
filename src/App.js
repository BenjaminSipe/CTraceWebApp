import "./App.css";
import React from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import {
  CaseForm,
  ContactForm,
  PostForm,
  CaseView,
  ContactView,
  MessageCases,
  MessageContacts,
  RecoveredView,
  Header,
  Home,
  Login,
} from "./routes/All";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  let query = useQuery();
  return (
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
        <Header></Header>
        <Switch>
          <Route path="/caseview">
            <CaseView />
          </Route>
          <Route path="/ContactView">
            <ContactView></ContactView>
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
  );
}

export default App;
