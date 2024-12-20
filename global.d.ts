declare interface AuthContextObj {
    username?: string;
    token?: string;
}

declare interface LoginBodyObj {
    username: string;
    password: string;
}

declare type GenderObj = "MALE" | "FEMALE";

declare interface DetailsObj {
    [key: string]: number | string;

    "id": number;
    "description": string
    "education": string
    "profession": string
    "marital_status": string
    "religion": string
    "ethnicity": string
    "user_id": number;
}

declare interface UserObj {
    [key: string]: number | string | undefined | GenderObj | DetailsObj;

    "id": number;
    "name": string
    "phone": string
    "age": number
    "gender": GenderObj
    "county": string
    "town": string
    "details"?: DetailsObj
}

declare interface UserFilterObj {
    [key: string]: string | undefined | GenderObj | { max?: number, min: number };

    age: {
        min: number;
        max?: number;
    },
    town: string;
    county: string;
    gender?: GenderObj | string
}

declare interface MessageObj {
    [key: string]: number | string | "incoming" | "outgoing"

    'id': number,
    'user_id': number,
    'phone': string,
    'message': string,
    'msg_type': "incoming" | "outgoing",
    'created_at': string
}

declare module '*.jpg' {
}
declare module '*.jpeg' {
}
declare module '*.png' {
}


