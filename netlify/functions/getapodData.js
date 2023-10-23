require("dotenv").config();
const axios = require("axios");

exports.handler = async function (event, context) {
  const key = process.env.API_KEY;

  let response = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=${key}`
  );

  let apodData = response.data;
  return {
    statusCode: 200,
    body: JSON.stringify({ apodData }),
  };
};
