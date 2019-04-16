import { AxiosRequestConfig } from "axios";
import { IResponse, ITypedResponseData, IProduct } from "../types";
import createAgent from "./createAgent";

const baseUrl = "https://sajudin.000webhostapp.com/v1";

export default {
    getProducts: (idUser: number) => {
        const agent = createAgent();
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/by/users/products`,
            method: "POST",
            data: { idUser }
        };
        return agent.request<ITypedResponseData<IProduct[]>>(config);
    },
    createProduct: (
        idUser: number,
        name: string,
        price: number,
        idCategory: number,
        images: string,
        desc: string
    ) => {
        const agent = createAgent();
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/insert/products`,
            method: "POST",
            data: {
                idUser,
                name,
                price,
                ...(idCategory > 0 ? { idCategory } : {}),
                ...(images.length > 0 ? { images } : {}),
                ...(desc.length > 0 ? { desc } : {})
            }
        };
        return agent.request<IResponse>(config);
    }
};
