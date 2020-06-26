import axios from 'axios';

// baseURL: 'https://tm-food-api.herokuapp.com',

const api = axios.create({
  baseURL: 'http://192.168.0.173:3333',
});

export default api;
