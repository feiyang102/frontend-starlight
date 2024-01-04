export interface IUserState {
    username: string;
    accessToken: string;
    refreshToken?: string;
    roles: string[];
}

export interface ILoginRequest {
    username: string;
    password: string;
};