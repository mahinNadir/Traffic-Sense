import constants from "./constants";

const helpers = {};

helpers.validateEmail = (email) => {
  return constants.EMAIL_REGEX_CODE.test(email.toLowerCase());
};


export default helpers;
