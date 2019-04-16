import { AxiosRequestConfig } from "axios";
import { IResponse, ITypedResponseData, ILoginData } from "../types";
import createAgent from "./createAgent";

const baseUrl = "https://sajudin.000webhostapp.com/v1";

export default {
    registerUser: (
        username: string,
        password: string,
        firstname: string,
        lastname: string
    ) => {
        const agent = createAgent();
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/insert/users`,
            method: "POST",
            data: { username, password, firstname, lastname }
        };
        return agent.request<IResponse>(config);
    },
    loginUser: (username: string, password: string) => {
        const agent = createAgent();
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/login/users`,
            method: "POST",
            data: { username, password }
        };
        return agent.request<ITypedResponseData<ILoginData>>(config);
    }
};
