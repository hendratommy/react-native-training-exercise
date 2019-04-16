import {
    observable,
    action,
    computed,
    runInAction,
    autorun,
    IReactionDisposer
} from "mobx";
import { IError, IUserSession } from "../types";
import AsyncStorage from "@react-native-community/async-storage";
import {
    NavigationContainerComponent,
    NavigationActions
} from "react-navigation";

export interface IAppStore {
    loading: boolean;
    error?: IError;
    isLoggedIn: boolean;
    session?: IUserSession;
    setSession(id: number, username: string): void;
    sessionExpiredIn: number;
    // setLoading(loading: boolean): void;
    setError(error: IError): void;
    invalidateSession(): void;
    setNavigationContainer(
        navigationContainer?: NavigationContainerComponent | null
    ): void;
}

class AppStore implements IAppStore {
    @observable loading = true;
    @observable error = {};
    @observable session?: IUserSession = undefined;
    @observable currentTime: number = 0;

    _navigationContainerRef?: NavigationContainerComponent;
    _disposer?: IReactionDisposer;

    constructor() {
        AsyncStorage.getItem("session")
            .then(sessionStr => {
                if (sessionStr && sessionStr.length > 0) {
                    const session: IUserSession = JSON.parse(sessionStr);
                    if (session.expiredAt > new Date().getTime()) {
                        return runInAction(() => {
                            this.setSession(
                                session.id,
                                session.username,
                                session.expiredAt
                            );
                            this.loading = false;
                        });
                    }
                }
                return runInAction(() => {
                    this.loading = false;
                });
            })
            .catch(error => {
                return runInAction(() => {
                    this.loading = false;
                    this.error = { message: error.message };
                });
            });
    }

    setNavigationContainer(
        navigationContainerRef: NavigationContainerComponent
    ) {
        this._navigationContainerRef = navigationContainerRef;
    }

    @action
    setDisposer(disposer: any) {
        this._disposer = disposer;
    }

    @action
    disposer() {
        console.debug(`dispose autorun`);
        if (this._disposer) {
            this._disposer();
        }
    }

    @action
    setLoading(loading: boolean) {
        this.loading = loading;
    }

    @action
    setError(error: IError) {
        this.error = error;
    }

    @action
    setSession(id: number, username: string, expiredAt?: number) {
        if (!expiredAt) {
            expiredAt = new Date().getTime() + 10 * 60 * 1000;
        }
        const session = {
            id,
            username,
            expiredAt
        };
        this.session = session;
        this.currentTime = new Date().getTime();
        AsyncStorage.setItem("session", JSON.stringify(session));

        this._disposer = autorun(
            () => {
                if (this.session && this.session.expiredAt > this.currentTime) {
                    runInAction(() => {
                        this.currentTime = new Date().getTime();
                    });
                } else {
                    runInAction(() => {
                        this.invalidateSession();
                    });
                }
            },
            { scheduler: run => setInterval(run, 1000) }
        );
    }

    @action
    invalidateSession() {
        this.session = undefined;
        AsyncStorage.removeItem("session");
        this.disposer();
        if (this._navigationContainerRef) {
            this._navigationContainerRef.dispatch(
                NavigationActions.navigate({ routeName: "LoginScreen" })
            );
        }
    }

    @computed
    get isLoggedIn() {
        if (this.session && this.session.id && this.session.username)
            return true;
        return false;
    }

    @computed
    get sessionExpiredIn() {
        if (this.isLoggedIn) {
            return this.session!.expiredAt - this.currentTime;
        }
        return 0;
    }
}
const appStore = new AppStore();

export default appStore;
