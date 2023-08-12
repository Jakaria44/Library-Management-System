import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/db-api/",
  headers: {
    "Content-type": "application/json",
    "x-access-token": sessionStorage.token
  }
});