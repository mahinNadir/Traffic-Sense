import constants from "../config/constants";
import axios from "./axios";

const api = {};

api.predict = function (body) {
  const url = `${constants.BASE_URL}/manage-signals`;
  return axios.post(url, body);
};

export default api;
