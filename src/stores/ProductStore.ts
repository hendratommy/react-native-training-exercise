import { IError, IProduct } from "../types";
import { observable, action, runInAction } from "mobx";
import appStore from "./AppStore";
import productAction from "../actions/productAction";

export interface IProductStore {
    loading: boolean;
    error?: IError;
    message?: string;
    setError(error?: IError): void;
    setMessage(message?: string): void;
    products: IProduct[];
    getProducts(): Promise<void>;
    createProduct(
        name: string,
        price: number,
        idCategory: number,
        images: string,
        desc: string
    ): Promise<void>;
}

class ProductStore implements IProductStore {
    @observable loading = false;
    @observable error?: IError = {};
    @observable message?: string = undefined;
    @observable products: IProduct[] = [];

    @action
    setError(error: IError) {
        this.error = error;
    }

    @action
    setMessage(message?: string) {
        this.message = message;
    }

    @action
    async getProducts() {
        this.loading = true;
        this.error = {};
        try {
            const response = await productAction.getProducts(
                appStore.session!.id
            );

            if (response.data.status !== 200) {
                throw new Error(response.data.message);
            }

            runInAction(() => {
                this.products = response.data.data;
            });
            return Promise.resolve();
        } catch (error) {
            runInAction(() => {
                this.error = error;
            });
            return Promise.reject(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    @action
    async createProduct(
        name: string,
        price: number,
        idCategory: number,
        images: string,
        desc: string
    ) {
        this.error = {};
        try {
            await productAction.createProduct(
                appStore.session!.id,
                name,
                price,
                idCategory,
                images,
                desc
            );
            await this.getProducts();
            return Promise.resolve();
        } catch (error) {
            runInAction(() => {
                this.error = error;
            });
            return Promise.reject(error);
        }
    }
}

const productStore = new ProductStore();

export default productStore;
