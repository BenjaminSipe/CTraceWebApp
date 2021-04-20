import axios from "axios";

const url = "172.25.22.175";
function getContactByName(name) {
  return axios.get("http://" + url + ":3000/api/contact/by/name/Benjamin Sipe");
}

function getContacts() {
  return axios
    .get("http://" + url + ":3000/api/contact/all")
    .then((res) => res.data);
}

function getCases() {
  return axios
    .get("http://" + url + ":3000/api/case/all")
    .then((res) => res.data);
}

function getRecovered() {
  return axios
    .get("http://" + url + ":3000/api/case/recovered/all")
    .then((res) => res.data);
}

function postCase(value) {
  return axios
    .post("http://" + url + ":3000/api/case", value)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      // console.log(error);
    });
}

function postCaseMessage(data) {
  return axios
    .post("http://" + url + ":3000/api/messaging/case", data)
    .then((res) => res.data);
}
export {
  getContactByName,
  getContacts,
  getCases,
  getRecovered,
  postCaseMessage,
  postCase,
};
