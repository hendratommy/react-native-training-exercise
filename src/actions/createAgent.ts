import axios, { AxiosRequestConfig } from "axios";

const createAgentFn = (config?: AxiosRequestConfig) => {
    const instance = axios.create({
        ...config
    });
    instance.defaults.timeout = 15000;

    return instance;
};

export default createAgentFn;
