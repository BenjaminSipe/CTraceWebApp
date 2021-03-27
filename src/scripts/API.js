import axios from "axios";

export default function getContactByName(name) {
  return axios.get("localhost:3000/api/contact/by/name/Benjamin Sipe");
}
