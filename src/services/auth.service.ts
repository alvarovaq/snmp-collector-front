import { store, AuthModule } from "store";
import { ReduxState } from '../store/index';

export class AuthService {
    public login(token: string): void {
        store.dispatch(AuthModule.setTokenAction(token));
    }

    public logout(): void {
        store.dispatch(AuthModule.logoutAction());
    }

    public getToken(): string | null {
        const state: ReduxState = store.getState();
        return state.auth.token;
    }
}