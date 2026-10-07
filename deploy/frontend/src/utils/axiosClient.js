import axios from "axios"

if (!import.meta.env.VITE_API_URL) {
    console.warn("VITE_API_URL is missing in environment variables. Falling back to http://localhost:3000");
}

const axiosClient =  axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosClient;