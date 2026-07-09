const axios = require("axios");

const axiosObject = {};

axiosObject.post = async (url, body) => {
  try {
    const response = await axios.post(url, body, {
      timeout: 50000,
    });
    return response?.data;
  } catch (e) {
    const message = e?.response?.data?.error;
    throw new Error(message);
  }
};

axiosObject.patch = async (url, body) => {
  try {
    const response = await axios.patch(url, body);
    return response?.data;
  } catch (e) {
    const message = e?.response?.data?.error;
    throw new Error(message);
  }
};

axiosObject.delete = async (url, body) => {
  try {
    const response = await axios.delete(url, { data: body });
    return response?.data;
  } catch (e) {
    const message = e?.response?.data?.error;
    throw new Error(message);
  }
};

axiosObject.get = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return response?.data;
  } catch (e) {
    const message = e?.response?.data?.error;
    throw new Error(message);
  }
};

module.exports = axiosObject;
