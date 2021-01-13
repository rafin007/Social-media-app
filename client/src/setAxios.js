import axios from "axios";

const setAxios = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
};

export default setAxios;
