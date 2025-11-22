import api from "./api.client";
import { Credentials, ChangePasswordReq, ResetPWDTokenReq, ResetPasswordReq } from "models";

export class AuthClient {
    public static async login(credentials: Credentials): Promise<string> {
        const { data } = await api.post("/auth/login", credentials);
        return data;
    }

    public static async renew(): Promise<string> {
        const { data } = await api.get("/auth/renew");
        return data;
    }

    public static async changePassword(req: ChangePasswordReq): Promise<void> {
        await api.post("/auth/changePassword", req);
    }

    public static async resetPasswordToken(req: ResetPWDTokenReq): Promise<void> {
        await api.post("/auth/resetPasswordToken", req);
    }

    public static async resetPassword(req: ResetPasswordReq): Promise<void> {
        await api.post("/auth/resetPassword", req);
    }
};