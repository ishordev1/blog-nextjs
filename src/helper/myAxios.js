const { default: axios } = require("axios");

export const publicAxios = axios.create({
  baseURL: "http://localhost:3000/api",
});
