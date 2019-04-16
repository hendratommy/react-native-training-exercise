import { IError, ICategory } from "../types";
import { observable, action, runInAction } from "mobx";
import appStore from "./AppStore";
import categoryAction from "../actions/categoryAction";

export interface ICategoryStore {
    loading: boolean;
    error?: IError;
    setError(error?: IError): void;
    categories: ICategory[];
    getCategories(): Promise<void>;
    createCategory(name: string): Promise<void>;
}

class CategoryStore implements ICategoryStore {
    @observable loading = false;
    @observable error? = {};
    @observable categories: ICategory[] = [];

    @action
    setError(error: IError) {
        this.error = error;
    }

    @action
    async getCategories() {
        this.loading = true;
        this.error = {};
        try {
            const response = await categoryAction.getCategories(
                appStore.session!.id
            );

            if (response.data.status !== 200) {
                throw new Error(response.data.message);
            }

            runInAction(() => {
                this.categories = response.data.data;
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
    async createCategory(name: string) {
        this.error = {};
        try {
            await categoryAction.createCategory(appStore.session!.id, name);
            await this.getCategories();
            return Promise.resolve();
        } catch (error) {
            runInAction(() => {
                this.error = error;
            });
            return Promise.reject(error);
        }
    }
}

const categoryStore = new CategoryStore();

export default categoryStore;
