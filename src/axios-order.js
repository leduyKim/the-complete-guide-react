import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-76725.firebaseio.com/',
    timeout: 12000
})

instance.interceptors.request.use(function (req) {
    return req;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;