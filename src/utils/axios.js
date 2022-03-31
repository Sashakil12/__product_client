import axios from 'axios'

console.log('react env', process.env.NODE_ENV)
const api = axios.create({
    baseURL:'http://localhost:8080'
})

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});
export default api