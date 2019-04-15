import { observable, action } from "mobx";
import { IError } from "../types";

export interface IAppStore {
    loading: boolean;
    error?: IError;
    setLoading(loading: boolean): void;
    setError(error: IError): void;
}

class AppStore implements IAppStore {
    @observable loading = true;
    @observable error = {};

    @action
    setLoading(loading: boolean) {
        this.loading = loading;
    }

    @action
    setError(error: IError) {
        this.error = error;
    }
}
const appStore = new AppStore();

export default appStore;
