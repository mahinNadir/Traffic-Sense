const constants = require("./index");
const axiosObject = require("../utils/axios/index");

const api = {};

api.senseImages = async (body) => {
  const url = `${constants.MODEL_SERVER_BASE_URL}/sense-images`;

  return axiosObject.post(url, body);
}

module.exports = api;