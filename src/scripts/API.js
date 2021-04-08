import axios from "axios";

function getContactByName(name) {
  return axios.get("http://localhost:3000/api/contact/by/name/Benjamin Sipe");
}

function getContacts() {
  return axios
    .get("http://localhost:3000/api/contact/all")
    .then((res) => res.data);
}

function getCases() {
  return axios
    .get("http://localhost:3000/api/case/all")
    .then((res) => res.data);
}
export { getContactByName, getContacts, getCases };
