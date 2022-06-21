import axios from 'axios';
//const BASE_URL = 'http://localhost:3030';
const BASE_URL = 'https://localhost:44325';
export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
