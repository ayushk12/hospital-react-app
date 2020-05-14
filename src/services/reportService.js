import axios from "axios";

import { BASE_URL } from "../config";
import { getJwt, setTokenHeader } from "../services/authService";

const apiEndpoint = `${BASE_URL}/reports`;

setTokenHeader(getJwt());

export async function getReport() {
  const res = await axios.get(`${apiEndpoint}/getReport`);
  return res.data;
}

export async function addReport(data) {
  const res = await axios.post(`${apiEndpoint}/newReport`, data);
  return res.data;
}

export async function status(data) {
  const res = await axios.get(`${apiEndpoint}/status`, {
    data: { id: data._id },
  });
  return res.data;
}

export default {
  getReport,
  addReport,
  status,
};
