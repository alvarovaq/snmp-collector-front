import { User } from "./users.model";

export interface AuthState {
    token: string | null;
    user: User | null;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface ChangePasswordReq {
    password: string;
    newPassword: string;
}

export interface ResetPWDTokenReq {
    url: string;
    email: string;
}

export interface ResetPasswordReq {
    token: string;
    password: string;
}