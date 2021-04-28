import axios from "axios";

function getContactByName(name) {
  return axios.get("/api/contact/by/name/" + name);
}

function getContacts() {
  return axios.get("/api/contact/all").then((res) => res.data);
}

function getCases() {
  return axios.get("/api/case/all").then((res) => res.data);
}

function getRecovered() {
  return axios.get("/api/case/recovered/all").then((res) => res.data);
}
function getPast() {
  return axios.get("/api/contact/past/all").then((res) => res.data);
}
function postContact(value) {
  var { id, ...rest } = value;
  return axios
    .post("/api/contact/" + id, rest)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function postCase(value) {
  var { id, ...rest } = value;
  return axios
    .post("/api/case/" + id, rest)
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      // console.log(error);
    });
}

function postCaseMessage(data) {
  return axios.post("/api/messaging/case", data).then((res) => res.data);
}

function postContactMessage(data) {
  return axios
    .post("/api/messaging/contact/" + data._id, data)
    .then((res) => res.data);
}

function deleteContact(id) {
  return axios.delete("/api/contact/" + id).then((res) => res.data);
}
function deleteCase(id) {
  return axios.delete("/api/case/" + id).then((res) => res.data);
}

function releasePatient(id) {
  return axios.put("/api/messaging/release/" + id).then((res) => res.data);
}
export {
  getContactByName,
  getContacts,
  getCases,
  getRecovered,
  getPast,
  deleteContact,
  deleteCase,
  postCaseMessage,
  postContactMessage,
  postCase,
  postContact,
  releasePatient,
};
