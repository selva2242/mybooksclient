import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/'
});

// // Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// // Also add/ configure interceptors && all the other cool stuff

// instance.interceptors.request...

export default axiosInstance;