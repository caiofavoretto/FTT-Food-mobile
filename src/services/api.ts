import axios from 'axios';

// baseURL: 'https://tm-food-api.herokuapp.com',

const api = axios.create({
  baseURL: 'http://192.168.0.73:3333',
});

export default api;
