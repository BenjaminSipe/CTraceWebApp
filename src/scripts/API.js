import axios from "axios";

const url = "172.25.22.175";
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

function postCase(value) {
  return axios
    .post("/api/case", value)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      // console.log(error);
    });
}

function postCaseMessage(data) {
  return axios.post("/api/messaging/case", data).then((res) => res.data);
}
export {
  getContactByName,
  getContacts,
  getCases,
  getRecovered,
  postCaseMessage,
  postCase,
};
