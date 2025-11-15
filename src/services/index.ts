import { AuthService } from "./auth.service";

const authService = new AuthService();

export const initServices = () => {
    authService.init();
};

export {
    authService,
};