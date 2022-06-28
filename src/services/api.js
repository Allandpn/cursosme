import axios from "axios";


const api = axios.create({
  baseURL: 'https://pucminas.instructure.com/api/v1',
});

export default api;