import { AxiosRequestConfig } from "axios";
import { IResponse, ICategory, ITypedResponseData } from "../types";
import createAgent from "./createAgent";

const baseUrl = "https://sajudin.000webhostapp.com/v1";

export default {
    getCategories: (idUser: number) => {
        const agent = createAgent();
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/by/users/categories`,
            method: "POST",
            data: { idUser }
        };
        return agent.request<ITypedResponseData<ICategory[]>>(config);
    },
    createCategory: (idUser: number, name: string) => {
        const agent = createAgent();
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/insert/categories`,
            method: "POST",
            data: { idUser, name }
        };
        return agent.request<IResponse>(config);
    }
};
