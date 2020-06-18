import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tm-food-api.herokuapp.com',
});

export default api;
