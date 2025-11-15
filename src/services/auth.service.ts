import { store, AuthModule } from "store";
import { ReduxState } from '../store/index';
import { AuthClient } from "clients";
import env from "config/env.config";

export class AuthService {
    private renewInterval: number | null = null;
    
    public init(): void {
        const token = this.getToken();
        if (token) {
            this.renewToken();
            this.startTokenRenewal();
        }
    }

    public login(token: string): void {
        this.setToken(token);
        this.startTokenRenewal();
    }

    public logout(): void {
        store.dispatch(AuthModule.logoutAction());
        this.stopTokenRenewal();
    }

    public getToken(): string | null {
        const state: ReduxState = store.getState();
        return state.auth.token;
    }

    private setToken(token: string): void {
        store.dispatch(AuthModule.setTokenAction(token));
    }

    private renewToken(): void {
        AuthClient.renew()
            .then((token: string) => {
                this.setToken(token);
            })
            .catch((err) => {
                console.error("Error al renovar token", err);
                this.logout();
            });
    }

    private startTokenRenewal(): void {
        this.stopTokenRenewal();
        this.renewInterval = window.setInterval(async () => {
            this.renewToken();
        }, env.auth.renewTime * 1000);
    }

    private stopTokenRenewal(): void {
        if (this.renewInterval) {
            clearInterval(this.renewInterval);
            this.renewInterval = null;
        }
    }
}