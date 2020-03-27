import axios from 'axios';

const api = axios.create({
    baseURL: 'http://penguin.termina.linux.test:3333/'
})

export default api;