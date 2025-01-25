/* eslint-disable no-undef */
const settings = {
  BASE_API_URL: process.env.REACT_APP_BASE_API_URL || 'http://localhost:3000',
  EMAIL_JS_SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  EMAIL_JS_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  EMAIL_JS_USER_ID: process.env.REACT_APP_EMAILJS_USER_ID,
};

export default settings;
