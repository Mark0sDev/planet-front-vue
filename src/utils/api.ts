import axios from "axios";


const api = axios.create({
    baseURL: 'https://api-ton.dev/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;