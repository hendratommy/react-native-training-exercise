export interface IError {
    code?: string;
    message?: string;
    errors?: {
        [name: string]: string;
    };
}

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

export interface ILoginData extends IUser {
    id: number;
    created_at: Date;
    updated_at: Date;
}

export interface ITypedResponseData<T> extends IResponse {
    data: T;
}

export interface IUserSession {
    id: number;
    username: string;
    expiredAt: number;
}

export interface ICategory {
    id: number;
    name: string;
}

export interface IProduct {
    id: number;
    name: string;
    price: number;
    idCategory: number;
    images: string;
    desc: string;
}
