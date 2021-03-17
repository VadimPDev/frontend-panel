import axios,{AxiosRequestConfig} from 'axios'


export const $authHost = axios.create({
    baseURL:process.env.REACT_APP_API_URL
})

export const $host  = axios.create({
    baseURL:process.env.REACT_APP_API_URL
})


const authInerceptor = (config:AxiosRequestConfig) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.response.use((response) => {
    if(response.status === 401) {
         //window.location.replace('http://localhost:5000/')
    }
    return response;
}, (error) => {
    if (error.response && error.response.data) {

    }
    return Promise.reject(error.message);
});

$authHost.interceptors.request.use(authInerceptor)