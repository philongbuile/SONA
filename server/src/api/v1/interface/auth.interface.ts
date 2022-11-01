export interface TokenPayload {
    id: string;
    username: string;
    iat: string;
    exp: number;
}


export interface Auth {
    username: string;
    password: string;
}