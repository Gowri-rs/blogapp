import axios from 'axios'
import React from 'react'

// to create a new instance of axios
const axiosInstance =axios.create({
    baseURL : "/api"
})

axiosInstance.interceptors.request.use((config)=>{
    console.log(config)
    const accessToken =localStorage.getItem("token") // to read the value of token back from the local storage
    if (accessToken){
        if(config){
            config.headers.token= accessToken; //keep the token on the header part of the httprequest
        }
    }
    return config;
},(error)=>{
    return Promise.reject(error)
}
)

export default axiosInstance;


