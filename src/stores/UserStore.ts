import { observable, action, runInAction } from "mobx";
import { IError } from "../types";
import userAction from "../actions/userAction";

export interface IUserStore {
    loading: boolean;
    error?: IError;
    users: User[];
    dismissError(): void;
    getUsers(): Promise<void>;
    getUser(index: number): User | undefined;
}

class UserStore implements IUserStore {
    @observable loading = true;
    @observable error = {};
    @observable users: User[] = [];

    @action
    dismissError() {
        this.error = {};
    }

    @action
    async getUsers() {
        this.loading = true;
        try {
            const response = await userAction.getUsers();

            return runInAction(() => {
                response.data.forEach(user => {
                    this.users.push(
                        new User(user.id, user.login, user.avatar_url)
                    );
                });
            });
        } catch (error) {
            runInAction(() => {
                this.error = error;
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    getUser(index: number) {
        if (this.users && this.users.length > 0) {
            return this.users[index];
        }
    }
}

/* eslint-disable @typescript-eslint/camelcase */
export class User {
    @observable id: number;
    @observable login: string;
    @observable avatarUrl: string;

    constructor(id: number, login: string, avatarUrl: string) {
        this.id = id;
        this.login = login;
        this.avatarUrl = avatarUrl;
    }

    // @computed
    // get avatar_url() {
    //     console.debug(`computed get: ${this.avatarUrl}`);
    //     return this.avatarUrl;
    // }
}

console.debug(`Creating UserStore`);
const userStore = new UserStore();

export default userStore;
