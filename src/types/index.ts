export interface IUser {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
}

export interface IResponse {
    status: number;
    message: string;
}

interface ILoginData extends IUser {
    id: number;
    created_at: Date;
    updated_at: Date;
}

export interface ILoginResponse extends IResponse {
    data: ILoginData;
}
