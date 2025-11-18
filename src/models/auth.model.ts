import { User } from "./users.model";

export interface AuthState {
    token: string | null;
    user: User | null;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface ChangePasswordReq
{
    password: string;
    newPassword: string;
}