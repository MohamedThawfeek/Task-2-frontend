import axios from "axios";

const instance = axios.create({
  // baseURL: 'http://localhost:5000'    
  baseURL: process.env.REACT_APP_FETCHING_API
  
});

export default instance;
